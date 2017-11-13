<template>
  <div>
    <mt-header fixed :title="$route.params.symbol">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right">玩法</mt-button>
    </mt-header>

    <mt-navbar class="fit" v-model="selected">
      <mt-tab-item id="1">分时图</mt-tab-item>
      <mt-tab-item id="2">K线图</mt-tab-item>
      <mt-tab-item id="3">选项三</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container class="fit" v-model="selected">
      <mt-tab-container-item class="fit" id="1">
        <line-chart class="chart" :symbol="symbol"></line-chart>
      </mt-tab-container-item>
      <mt-tab-container-item id="2" class="fit">
        <k-chart class="chart" :symbol="symbol"></k-chart>
      </mt-tab-container-item>
      <mt-tab-container-item id="3" class="fit">
        <k-chart class="chart" :symbol="symbol"></k-chart>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import LineChart from './LineChart'
  import KChart from './KChart'
  import LogUtils from '../util/LogUtils'

  export default {
    name: 'Trade',
    components: {
      LineChart,
      KChart
    },
    created () {
      this.symbol = this.$route.params.symbol
    },
    data () {
      return {
        selected: 1,
        symbol: ''
      }
    },
    method: {
      priceChange: function (symbol) {
        LogUtils.e(symbol)
      }
    }
  }
</script>
<style scoped>
  .fit{
    width:100%;
  }
  .chart {
    width: 100%;
    height: 400px;
  }
</style>
