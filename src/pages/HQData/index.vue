<template>
  <div class="box">
    <div class="right" ref="right">
      <!-- tabs 切换 -->
      <div class="rightContent" ref="rightContent">
        <div class="periodWrap kline_periodWrap" ref="kline_periodWrap">
          <div class="btnGroup" style="position:relative">
            <div
              class="btn2"
              v-for="(item, index) in KLinePeriodMenu"
              :class="{ active: KLinePeriodIndex == index }"
              :key="item.ID"
              @click="index == 0 ? changeRightContent('minute') : OnClickKLinePeriodMenu(index, item, 'kline')"
            >
              <span>{{ item.Name }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Line k 线图  canvas容器 -->
      <div class="hqchart" id="hqchart_minute" ref="kline" v-show="chartType == 'minute'"></div>
      <!-- 其他 k 线图  canvas容器 -->
      <div class="hqchart" id="hqchart_kline" ref="kline2" v-show="chartType == 'kline'"></div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import HQChart from 'hqchart'
import 'hqchart/src/jscommon/umychart.resource/css/tools.css'
import 'hqchart/src/jscommon/umychart.resource/font/iconfont.css'
import EastMoney from './eastmoney/HQData'

HQChart.Chart.MARKET_SUFFIX_NAME.GetMarketStatus = function (symbol)  { return 2; } //一直交易

function DefaultData () {}

// 其他   K线图配置项
DefaultData.GetKLineOption = function () {
  var option = {
    Type: '历史K线图', // 创建图形类型
    Language: 'EN',
    // 窗口指标
    Windows: [
      { Index: 'MA', Modify: true, Modify: false, Change: false, height: 20 },
      { Index: 'ATR', Modify: false, Change: false, Close: false }
      // { Index: "MACD", Modify: true, Change: true, Close: false }
    ],
    Symbol: '00960_128.hk',
    IsAutoUpdate: true, // 是自动更新数据
    AutoUpdateFrequency: 15000,
    IsApiPeriod: true,
    IsShowRightMenu: false, // 是否显示右键菜单
    // CorssCursorTouchEnd:true,
    SplashTitle: 'Loading',
    KLine: {
      DragMode: 1, // 拖拽模式 0 禁止拖拽 1 数据拖拽 2 区间选择
      Right: 0, // 复权 0 不复权 1 前复权 2 后复权
      Period: 0, // 周期 0 日线 1 周线 2 月线 3 年线
      MaxReqeustDataCount: 1000, // 数据个数
      PageSize: 60, // 一屏显示多少数据
      KLineDoubleClick: false, // 双击分钟走势图
      IsShowTooltip: true, // 是否显示K线提示信息
      DrawType: 0,
      RightSpaceCount: 2
    },

    CorssCursorInfo: { Left: 0, Right: 1 },

    // 标题设置
    KLineTitle: {
      IsShowName: false, // 不显示股票名称
      IsShowSettingInfo: false, // 不显示周期/复权
      isShowDateTime: true
    },

    // 边框
    Border: {
      Left: 1, // 左边间距
      Right: 1, // 右边间距
      Top: 0,
      Bottom: 15,
      AutoRight: { Blank: 10, MinWidth: 40 }
    },

    // 子框架设置
    Frame: [
      {
        SplitCount: 5,
        IsShowLeftText: false,
        IsShowYLine: false,
        Custom: [
          {
            Type: 0,
            Position: 'right'
          }
        ]
      },
      { SplitCount: 3, IsShowLeftText: false },
      { SplitCount: 3, IsShowLeftText: false }
    ],

    // 扩展图形
    ExtendChart: [
      // { Name:'KLineTooltip' },  //手机端tooltip
    ]
  }

  return option
}

// Line    k线图配置项
DefaultData.GetMinuteDayMenu = function () {
  var data = [
    { Name: '1D', ID: 1 },
    { Name: '2D', ID: 2 },
    { Name: '3D', ID: 3 },
    { Name: '4D', ID: 4 },
    { Name: '5D', ID: 5 }
  ]

  return data
}

// tabs 切换数组
DefaultData.GetKLinePeriodMenu = function () {
  var data = [
    { Name: 'Line', ID: 3 },
    { Name: 'Day', ID: 0 },
    { Name: 'Week', ID: 1 },
    { Name: 'Month', ID: 2 },
    { Name: '1 M', ID: 4 },
    { Name: '5 M', ID: 5 },
    { Name: '30 M', ID: 7 }
  ]

  return data
}

export default {
  data() {
    return {
      KLinePeriodMenu: DefaultData.GetKLinePeriodMenu(),
      // 初始加载 Day
      KLinePeriodIndex: 1,
      Symbol: '', // HQChart内部编码美股加后缀.usa AAPL.usa
      Chart: null, // 图形控件  分时图
      KLineChart: null, // 图形控件  K线图
      chartType: 'kline',
    }
  },
  created() {
    
  },
  mounted() {
    this.offHeight = this.$refs['rightContent'].offsetHeight
    // 监听窗口变化，自适应
    this.OnSize()
    this.$nextTick(() => {
      this.CreateMinuteChart()
      this.CreateKLineChart()
    })
  },
  methods: {
    // Line tabs 切换函数
    changeRightContent (type) {
      this.KLinePeriodIndex = 0
      this.chartType = type
      this.$nextTick(() => {
        this.OnSize()
      })
    },
    // 其他 tabs 切换函数
    OnClickKLinePeriodMenu (
      index,
      item,
      type // K线周期
    ) {
      if (index != 0) {
        console.log('type', type)
        this.chartType = type
        this.KLinePeriodIndex = index
        this.KLineChart.ChangePeriod(item.ID);
      }
    },
    // 初始化 自适应图标
    OnSize() {
      var width = this.$refs.right.clientWidth
      var chartHeight = this.offHeight
      var kline = this.$refs.kline
      kline.style.width = width + 'px'
      kline.style.height = chartHeight + 'px'
      var kline2 = this.$refs.kline2
      kline2.style.width = width + 'px'
      kline2.style.height = chartHeight + 'px'

      if (this.Chart) this.Chart.OnSize()
      if (this.KLineChart) this.KLineChart.OnSize()
    },
    //注释： 初始化 line(Minute) K线图
    CreateMinuteChart() {
      HQChart.Chart.JSChart.GetResource().FrameLogo.Text=null
    },
    //注释： 初始化 Kline(其他) K线图   必须在 GetKLineOption 中声明  type
    CreateKLineChart() {
      if (this.KLineChart) return
      var option = DefaultData.GetKLineOption()
      option.NetworkFilter = (data, callback) => {
        // 初始会 触发   日K数据 KLineChartContainer::RequestHistoryData   流通股本数据 KLineChartContainer::RequestFlowCapitalData     当天最新日线数据 KLineChartContainer::RequestRealtimeData
        // 当进行点击切换的时候， 还是触发的 日K数据 KLineChartContainer::RequestHistoryData，只是传递的参数不同，获取的不同
        this.NetworkFilter(data, callback)
      }
      var chart = HQChart.Chart.JSChart.Init(this.$refs.kline2)
      // 去掉左下角，仅供学习的提示
      HQChart.Chart.JSChart.GetResource().FrameLogo.Text=null
      chart.SetOption(option)
      this.KLineChart = chart
    },
    // 请求第三方数据
    NetworkFilter(data, callback) {
      console.log('name', data.Name)
      switch (data.Name) {
        // 分时图数据对接
        case 'MinuteChartContainer::RequestMinuteData':
          EastMoney.HQData.NetworkFilter(data, callback)
          break
        case 'MinuteChartContainer::RequestHistoryMinuteData':
          EastMoney.HQData.NetworkFilter(data, callback)
          break
        // Day
        case 'KLineChartContainer::RequestHistoryData': // 日线全量数据下载
          EastMoney.HQData.NetworkFilter(data, callback)
          break
        // Month
        case 'KLineChartContainer::RequestRealtimeData': // 日线实时数据更新
          EastMoney.HQData.NetworkFilter(data, callback)
          break
        // Week
        case 'KLineChartContainer::RequestFlowCapitalData': // 流通股本
          console.log('流通股本')
          EastMoney.HQData.NetworkFilter(data, callback)
          break
        case 'KLineChartContainer::ReqeustHistoryMinuteData': // 分钟全量数据下载
          EastMoney.HQData.NetworkFilter(data, callback)
          break
        case 'KLineChartContainer::RequestMinuteRealtimeData': // 分钟增量数据更新
          EastMoney.HQData.NetworkFilter(data, callback)
          break
      }
    }
  }
}
</script>

<style lang="less">
@animation-duration: 0.3s;

.box {
  width: 100%;
  height: 100%;
  // display: flex;
  position: relative;
  overflow: hidden;
  background: none;

  .left,
  .right {
    // position: absolute;
    top: 0;
  }

  .left {
    width: 240px;
    height: 100%;
    box-sizing: border-box;
    left: 0;
    // padding-top: 17px;
    overflow-x: auto;

    .el-menu {
      min-height: 100%;

      .el-submenu__title:hover {
        background-color: #363636 !important;
      }

      .el-menu-item:hover {
        background-color: #363636 !important;
      }
    }
  }

  .right {
    left: 240px;
    // width: calc(100% - 240px);
    width: 100%;
    height: 100%;
    @rightTabHeight: 40px;
    display: flex;
    flex-direction: column;

    .rightTab {
      height: @rightTabHeight;
      width: 100%;
      background: #191919;
      border-bottom: 1px solid #000;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      // flex-direction: column;

      > .btn {
        cursor: pointer;
        width: 100%;
        text-align: center;
        color: #000;

        &:first-child {
          padding-right: 60px;
          text-align: right;
        }

        &:last-child {
          padding-left: 60px;
          text-align: left;
        }

        &:hover,
        &.active {
          color: rgb(2, 99, 226);
        }
      }
    }

    .rightContent {
      height: calc(100% - @rightTabHeight);
      width: 100%;

      .kline_periodWrap {
        display: flex;
        justify-content: space-between;
        background: #191919;

        .btnGroup:first-child {
          width: 60%;
        }

        .btnGroup:last-child {
          width: 100%;
        }
      }
    }

    .btnGroup {
      // border: 1px solid #242424;
      color: #000;
      display: flex;
      background: #fff;

      .btn {
        margin: 0 0.1rem;
        align-items: center;
        justify-content: center;
        // border-right: 1px solid #242424;
        color: #000;
        cursor: pointer;

        &:last-child {
          border-right: none;
        }
      }
      .active {
        color: rgb(2, 99, 226);
        font-weight: 800;
        background: rgb(245, 245, 245);
      }
    }

    // .el-button-group{
    //   width: 100%;
    //   display: flex;

    //   .el-button{
    //     flex: 1;
    //   }
    // }

    #hqchart_minute {
      // height: 100%;
      background-color: #fff;
      height: 5rem;
      position: relative;
    }

    #hqchart_kline {
      // height: 100% !important;
      background-color: #fff;
      height: 5rem;
      position: relative;
    }

    .statementWrap {
      background: #191919;
      padding: 10px;
      font-size: 12px;
      color: #de432d;
      line-height: 20px;
      text-align: center;
    }
  }
}
// .schart-drawing {
//   height: 100% !important;
// }
.periodWrap {
  height: 0.7rem;
  // margin: 0.01rem 0 0.13rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff !important;
}
.btnGroup {
  height: 100%;
  .bt2 {
    height: 100% !important;
    box-shadow: none !important;
    img {
      width: 0.5rem; //dengwo xia
      height: 0.5rem;
    }
  }
}
.btn2 {
  width: 9.4%;
  height: 30px;
  display: flex;
  margin: 0 0.15rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.15rem;
  img {
    width: 0.5rem;
    height: 0.5rem;
  }
        .active {
        color: rgb(2, 99, 226);
        font-weight: 800;
        background: rgb(245, 245, 245);
      }
}
canvas {
  height: 100% !important;
}
.hqchart {
  width: 100%;
  height: 7.5rem;
}
</style>
