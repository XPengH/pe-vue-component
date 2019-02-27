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
      ref="tree"
      default-expand-all
      :indent="treeNodeLeftLength"
      @node-click="checkTreeNode"
      :expand-on-click-node="false"
    >
      <el-row  :gutter="10" type="flex" justify="space-between" align="middle" :class="['custom-tree-node',!data.switchState && 'disabled-bg']" slot-scope="{ node, data }" @click="checkTreeNode(data)">
        <el-col>
          <el-input
            @change="inputchange(data)"
            :disabled="!data.switchState || data.score === '单项否决' || data.score === '丙级'" 
            type="number"
            v-model="data.maximumPoints"
            placeholder="请输入内容">
          </el-input>
        </el-col>
        <el-col >
          <el-select
            v-if="data.score!==undefined"
            :disabled="!data.switchState || (data.unifiedItem === false) || data.unifiedItemState === false"
            v-model="data.score"
            placeholder="请选择"
            @change="scoreChange(data)"
            >
            <el-option
              v-for="item in scoreOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col >
          <el-select
            v-if="data.unit!==undefined"
            :disabled="!data.switchState || (data.unifiedItem === false) || data.unifiedItemState === false"
            v-model="data.unit"
            placeholder="请选择"
            @change="unitChange(data)"
          >
            <el-option
              v-for="item in unitOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col >
          <el-switch v-if="data.unifiedItem!==undefined" @change="unifiedItemSwitchChange(data)" v-model="data.unifiedItem" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-col>
        <el-col>
          <span>禁用</span>
          <el-switch @change="enbaledSwitchChange(data)" v-model="data.switchState" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
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
        from: '病案首页', // 来源
        program: '基本要求', // 项目
        defectType: '缺陷类型', // 缺陷类型
        defectContent: '缺陷内容', // 缺陷内容
        label: '一级 1', // 标题
        switchState: true, // 禁止开启开关状态
        maximumPoints: 20,  // 最大分值
        children: [{
          id: 4,
          label: '二级 1-1',
          switchState: true,
          maximumPoints: 20,  // 最大分值
          score: '无', // 分值
          unit: '/项', // 单位
          unifiedItem: false, // 统一子项分值 默认状态为false,表示状态未统一
          children: [{
            id: 9,
            switchState: true,
            score: '无',
            unit: '/项',
            unifiedItemState: true, // 子项中表示是否被统一的状态 true为默认状态未统一
            label: '三级 1-1-1'
          }, {
            id: 10,
            score: '无',
            unit: '/项',
            unifiedItemState: true, // 子项中表示是否被统一的状态 true为默认状态未统一
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
    enbaledSwitchChange (data) {
      // 如果禁用时树形结点有子项，则将所有的子项switch开关关闭
      if (data && data.children && data.children.length > 0) {
        data.children.forEach(child => {
          child.switchState = data.switchState;
        });
      }
    },
    unifiedItemSwitchChange (data) {
      // 如果打开时树形结点有子项，则将所有的子项的分值和单位统一,同时禁子项的操作
      if (data && data.children && data.children.length > 0) {
        data.children.forEach(child => {
          if (data.unifiedItem) {
            child.score = data.score;
            child.unit = data.unit;
          }
          child.unifiedItemState = !data.unifiedItem;
        });
      }
      this.$forceUpdate();
    },
    scoreChange (data) {
      // 分值修改时做判断，如果此项已经开启了统一子项分值，则将子元素所有的分值统一
      if (data && data.unifiedItem) {
        data.children.forEach(child => {
          child.score = data.score;
        });
      }
    },
    unitChange (data) {
      // 单位修改时做判断，如果此项已经开启了统一子项分值，则将子元素所有的单位统一
      if (data && data.unifiedItem) {
        data.children.forEach(child => {
          child.unit = data.unit;
        });
      }
    },
    inputchange (data) {
      console.log(data);
    }
  },
  mounted () {
    window.onresize = this.menuWidthChange;
  }
};
</script>

<style scoped>
.disabled-bg {
  background-color: #ccc;
}
</style>
