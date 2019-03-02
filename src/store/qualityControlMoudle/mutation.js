
const mutations = {
  // 判断是否是根节点
  rootCheck (state, payload) {
    state.levelData = state.levelData.map((item) => {
      item.level0 = true; // 判断是否是根节点，这个参数在获取到数据时遍历添加
      return item;
    });
  }
};

export default mutations;
