import React, { useState, useRef } from 'react';
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
  const [mobileThumbIdx, setMobileThumbIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);
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
        style={{
          height: 'min(780px, 90vh)',
          minHeight: '400px',
          padding: '56px 16px',
          boxSizing: 'border-box',
        }}
      >
        {/* 移动端专属样式 */}
        <style>{`
          @media (max-width: 430px) {
            .mobile-slide {
              max-width: 100vw !important;
              width: 100vw !important;
              min-width: 0 !important;
              height: 100dvh !important;
              min-height: 0 !important;
              border-radius: 0.75rem !important;
              padding: 6px 1vw 10px 1vw !important;
              box-shadow: 0 2px 12px 0 rgba(0,60,255,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.10) !important;
            }
            .mobile-slide h1, .mobile-slide .text-3xl, .mobile-slide .text-5xl {
              font-size: 0.95rem !important;
              margin-bottom: 0.18rem !important;
              margin-top: 0.08rem !important;
              line-height: 1.1 !important;
            }
            .mobile-slide .text-xl, .mobile-slide .text-2xl, .mobile-slide .text-3xl, .mobile-slide .text-5xl {
              font-size: 0.85rem !important;
            }
            .mobile-slide .text-base, .mobile-slide .text-lg {
              font-size: 0.8rem !important;
            }
            .mobile-slide .w-96 {
              width: 90vw !important;
              max-width: 340px !important;
            }
            .mobile-slide .h-64 {
              height: 16vw !important;
              max-height: 60px !important;
            }
            .mobile-slide .object-cover {
              object-fit: contain !important;
            }
            .mobile-slide .p-2, .mobile-slide .p-4, .mobile-slide .p-6 {
              padding: 0.2rem !important;
            }
            .mobile-slide .gap-4, .mobile-slide .gap-8, .mobile-slide .gap-10 {
              gap: 0.18rem !important;
            }
            .mobile-slide .mb-4, .mobile-slide .mb-8 {
              margin-bottom: 0.18rem !important;
            }
            .mobile-slide .first-page-center {
              justify-content: flex-start !important;
              padding-top: calc(25vh + 30px) !important;
              padding-bottom: 0 !important;
            }
          }
        `}</style>
        <div className="mobile-slide w-full h-full flex flex-col justify-between items-center">
          {/* 幻灯片内容区 */}
          <div className={
            current === 0
              ? "w-full h-full flex flex-col items-center pt-4 md:pt-8 pb-10 md:pb-16 gap-4 md:gap-10 first-page-center"
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
                // 移动端轮播数据
                const thumbs = [
                  {
                    img: `${import.meta.env.BASE_URL}mytraqr.png`,
                    title: lang === 'zh' ? 'Peter的网站：AI分析高尔夫成绩' : "Peter's site: AI Golf Analysis",
                    url: 'https://mytraqr.com',
                    urlText: 'mytraqr.com',
                  },
                  {
                    img: `${import.meta.env.BASE_URL}aloft.png`,
                    title: lang === 'zh' ? 'Ivan的网站：AI推荐礼物选择' : "Ivan's site: AI Gift Recommendation",
                    url: 'https://aloft.gift',
                    urlText: 'aloft.gift',
                  },
                ];
                    return (
                  <div key={idx}
                    className="w-full flex flex-col md:flex-row justify-center items-center gap-8 my-6"
                  >
                    {/* 移动端轮播缩略图 */}
                    <div className="block md:hidden w-full flex flex-col items-center">
                      <div
                        className="w-full flex flex-col items-center"
                        style={{ touchAction: 'pan-x' }}
                        onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
                        onTouchEnd={e => {
                          if (touchStartX.current !== null) {
                            const dx = e.changedTouches[0].clientX - touchStartX.current;
                            if (dx > 40 && mobileThumbIdx > 0) setMobileThumbIdx(mobileThumbIdx - 1);
                            if (dx < -40 && mobileThumbIdx < thumbs.length - 1) setMobileThumbIdx(mobileThumbIdx + 1);
                            touchStartX.current = null;
                          }
                        }}
                      >
                        <a
                          href={thumbs[mobileThumbIdx].url}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center w-[80vw] max-w-[320px] min-w-[220px] cursor-pointer select-none"
                        >
                          <img
                            src={thumbs[mobileThumbIdx].img}
                            alt={thumbs[mobileThumbIdx].title}
                            className="w-[80vw] h-[29vw] max-w-[320px] max-h-[234px] min-w-[220px] min-h-[62px] object-cover rounded-2xl shadow-[0_8px_32px_rgba(0,60,255,0.18),0_1.5px_8px_rgba(0,0,0,0.10)] border-4 border-white ring-4 ring-blue-200 group-hover:scale-105 group-hover:shadow-[0_16px_48px_rgba(0,60,255,0.28),0_3px_16px_rgba(0,0,0,0.18)] group-hover:ring-blue-400 transition-all duration-300 mb-2" />
                          <div className="text-base text-gray-700 font-semibold group-hover:text-blue-700">
                            {thumbs[mobileThumbIdx].title}
                          </div>
                          <div className="text-blue-600 underline hover:text-blue-800 text-sm mt-1">{thumbs[mobileThumbIdx].urlText}</div>
                        </a>
                        {/* 小圆点指示器 */}
                        <div className="flex flex-row justify-center items-center gap-3 mt-3">
                          {thumbs.map((_, i) => (
                            <button
                              key={i}
                              className={`w-4 h-4 rounded-full border-2 border-blue-400 ${mobileThumbIdx === i ? 'bg-blue-500' : 'bg-white'} transition-all`}
                              style={{ outline: 'none' }}
                              onClick={() => setMobileThumbIdx(i)}
                              aria-label={`切换到第${i + 1}个作品`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* PC端原有布局 */}
                    <div className="hidden md:flex flex-row justify-center items-center gap-8 w-full">
                      <a
                        href="https://mytraqr.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center w-96 cursor-pointer select-none"
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
                      <a
                        href="https://aloft.gift"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center w-96 cursor-pointer select-none"
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
    </div>
  );
}