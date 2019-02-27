<template>
  <div class="level-setting">
    <el-row :gutter="0" type="flex" align="middle" >
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" ref="from">
        <span>来源</span>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
        <span>项目</span>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
        <span>缺陷类型</span>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <span>缺陷内容</span>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <span>分值</span>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
        <span>单位</span>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <span>统一子项分值</span>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
        <span>扣分上限</span>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
        <span>操作</span>
      </el-col>
    </el-row>
    <el-tree
      :data="levelData"
      node-key="id"
      default-expand-all
      :indent = "treeNodeLeftLength"
      @node-click="checkTreeNode"
      :expand-on-click-node="false"
    >
      <el-row  :gutter="10" type="flex" justify="space-between" align="middle" class="custom-tree-node" slot-scope="{ node, data }" @click="checkTreeNode(data)">
        <el-col>
          <el-input :disabled="!data.switchState" type="number" v-model="data.maximumPoints" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col v-if="data.score">
          <el-select :disabled="!data.switchState" v-model="data.score" placeholder="请选择">
            <el-option
              v-for="item in scoreOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :disabled="!data.switchState">
          <el-switch v-model="data.switchState" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-col>
        <el-col>
          <span>禁用</span>
          <el-switch @change="siwtchChange(data)" v-model="data.switchState" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          <span>启用</span>
        </el-col>
      </el-row>
    </el-tree>
  </div>
</template>

<script>
import {scoreOptions, unitOptions} from '@/assets/optionConfig.js';
let id = 10000;
export default {
  name: 'LevelSetting',
  data() {
    return {
      treeNodeLeftLength: 30, // 树形结构子节点靠左的距离
      scoreOptions, // 分值选项
      unitOptions, // 单位选项
      levelData: [{
        id: 1,
        label: '一级 1',
        switchState: true,
        children: [{
          id: 4,
          label: '二级 1-1',
          switchState: true,
          maximumPoints: 20,
          children: [{
            id: 9,
            switchState: true,
            score: '无',
            label: '三级 1-1-1'
          }, {
            id: 10,
            switchState: true,
            label: '三级 1-1-2'
          }]
        }]
      }]
    };
  },
  methods: {
    checkTreeNode (data) {
    },
    siwtchChange (data) {
      // 如果禁用时树形结点有子项，则将所有的子项switch开关关闭
      if (data && data.children && data.children.length > 0) {
        data.children.forEach(child => {
          child.switchState = data.switchState;
        });
      }
    },
  },
  mounted () {
    window.onresize = this.menuWidthChange;
  }
};
</script>

<style scoped>
</style>
