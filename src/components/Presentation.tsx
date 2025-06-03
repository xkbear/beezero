import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slides_zh, slides_en } from '../data/slides';
import type { Slide, SlideSection } from '../data/slides';

const SLIDE_WIDTH = 1300;
const SLIDE_HEIGHT = 780;

// 每页渐变色（可继续扩展）
const slideBg = [
  'bg-gradient-to-br from-blue-100 to-blue-200', // 1
  'bg-gradient-to-br from-green-100 to-blue-100', // 2
  'bg-gradient-to-br from-purple-100 to-blue-100', // 3
  'bg-gradient-to-br from-pink-100 to-yellow-100', // 4
  'bg-gradient-to-br from-yellow-100 to-orange-100', // 5
  'bg-gradient-to-br from-teal-100 to-blue-100', // 6
  'bg-gradient-to-br from-indigo-100 to-blue-100', // 7
  'bg-gradient-to-br from-pink-100 to-purple-100', // 8
  'bg-gradient-to-br from-green-100 to-teal-100', // 9
  'bg-gradient-to-br from-blue-100 to-gray-100', // 10
];

const bgColors = [
  'from-[#f5f6fa] via-[#e5e9f2] to-[#d1d8e6]',
  'from-blue-50 via-blue-100 to-blue-200',
  'from-green-50 via-green-100 to-green-200',
  'from-purple-50 via-purple-100 to-purple-200',
  'from-orange-50 via-orange-100 to-orange-200',
  'from-pink-50 via-pink-100 to-pink-200',
  'from-yellow-50 via-yellow-100 to-yellow-200',
  'from-indigo-50 via-indigo-100 to-indigo-200',
  'from-teal-50 via-teal-100 to-teal-200',
  'from-purple-100 via-pink-100 to-pink-200',
];

const fadeClass = 'transition-opacity duration-500';

// 新增：根据内容动态缩放文字的hook
function useAutoFontSize(containerRef: React.RefObject<HTMLDivElement>, minFont = 12, maxFont = 40) {
  const [fontSize, setFontSize] = useState(maxFont);
  const [container] = useState<HTMLDivElement | null>(null);
  const [fits, setFits] = useState(false);

  React.useLayoutEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let currentFont = maxFont;
    while (currentFont > minFont) {
      container.style.fontSize = `${currentFont}px`;
      if (container.scrollHeight <= container.offsetHeight && container.scrollWidth <= container.offsetWidth) {
        setFits(true);
        break;
      }
      currentFont -= 1;
    }
    setFontSize(currentFont);
  }, [containerRef, minFont, maxFont]);

  return { fontSize, fits };
}

