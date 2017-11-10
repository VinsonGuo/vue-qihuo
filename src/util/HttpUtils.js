import LogUtils from './LogUtils'

export default class HttpUtils {
  static handleResponse = (response) => {
    LogUtils.d(response)
    if (Number(response.data.rcode) === 0) {
      return response.data.result
    }
    throw new Error(response.data.rmsg)
  }
}
