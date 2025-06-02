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

export const slides: Slide[] = [
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
      { type: 'text', content: '首先回答Peter的问题：' },
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
      { type: 'text', content: 'Jevon（逻辑悖论）：', emphasis: true },
      { type: 'text', content: '四个中只有一个说真话，问是谁？' },
      { type: 'list', content: [
        'A：B说谎',
        'B：C说谎',
        'C：D说谎',
        'D：A说谎',
      ] },
      { type: 'text', content: 'Peter（信息干扰）：', emphasis: true },
      { type: 'text', content: '查理买了5个杯子蛋糕，鲍比吃了1个苹果。世界上剩下多少个苹果？' },
      { type: 'text', content: 'Yuqiao（空间几何）：', emphasis: true },
      { type: 'text', content: '房子每面墙都有窗户，早晨阳光照一扇，傍晚照相邻的一扇，太阳垂直运动，中午在重心上方。房子什么形状？' },
      { type: 'text', content: 'Silvia（认知偏见）：', emphasis: true },
      { type: 'text', content: '我父母是消防员和护士，护士（她）常来家长会，这次消防员来了，人们问为什么我爸从没来过。这个消防员是谁？' },
    ],
  },
  // 第八页
  {
    type: 'content',
    bgColor: 'bg-green-100',
    title: '第二次作业：构思问题，与AI对话，输出访谈文章',
    sections: [
      { type: 'text', content: '从对抗到协作的思维转变', emphasis: true },
      { type: 'text', content: '四个学生的研究主题：' },
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
      { type: 'text', content: '学生们的AI网站作品：', emphasis: true },
      { type: 'text', content: 'Peter的网站：AI分析高尔夫成绩', small: true },
      { type: 'link', content: 'https://mytraqr.com' },
      { type: 'text', content: 'Ivan的网站：AI推荐礼物选择', small: true },
      { type: 'link', content: 'https://aloft.gift' },
    ],
  },
  // 第十页
  {
    type: 'content',
    bgColor: 'bg-yellow-200',
    title: '用AI激发好奇心',
    sections: [
      { type: 'text', content: '让问题成为原动力', emphasis: true },
      { type: 'text', content: 'Bee Alpha 实习营：', emphasis: true },
      { type: 'link', content: 'bee.4zbot.com' },
      { type: 'text', content: '谢谢大家！', emphasis: true, align: 'center' },
    ],
  },
];