<template>
  <div class="main-content">
    <el-row type="flex" justify="end" align="middle" class="content-top-buttons">
      <el-button size="medium" @click="dialogVisible = true">还原</el-button>
      <el-button type="primary" size="medium" @click="saveData()">保存</el-button>
    </el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="病案等级设置" name="first">
        <level-setting :levelData="levelData"/>
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
      activeName: 'first',
      dialogVisible: false,
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
          maximumPoints: 1,  // 最大分值
          children: [{
            id: 9,
            switchState: true,
            score: '无',
            unit: '/项',
            defectType: '形式缺陷', // 缺陷类型
            defectContent: '无住院记录', // 缺陷内容
            label: '三级 1-1-1',
            maximumPoints: 1,  // 最大分值
          }, {
            id: 11,
            switchState: true,
            score: '无',
            unit: '/项',
            defectType: '内涵缺陷', // 缺陷类型
            defectContent: '住院记录24小时未完成', // 缺陷内容
            label: '三级 1-1-1',
            maximumPoints: 1,  // 最大分值
          }, {
            id: 10,
            score: '无',
            unit: '/项',
            defectType: '形式缺陷', // 缺陷类型
            defectContent: '药物过敏、血型信息填写缺陷', // 缺陷内容
            unifiedItem: false, // 统一子项分值 默认状态为false,表示状态未统一
            switchState: true,
            label: '三级 1-1-2',
            maximumPoints: 1,  // 最大分值
            children: [{
              id: 12,
              switchState: true,
              score: '无',
              unit: '/项',
              defectContent: '药物信息填写缺陷', // 缺陷内容
              unifiedItemState: true, // todo: 初始化的时候将此参数加上，子项中表示是否被统一的状态 true为默认状态未统一
              label: '三级 1-1-1',
              maximumPoints: 1,  // 最大分值
            },
            {
              id: 13,
              switchState: true,
              score: '无',
              unit: '/项',
              defectContent: '药物信息填写缺陷', // 缺陷内容
              unifiedItemState: true, // 子项中表示是否被统一的状态 true为默认状态未统一
              label: '三级 1-1-1',
              maximumPoints: 1,  // 最大分值
            }]
          }]
        }]
      }]
    };
  },
  mounted() {
    this.initializeData(); // 从初始化数据
  },
  methods: {
    // 判断是否是根节点
    rootCheck() {
      this.levelData = this.levelData.map((item)=> {
        item.level0 = true; // 判断是否是根节点，这个参数在获取到数据时遍历添加
        return item;
      });
    },
    initializeData () {
      this.dialogVisible = false;
      this.rootCheck();
    },
    saveData () {
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
  margin-left: 3px;
}
.el-tree-node__expand-icon.expanded {
  transform: rotate(0deg);
}
.el-tree-node__expand-icon.expanded:before {
  content: '-';
  color: #595959;
  margin-left: 3px;
}
.main-content .el-tree-node__expand-icon.is-leaf{
  border: none;
  width: 15px;
  height: 15px;
}
.main-content .el-tree-node__expand-icon.is-leaf::before{
  content: ''
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
.main-content .el-input__inner {
  height: 24px;
  font-size: 12px;
}
.level-setting .custom-tree-node {
  height: 40px;
}
.level-setting  .el-tree-node__content{
  height: 40px;
  border-bottom: 1px solid #D8D8D8;
}
</style>
