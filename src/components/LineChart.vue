<template>
  <div style="width: 100%">
    <chart class="chart" :options="option"></chart>
  </div>
</template>
<script>
  import LogUtils from '../util/LogUtils'

  export default {
    props: ['symbol'],
    created () {
      let symbol = this.symbol
      let quote = localStorage.getItem(symbol)
      LogUtils.d(quote)
      let s = JSON.stringify({
        symbol: symbol,
        exchange: quote.Exchange,
        starttime: '2017-11-20 06:00',
        datatype: 'min'
      })
      LogUtils.d(s)
      this.$socket.emit('getHistoryData', s)
    },
    sockets: {
      getHistoryData: function (msg) {
        LogUtils.d(msg)
        let list = JSON.parse(msg)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          this.option.series[0].data.push(item.Close)
          this.option.xAxis.data.push(item.sDate.replace('T', ' '))
        }
      }
    },
    data () {
      return {
        option: {
          animation: false,
          dataZoom: [
            {
              type: 'inside',
              start: 90,
              end: 100
            }
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            splitLine: {
              show: false
            },
            data: []
          },
          yAxis: {
            splitLine: {
              show: false
            },
            min: 'dataMin',
            max: 'dataMax',
            splitNumber: 3
          },
          series: [{
            name: '价格',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: []
          }]
        }
      }
    }
  }
</script>
<style scoped>
  .chart {
    width: 500px;
    height: 400px;
  }
</style>