function Section({ section }: { section: any }) {
  if (section.type === 'text') {
    return (
      <div
        className={`mb-2 ${
          section.emphasis ? 'font-bold' : ''
        } ${section.small ? 'text-gray-500 text-base' : 'text-xl'} ${
          section.align === 'center'
            ? 'text-center'
            : section.align === 'right'
            ? 'text-right'
            : ''
        }`}
      >
        {section.content}
      </div>
    );
  }
  if (section.type === 'list') {
    return (
      <ul className="list-disc pl-6 mb-2">
        {(section.content as string[]).map((item, idx) => (
          <li key={idx} className="text-lg leading-relaxed">{item}</li>
        ))}
      </ul>
    );
  }
  if (section.type === 'quote') {
    return (
      <blockquote
        className={`italic border-l-4 border-blue-300 pl-4 my-2 ${
          section.align === 'center'
            ? 'text-center'
            : section.align === 'right'
            ? 'text-right'
            : ''
        }`}
      >
        {section.content}
      </blockquote>
    );
  }
  if (section.type === 'link') {
    return (
      <a
        href={section.content as string}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline break-all hover:text-blue-800"
      >
        {section.content}
      </a>
    );
  }
  return null;
}

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const slides = lang === 'zh' ? slides_zh : slides_en;
  const slide = slides[current];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      {/* 语言切换按钮 */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          className={`px-4 py-2 rounded-lg font-bold transition ${lang === 'zh' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-200'}`}
          onClick={() => setLang('zh')}
          disabled={lang === 'zh'}
        >中文</button>
        <button
          className={`px-4 py-2 rounded-lg font-bold transition ${lang === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-200'}`}
          onClick={() => setLang('en')}
          disabled={lang === 'en'}
        >EN</button>
      </div>
      {/* 幻灯片画布 */}
      <div
        className={`relative flex flex-col justify-between items-center rounded-3xl shadow-2xl ${slideBg[current % slideBg.length]} w-full max-w-[98vw] md:w-[1300px]`}
        style={{ height: 'min(780px, 90vh)', minHeight: '400px', padding: '56px 16px', boxSizing: 'border-box' }}
      >
        {/* 幻灯片内容区 */}
        <div className={
          current === 0
            ? "w-full h-full flex flex-col justify-start items-center pt-4 md:pt-8 pb-10 md:pb-16 gap-4 md:gap-10"
            : "w-full h-full flex flex-col justify-center items-center pt-10 pb-10 md:pt-16 md:pb-16 gap-4 md:gap-10"
        }>
          {/* 第10页主标题和副标题合并为一行 */}
          {current === 9 && slide.title && slide.sections && slide.sections[0] && slide.sections[0].type === 'text' && slide.sections[1] && slide.sections[1].type === 'text' ? (
            <div className="text-3xl md:text-5xl font-extrabold text-center mb-4 md:mb-8 tracking-tight leading-tight px-2 md:px-8">
              {slide.title} {slide.sections[0].content}
            </div>
          ) : (
            // 主标题
            slide.title && (Array.isArray(slide.title)
              ? slide.title.map((t, i) => (
                  <h1 key={i} className={
                    `text-2xl md:text-5xl font-extrabold text-center tracking-tight leading-tight px-2 md:px-8 ` +
                    (current === 3 && i === 0 ? 'mb-0' : (current === 5 && i === 0 ? 'mb-0' : 'mb-4 md:mb-8'))
                  }>{t}</h1>
                ))
              : <h1 className={
                  `text-2xl md:text-5xl font-extrabold text-center tracking-tight leading-tight px-2 md:px-8 ` +
                  (current === 3 ? 'mb-0' : (current === 5 ? 'mb-0' : 'mb-4 md:mb-8'))
                }>{slide.title}</h1>)
          )}
          {/* 第10页跳过副标题 */}
          {!(current === 9 && slide.sections && slide.sections[0] && slide.sections[0].type === 'text' && slide.sections[1] && slide.sections[1].type === 'text') && slide.subtitle && <div className="text-xl md:text-3xl font-bold text-blue-800 text-center mb-4 px-2 md:px-8">{slide.subtitle}</div>}
          {/* 内容区，特殊处理第10页学生作品缩略图放大 */}
          {slide.sections && slide.sections.map((section, idx) => {
            if (current === 9 && section.type === 'custom' && section.content === 'student-works') {
              return (
                <div key={idx} className="w-full flex flex-col md:flex-row justify-center items-center gap-8 my-6">
                  {/* Peter 缩略图 */}
                  <a
                    href="https://mytraqr.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center w-full md:w-1/2 cursor-pointer select-none"
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}mytraqr.png`}
                      alt="mytraqr demo"
                      className="w-96 h-64 object-cover rounded-2xl shadow-[0_8px_32px_rgba(0,60,255,0.18),0_1.5px_8px_rgba(0,0,0,0.10)] border-4 border-white ring-4 ring-blue-200 group-hover:scale-105 group-hover:shadow-[0_16px_48px_rgba(0,60,255,0.28),0_3px_16px_rgba(0,0,0,0.18)] group-hover:ring-blue-400 transition-all duration-300 mb-2" />
                    <div className="text-lg text-gray-700 font-semibold group-hover:text-blue-700">
                      {lang === 'zh' ? 'Peter的网站：AI分析高尔夫成绩' : "Peter's site: AI Golf Analysis"}
                    </div>
                    <div className="text-blue-600 underline hover:text-blue-800 text-base mt-1">mytraqr.com</div>
                  </a>
                  {/* Ivan 缩略图 */}
                  <a
                    href="https://aloft.gift"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center w-full md:w-1/2 cursor-pointer select-none"
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}aloft.png`}
                      alt="aloft demo"
                      className="w-96 h-64 object-cover rounded-2xl shadow-[0_8px_32px_rgba(0,60,255,0.18),0_1.5px_8px_rgba(0,0,0,0.10)] border-4 border-white ring-4 ring-blue-200 group-hover:scale-105 group-hover:shadow-[0_16px_48px_rgba(0,60,255,0.28),0_3px_16px_rgba(0,0,0,0.18)] group-hover:ring-blue-400 transition-all duration-300 mb-2" />
                    <div className="text-lg text-gray-700 font-semibold group-hover:text-blue-700">
                      {lang === 'zh' ? 'Ivan的网站：AI推荐礼物选择' : "Ivan's site: AI Gift Recommendation"}
                    </div>
                    <div className="text-blue-600 underline hover:text-blue-800 text-base mt-1">aloft.gift</div>
                  </a>
                </div>
              );
            }
            // 第7页学生题目合并为一行
            if (current === 6 && section.type === 'text' && /（.*?）/.test(String(section.content))) {
              const match = String(section.content).match(/^(.*?)（(.*?)）：$/);
              if (match && slide.sections[idx + 1] && slide.sections[idx + 1].type === 'text') {
                return (
                  <div key={idx} className="mb-2 text-xl md:text-2xl text-gray-800">
                    <span className="font-bold">{match[1]}（{match[2]}）：</span>
                    {slide.sections[idx + 1].content}
                  </div>
                );
              }
            }
            // 跳过已合并的题目内容
            if (current === 6 && idx > 0 && slide.sections[idx - 1] && slide.sections[idx - 1].type === 'text' && /（.*?）：$/.test(String(slide.sections[idx - 1].content))) {
              return null;
            }
            // 第7页Jevon题目选项横向一行显示，用｜分隔
            if (current === 6 && section.type === 'list' && idx > 0 && slide.sections[idx - 1] && slide.sections[idx - 1].type === 'text' && String(slide.sections[idx - 1].content).includes('Jevon')) {
              return (
                <div key={idx} className="mb-2 text-lg md:text-xl text-gray-800 pl-8">
                  <span>{(section.content as string[]).join(' ｜ ')}</span>
                </div>
              );
            }
            if (current === 1 && section.type === 'quote') {
              const askLabel = lang === 'zh' ? 'Peter提问：' : 'Peter asks:';
              return (
                <div key={idx} className="flex items-baseline justify-center w-full mb-2">
                  <span className="text-lg md:text-xl font-bold text-gray-500 mr-2">{askLabel}</span>
                  <Section section={section} />
                </div>
              );
            }
            // 第8页副标题（→开头）紧贴主标题，去除margin，字体更小更淡
            if (current === 7 && section.type === 'text' && String(section.content).trim().startsWith('→')) {
              return (
                <div key={idx} className="m-0 text-sm md:text-base text-gray-400 text-center leading-tight" style={{lineHeight: 1.1}}>{section.content}</div>
              );
            }
            return (current === 3 && idx === 0 && section.type === 'quote') ? null : <Section key={idx} section={section} />;
          })}
        </div>
        {/* 页脚 */}
        {slide.footer && <div className="absolute left-0 right-0 bottom-0 mb-6 md:mb-8 text-base md:text-2xl text-gray-500 text-center px-2 md:px-8">{slide.footer}</div>}
        {/* 控制按钮放到画布右下角 */}
        <div className="absolute right-4 bottom-4 flex items-center gap-3">
          <button
            onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
            disabled={current === 0}
            className="p-2 rounded-full bg-gray-200 hover:bg-blue-200 transition disabled:opacity-40"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="text-gray-500 text-base font-medium">
            {current + 1} / {slides.length}
          </span>
          <button
            onClick={() => setCurrent((prev) => Math.min(prev + 1, slides.length - 1))}
            disabled={current === slides.length - 1}
            className="p-2 rounded-full bg-gray-200 hover:bg-blue-200 transition disabled:opacity-40"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}