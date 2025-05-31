import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slides } from '../data/slides';

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

  const currentSlideData = slides[currentSlide];

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-10 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      {/* 幻灯片容器 */}
      <div 
        className={`w-full max-w-4xl mx-auto rounded-3xl shadow-2xl overflow-hidden relative backdrop-blur-md bg-white/10 border border-white/10 ${currentSlideData.background}`}
        style={{minHeight: "600px"}}
      >
        {/* 幻灯片内容 */}
        <div className="px-12 py-10 h-full flex flex-col text-white">
          {currentSlideData.isTitle ? (
            // 封面页特殊布局
            <div className="h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-5xl font-extrabold mb-10 text-white leading-tight max-w-4xl drop-shadow-lg">
                {currentSlideData.title}
              </h1>
              <div className="space-y-6 max-w-2xl">
                {currentSlideData.content.map((item, index) => {
                  if (item === "") return <div key={index} className="h-6"></div>;
                  if (item.startsWith("LINK:")) {
                    const url = item.substring(5);
                    return (
                      <p key={index} className="text-2xl text-center">
                        <a 
                          href={`https://${url}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-300 hover:text-blue-100 underline font-medium hover:bg-blue-900/20 px-2 py-1 rounded transition-colors"
                        >
                          {url}
                        </a>
                      </p>
                    );
                  }
                  if (item.startsWith("\"") && item.endsWith("\"")) {
                    return (
                      <p key={index} className="text-2xl font-semibold text-blue-200 italic">
                        {item}
                      </p>
                    );
                  }
                  if (item === "分享者：周品") {
                    return (
                      <p key={index} className="text-5xl font-extrabold text-blue-100 mb-6 drop-shadow-lg">
                        {item}
                      </p>
                    );
                  }
                  if (item === "用AI激发好奇心" || item === "让问题成为原动力") {
                    return (
                      <p key={index} className="text-5xl font-extrabold text-purple-200 text-center drop-shadow-lg">
                        {item}
                      </p>
                    );
                  }
                  if (item === "Bee Alpha 实习营：") {
                    return (
                      <p key={index} className="text-2xl font-semibold text-gray-200 text-center">
                        {item}
                      </p>
                    );
                  }
                  if (item === "谢谢大家！") {
                    return (
                      <p key={index} className="text-3xl font-semibold text-gray-200 text-center">
                        {item}
                      </p>
                    );
                  }
                  if (item.includes("时间：")) {
                    return (
                      <p key={index} className="text-lg text-gray-300 mt-8">
                        {item}
                      </p>
                    );
                  }
                  return (
                    <p key={index} className="text-2xl text-gray-100 font-medium">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          ) : (
            // 普通页面布局
            <>
              <h1 className="text-4xl font-extrabold mb-6 text-center text-white drop-shadow-lg">{currentSlideData.title}</h1>
              {currentSlideData.subtitle && (
                <h2 className="text-2xl font-semibold mb-8 text-center text-blue-200 drop-shadow">{currentSlideData.subtitle}</h2>
              )}
              <div className="flex-grow">
                {Array.isArray(currentSlideData.content) ? (
                  <div className="space-y-4">
                    {currentSlideData.content.map((item, index) => {
                      // 处理链接
                      if (item.startsWith("LINK:")) {
                        const url = item.substring(5);
                        return (
                          <p key={index} className="text-xl">
                            <a 
                              href={url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-300 hover:text-blue-100 underline font-medium hover:bg-blue-900/20 px-2 py-1 rounded transition-colors"
                            >
                              {url}
                            </a>
                          </p>
                        );
                      }
                      return (
                        <p key={index} className={`$ {item === "" ? "h-3" : ""} $ {
                          item.startsWith("\"") && item.endsWith("\"") 
                          ? "font-semibold text-2xl mt-4 text-blue-200 italic text-center" 
                          : item.startsWith("***") && item.endsWith("***")
                          ? "font-bold text-2xl mt-6 text-blue-100 text-center"
                          : item.startsWith("•") 
                            ? "text-xl ml-4" 
                            : item.startsWith("→")
                              ? "text-lg ml-6 text-blue-200 italic"
                              : item.includes("：") && !item.startsWith("•")
                                ? "font-semibold text-xl mt-3 text-blue-200"
                                : item === "战胜李世石和柯洁的历史时刻" ||
                                  item === "为什么从围棋开始？" ||
                                  item === "AlphaGo如何做到？" ||
                                  item === "就像教孩子骑自行车——让他多练习找到平衡感"
                                  ? "text-xl font-bold"
                                  : "text-xl text-gray-100"
                        }`}>
                          {item}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xl text-gray-100">{currentSlideData.content}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {/* 控制按钮 */}
      <div className="flex justify-between w-full max-w-4xl mx-auto mt-8">
        <button 
          onClick={prevSlide} 
          disabled={currentSlide === 0}
          className={`p-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all duration-200 ${currentSlide === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <ChevronLeft size={32} />
        </button>
        <div className="text-lg text-white self-center font-medium tracking-widest">
          {currentSlide + 1} / {slides.length}
        </div>
        <button 
          onClick={nextSlide} 
          disabled={currentSlide === slides.length - 1}
          className={`p-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all duration-200 ${currentSlide === slides.length - 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default Presentation;