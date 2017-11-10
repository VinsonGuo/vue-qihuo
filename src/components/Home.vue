<template>
  <div>
    <mt-header fixed title="主页"></mt-header>
    <mt-cell v-for="symbol in symbolList" :key="symbol.Symbol" :title="symbol.Symbolname" :label="symbol.Symbol"
             :value="symbol.LastPrice" :to="'/trade/'+symbol.Symbol"
             is-link></mt-cell>
  </div>
</template>
<script>
  //  import qs from 'qs'
  //  import HttpUtils from '../util/HttpUtils'
  import LogUtils from '../util/LogUtils'

  export default {
    name: 'Home',
    data () {
      return {
        symbolList: window.symbolList
      }
    },
    mounted () {
      LogUtils.d('emit getSymbolList')
      this.$socket.emit('getSymbolList')
    },
    sockets: {
      singleTopMarketData: function (msg) {
        let quote = JSON.parse(msg)
        this.symbolList.forEach((item, index) => {
          if (quote.Symbol === item.Symbol) {
            this.symbolList.splice(index, 1, quote)
          }
        })
      },
      getSymbolList: function (msg) {
        LogUtils.d(msg)
        JSON.parse(msg).forEach((item) => {
          this.symbolList.push(item)
        })
        LogUtils.d(this.symbolList)
      }
    },
    methods: {}
  }
</script>

