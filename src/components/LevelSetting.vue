<template>
  <div class='level-setting'>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">黄金糕</el-dropdown-item>
        <el-dropdown-item command="b">狮子头</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'LevelSetting',
  data() {
    return {
    };
  },
  methods: {
    handleCommand(command) {
      this.$message('click on item ' + command);
    }
  }
};
</script>

<style scoped>
</style>
