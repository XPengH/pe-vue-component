<template>
  <div class='score-setting'>
    <el-row class="setting-title">
      <span>甲级</span>
    </el-row>
    <el-row class="setting-content" type="flex" justify="start" align="middle">
      <div class="grid-content">
        <el-input @change="typeAMinScoreChange()" v-model="scoreParam.typeA.minScore" placeholder="请输入内容"></el-input>
        <span class="typeA-score"><&nbsp;&nbsp;分数&nbsp;&nbsp;≤&nbsp;&nbsp;{{scoreParam.typeA.maxScore}}</span>
      </div>
      <div class="grid-content bg-purple-light">
        <el-select v-model="scoreParam.typeA.relationValue" placeholder="请选择">
          <el-option
            v-for="item in relationOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="typeA-VetoNumber">单项否决数&nbsp;&nbsp;≤</span>
        <el-input-number @change="typeAMaxVetoNumberChange()" controls-position="right" size="mini" :min="0" :max="5" v-model="scoreParam.typeA.maxVetoNumber"></el-input-number>
      </div>
    </el-row>
    <el-row class="setting-title">
      <span>乙级</span>
    </el-row>
    <el-row class="setting-content" type="flex" justify="start" align="middle">
      <span class="score-warning" v-if="scoreWarningShow">分数上线需大于下限，请重新输入！</span>
      <span class="veto-warning" v-if="vetoWarningShow">单项否决数上限需大于下限，请重新选择！</span>
      <div class="grid-content">
        <el-input v-model="scoreParam.typeB.minScore" @change="checkScoreWarning()" placeholder="请输入内容"></el-input>
        <span class="typeB-score"><&nbsp;&nbsp;分数&nbsp;&nbsp;≤</span>
        <el-input v-model="scoreParam.typeB.maxScore" @change="checkScoreWarning()" placeholder="请输入内容"></el-input>
      </div>
      <div class="grid-content bg-purple-light">
        <el-select class="typeB-relation" v-model="scoreParam.typeB.relationValue" placeholder="请选择">
          <el-option
            v-for="item in relationOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input-number @change="checkVetoWarning()" size="mini" controls-position="right" :min="0" :max="5" v-model="scoreParam.typeB.minVetoNumber"></el-input-number>
        <span class="typeB-VetoNumber"><&nbsp;&nbsp;单项否决数&nbsp;&nbsp;≤</span>
        <el-input-number @change="checkVetoWarning()" size="mini" controls-position="right" :min="0" :max="5" v-model="scoreParam.typeB.maxVetoNumber"></el-input-number>
      </div>
    </el-row>
    <el-row class="setting-title">
      <span>丙级</span>
    </el-row>
    <el-row class="setting-content" type="flex" justify="start" align="middle">
      <div class="grid-content">
        <span>丙级数&nbsp;&nbsp;≥&nbsp;&nbsp;1&nbsp;&nbsp;;&nbsp;&nbsp;</span>
        <span style="margin-right: 24px;">或&nbsp;&nbsp;0&nbsp;&nbsp;≤&nbsp;&nbsp;分数&nbsp;&nbsp;≤</span>
        <el-input @change="typeCMaxScoreChange()" v-model="scoreParam.typeC.maxScore" placeholder="请输入内容"></el-input>
      </div>
      <div class="grid-content bg-purple-light">
        <el-select class="typeC-relation" v-model="scoreParam.typeC.relationValue" placeholder="请选择">
          <el-option
            v-for="item in relationOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="typeC-VetoNumber">单项否决数&nbsp;&nbsp;≥</span>
        <el-input-number size="mini" controls-position="right" :min="0" :max="5" v-model="scoreParam.typeC.minVetoNumber"></el-input-number>
      </div>
    </el-row>
  </el-select>
  </div>
</template>

