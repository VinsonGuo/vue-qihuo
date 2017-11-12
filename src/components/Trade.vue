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

   let dateList= ['test']
   let valueList= [0]
  export default {
    name: 'Trade',
    created () {
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
        dateList = list.map((item) => {
          return item.sDate
        })
        valueList = list.map((item) => {
          return item.Close
        })
      }
    },
    data () {
      return {
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
            max: dateList.length - 1
          }],*/

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
            data: dateList
          }, {
            data: dateList,
            gridIndex: 1
          }],
          yAxis: [{
            splitLine: {show: false},
            min:(value)=>{value.min}
          }, {
            splitLine: {show: false},
            gridIndex: 1,
            min:Math.min(...valueList)
          }],
          grid: [{
            bottom: '60%'
          }, {
            top: '60%'
          }],
          series: [{
            type: 'line',
            showSymbol: false,
            data: valueList
          }, {
            type: 'line',
            showSymbol: false,
            data: valueList,
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
