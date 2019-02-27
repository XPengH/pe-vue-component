<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="病案等级设置" name="first">
      <level-setting/>
    </el-tab-pane>
    <el-tab-pane label="分数设置" name="second">
      <score-setting/>
    </el-tab-pane>
  </el-tabs>
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
.custom-tree-node {
  height: 35px;
}
.el-tree-node__content{
  height: 35px;
  margin: 5px 0px;
}
</style>
