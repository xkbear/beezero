export interface SlideSection {
  type: 'text' | 'list' | 'quote' | 'link';
  content: string | string[];
  emphasis?: boolean; // 是否加粗
  align?: 'left' | 'center' | 'right';
  small?: boolean; // 是否说明文字
}

export interface Slide {
  type: 'title' | 'content';
  bgColor: string; // tailwind 背景色
  title?: string | string[]; // 主标题可分行
  subtitle?: string;
  sections?: SlideSection[];
  footer?: string;
}

export const slides_zh = [
  // 首页
  {
    type: 'title',
    bgColor: 'bg-gradient-to-b from-yellow-100 to-white',
    title: ['Google的三大AI基石 及 青少年AI教育实验'],
    subtitle: '分享者：周品',
    sections: [
      { type: 'text', content: '蜜蜂时代/第二大脑 创始人' },
      { type: 'text', content: '趣玩网 创始人' },
      { type: 'text', content: '曾任百度公司/猎豹移动 管理层' },
      { type: 'text', content: '8年AI相关经验，全球第一批GPT时代创业者' },
    ],
    footer: '时间：2025年5月27日',
  },
  // 第二页
  {
    type: 'content',
    bgColor: 'bg-blue-50',
    title: '从底座看向未来',
    sections: [
      { type: 'text', content: '今天我们聊AI，不讲ChatGPT，也不谈英伟达', emphasis: true },
      { type: 'text', content: '整个AI世界的进步，皆因Google研究团队2017年发表了Transformer模型论文' },
      { type: 'text', content: '如同爱因斯坦提出E=MC²，ChatGPT则是把原子弹造出来的奥本海默' },
      { type: 'text', content: 'Google = 互联网+硬件+软件巨人，工程上具备全部与OpenAI对抗的实力' },
      { type: 'quote', content: 'Google这么牛，为什么没抢先做出比ChatGPT更好的产品？', align: 'right' },
    ],
  },
  // 第三页
  {
    type: 'content',
    bgColor: 'bg-green-50',
    title: 'Google三大AI基石之一：AlphaGo (2016)',
    sections: [
      { type: 'text', content: "第一次展示AI'自主学习'能力", emphasis: true },
      { type: 'text', content: '战胜李世石和柯洁的历史时刻' },
      { type: 'link', content: 'https://www.youtube.com/watch?v=fGmUbdJfm0k' },
      { type: 'text', content: '为什么从围棋开始？', emphasis: true },
      { type: 'list', content: [
        '围棋复杂度比国际象棋高10⁴³倍',
        '可能走法10¹⁷⁰比宇宙原子数还多90个数量级',
      ] },
      { type: 'text', content: 'AlphaGo如何做到？', emphasis: true },
      { type: 'list', content: [
        '不是靠编程告诉每一步怎么走',
        '通过深度学习，看了几千万局围棋比赛自己学会',
      ] },
      { type: 'text', content: '就像教孩子骑自行车——让他多练习找到平衡感', small: true },
    ],
  },
  // 第四页
  {
    type: 'content',
    bgColor: 'bg-purple-50',
    title: 'Google三大AI基石之二：Transformer (2017)',
    sections: [
      { type: 'quote', content: '“注意力就是你所需要的一切”', align: 'center' },
      { type: 'text', content: '理解Transformer技术原理：', emphasis: true },
      { type: 'link', content: 'https://www.youtube.com/watch?v=xTj7D6OCLjI' },
      { type: 'text', content: '为什么物理学奖颁给计算机科学家：', emphasis: true },
      { type: 'link', content: 'https://www.youtube.com/watch?v=s4Z8ToalawY' },
      { type: 'text', content: "如果说AlphaGo让AI会'学习'，Transformer让AI学会了'理解语言'" },
      { type: 'text', content: '注意力机制的革命性影响：', emphasis: true },
      { type: 'list', content: [
        '从一个字一个字读写，变成一页一页大面积读写',
        '理解句子中哪些词最重要，词与词之间的关系',
      ] },
      { type: 'text', content: '实际应用：ChatGPT、Gemini、DeepSeek底层都基于Transformer', small: true },
    ],
  },
  // 第五页
  {
    type: 'content',
    bgColor: 'bg-orange-50',
    title: 'Google三大AI基石之三：AlphaFold2 (2021)',
    sections: [
      { type: 'text', content: 'AI科学家获得诺贝尔生物学奖', emphasis: true },
      { type: 'text', content: '为什么生物学奖颁给计算机科学家Demis Hassabis：' },
      { type: 'link', content: 'https://zhuanlan.zhihu.com/p/2819747204' },
      { type: 'text', content: 'AlphaFold2把人类科学家效率提高了18.7万倍', emphasis: true },
      { type: 'text', content: '突破性成果：', emphasis: true },
      { type: 'list', content: [
        '过去半世纪：人类解析5万+蛋白质结构（17%）',
        '2021年：AlphaFold2将比例提高到58%',
        '今天：接近99.8%',
      ] },
      { type: 'text', content: '实际影响：直接加速新药研发，帮助理解疾病原理', small: true },
    ],
  },
  // 第六页
  {
    type: 'content',
    bgColor: 'bg-pink-50',
    title: 'AI青少年教育实验分享',
    sections: [
      { type: 'text', content: '学AI要从娃娃抓起——AI激发好奇心，问题成为源动力', emphasis: true },
      { type: 'quote', content: 'Google这么牛，为什么没抢先做出比ChatGPT更好的产品？', align: 'right' },
      { type: 'text', content: '对于Peter的问题，Gemini是怎么回答的：' },
      { type: 'link', content: 'https://g.co/gemini/share/73200dcfdb96' },
      { type: 'text', content: '实验班学生构成：', emphasis: true },
      { type: 'list', content: [
        'Peter（14岁）：商业产品敏锐直觉',
        'Jevon（17岁）：哲学思维深入，善于抽象思考',
        'Yuqiao（17岁）：理科背景，系统性分析能力强',
        'Silvia（25岁）：成年学习者，跨学科整合能力突出',
      ] },
      { type: 'text', content: '教育目标：', emphasis: true },
      { type: 'text', content: '不是教孩子使用AI，而是培养与AI协作思考的能力', small: true },
    ],
  },
  // 第七页
  {
    type: 'content',
    bgColor: 'bg-yellow-50',
    title: '第一次作业：设计"难倒AI"的题目',
    sections: [
      { type: 'text', content: '要求：有唯一答案但AI容易出错', small: true },
      { type: 'text', content: 'Jevon（逻辑悖论）：四个中只有一个说真话，问是谁？  A：B说谎、B：C说谎、C：D说谎、D：A说谎', emphasis: true },
      { type: 'text', content: 'Peter（信息干扰）：查理买了5个杯子蛋糕，鲍比吃了1个苹果。世界上剩下多少个苹果？', emphasis: true },
      { type: 'text', content: 'Yuqiao（空间几何）：房子每面墙都有窗户，早晨阳光照一扇，傍晚照相邻的一扇，\n太阳垂直运动，中午在重心上方。房子什么形状？', emphasis: true },
      { type: 'text', content: 'Silvia（认知偏见）：我父母是消防员和护士，护士（她）常来家长会，这次消防员来了，\n人们问为什么我爸从没来过。这个消防员是谁？', emphasis: true },
    ],
  },
  // 第八页
  {
    type: 'content',
    bgColor: 'bg-green-100',
    title: '第二次作业：构思问题，与AI对话，输出访谈文章',
    sections: [
      { type: 'text', content: '从对抗到协作的思维转变', emphasis: true },
      { type: 'text', content: 'Peter（14岁）：《Claude Web Search功能对ChatGPT的威胁分析》', emphasis: true },
      { type: 'text', content: '→ 展现商业敏锐度和产品思维', small: true },
      { type: 'text', content: 'Jevon（17岁）：《AI对本体论的冲击》', emphasis: true },
      { type: 'text', content: '→ 思考AI对"存在"本质的哲学冲击', small: true },
      { type: 'text', content: 'Yuqiao（17岁）：《AI音乐的平台治理问题》', emphasis: true },
      { type: 'text', content: '→ 分析推荐权、标注权、分账权的规则博弈', small: true },
      { type: 'text', content: 'Silvia（25岁）：《拍卖行行动与AI艺术浪潮》', emphasis: true },
      { type: 'text', content: '→ 跨学科研究达到专业水准', small: true },
    ],
  },
  // 第九页
  {
    type: 'content',
    bgColor: 'bg-purple-100',
    title: '核心教学理念：三个转变',
    sections: [
      { type: 'text', content: 'AI时代教育的新方向', emphasis: true },
      { type: 'text', content: '1. 从对抗到协作', emphasis: true },
      { type: 'list', content: [
        '第一次：我能难倒AI吗？（探索边界）',
        '第二次：我能与AI共创吗？（深度协作）',
      ] },
      { type: 'text', content: '2. 从答案到问题', emphasis: true },
      { type: 'list', content: [
        '传统教育：记住标准答案',
        'AI时代：学会提出好问题',
      ] },
      { type: 'text', content: '3. 从技能到思维', emphasis: true },
      { type: 'list', content: [
        '不是教孩子操作AI工具',
        '而是培养批判性思维和创造性思考',
      ] },
    ],
  },
  // 第十页
  {
    type: 'content',
    bgColor: 'bg-yellow-200',
    title: '用AI激发好奇心，让问题成为源动力',
    sections: [
      { type: 'text', content: 'Bee Alpha 实习营：', emphasis: true },
      { type: 'link', content: 'https://bee-alpha.com' },
      { type: 'custom', content: 'student-works' },
      { type: 'text', content: '谢谢大家！', emphasis: true, align: 'center' },
    ],
  },
];

