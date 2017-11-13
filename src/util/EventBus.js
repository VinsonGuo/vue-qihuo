import Vue from 'vue'

export default class EventBus {
  static instance = new Vue()
  static priceChange = 'priceChange'

  static getDefault () {
    return EventBus.instance
  }
}
