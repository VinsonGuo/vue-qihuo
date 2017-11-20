<template>
  <div style="width: 100%">
    <chart class="chart" :options="option"></chart>
  </div>
</template>
<script>
  import LogUtils from '../util/LogUtils'

  const upColor = '#00da3c'
  const downColor = '#ec0000'

  let data = {}
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
        LogUtils.d('getHistoryData success')
        let list = JSON.parse(msg)
        let rowData = []
        list.forEach((item) => {
          rowData.push([item.sDate, item.Open, item.Close, item.Low, item.High, item.Vol])
        })
        data = splitData(rowData)
      }
    },
    data () {
      return {
        option: {
          backgroundColor: '#fff',
          animation: false,
//          tooltip: {
//            trigger: 'axis',
//            axisPointer: {
//              animation: false
//            }
//          },
          grid: [
            {
              height: '50%'
            },
            {
              top: '63%',
              height: '16%'
            }
          ],
          xAxis: [
            {
              type: 'category',
              data: data.categoryData,
              boundaryGap: false,
              axisLine: {onZero: false},
              splitLine: {show: false},
              axisLabel: {show: false},
              min: 'dataMin',
              max: 'dataMax'
            },
            {
              type: 'category',
              gridIndex: 1,
              data: data.categoryData,
              boundaryGap: false,
              axisLine: {onZero: true},
              axisTick: {show: false},
              splitLine: {show: false},
              axisLabel: {show: true},
              min: 'dataMin',
              max: 'dataMax'
            }
          ],
          yAxis: [
            {
              splitLine: {
                show: false
              },
              min: 'dataMin',
              max: 'dataMax',
              splitNumber: 3
            },
            {
              splitLine: {
                show: false
              },
              gridIndex: 1,
              splitNumber: 1,
              axisLabel: {show: false}
            }
          ],
          /* dataZoom: [
             {
               type: 'inside',
               xAxisIndex: [0, 1],
               start: 90,
               end: 100
             }
           ],*/
          series: [
            {
              name: 'K线图',
              type: 'candlestick',
              data: data.values,
              showSymbol: false,
              hoverAnimation: false,
              itemStyle: {
                normal: {
                  color: upColor,
                  color0: downColor,
                  borderColor: null,
                  borderColor0: null
                }
              }
            },
            {
              name: 'MA5',
              showSymbol: false,
              hoverAnimation: false,
              type: 'line',
              data: calculateMA(5, data),
              lineStyle: {
                normal: {opacity: 0.5}
              }
            },
            {
              name: 'MA10',
              showSymbol: false,
              hoverAnimation: false,
              type: 'line',
              data: calculateMA(10, data),
              lineStyle: {
                normal: {opacity: 0.5}
              }
            },
            {
              name: 'MA20',
              type: 'line',
              showSymbol: false,
              hoverAnimation: false,
              data: calculateMA(20, data),
              lineStyle: {
                normal: {opacity: 0.5}
              }
            },
            {
              name: 'MA30',
              type: 'line',
              showSymbol: false,
              hoverAnimation: false,
              data: calculateMA(30, data),
              lineStyle: {
                normal: {opacity: 0.5}
              }
            },
            {
              name: 'Volume',
              type: 'bar',
              showSymbol: false,
              hoverAnimation: false,
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: data.volumes
            }
          ]
        }
      }
    }
  }

  function splitData (rawData) {
    let categoryData = []
    let values = []
    let volumes = []
    for (let i = 0; i < rawData.length; i++) {
      categoryData.push(rawData[i].splice(0, 1)[0])
      values.push(rawData[i])
      volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1])
    }

    return {
      categoryData: categoryData,
      values: values,
      volumes: volumes
    }
  }

  function calculateMA (dayCount, data) {
    let result = []
    for (let i = 0, len = data.values.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-')
        continue
      }
      let sum = 0
      for (let j = 0; j < dayCount; j++) {
        sum += data.values[i - j][1]
      }
      result.push(+(sum / dayCount).toFixed(3))
    }
    return result
  }
</script>
<style scoped>
  .chart {
    width: 500px;
    height: 400px;
  }
</style>
