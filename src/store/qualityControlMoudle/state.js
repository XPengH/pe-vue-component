const state = {
  levelData: [{
    id: 1,
    from: '入院记录', // 来源
    label: '一级 1', // 标题
    switchState: true, // 禁止开启开关状态
    children: [{
      id: 4,
      program: '基本要求', // 项目
      label: '二级 1-1',
      switchState: true,
      maximumPoints: 1, // 最大分值
      children: [{
        id: 9,
        switchState: true,
        score: '无',
        unit: '/项',
        defectType: '形式缺陷', // 缺陷类型
        defectContent: '无住院记录', // 缺陷内容
        label: '三级 1-1-1',
        maximumPoints: 1 // 最大分值
      }, {
        id: 11,
        switchState: true,
        score: '无',
        unit: '/项',
        defectType: '内涵缺陷', // 缺陷类型
        defectContent: '住院记录24小时未完成', // 缺陷内容
        label: '三级 1-1-1',
        maximumPoints: 1, // 最大分值
      }, {
        id: 10,
        score: '无',
        unit: '/项',
        defectType: '形式缺陷', // 缺陷类型
        defectContent: '药物过敏、血型信息填写缺陷', // 缺陷内容
        unifiedItem: false, // 统一子项分值 默认状态为false,表示状态未统一
        switchState: true,
        label: '三级 1-1-2',
        maximumPoints: 1, // 最大分值
        children: [{
          id: 12,
          switchState: true,
          score: '无',
          unit: '/项',
          defectContent: '药物信息填写缺陷', // 缺陷内容
          unifiedItemState: true, // todo: 初始化的时候将此参数加上，子项中表示是否被统一的状态 true为默认状态未统一
          label: '三级 1-1-1',
          maximumPoints: 1 // 最大分值
        }, {
          id: 13,
          switchState: true,
          score: '无',
          unit: '/项',
          defectContent: '药物信息填写缺陷', // 缺陷内容
          unifiedItemState: true, // 子项中表示是否被统一的状态 true为默认状态未统一
          label: '三级 1-1-1',
          maximumPoints: 1 // 最大分值
        }
        ]
      }]
    }]
  }],
  scoreParam: {
    typeA: {
      minValue: 0,
      relationValue: '且',
      maxVetoNumber: 0,
      minScore: 0,
      maxScore: 100
    },
    typeB: {
      minValue: 0,
      maxValue: 0,
      relationValue: '且',
      minVetoNumber: 0,
      maxVetoNumber: 0,
      minScore: 0,
      maxScore: 0
    },
    typeC: {
      minValue: 0,
      maxValue: 0,
      relationValue: '且',
      minVetoNumber: 0,
      maxVetoNumber: 0,
      minScore: 0,
      maxScore: 0
    }
  }
};

export default state;
