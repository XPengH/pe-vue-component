<template>
  <div class="main-content">
    <el-row type="flex" justify="end" align="middle" class="content-top-buttons">
      <el-button size="medium" @click="dialogVisible = true">还原</el-button>
      <el-button type="primary" size="medium" @click="saveData()">保存</el-button>
    </el-row>
    <el-tabs v-model="activeName" :before-leave="beforeLeave">
      <el-tab-pane label="病案等级设置" name="first">
        <level-setting/>
      </el-tab-pane>
      <el-tab-pane label="分数设置" name="second">
        <score-setting/>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>本次还原会将病案等级、分数上限以及分数设置 均还原至您或其他管理员最后1次保存的设置，是否还原？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="initializeData()">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="tabDialogVisible"
      width="30%"
      >
      <span>当前页有未保存设置，是否离开？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeTab()">确 定</el-button>
        <el-button @click="tabDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ScoreSetting from '@/components/ScoreSetting.vue';
import LevelSetting from '@/components/LevelSetting.vue';
export default {
  name: 'Home',
  components: {
    ScoreSetting,
    LevelSetting
  },
  data () {
    return {
      activeName: 'second',
      dialogVisible: false,
      tabDialogVisible: false,
      newActiveName: '' // 目标tab
    };
  },
  mounted () {
    this.initializeData(); // 从初始化数据
  },
  methods: {
    handleClick () {
      if (this.newActiveName === 'first') {
        // todo 需要比对原始数组与现有数组，一开始拉到的数据做一次备份后对比, 如果有差别
        this.tabDialogVisible = true;
      }
      if (this.newActiveName === 'second') {
        this.tabDialogVisible = true;
        // todo 需要比对原始数组与现有数组，一开始拉到的数据做一次备份后对比
      }
    },
    changeTab () {
      this.tabDialogVisible = false;
      this.activeName = this.newActiveName;
    },
    beforeLeave (activeName, oldActiveName) {
      if (this.activeName !== this.newActiveName && activeName !== oldActiveName) {
        this.newActiveName = activeName;
        this.handleClick();
        return false;
      } else {
        this.newActiveName = '';
      }
    },
    initializeData () {
      this.dialogVisible = false;
      this.$store.commit('rootCheck');
    },
    saveData () {
      console.log(this.$store.state.qualityControl.levelData);
      console.log(this.$store.state.qualityControl.scoreParam);
      // todo：成功提示，应该是统一组件
      // todo： 最好后端做最大分值逻辑的处理，如果商量不过再前端遍历树形结构计算
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.main-content {
  color: #2c3e50;
  width: 1152px;
  min-width: 1152px;
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
  color: #595959;
  margin: 0px 3px;
}
.el-tree-node__expand-icon.expanded {
  transform: rotate(0deg);
}
.el-tree-node__expand-icon.expanded:before {
  content: '-';
  color: #595959;
}
.main-content .el-tree-node__expand-icon.is-leaf{
  border: none;
  width: 15px;
  height: 15px;
}
.main-content .el-tree-node__expand-icon.is-leaf::before{
  content: '';
  margin: 0 3px;
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
.main-content .level-setting .el-input__inner {
  height: 24px;
  font-size: 12px;
}
.main-content .score-setting .el-input__inner {
  width: 100px;
  height: 32px;
  font-size: 12px;
}
.main-content .score-setting .el-input--mini {
  font-size: 12px;
  width: 100px;
  min-width: 100px;
}
.main-content .score-setting .el-input--mini .button{
  height: 16px;
}
.main-content .score-setting .el-input-number {
  font-size: 12px;
  width: 100px;
  min-width: 100px;
}
.main-content .score-setting .el-icon-arrow-up:before {
  line-height: 15px;
}
.main-content .score-setting .el-icon-arrow-down:before {
  line-height: 15px;
}
.level-setting .custom-tree-node {
  height: 40px;
}
.level-setting  .el-tree-node__content{
  height: 40px;
  border-bottom: 1px solid #D8D8D8;
}
</style>
