import { createStore } from 'vuex'

export default createStore({
  state: {
    // S14赛季七源计划阵容数据
    compositions: [
      // S级阵容
      {
        id: 1,
        name: '圣灵男枪',
        tier: 'S',
        level: '6级追三星',
        description: '圣灵男枪核心阵容',
        champions: ['男枪', '瑞兹', '泽拉斯', '奥拉夫', '布里茨', '艾克'],
        traits: ['圣源', '战士', '未来战士', '狙神'],
        equipment: ['无尽之刃', '疾射火炮', '巨人杀手'],
        difficulty: 3,
        popularity: 3,
        avgRank: 3.48
      },
      {
        id: 2,
        name: '七源计划',
        tier: 'S',
        level: '速升8级',
        description: '七源计划核心阵容',
        champions: ['金克丝', '卡特琳娜', '瑞兹', '泽拉斯', '艾克', '布里茨', '亚索', '阿卡丽'],
        traits: ['源计划', '魅惑', '未来战士', '传奇战士'],
        equipment: ['无尽之刃', '疾射火炮', '守护天使'],
        difficulty: 2,
        popularity: 3,
        avgRank: 3.54
      },
      {
        id: 3,
        name: '人造人蜘蛛',
        tier: 'S',
        level: '7级追三星',
        description: '人造人蜘蛛核心阵容',
        champions: ['蜘蛛女王', '德莱文', '卡莎', '雷克塞', '布里茨', '艾克'],
        traits: ['人造人', '杀手', '未来战士', '虚空'],
        equipment: ['饮血剑', '无尽之刃', '疾射火炮'],
        difficulty: 2,
        popularity: 2,
        avgRank: 3.60
      },
      {
        id: 4,
        name: '圣源韦鲁斯',
        tier: 'S',
        level: '7级追三星',
        description: '圣源韦鲁斯核心阵容',
        champions: ['韦鲁斯', '瑞兹', '泽拉斯', '奥拉夫', '布里茨', '艾克'],
        traits: ['圣源', '狙神', '未来战士', '战士'],
        equipment: ['德拉克萨的暮刃', '疾射火炮', '巨人杀手'],
        difficulty: 2,
        popularity: 2,
        avgRank: 3.68
      },
      // S-级阵容
      {
        id: 5,
        name: '猛拍按钮',
        tier: 'S-',
        level: '4/5级追三，限定强化',
        description: '猛拍按钮核心阵容',
        champions: ['卡莎', '德莱文', '金克丝', '蜘蛛女王', '雷克塞'],
        traits: ['虚空', '杀手', '源计划', '防护'],
        equipment: ['无尽之刃', '疾射火炮', '守护天使'],
        difficulty: 1,
        popularity: 0,
        avgRank: 0
      },
      {
        id: 6,
        name: '高工草人',
        tier: 'S-',
        level: '7级追三星',
        description: '高工草人核心阵容',
        champions: ['费德提克', '卡莎', '德莱文', '瑞兹', '泽拉斯', '布里茨'],
        traits: ['科技猎人', '杀手', '圣源', '未来战士'],
        equipment: ['青龙刀', '鬼书', '帽子'],
        difficulty: 2,
        popularity: 2,
        avgRank: 3.76
      },
      {
        id: 7,
        name: '强装泽丽',
        tier: 'S-',
        level: '速升8级，限定转职',
        description: '强装泽丽核心阵容',
        champions: ['泽丽', '金克丝', '卡特琳娜', '瑞兹', '泽拉斯', '艾克', '布里茨'],
        traits: ['源计划', '魅惑', '圣源', '未来战士'],
        equipment: ['无尽之刃', '疾射火炮', '饮血剑'],
        difficulty: 1,
        popularity: 0,
        avgRank: 0
      },
      {
        id: 8,
        name: '战略妖姬',
        tier: 'S-',
        level: '6级追三星',
        description: '战略妖姬核心阵容',
        champions: ['乐芙兰', '卡特琳娜', '瑞兹', '泽拉斯', '艾克', '布里茨'],
        traits: ['魅惑', '圣源', '未来战士', '源计划'],
        equipment: ['帽子', '鬼书', '青龙刀'],
        difficulty: 1,
        popularity: 2,
        avgRank: 3.79
      },
      {
        id: 9,
        name: '4433小法',
        tier: 'S-',
        level: '6级追三星',
        description: '4433小法核心阵容',
        champions: ['维迦', '卡特琳娜', '瑞兹', '泽拉斯', '艾克', '布里茨'],
        traits: ['约德尔人', '魅惑', '圣源', '未来战士'],
        equipment: ['帽子', '鬼书', '青龙刀'],
        difficulty: 1,
        popularity: 2,
        avgRank: 3.85
      },
      {
        id: 10,
        name: '赛娜皇子',
        tier: 'S-',
        level: '7级追三星',
        description: '赛娜皇子核心阵容',
        champions: ['赛娜', '嘉文四世', '瑞兹', '泽拉斯', '奥拉夫', '布里茨'],
        traits: ['圣源', '统领', '战士', '未来战士'],
        equipment: ['疾射火炮', '巨人杀手', '饮血剑'],
        difficulty: 2,
        popularity: 2,
        avgRank: 3.90
      },
      // A+级阵容
      {
        id: 11,
        name: '战地卡牌',
        tier: 'A+',
        level: '6级追三星，限定转职',
        description: '战地卡牌核心阵容',
        champions: ['崔斯特', '德莱文', '金克丝', '卡特琳娜', '瑞兹', '泽拉斯'],
        traits: ['源计划', '魅惑', '圣源', '游侠'],
        equipment: ['帽子', '鬼书', '青龙刀'],
        difficulty: 2,
        popularity: 0,
        avgRank: 0
      },
      {
        id: 12,
        name: '蒙牛斗法',
        tier: 'A+',
        level: '4/5级追三',
        description: '蒙牛斗法核心阵容',
        champions: ['莫甘娜', '卡特琳娜', '乐芙兰', '瑞兹', '泽拉斯'],
        traits: ['魅惑', '圣源', '女巫', '决斗大师'],
        equipment: ['帽子', '鬼书', '青龙刀'],
        difficulty: 1,
        popularity: 2,
        avgRank: 3.97
      },
      {
        id: 13,
        name: '万脑小丑鳄',
        tier: 'A+',
        level: '4/5级追三星，限定强化',
        description: '万脑小丑鳄核心阵容',
        champions: ['萨科', '雷克顿', '卡特琳娜', '瑞兹', '泽拉斯'],
        traits: ['魅惑', '圣源', '未来战士', '决斗大师'],
        equipment: ['帽子', '鬼书', '青龙刀'],
        difficulty: 2,
        popularity: 1,
        avgRank: 0
      },
      {
        id: 14,
        name: '金丝狗',
        tier: 'A+',
        level: '7级追三星',
        description: '金丝狗核心阵容',
        champions: ['沃里克', '卡莎', '德莱文', '瑞兹', '泽拉斯', '布里茨'],
        traits: ['科技猎人', '杀手', '圣源', '未来战士'],
        equipment: ['饮血剑', '无尽之刃', '疾射火炮'],
        difficulty: 2,
        popularity: 2,
        avgRank: 4.04
      },
      {
        id: 15,
        name: '脉冲神器狗',
        tier: 'A+',
        level: '6级追三星',
        description: '脉冲神器狗核心阵容',
        champions: ['沃里克', '金克丝', '卡特琳娜', '瑞兹', '泽拉斯', '艾克'],
        traits: ['科技猎人', '源计划', '魅惑', '圣源'],
        equipment: ['饮血剑', '无尽之刃', '疾射火炮'],
        difficulty: 1,
        popularity: 2,
        avgRank: 4.10
      },
      {
        id: 16,
        name: '六斗草人',
        tier: 'A+',
        level: '7级追三星',
        description: '六斗草人核心阵容',
        champions: ['费德提克', '卡莎', '德莱文', '瑞兹', '泽拉斯', '布里茨'],
        traits: ['决斗大师', '杀手', '圣源', '未来战士'],
        equipment: ['青龙刀', '鬼书', '帽子'],
        difficulty: 2,
        popularity: 2,
        avgRank: 4.04
      }
    ],
    // 海克斯强化符文列表
    hexes: [
      '黄金门票', '升级', '三选一', '小小英雄', '投资理财', '清仓大甩卖',
      '新兵训练营', '升级++', '双倍麻烦', '联盟+', '源计划之心', '圣源之心',
      '杀手之心', '魅惑之心', '未来战士之心', '科技猎人之心', '决斗大师之心',
      '游侠之心', '战士之心', '狙神之心', '传奇战士之心', '统领之心', '虚空之心',
      '女巫之心', '约德尔人之心', '人造人之心', '战地机甲之心', '防护之心'
    ],
    // 用户对局记录
    gameRecords: [],
    // 统计数据
    statistics: {
      totalGames: 0,
      totalWins: 0,
      winRate: 0,
      compositionStats: {},
      hexStats: {}
    }
  },
  getters: {
    getCompositionById: (state) => (id) => {
      return state.compositions.find(comp => comp.id === parseInt(id))
    },
    getCompositionsByTier: (state) => (tier) => {
      return state.compositions.filter(comp => comp.tier === tier)
    },
    getTierCompositions: (state) => {
      const result = {}
      state.compositions.forEach(comp => {
        if (!result[comp.tier]) {
          result[comp.tier] = []
        }
        result[comp.tier].push(comp)
      })
      return result
    }
  },
  mutations: {
    ADD_GAME_RECORD(state, record) {
      state.gameRecords.push({
        ...record,
        id: Date.now(),
        timestamp: new Date().toISOString()
      })
      this.commit('UPDATE_STATISTICS')
    },
    UPDATE_STATISTICS(state) {
      const records = state.gameRecords
      state.statistics.totalGames = records.length
      state.statistics.totalWins = records.filter(r => r.result === 'win').length
      state.statistics.winRate = state.statistics.totalGames > 0 
        ? (state.statistics.totalWins / state.statistics.totalGames * 100).toFixed(1)
        : 0

      // 阵容统计
      const compStats = {}
      records.forEach(record => {
        const compId = record.compositionId
        if (!compStats[compId]) {
          compStats[compId] = { games: 0, wins: 0, winRate: 0 }
        }
        compStats[compId].games++
        if (record.result === 'win') {
          compStats[compId].wins++
        }
        compStats[compId].winRate = (compStats[compId].wins / compStats[compId].games * 100).toFixed(1)
      })
      state.statistics.compositionStats = compStats

      // 海克斯统计
      const hexStats = {}
      records.forEach(record => {
        record.hexes.forEach(hex => {
          if (!hexStats[hex]) {
            hexStats[hex] = { games: 0, wins: 0, winRate: 0 }
          }
          hexStats[hex].games++
          if (record.result === 'win') {
            hexStats[hex].wins++
          }
          hexStats[hex].winRate = (hexStats[hex].wins / hexStats[hex].games * 100).toFixed(1)
        })
      })
      state.statistics.hexStats = hexStats
    }
  },
  actions: {
    addGameRecord({ commit }, record) {
      commit('ADD_GAME_RECORD', record)
    }
  }
}) 
