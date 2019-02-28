<template>
  <div class="main-content">
    <el-row type="flex" justify="end" align="middle" class="content-top-buttons">
      <el-button size="medium">还原</el-button>
      <el-button type="primary" size="medium">保存</el-button>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="病案等级设置" name="first">
        <level-setting/>
      </el-tab-pane>
      <el-tab-pane label="分数设置" name="second">
        <score-setting/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ScoreSetting from '@/components/ScoreSetting.vue';
import LevelSetting from '@/components/LevelSetting.vue';
export default {
  name: 'Home',
  components: {
    ScoreSetting,
    LevelSetting,
  },
  data () {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.main-content {
  color: #2c3e50;
  width: 1152px;
  font-size: 14px;
}
.main-content .el-tabs__header{
  background-color: #fff;
  margin-bottom: 8px;
  padding-left: 32px;
}
.main-content .el-tabs__content {
  background-color: #fff;
  padding: 16px;
}
/*todo: tooltip这里的样式应该在样式库修改， 去除黑色border*/
.el-tooltip__popper {
  color: #606266; 
}
/* 
修改tree组件点击按钮样式
*/
.main-content .el-tree-node__expand-icon {
  width: 13px;
  height: 13px;
  margin: 0 16px;
  padding: 0px;
  border: 1px solid rgba(232,232,232,1);
}
.el-icon-caret-right:before {
  content: '+';
  margin-left: 3px;
}
.el-tree-node__expand-icon.expanded {
  transform: rotate(0deg);
}
.el-tree-node__expand-icon.expanded:before {
  content: '-';
  margin-left: 3px;
}
.main-content .el-tree-node__expand-icon.is-leaf{
  border: none;
  width: 14px;
  height: 14px;
}
.main-content .content-top-buttons {
  background-color: #fff;
  padding-right: 32px;
  padding-top: 24px;
}
.main-content .content-top-buttons button {
  width: 80px;
  height: 32px;
  padding: 0;
}
.main-content .el-tabs__nav-wrap::after {
  height: 0px;
}
.level-setting .custom-tree-node {
  height: 40px;
}
.level-setting  .el-tree-node__content{
  height: 40px;
  border-bottom: 1px solid #D8D8D8;
}
</style>
