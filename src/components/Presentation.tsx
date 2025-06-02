import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slides } from '../data/slides';
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
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let currentFont = maxFont;
    let fits = false;
    const test = () => {
      if (!container) return false;
      return container.scrollHeight <= container.offsetHeight && container.scrollWidth <= container.offsetWidth;
    };
    while (currentFont > minFont) {
      container.style.fontSize = `${currentFont}px`;
      if (test()) {
        fits = true;
        break;
      }
      currentFont -= 1;
    }
    setFontSize(currentFont);
  }, [containerRef, minFont, maxFont]);
  return fontSize;
}

function Section({ section }: { section: SlideSection }) {
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      {/* 幻灯片画布 */}
      <div
        className={`relative flex flex-col justify-between items-center rounded-3xl shadow-2xl ${slideBg[current % slideBg.length]}`}
        style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT, padding: '56px 72px' }}
      >
        {/* 幻灯片内容区 */}
        <div className="w-full h-full flex flex-col justify-between overflow-hidden">
          {current === 0 && (
            <div className="flex flex-col h-full justify-center items-center py-10 gap-10">
              <h1 className="text-6xl font-extrabold text-center mb-8 tracking-tight leading-tight">Google的三大AI基石 及 青少年AI教育实验</h1>
              <div className="text-4xl font-extrabold text-blue-800 text-center mb-8">分享者：周品</div>
              <div className="text-2xl text-gray-700 text-center space-y-4 mb-8">
                <div>蜜蜂时代/第二大脑 创始人</div>
                <div>趣玩网 创始人</div>
                <div>曾任百度公司/猎豹移动 管理层</div>
                <div>8年AI相关经验，全球第一批GPT时代创业者</div>
              </div>
              <div className="flex-1" />
              <div className="text-2xl text-gray-500 text-center mt-8">时间：2025年5月27日</div>
            </div>
          )}
          {current === 1 && (
            <div className="flex flex-col h-full justify-center items-center py-10 gap-10">
              <h1 className="text-5xl font-extrabold text-center mb-8 tracking-tight leading-tight">从底座看向未来</h1>
              <div className="w-full max-w-4xl mx-auto space-y-8">
                <p className="text-3xl text-gray-800 font-semibold text-center">今天我们聊AI，不讲ChatGPT，也不谈英伟达</p>
                <p className="text-2xl text-gray-700 text-center">整个AI世界的进步，皆因Google研究团队2017年发表了Transformer模型论文</p>
                <p className="text-2xl text-gray-700 text-center">如同爱因斯坦提出E=MC²，ChatGPT则是把原子弹造出来的奥本海默</p>
                <p className="text-2xl text-gray-700 text-center">Google = 互联网+硬件+软件巨人，工程上具备全部与OpenAI对抗的实力</p>
                <div className="mt-10">
                  <div className="text-xl text-gray-500 font-light text-left mb-2">Peter的提问：</div>
                  <blockquote className="italic border-l-4 border-blue-300 pl-4 text-2xl text-gray-800 bg-blue-50/60 rounded-md">“Google这么牛，为什么没抢先做出比ChatGPT更好的产品？”</blockquote>
                </div>
              </div>
            </div>
          )}
          {current === 2 && (
            <div className="flex flex-col h-full justify-center items-center py-10 gap-10">
              <h1 className="text-4xl font-extrabold text-green-800 text-center mb-3 tracking-tight leading-tight">Google三大AI基石之一：AlphaGo (2016)</h1>
              <h2 className="text-xl font-bold text-green-700 text-center mb-4">第一次展示AI'自主学习'能力</h2>
              <div className="space-y-6 w-full max-w-2xl mx-auto">
                <p className="text-2xl text-gray-800 text-center font-semibold">战胜李世石和柯洁的历史时刻</p>
                <p className="text-center">
                  <a href="https://www.youtube.com/watch?v=fGmUbdJfm0k" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 text-2xl">观看视频</a>
                </p>
                <div className="mt-2">
                  <div className="text-xl font-bold text-green-700 mb-1">为什么从围棋开始？</div>
                  <ul className="list-disc pl-8 text-gray-700 text-2xl space-y-1">
                    <li>围棋复杂度比国际象棋高10⁴³倍</li>
                    <li>可能走法10¹⁷⁰比宇宙原子数还多90个数量级</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <div className="text-xl font-bold text-green-700 mb-1">AlphaGo如何做到？</div>
                  <ul className="list-disc pl-8 text-gray-700 text-2xl space-y-1">
                    <li>不是靠编程告诉每一步怎么走</li>
                    <li>通过深度学习，看了几千万局围棋比赛自己学会</li>
                  </ul>
                </div>
                <div className="text-center text-gray-500 text-2xl font-light mt-4">就像教孩子骑自行车——让他多练习找到平衡感</div>
              </div>
            </div>
          )}
          {current === 3 && (
            <div className="flex flex-col h-full justify-center items-center py-10 gap-10">
              <h1 className="text-4xl font-extrabold text-purple-800 text-center mb-3 tracking-tight leading-tight">Google三大AI基石之二：Transformer (2017)</h1>
              <div className="text-2xl font-bold text-purple-700 text-center italic mb-4">“注意力就是你所需要的一切”</div>
              <div className="space-y-6 w-full max-w-2xl mx-auto">
                <div>
                  <div className="text-xl font-bold text-purple-700 mb-1">理解Transformer技术原理：</div>
                  <a href="https://www.youtube.com/watch?v=xTj7D6OCLjI" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 text-2xl">观看视频</a>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-700 mb-1">为什么物理学奖颁给计算机科学家：</div>
                  <a href="https://www.youtube.com/watch?v=s4Z8ToalawY" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 text-2xl">观看视频</a>
                </div>
                <p className="text-2xl text-gray-800 text-center font-semibold mt-2 whitespace-nowrap">如果说AlphaGo让AI会'学习'，Transformer让AI学会了'理解语言'</p>
                <div className="mt-2">
                  <div className="text-xl font-bold text-purple-700 mb-1">注意力机制的革命性影响：</div>
                  <ul className="list-disc pl-8 text-gray-700 text-2xl space-y-1">
                    <li>从一个字一个字读写，变成一页一页大面积读写</li>
                    <li>理解句子中哪些词最重要，词与词之间的关系</li>
                  </ul>
                </div>
                <div className="text-center text-gray-500 text-2xl font-light mt-4">实际应用：ChatGPT、Gemini、DeepSeek底层都基于Transformer</div>
              </div>
            </div>
          )}
          {current === 4 && (
            <div className="flex flex-col h-full justify-center items-center py-10 gap-10">
              <h1 className="text-4xl font-extrabold text-orange-800 text-center mb-3 tracking-tight leading-tight">Google三大AI基石之三：AlphaFold2 (2021)</h1>
              <h2 className="text-xl font-bold text-orange-700 text-center mb-4">AI科学家获得诺贝尔生物学奖</h2>
              <div className="space-y-6 w-full max-w-2xl mx-auto">
                <div>
                  <div className="text-xl font-bold text-orange-700 mb-1">为什么生物学奖颁给计算机科学家Demis Hassabis：</div>
                  <a href="https://zhuanlan.zhihu.com/p/2819747204" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 text-2xl">相关文章</a>
                </div>
                <div>
                  <div className="text-xl font-bold text-orange-700 mb-1">AI"入侵"生物医疗史完整解析：</div>
                  <a href="https://www.youtube.com/watch?v=2ydjTZeFcnM" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 text-2xl">观看视频</a>
                </div>
                <p className="text-2xl text-gray-800 text-center font-semibold mt-2">AlphaFold2把人类科学家效率提高了18.7万倍</p>
                <div className="mt-2">
                  <div className="text-xl font-bold text-orange-700 mb-1">突破性成果：</div>
                  <ul className="list-disc pl-8 text-gray-700 text-2xl space-y-1">
                    <li>过去半世纪：人类解析5万+蛋白质结构（17%）</li>
                    <li>2021年：AlphaFold2将比例提高到58%</li>
                    <li>今天：接近99.8%</li>
                  </ul>
                </div>
                <div className="text-center text-gray-500 text-2xl font-light mt-4">实际影响：直接加速新药研发，帮助理解疾病原理</div>
              </div>
            </div>
          )}
          {current === 5 && (
            <div className="flex flex-col h-full justify-center items-center py-10 gap-10">
              <h1 className="text-4xl font-extrabold text-pink-800 text-center mb-3 tracking-tight leading-tight">AI青少年教育实验分享</h1>
              <div className="text-xl font-bold text-pink-700 text-center mb-4">学AI要从娃娃抓起——AI激发好奇心，问题成为源动力</div>
              <div className="space-y-6 w-full max-w-2xl mx-auto">
                <div>
                  <div className="text-xl text-gray-500 font-light text-left mb-1">首先回答Peter的问题：</div>
                  <blockquote className="italic border-l-4 border-pink-300 pl-4 text-2xl text-gray-800 bg-pink-50/60 rounded-md mb-2 whitespace-nowrap">“Google这么牛，为什么没抢先做出比ChatGPT更好的产品？”</blockquote>
                </div>
                <div>
                  <div className="text-xl text-gray-500 font-light text-left mb-1">对于Peter的问题，Gemini是怎么回答的：</div>
                  <a href="https://g.co/gemini/share/73200dcfdb96" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 text-2xl">Gemini 回答链接</a>
                </div>
                <div className="mt-2">
                  <div className="text-xl font-bold text-pink-700 mb-1">实验班学生构成：</div>
                  <ul className="list-disc pl-8 text-gray-700 text-2xl space-y-1">
                    <li>Peter（14岁）：商业产品敏锐直觉</li>
                    <li>Jevon（17岁）：哲学思维深入，善于抽象思考</li>
                    <li>Yuqiao（17岁）：理科背景，系统性分析能力强</li>
                    <li>Silvia（25岁）：成年学习者，跨学科整合能力突出</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <div className="text-xl font-bold text-pink-700 mb-1">教育目标：</div>
                  <div className="text-gray-500 text-2xl font-light">不是教孩子使用AI，而是培养与AI协作思考的能力</div>
                </div>
              </div>
            </div>
          )}
          {current === 6 && (
            <div className="flex flex-col h-full justify-center items-center py-10 gap-4">
              <div className="flex flex-col items-center mb-2">
                <h1 className="text-4xl font-extrabold text-yellow-700 text-center tracking-tight leading-tight mb-2">第一次作业：设计"难倒AI"的题目</h1>
                <div className="text-2xl text-gray-500 font-light text-center mb-2">要求：有唯一答案但AI容易出错</div>
              </div>
              <div className="space-y-6 w-full max-w-2xl mx-auto mb-2">
                <div>
                  <div className="text-2xl font-bold text-yellow-700 mb-1">Jevon（逻辑悖论）：</div>
                  <div className="text-2xl text-gray-800 mb-1">四个中只有一个说真话，问是谁？</div>
                  <div className="flex flex-wrap gap-6 justify-center text-gray-700 text-2xl font-mono">
                    <span>A：B说谎</span>
                    <span>B：C说谎</span>
                    <span>C：D说谎</span>
                    <span>D：A说谎</span>
                  </div>
                </div>
                <div className="py-2">
                  <div className="text-2xl font-bold text-yellow-700 mb-1">Peter（信息干扰）：</div>
                  <div className="text-2xl text-gray-800 whitespace-nowrap">查理买了5个杯子蛋糕，鲍比吃了1个苹果。世界上剩下多少个苹果？</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-700 mb-1">Yuqiao（空间几何）：</div>
                  <div className="text-2xl text-gray-800">房子每面墙都有窗户，早晨阳光照一扇，傍晚照相邻的一扇，太阳垂直运动，中午在重心上方。房子什么形状？</div>
                </div>
                <div className="pt-2">
                  <div className="text-2xl font-bold text-yellow-700 mb-1">Silvia（认知偏见）：</div>
                  <div className="text-2xl text-gray-800">我父母是消防员和护士，护士（她）常来家长会，这次消防员来了，人们问为什么我爸从没来过。这个消防员是谁？</div>
                </div>
              </div>
            </div>
          )}
          {current === 7 && (
            <div className="flex flex-col h-full justify-center items-center py-10 gap-10">
              <h1 className="text-4xl font-extrabold text-green-800 text-center mb-3 tracking-tight leading-tight">第二次作业：构思问题，与AI对话，输出访谈文章</h1>
              <div className="text-2xl font-bold text-green-700 text-center mb-4">从对抗到协作的思维转变</div>
              <div className="space-y-8 w-full max-w-2xl mx-auto">
                <div className="text-2xl font-bold text-gray-700 mb-2">四个学生的研究主题：</div>
                <div>
                  <div className="text-2xl font-bold text-green-700 mb-1">Peter（14岁）：《Claude Web Search功能对ChatGPT的威胁分析》</div>
                  <div className="text-2xl text-gray-600 font-light mb-2">→ 展现商业敏锐度和产品思维</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700 mb-1">Jevon（17岁）：《AI对本体论的冲击》</div>
                  <div className="text-2xl text-gray-600 font-light mb-2">→ 思考AI对"存在"本质的哲学冲击</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700 mb-1">Yuqiao（17岁）：《AI音乐的平台治理问题》</div>
                  <div className="text-2xl text-gray-600 font-light mb-2">→ 分析推荐权、标注权、分账权的规则博弈</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700 mb-1">Silvia（25岁）：《拍卖行行动与AI艺术浪潮》</div>
                  <div className="text-2xl text-gray-600 font-light mb-2">→ 跨学科研究达到专业水准</div>
                </div>
              </div>
            </div>
          )}
          {current === 8 && (
            <div className="flex flex-col h-full justify-center items-center py-10 gap-10">
              <div className="flex flex-col items-center mb-2">
                <h1 className="text-4xl font-extrabold text-purple-800 text-center tracking-tight leading-tight">核心教学理念：三个转变</h1>
                <div className="text-2xl font-bold text-purple-700 text-center mt-2 mb-4">AI时代教育的新方向</div>
              </div>
              <div className="space-y-4 w-full max-w-4xl mx-auto">
                <div>
                  <div className="text-xl font-bold text-purple-700 mb-1">1. 从对抗到协作</div>
                  <ul className="list-disc pl-8 text-gray-700 text-2xl space-y-1 mb-2">
                    <li>第一次：我能难倒AI吗？（探索边界）</li>
                    <li>第二次：我能与AI共创吗？（深度协作）</li>
                  </ul>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-700 mb-1">2. 从答案到问题</div>
                  <ul className="list-disc pl-8 text-gray-700 text-2xl space-y-1 mb-2">
                    <li>传统教育：记住标准答案</li>
                    <li>AI时代：学会提出好问题</li>
                  </ul>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-700 mb-1">3. 从技能到思维</div>
                  <ul className="list-disc pl-8 text-gray-700 text-2xl space-y-1 mb-2">
                    <li>不是教孩子操作AI工具</li>
                    <li>而是培养批判性思维和创造性思考</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          {current === 9 && (
            <div className="flex flex-col h-full justify-center items-center py-10 gap-10">
              {/* 学生作品展示 */}
              <div className="w-full max-w-4xl mx-auto mb-8">
                <div className="text-2xl font-bold text-blue-700 text-center mb-6">学生们的AI网站作品：</div>
                <div className="flex flex-row gap-8 justify-center items-center mb-2 flex-wrap">
                  <div className="flex flex-col items-center">
                    <img src="/mytraqr.png" alt="mytraqr demo" className="w-96 h-56 object-cover rounded-xl shadow-md border border-gray-200 mb-2" />
                    <div className="text-lg text-gray-700 font-semibold">Peter的网站：AI分析高尔夫成绩</div>
                    <a href="https://mytraqr.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 text-base">mytraqr.com</a>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src="/aloft.png" alt="aloft demo" className="w-96 h-56 object-cover rounded-xl shadow-md border border-gray-200 mb-2" />
                    <div className="text-lg text-gray-700 font-semibold">Ivan的网站：AI推荐礼物选择</div>
                    <a href="https://aloft.gift" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 text-base">aloft.gift</a>
                  </div>
                </div>
              </div>
              {/* 第10页内容 */}
              <div className="flex flex-col items-center w-full">
                <div className="text-xl font-bold text-blue-700 text-center mb-4">Bee Alpha 高中实习营：</div>
                <a href="https://bee-alpha.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 text-lg mb-8">bee-alpha.com</a>
                <div className="flex-1" />
                <div className="mt-10 text-4xl font-extrabold text-gray-900 text-center tracking-tight flex flex-col gap-2">
                  <span>用AI激发好奇心</span>
                  <span>让问题成为原动力</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* 控制按钮放到画布右下角 */}
        <div className="absolute right-8 bottom-8 flex items-center gap-3">
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