export interface Slide {
  title: string;
  subtitle?: string;
  content: string[];
  background: string;
  isTitle?: boolean;
}

export const slides: Slide[] = [
 // 封面页
    {
      title: "Google的三大AI基石 及 青少年AI教育实验",
      subtitle: "",
      content: [
        "",
        "",
        "分享者：周品",
        "",
        "蜜蜂时代/第二大脑 创始人",
        "趣玩网 创始人",
        "曾任百度公司/猎豹移动 管理层",
        "8年AI相关经验，全球第一批GPT时代创业者",
        "",
        "",
        "时间：2025年5月27日"
      ],
      background: "bg-gradient-to-br from-blue-100 to-indigo-200",
      isTitle: true
    },

    // 第1页：从底座看向未来
    {
      title: "从底座看向未来",
      content: [
        "今天我们聊AI，不讲ChatGPT，也不谈英伟达",
        "",
        "整个AI世界的进步，皆因Google研究团队2017年发表了Transformer模型论文",
        "",
        "如同爱因斯坦提出E=MC²，ChatGPT则是把原子弹造出来的奥本海默",
        "",
        "Google = 互联网+硬件+软件巨人，工程上具备全部与OpenAI对抗的实力",
        "",
        "Peter的提问：",
        "\"Google这么牛，为什么没抢先做出比ChatGPT更好的产品？\""
      ],
      background: "bg-blue-50"
    },
    
    // 第2页：AlphaGo (2016)
    {
      title: "Google三大AI基石之一：AlphaGo (2016)",
      subtitle: "第一次展示AI'自主学习'能力",
      content: [
        "战胜李世石和柯洁的历史时刻",
        "LINK:https://www.youtube.com/watch?v=fGmUbdJfm0k",
        "",
        "为什么从围棋开始？",
        "• 围棋复杂度比国际象棋高10⁴³倍",
        "• 可能走法10¹⁷⁰比宇宙原子数还多90个数量级",
        "",
        "AlphaGo如何做到？",
        "• 不是靠编程告诉每一步怎么走",
        "• 通过深度学习，看了几千万局围棋比赛自己学会",
        "",
        "就像教孩子骑自行车——让他多练习找到平衡感"
      ],
      background: "bg-green-50"
    },

    // 第3页：Transformer (2017)
    {
      title: "Google三大AI基石之二：Transformer (2017)",
      subtitle: "\"注意力就是你所需要的一切\"",
      content: [
        "理解Transformer技术原理：",
        "LINK:https://www.youtube.com/watch?v=xTj7D6OCLjI",
        "",
        "为什么物理学奖颁给计算机科学家：",
        "LINK:https://www.youtube.com/watch?v=s4Z8ToalawY",
        "",
        "如果说AlphaGo让AI会'学习'，Transformer让AI学会了'理解语言'",
        "",
        "注意力机制的革命性影响：",
        "• 从一个字一个字读写，变成一页一页大面积读写",
        "• 理解句子中哪些词最重要，词与词之间的关系",
        "",
        "实际应用：ChatGPT、Gemini、DeepSeek底层都基于Transformer"
      ],
      background: "bg-purple-50"
    },

    // 第4页：AlphaFold2 (2021)
    {
      title: "Google三大AI基石之三：AlphaFold2 (2021)",
      subtitle: "AI科学家获得诺贝尔生物学奖",
      content: [
        "为什么生物学奖颁给计算机科学家Demis Hassabis：",
        "LINK:https://zhuanlan.zhihu.com/p/2819747204",
        "",
        "AI\"入侵\"生物医疗史完整解析：",
        "LINK:https://www.youtube.com/watch?v=2ydjTZeFcnM",
        "",
        "AlphaFold2把人类科学家效率提高了18.7万倍",
        "",
        "突破性成果：",
        "• 过去半世纪：人类解析5万+蛋白质结构（17%）",
        "• 2021年：AlphaFold2将比例提高到58%",
        "• 今天：接近99.8%",
        "",
        "实际影响：直接加速新药研发，帮助理解疾病原理"
      ],
      background: "bg-orange-50"
    },

    // 第5页：实验班介绍
    {
      title: "AI青少年教育实验分享",
      subtitle: "学AI要从娃娃抓起——AI激发好奇心，问题成为源动力",
      content: [
        "首先回答Peter的问题：",
        "\"Google这么牛，为什么没抢先做出比ChatGPT更好的产品？\"",
        "",
        "对于Peter的问题，Gemini是怎么回答的：",
        "LINK:https://g.co/gemini/share/73200dcfdb96",
        "",
        "实验班学生构成：",
        "• Peter（14岁）：商业产品敏锐直觉",
        "• Jevon（17岁）：哲学思维深入，善于抽象思考",
        "• Yuqiao（17岁）：理科背景，系统性分析能力强",
        "• Silvia（25岁）：成年学习者，跨学科整合能力突出",
        "",
        "教育目标：",
        "不是教孩子使用AI，而是培养与AI协作思考的能力"
      ],
      background: "bg-pink-50"
    },

    // 第6页：第一次作业题目
    {
      title: "第一次作业：设计\"难倒AI\"的题目",
      subtitle: "要求：有唯一答案但AI容易出错",
      content: [
        "Jevon（逻辑悖论）：四个中只有一个说真话，问是谁？",
        "A：B说谎  B：C说谎  C：D说谎  D：A说谎",
        "",
        "Peter（信息干扰）：查理买了5个杯子蛋糕，鲍比吃了1个苹果。世界上剩下多少个苹果？",
        "",
        "Yuqiao（空间几何）：房子每面墙都有窗户，早晨阳光照一扇，傍晚照相邻的一扇，太阳垂直运动，中午在重心上方。房子什么形状？",
        "",
        "Silvia（认知偏见）：我父母是消防员和护士，护士（她）常来家长会，这次消防员来了，人们问为什么我爸从没来过。这个消防员是谁？"
      ],
      background: "bg-yellow-50"
    },

    // 第7页：第二次作业展示
    {
      title: "第二次作业：构思问题，与AI对话，输出访谈文章",
      subtitle: "从对抗到协作的思维转变",
      content: [
        "四个学生的研究主题：",
        "",
        "Peter（14岁）：《Claude Web Search功能对ChatGPT的威胁分析》",
        "→ 展现商业敏锐度和产品思维",
        "",
        "Jevon（17岁）：《AI对本体论的冲击》",
        "→ 思考AI对\"存在\"本质的哲学冲击",
        "",
        "Yuqiao（17岁）：《AI音乐的平台治理问题》",
        "→ 分析推荐权、标注权、分账权的规则博弈",
        "",
        "Silvia（25岁）：《拍卖行行动与AI艺术浪潮》",
        "→ 跨学科研究达到专业水准"
      ],
      background: "bg-indigo-50"
    },

    // 第8页：教学理念总结
    {
      title: "核心教学理念：三个转变",
      subtitle: "AI时代教育的新方向",
      content: [
        "1. 从对抗到协作",
        "   第一次：我能难倒AI吗？（探索边界）",
        "   第二次：我能与AI共创吗？（深度协作）",
        "",
        "2. 从答案到问题",
        "   传统教育：记住标准答案",
        "   AI时代：学会提出好问题",
        "",
        "3. 从技能到思维",
        "   不是教孩子操作AI工具",
        "   而是培养批判性思维和创造性思考",
        "",
        "学生们的AI网站作品：",
        "Peter的网站：AI分析高尔夫成绩",
        "LINK:https://mytraqr.com",
        "Ivan的网站：AI推荐礼物选择",
        "LINK:https://aloft.gift"
      ],
      background: "bg-teal-50"
    },

    // 第9页：送给听众的话
    {
      title: "",
      subtitle: "",
      content: [
        "",
        "",
        "",
        "用AI激发好奇心",
        "让问题成为原动力",
        "",
        "",
        "Bee Alpha 实习营：",
        "LINK:bee.4zbot.com",
        "",
        "谢谢大家！"
      ],
      background: "bg-gradient-to-br from-purple-100 to-pink-200",
      isTitle: true
    }
];