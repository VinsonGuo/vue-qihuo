<template>
  <div>
    <mt-header fixed :title="$route.params.symbol">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right">玩法</mt-button>
    </mt-header>

    <chart class="chart" :options="option"></chart>
  </div>
</template>
<script>
  import LogUtils from '../util/LogUtils'

  export default {
    name: 'Trade',
    mounted () {
      let symbol = this.$route.params.symbol
      let quote = window.symbolList.filter((item) => item.Symbol === symbol)[0]
      LogUtils.d(quote)
      let s = JSON.stringify({
        symbol: symbol,
        exchange: quote.Exchange,
        starttime: '2017-11-10 06:00',
        datatype: 'min'
      })
      LogUtils.d(s)
      this.$socket.emit('getHistoryData', s)
    },
    sockets: {
      getHistoryData: function (msg) {
        LogUtils.d(msg)
        let list = JSON.parse(msg)
        this.dateList = list.map((item) => {
          return item.sDate
        })
        this.valueList = list.map((item) => {
          return item.Close
        })
      }
    },
    data () {
      return {

        dateList: ['test'],
        valueList: [0],
        option: {
          // Make gradient line here
          visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          }, {
            show: false,
            type: 'continuous',
            seriesIndex: 1,
            dimension: 0,
            min: 0,
            max: this.dateList.length - 1
          }],

          title: [{
            left: 'center',
            text: 'Gradient along the y axis'
          }, {
            top: '55%',
            left: 'center',
            text: 'Gradient along the x axis'
          }],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{
            data: this.dateList
          }, {
            data: this.dateList,
            gridIndex: 1
          }],
          yAxis: [{
            splitLine: {show: false}
          }, {
            splitLine: {show: false},
            gridIndex: 1
          }],
          grid: [{
            bottom: '60%'
          }, {
            top: '60%'
          }],
          series: [{
            type: 'line',
            showSymbol: false,
            data: this.valueList
          }, {
            type: 'line',
            showSymbol: false,
            data: this.valueList,
            xAxisIndex: 1,
            yAxisIndex: 1
          }]
        }
      }
    }
  }
</script>
<style scoped>
  .chart {
    width: 100%;
    height: 400px;
  }
</style>
