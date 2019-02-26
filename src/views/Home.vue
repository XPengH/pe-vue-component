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
      activeName: 'second'
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
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
