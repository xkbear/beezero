import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slides } from '../data/slides';
import type { Slide } from '../data/slides';

const SLIDE_HEIGHT = 750; // 画布高度更大

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentSlideData: Slide = slides[currentSlide];

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-10 bg-gradient-to-br from-[#f5f6fa] via-[#e5e9f2] to-[#d1d8e6]">
      {/* 幻灯片容器 */}
      <div 
        className={`w-full max-w-5xl mx-auto rounded-3xl shadow-2xl overflow-hidden relative backdrop-blur-md border border-white/20 bg-gradient-to-br from-white/80 via-[#f0f4fa]/80 to-[#e3e8f0]/80 flex flex-col justify-center`}
        style={{ minHeight: `${SLIDE_HEIGHT}px`, height: `${SLIDE_HEIGHT}px` }}
      >
        {/* 幻灯片内容 */}
        <div className="px-20 py-14 h-full flex flex-col text-gray-900 justify-center" style={{height: '100%'}}>
          {currentSlideData.isTitle ? (
            // 封面页特殊布局
            <div className="h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-5xl font-extrabold mb-10 text-gray-900 leading-tight max-w-4xl tracking-tight">
                {currentSlideData.title}
              </h1>
              <div className="space-y-6 max-w-2xl flex-1 flex flex-col justify-center">
                {currentSlideData.content.map((item: string, index: number) => {
                  if (item === "") return <div key={index} className="h-6"></div>;
                  if (item.startsWith("LINK:")) {
                    const url = item.substring(5);
                    return (
                      <p key={index} className="text-2xl text-center">
                        <a 
                          href={`https://${url}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 underline font-medium hover:bg-blue-100/40 px-2 py-1 rounded transition-colors"
                        >
                          {url}
                        </a>
                      </p>
                    );
                  }
                  if (item.startsWith("\"") && item.endsWith("\"")) {
                    return (
                      <p key={index} className="text-2xl font-semibold text-blue-700 italic">
                        {item}
                      </p>
                    );
                  }
                  if (item === "分享者：周品") {
                    return (
                      <p key={index} className="text-5xl font-extrabold text-blue-700 mb-6">
                        {item}
                      </p>
                    );
                  }
                  if (item === "用AI激发好奇心" || item === "让问题成为原动力") {
                    return (
                      <p key={index} className="text-5xl font-extrabold text-purple-700 text-center">
                        {item}
                      </p>
                    );
                  }
                  if (item === "Bee Alpha 实习营：") {
                    return (
                      <p key={index} className="text-2xl font-semibold text-gray-700 text-center">
                        {item}
                      </p>
                    );
                  }
                  if (item === "谢谢大家！") {
                    return (
                      <p key={index} className="text-3xl font-semibold text-gray-700 text-center">
                        {item}
                      </p>
                    );
                  }
                  if (item.includes("时间：")) {
                    return (
                      <p key={index} className="text-lg text-gray-500 mt-8">
                        {item}
                      </p>
                    );
                  }
                  return (
                    <p key={index} className="text-2xl text-gray-800 font-medium">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          ) : (
            // 普通页面布局
            <div className="h-full flex flex-col justify-center">
              <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900 tracking-tight leading-tight">
                {currentSlideData.title}
              </h1>
              {currentSlideData.subtitle && (
                <h2 className="text-2xl font-semibold mb-8 text-center text-blue-700 tracking-wide">
                  {currentSlideData.subtitle}
                </h2>
              )}
              <div className="flex-grow flex flex-col justify-center">
                {Array.isArray(currentSlideData.content) ? (
                  <div className="space-y-4 flex-1 flex flex-col justify-center">
                    {currentSlideData.content.map((item: string, index: number) => {
                      // 处理链接
                      if (item.startsWith("LINK:")) {
                        const url = item.substring(5);
                        return (
                          <p key={index} className="text-xl">
                            <a 
                              href={url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-700 underline font-medium hover:bg-blue-100/40 px-2 py-1 rounded transition-colors"
                            >
                              {url}
                            </a>
                          </p>
                        );
                      }
                      return (
                        <p key={index} className={`$ {item === "" ? "h-3" : ""} $ {
                          item.startsWith("\"") && item.endsWith("\"") 
                          ? "font-semibold text-2xl mt-4 text-blue-700 italic text-center" 
                          : item.startsWith("***") && item.endsWith("***")
                          ? "font-bold text-2xl mt-6 text-blue-700 text-center"
                          : item.startsWith("•") 
                            ? "text-xl ml-4" 
                            : item.startsWith("→")
                              ? "text-lg ml-6 text-blue-700 italic"
                              : item.includes("：") && !item.startsWith("•")
                                ? "font-semibold text-xl mt-3 text-blue-700"
                                : item === "战胜李世石和柯洁的历史时刻" ||
                                  item === "为什么从围棋开始？" ||
                                  item === "AlphaGo如何做到？" ||
                                  item === "就像教孩子骑自行车——让他多练习找到平衡感"
                                  ? "text-xl font-bold"
                                  : "text-xl text-gray-800"
                        }`}>
                          {item}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xl text-gray-800">{currentSlideData.content}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* 控制按钮 */}
      <div className="flex justify-between w-full max-w-4xl mx-auto mt-8">
        <button 
          onClick={prevSlide} 
          disabled={currentSlide === 0}
          className={`p-3 rounded-full border border-gray-300 bg-white/70 hover:bg-blue-100 text-gray-700 transition-all duration-200 ${currentSlide === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <ChevronLeft size={32} />
        </button>
        <div className="text-lg text-gray-700 self-center font-medium tracking-widest">
          {currentSlide + 1} / {slides.length}
        </div>
        <button 
          onClick={nextSlide} 
          disabled={currentSlide === slides.length - 1}
          className={`p-3 rounded-full border border-gray-300 bg-white/70 hover:bg-blue-100 text-gray-700 transition-all duration-200 ${currentSlide === slides.length - 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default Presentation;