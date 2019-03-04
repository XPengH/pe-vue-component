<template>
  <div class="level-setting">
    <el-row :gutter="0" type="flex" align="middle" class="tree-header">
      <el-col ref="from" class="level-from"><span>来源</span></el-col>
      <el-col class="level-program"><span>项目</span></el-col>
      <el-col class="level-defect-type"><span>缺陷类型</span></el-col>
      <el-col class="level-defect-content"><span>缺陷内容</span></el-col>
      <el-col class="level-score"><span>分值</span></el-col>
      <el-col class="level-unit"><span>单位</span></el-col>
      <el-col class="level-unified-item-state"><span>统一子项分值
        <el-tooltip class="item" effect="light" content="“统一子项分值”：是指将该缺陷的各个子项目的分值与单位设置为同一内容。" placement="bottom">
          <i class="el-icon-question"></i>
        </el-tooltip>
        </span>
      </el-col>
      <el-col class="level-maximum-points"><span>扣分上限</span></el-col>
      <el-col class="level-option"><span>操作</span></el-col>
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
      <el-row type="flex"  align="middle"
        :class="['custom-tree-node',!data.switchState && 'disabled-bg', data.level0 && 'level0-bg']" 
        slot-scope="{ node, data }" 
        @click="checkTreeNode(data)">
        <el-col class="level-from">
          <span>{{data.from}}</span>
        </el-col>
        <el-col class="level-program">
          <span>{{data.program}}</span>
        </el-col>
        <el-col class="level-defect-type">
          <span :class="[data.defectType === '形式缺陷'? 'color-orange':'color-blue']">{{data.defectType}}</span>
        </el-col>
         <el-col class="level-defect-content">
          <span>{{data.defectContent}}</span>
        </el-col>
         <el-col class="level-score">
          <el-select
            v-if="data.score!==undefined"
            :disabled="!data.switchState || (data.unifiedItem === false) || data.unifiedItemState === false"
            v-model="data.score"
            icon-class="el-icon-caret-bottom"
            placeholder="请选择"
            size="mini"
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
        <el-col class="level-unit">
          <el-select
            v-if="data.unit!==undefined"
            :disabled="!data.switchState || (data.unifiedItem === false) || data.unifiedItemState === false"
            v-model="data.unit"
            placeholder="请选择"
            size="mini"
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
        <el-col class="level-unified-item-state">
          <el-switch 
            v-if="data.unifiedItem!==undefined" 
            @change="unifiedItemSwitchChange(data)"
            v-model="data.unifiedItem"
            active-color="#3A5EFF"
            inactive-color="#ff4949">
          </el-switch>
        </el-col>
        <el-col class="level-maximum-points">
          <el-input
            v-if="data.maximumPoints !== undefined"
            @change="inputchange(data)"
            :disabled="!data.switchState || data.score === '单项否决' || data.score === '丙级'" 
            v-model="data.maximumPoints"
            placeholder="扣分上限">
          </el-input>
        </el-col>
        
        <el-col class="level-option">
          <el-switch
            @change="enbaledSwitchChange(data)"
            v-model="data.switchState"
            active-color="#3A5EFF"
            inactive-color="#ff4949">
          </el-switch>
        </el-col>
      </el-row>
    </el-tree>
  </div>
</template>

<script>
import {scoreOptions, unitOptions} from '@/assets/optionConfig.js';
export default {
  name: 'LevelSetting',
  data() {
    return {
      treeNodeLeftLength: 0, // 树形结构子节点靠左的距离
      scoreOptions, // 分值选项
      unitOptions // 单位选项
    };
  },
  computed: {
    levelData () {
      return this.$store.state.qualityControl.levelData;
    }
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
    }
  },
  mounted () {
    window.onresize = this.menuWidthChange;
  }
};
</script>

<style scoped>
.level-setting {
  height: 558px;
  max-height: 558px;
  overflow: scroll;
}
.color-orange {
  color: #F66107;
}
.color-blue {
  color: #3A5EFF;
}
.custom-tree-node {
  font-size: 12px;
  padding-left: 23px;
}
.disabled-bg {
  background-color: #ccc;
}
.level0-bg{
  background-color: rgba(242,242,242,1);
}
.tree-header{
  background: rgba(246,248,250,1);
  padding: 9px 0px;
  padding-left: 46px;
  color: #203152;
}
.level-from{
  min-width: 82px;
  width: 82px;
}
.level-program{
  min-width: 90px;
  width: 90px;
}
.level-defect-type{
  min-width: 82px;
  width: 82px;
}
.level-defect-content{
  min-width: 245px;
  width: 248px;
}
.level-score{
  min-width: 100px;
  width: 100px;
  margin-right: 32px;
  text-align: center;
}
.level-unit{
  min-width: 100px;
  width: 100px;
  text-align: center;
}
.level-unified-item-state{
  min-width: 148px;
  width: 148px;
  text-align: center;
}
.el-tree-node__content .level-unified-item-state {
  text-align: center;
  text-align: center;
}
.level-maximum-points{
  min-width: 80px;
  text-align: center;
  width: 80px;
}
.level-option{
  min-width: 96px;
  text-align: center;
  width: 96px;
}
.el-icon-question{
  width:12px;
  height:12px;
  color:rgba(58,94,255,1);
  opacity:0.3453;
}
</style>
