import $ from 'jquery'
import HQChart from 'hqchart'
import dayjs from 'dayjs'
import KlineData from '../../../KlineData.json'

// 声明函数，并在其上面挂载方法，方便调用
function HQData () { }

// 备注接口由来
HQData.Explain = '憨八猪喜欢憨八龟'

// 挂载打印方法，方便调试
HQChart.Chart.JSConsole.Chart.Log = () => { }
HQChart.Chart.JSConsole.Complier.Log = () => { }
HQData.Log = HQChart.Chart.JSConsole.Chart.Log

//注释： 初始化 Day 调用 NetworkFilter 函数该触发该函数
HQData.NetworkFilter = function (data, callback) {
  HQData.Log (`[HQData::NetworkFilter] ${HQData.Explain}` );
  switch (data.Name) {
    case 'MinuteChartContainer::RequestMinuteData': // 分时图数据对接
      HQData.RequestMinuteData(data, callback)
      break
    case 'MinuteChartContainer::RequestHistoryMinuteData':
      HQData.RequestMinuteDaysData(data, callback)
      break;
    case 'KLineChartContainer::RequestHistoryData': // 日线全量数据下载
      HQData.RequestHistoryData(data, callback)
      break
    case 'KLineChartContainer::RequestRealtimeData': // 日线实时数据更新
      HQData.RequestRealtimeData(data, callback)
      break
    case 'KLineChartContainer::RequestFlowCapitalData': // 流通股本
      HQData.RequestFlowCapitalData(data, callback)
      break
    case 'KLineChartContainer::ReqeustHistoryMinuteData': // 分钟全量数据下载
      HQData.RequestHistoryMinuteData(data, callback)
      break
    case 'KLineChartContainer::RequestMinuteRealtimeData': // 分钟增量数据更新
      HQData.RequestMinuteRealtimeData(data, callback)
      break
  }
}

// 日线全量数据下载
HQData.RequestHistoryData = async function(data, callback) {
  console.log('data', data)
  data.PreventDefault = true
  var symbol = data.Request.Data.symbol // 请求的股票代码
  var period = data.Self.Period //周期
  var right = data.Self.Right // 复权
  if((await HQData.FutuApiHistoryData(data, callback)) === true){
    return ;
  }
}

// 获取第三方数据请求函数
HQData.FutuApiHistoryData = function (data, callback) {
  console.log('HQData.FutuApiHistoryData', data)
  // 请求参数：股票代码
  var symbol = data.Request.Data.symbol+""
  // 请求参数：获取股票的条数
  var dayCount = ((data.Request || {} ).Data || {}).dayCount || 100
  // 请求参数：周期
  var period = data.Self.Period === undefined ? 4 : data.Self.Period 
  // HQData.Log("HQData.FutuApiHistoryData RequestHistoryKL init --- " ,period , symbol, dayCount, data );
  // 请求成功返回 true，失败返回 false
  var isTurn = false

  // 此处判断股票的类型，例如 hk 港股； us 美股，不同的股票类型，可以走不同的请求接口
  if((symbol.indexOf('hk') > -1)) {
    try {
      // 调用接口请求数据
      // $.ajax(
      //   {
      //     url: obj.Url,
      //     type: 'GET',
      //     success: function (recvData) {
            isTurn = true
            console.log('week')
            HQData.RecvHistoryData(KlineData, symbol ,callback)
      //     }
      //   }
      // )

    } catch(e) {
      
    }
  }

  return isTurn
}

// 处理数据，并返回
HQData.RecvHistoryData = function (data, symbol,callback) {
  console.log('数据', data)
  // k线图数据
  let klines = []
  data.forEach(({time,isBlank,highPrice,openPrice,lowPrice,closePrice,lastClosePrice,volume,turnover,turnoverRate,pe,changeRate,timestamp}) => {
    let avprice = openPrice;
    // 时间插件，处理时间格式
    let _now = dayjs(timestamp*1000);
    let date = parseInt(_now.format('YYYYMMDD'));
    let _time = (parseInt(_now.format('H'))*100)+parseInt(_now.format('m'))
    // [20240105, 11.16, 11.06, 11.52, 10.86, 11.18, '13162970', 147398727, 0, 11.06]
    klines.push([date, lastClosePrice, openPrice, highPrice, lowPrice, closePrice, volume, turnover , _time, avprice])
  })
  klines = Object.values(klines);
  console.log('数据', data, symbol)
  // 定义 k 线图数据
  var hqchartData = {
    data: klines, // k线图数据
    symbol
  }
  console.log('dwdwdw', hqchartData)
  callback(hqchartData)
}

// 流通股本
HQData.RequestFlowCapitalData = function (data, callback) {
  console.log('week')
  data.PreventDefault = true
  var hqChartData = {code: 0, stock: []} // 如果没有数据就填空
  console.log('流通股本', hqChartData)
  if (data.Self.IsDestroy == false) {
    callback(hqChartData)
  }
}

// 当天最新日线数据
HQData.RequestRealtimeData = function (data, callback) {
  data.PreventDefault = true
  var hqChartData = {code: 0, stock: []} // 如果没有数据就填空
  console.log('当天最新日线数据', hqChartData)
  if (data.Self.IsDestroy == false) {
    callback(hqChartData)
  }
}

export default
{
  HQData: HQData
}