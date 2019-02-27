<template>
  <div class='score-setting'>
    <el-row :gutter="10" type="flex" justify="start" align="middle">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="grid-content">
          <span>甲级</span>
          <el-input v-model="scoreParam.typeA.minScore" placeholder="请输入内容"></el-input>
          <span><分数≤{{scoreParam.typeA.maxScore}}</span>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="grid-content bg-purple-light">
          <el-select v-model="scoreParam.typeA.relationValue" placeholder="请选择">
            <el-option
              v-for="item in relationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>单项否决数≤</span>
          <el-select v-model="scoreParam.typeA.maxVetoNumber" placeholder="请选择">
            <el-option
              v-for="item in vetoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" type="flex" justify="start" align="middle">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="grid-content">
          <span>乙级</span>
          <el-input v-model="scoreParam.typeB.minScore" placeholder="请输入内容"></el-input>
          <span><分数≤</span>
          <el-input v-model="scoreParam.typeB.maxScore" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="grid-content bg-purple-light">
          <el-select v-model="scoreParam.typeB.relationValue" placeholder="请选择">
            <el-option
              v-for="item in relationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="scoreParam.typeB.minVetoNumber" placeholder="请选择">
            <el-option
              v-for="item in vetoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>单项否决数≤</span>
          <el-select v-model="scoreParam.typeB.maxVetoNumber" placeholder="请选择">
            <el-option
              v-for="item in vetoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" type="flex" justify="start" align="middle">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="grid-content">
          <span>丙级</span>
          <span>丙级数 ≥1; </span>
          <span>或 0≤分数≤</span>
          <el-input v-model="scoreParam.typeC.maxScore" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="grid-content bg-purple-light">
          <el-select v-model="scoreParam.typeC.relationValue" placeholder="请选择">
            <el-option
              v-for="item in relationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>单项否决数＞</span>
          <el-select v-model="scoreParam.typeC.maxVetoNumber" placeholder="请选择">
            <el-option
              v-for="item in vetoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
  </el-select>
    
  </div>
</template>

<script>
import {relationOptions, vetoOptions} from '@/assets/optionConfig.js';
export default {
  name: 'ScoreSetting',
  data() {
    return {
      relationOptions,
      vetoOptions,
      scoreParam: {
        typeA: {
          minValue: 0,
          relationValue: '且',
          maxVetoNumber: 0,
          minScore: 0,
          maxScore: 0,
        },
        typeB: {
          minValue: 0,
          maxValue: 0,
          relationValue: '且',
          minVetoNumber: 0,
          maxVetoNumber: 0,
          minScore: 0,
          maxScore: 0,
        },
        typeC: {
          minValue: 0,
          maxValue: 0,
          relationValue: '且',
          minVetoNumber: 0,
          maxVetoNumber: 0,
          minScore: 0,
          maxScore: 0,
        }
      }
    };
  },
  methods: {
  }
};
</script>

<style scoped>
.grid-content {
  display: flex;
  flex-direction: row;
  align-items: center;
}
span {
  white-space:nowrap;
  line-height: 100%;
}
.row-bg {
  display: flex;
}
</style>