export const slides_en = [
  // Page 1
  {
    type: 'title',
    bgColor: 'bg-gradient-to-b from-yellow-100 to-white',
    title: ["Three AI Pillars & Youth AI Education Experiment"],
    subtitle: 'Speaker: Pin Zhou',
    sections: [
      { type: 'text', content: 'Founder of BeeBee AI' },
      { type: 'text', content: 'Founder of Quwan Ltd' },
      { type: 'text', content: 'Former management at Baidu/Cheetah Mobile' },
      { type: 'text', content: '8 years of AI experience, one of the world\'s first GPT-era entrepreneurs' },
    ],
    footer: 'Date: May 27, 2025',
  },
  // Page 2
  {
    type: 'content',
    bgColor: 'bg-blue-50',
    title: 'Looking to the Future from the Foundation',
    sections: [
      { type: 'text', content: 'Today we talk about AI, not ChatGPT, nor Nvidia', emphasis: true },
      { type: 'text', content: 'The entire progress of the AI world stems from Google\'s 2017 Transformer paper' },
      { type: 'text', content: 'Like Einstein\'s E=MC², ChatGPT is Oppenheimer building the atomic bomb' },
      { type: 'text', content: 'Google = Internet + Hardware + Software giant, fully capable of competing with OpenAI' },
      { type: 'quote', content: 'Google is so strong, why didn\'t they launch a better product than ChatGPT first?', align: 'right' },
    ],
  },
  // Page 3
  {
    type: 'content',
    bgColor: 'bg-green-50',
    title: "Google's First AI Pillar: AlphaGo (2016)",
    sections: [
      { type: 'text', content: "First demonstration of AI's 'autonomous learning' ability", emphasis: true },
      { type: 'text', content: 'The historic moment of defeating Lee Sedol and Ke Jie' },
      { type: 'link', content: 'https://www.youtube.com/watch?v=fGmUbdJfm0k' },
      { type: 'text', content: 'Why start with Go?', emphasis: true },
      { type: 'list', content: [
        'Go is 10⁴³ times more complex than chess',
        'Possible moves (10¹⁷⁰) exceed the number of atoms in the universe by 90 orders of magnitude',
      ] },
      { type: 'text', content: 'How did AlphaGo achieve this?', emphasis: true },
      { type: 'list', content: [
        'Not by programming every move',
        'Learned by deep learning from tens of millions of Go games',
      ] },
      { type: 'text', content: 'Like teaching a child to ride a bike—practice to find balance', small: true },
    ],
  },
  // Page 4
  {
    type: 'content',
    bgColor: 'bg-purple-50',
    title: "Google's Second AI Pillar: Transformer (2017)",
    sections: [
      { type: 'quote', content: '“Attention is all you need”', align: 'center' },
      { type: 'text', content: 'Understanding the principle of Transformer technology:', emphasis: true },
      { type: 'link', content: 'https://www.youtube.com/watch?v=xTj7D6OCLjI' },
      { type: 'text', content: 'Why did the Physics Nobel Prize go to a computer scientist?', emphasis: true },
      { type: 'link', content: 'https://www.youtube.com/watch?v=s4Z8ToalawY' },
      { type: 'text', content: "If AlphaGo taught AI to 'learn', Transformer taught AI to 'understand language'" },
      { type: 'text', content: 'Revolutionary impact of the attention mechanism:', emphasis: true },
      { type: 'list', content: [
        'From reading/writing one character at a time to reading/writing whole pages',
        'Understanding which words are most important and the relationships between words',
      ] },
      { type: 'text', content: 'Practical applications: ChatGPT, Gemini, DeepSeek are all based on Transformer', small: true },
    ],
  },
  // Page 5
  {
    type: 'content',
    bgColor: 'bg-orange-50',
    title: "Google's Third AI Pillar: AlphaFold2 (2021)",
    sections: [
      { type: 'text', content: 'AI scientist wins Nobel Prize in Biology', emphasis: true },
      { type: 'text', content: 'Why did the Biology Prize go to computer scientist Demis Hassabis:' },
      { type: 'link', content: 'https://zhuanlan.zhihu.com/p/2819747204' },
      { type: 'text', content: 'AlphaFold2 increased human scientist efficiency by 187,000 times', emphasis: true },
      { type: 'text', content: 'Breakthrough achievements:', emphasis: true },
      { type: 'list', content: [
        'Past half-century: humans resolved 50,000+ protein structures (17%)',
        '2021: AlphaFold2 raised the ratio to 58%',
        'Today: nearly 99.8%',
      ] },
      { type: 'text', content: 'Practical impact: directly accelerates new drug development and helps understand disease mechanisms', small: true },
    ],
  },
  // Page 6
  {
    type: 'content',
    bgColor: 'bg-pink-50',
    title: 'Youth AI Education Experiment Sharing',
    sections: [
      { type: 'text', content: 'AI education should start from a young age—AI inspires curiosity, questions become motivation', emphasis: true },
      { type: 'quote', content: 'Google is so strong, why didn\'t they launch a better product than ChatGPT first?', align: 'right' },
      { type: 'text', content: 'How did Gemini answer Peter\'s question:' },
      { type: 'link', content: 'https://g.co/gemini/share/73200dcfdb96' },
      { type: 'text', content: 'Class composition:', emphasis: true },
      { type: 'list', content: [
        'Peter (14): keen business product sense',
        'Jevon (17): deep philosophical thinking, good at abstraction',
        'Yuqiao (17): science background, strong analytical skills',
        'Silvia (25): adult learner, outstanding interdisciplinary integration',
      ] },
      { type: 'text', content: 'Educational goal:', emphasis: true },
      { type: 'text', content: 'Not to teach kids to use AI, but to cultivate the ability to think collaboratively with AI', small: true },
    ],
  },
  // Page 7
  {
    type: 'content',
    bgColor: 'bg-yellow-50',
    title: 'First Assignment: Design a Question to Stump AI',
    sections: [
      { type: 'text', content: 'Requirement: unique answer but easy for AI to get wrong', small: true },
      { type: 'text', content: 'Jevon (logic paradox): Only one of four tells the truth. Who is it?  A: B is lying, B: C is lying, C: D is lying, D: A is lying', emphasis: true },
      { type: 'text', content: 'Peter (information interference): Charlie bought 5 cupcakes, Bobby ate 1 apple. How many apples are left in the world?', emphasis: true },
      { type: 'text', content: 'Yuqiao (spatial geometry): Each wall of the house has a window. In the morning, sunlight shines on one window, in the evening on the adjacent one.\nThe sun moves vertically, at noon it is above the center. What is the shape of the house?', emphasis: true },
      { type: 'text', content: 'Silvia (cognitive bias): My parents are a firefighter and a nurse. The nurse (she) often attends parent meetings. This time the firefighter came,\npeople asked why my dad never came. Who is the firefighter?', emphasis: true },
    ],
  },
  // Page 8
  {
    type: 'content',
    bgColor: 'bg-green-100',
    title: 'Second Assignment: Design Questions, Interview AI, Write an Article',
    sections: [
      { type: 'text', content: 'Shift from confrontation to collaboration', emphasis: true },
      { type: 'text', content: 'Peter (14): "Analysis of Claude Web Search\'s Threat to ChatGPT"', emphasis: true },
      { type: 'text', content: '→ Shows business acumen and product thinking', small: true },
      { type: 'text', content: 'Jevon (17): "The Impact of AI on Ontology"', emphasis: true },
      { type: 'text', content: '→ Reflects on the philosophical impact of AI on the nature of existence', small: true },
      { type: 'text', content: 'Yuqiao (17): "Platform Governance Issues in AI Music"', emphasis: true },
      { type: 'text', content: '→ Analyzes the game of recommendation rights, labeling rights, and revenue sharing', small: true },
      { type: 'text', content: 'Silvia (25): "Auction House Actions and the AI Art Wave"', emphasis: true },
      { type: 'text', content: '→ Interdisciplinary research at a professional level', small: true },
    ],
  },
  // Page 9
  {
    type: 'content',
    bgColor: 'bg-purple-100',
    title: 'Core Teaching Philosophy: Three Shifts',
    sections: [
      { type: 'text', content: 'New direction for education in the AI era', emphasis: true },
      { type: 'text', content: '1. From confrontation to collaboration', emphasis: true },
      { type: 'list', content: [
        'First: Can I stump AI? (exploring boundaries)',
        'Second: Can I co-create with AI? (deep collaboration)',
      ] },
      { type: 'text', content: '2. From answers to questions', emphasis: true },
      { type: 'list', content: [
        'Traditional education: memorize standard answers',
        'AI era: learn to ask good questions',
      ] },
      { type: 'text', content: '3. From skills to thinking', emphasis: true },
      { type: 'list', content: [
        'Not teaching kids to operate AI tools',
        'But cultivating critical and creative thinking',
      ] },
    ],
  },
  // Page 10
  {
    type: 'content',
    bgColor: 'bg-yellow-200',
    title: 'Inspire Curiosity with AI, Let Questions Drive You',
    sections: [
      { type: 'text', content: 'Bee Alpha Internship Camp:', emphasis: true },
      { type: 'link', content: 'https://bee-alpha.com' },
      { type: 'custom', content: 'student-works' },
      { type: 'text', content: 'Thank you all!', emphasis: true, align: 'center' },
    ],
  },
];