<script>
import {relationOptions, vetoOptions} from '@/assets/optionConfig.js';
export default {
  name: 'ScoreSetting',
  data () {
    return {
      relationOptions,
      vetoOptions,
      scoreWarningShow: false,
      vetoWarningShow: false
    };
  },
  computed: {
    scoreParam () {
      return this.$store.state.qualityControl.scoreParam;
    }
  },
  methods: {
    typeAMaxVetoNumberChange () {
    },
    typeAMinScoreChange () {
      if (this.testNumber(this.scoreParam.typeA.minScore)) {
        const minScore = parseInt(this.scoreParam.typeA.minScore);
        if (minScore >= 99) {
          this.scoreParam.typeA.minScore = 99; // 下限最大99最小0
        }
        if (minScore <= 0) {
          this.scoreParam.typeA.minScore = 0;
        }
        this.scoreParam.typeB.maxScore = this.scoreParam.typeA.minScore; // 修改乙级上限
      }
    },
    typeBMinScoreChange () {
      if (this.testNumber(this.scoreParam.typeB.minScore)) {
        const minScore = parseInt(this.scoreParam.typeB.minScore);
        if (minScore <= 0) {
          this.scoreParam.typeB.minScore = 0;
        }
        this.scoreParam.typeC.maxScore = this.scoreParam.typeB.minScore; // 修改丙级上限
      }
    },
    typeBMaxScoreChange () {
      if (this.testNumber(this.scoreParam.typeB.maxScore)) {
        const maxScore = parseInt(this.scoreParam.typeB.maxScore);
        if (maxScore >= 99) {
          this.scoreParam.typeB.maxScore = 99;
        }
        this.scoreParam.typeA.minScore = this.scoreParam.typeB.maxScore; // 修改甲级下限
      }
    },
    typeCMaxScoreChange () {
      if (this.testNumber(this.scoreParam.typeC.maxScore)) {
        const maxScore = parseInt(this.scoreParam.typeC.maxScore);
        if (maxScore >= 99) {
          this.scoreParam.typeC.maxScore = 99;
        }
        this.scoreParam.typeB.minScore = this.scoreParam.typeC.maxScore; // 修改甲级下限
      }
    },
    testNumber (data) {
      return /^[0-9]*$/.test(data);
    },
    checkScoreWarning () {
      this.typeBMaxScoreChange();
      this.typeBMinScoreChange();
      if (this.testNumber(this.scoreParam.typeB.minScore) && this.testNumber(this.scoreParam.typeB.maxScore)) {
        const diff = parseInt(this.scoreParam.typeB.minScore) - parseInt(this.scoreParam.typeB.maxScore);
        if (diff > 0) {
          this.scoreWarningShow = true;
        } else {
          this.scoreWarningShow = false;
        }
      }
    },
    checkVetoWarning () {
      if (this.testNumber(this.scoreParam.typeB.minVetoNumber) && this.testNumber(this.scoreParam.typeB.maxVetoNumber)) {
        const diff = parseInt(this.scoreParam.typeB.minVetoNumber) - parseInt(this.scoreParam.typeB.maxVetoNumber);
        if (diff > 0) {
          this.vetoWarningShow = true;
        } else {
          this.vetoWarningShow = false;
        }
      }
    }
  }
};
</script>

<style scoped>
.score-setting {
  padding: 8px;
  height: 558px;
  max-height: 558px;
}
.setting-content {
  padding-bottom: 32px;
  border-bottom: 1px dashed #C9C9C9;
  margin-bottom: 23px;
  position: relative;
}
.typeA-score {
  margin-left: 24px;
  margin-right: 56px;
}
.typeA-VetoNumber{
  margin-left: 56px;
  margin-right: 24px;
}
.typeB-VetoNumber{
  margin-left: 24PX;
  margin-right: 24px;
}
.typeB-score{
  margin: 0px 24px;
}
.typeB-relation{
  margin: 0 56px;
}
.typeC-relation{
  margin-left: 56px;
}
.typeC-VetoNumber{
  margin: 0 56px;
}
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
.setting-title{
  margin-bottom: 16px;
}
.score-warning{
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: red;
}
.veto-warning{
  position: absolute;
  bottom: 10px;
  right: 300px;
  color: red;
}
</style>
