<template>
  <div>
    <!-- 头部区域 -->
    <myheader />
    <!-- 电影信息 -->
    <div class="movieList">
      <div hover-class="none" class="title">{{title}}</div>
      <div class="list">
        <div class="item" v-for="(item,index) in dataList" :key="index">
          <img :src="item.images.small" alt="">
          <div class="name">{{item.title}}</div>
          <div v-if="item.rating.average != 0" class="range">
           <img v-if="item.rating.average / 2 >0" src="../../../static/images/a.png" alt>
            <img v-else src="../../../static/images/b.png" alt>
            <img v-if="item.rating.average / 2 >1" src="../../../static/images/a.png" alt>
            <img v-else src="../../../static/images/b.png" alt>
            <img v-if="item.rating.average / 2 >2" src="../../../static/images/a.png" alt>
            <img v-else src="../../../static/images/b.png" alt>
            <img v-if="item.rating.average / 2 >3" src="../../../static/images/a.png" alt>
            <img v-else src="../../../static/images/b.png" alt>
            <img v-if="item.rating.average / 2 >4" src="../../../static/images/a.png" alt>
            <img v-else src="../../../static/images/b.png" alt> 
            {{item.rating.average}}
            </div>
            <div class="score" v-else>暂无评分</div>
        </div>
      </div>
    </div>
    <div class="foot" v-if="isEnd === true">
      -- 我是有底线的 --
    </div>
  </div>
</template>

<script>
//引入封装的请求接口文件
import myrequest from "../../utils/myrequest.js";
import myheader from "../../components/myheader"

export default {
  data() {
    return {
      data: {
        start: 0,
        count: 9,
        city: '深圳'
      },
      dataList:[],
      title:'',
      query:{},
      isEnd: false
    };
  },
  methods: {
    async getDataList(){
      // 在导航条中添加加载动画
      wx.showNavigationBarLoading();
      if (this.isEnd) {
         // 提示数据已经全部加载
         wx.showToast({
            title: '数据已经加载完毕',
          icon: 'none',
          duration: 2000
         })
         return
      }
      // 打开加载动画
      wx.showLoading({
        title: '加载中'
      })
      // 得到请求的列表数据
       this.query = this.$root.$mp.query;
      // switch判断 如果 query 为 in_theaters => 正在热映
      // 如果 query 为 top250  => 经典电影
      switch(this.query.type){
        case 'in_theaters':
        this.title = "正在热映"
        break;
        case 'top250':
        this.title = "经典电影"
        break;
      }
      var res = await myrequest({
        url:'http://douban.wangboqing.top/v2/movie/'+ this.query.type,
        data:this.data,
        header:{
          'content-type': 'json'
        }
      })

      if (res.data.subjects.length==0) {
        //提示数据已经全部加载
        wx.showToast({
          title: '数据已经加载完毕',
          icon: 'none',
          duration: 2000
        })
        // 将开关设置为关
        this.isEnd = true;
        return
      }

      // 当第一次加载时，要直接赋值
      // 第二次及以后，不是直接赋值，而是将两个数组进行拼接
      if (this.dataList.length==0) {
        this.dataList = res.data.subjects;
      }else {
        this.dataList = this.dataList.concat(res.data.subjects);
      }
      // 关闭加载框
      wx.hideLoading()
      // 关闭下拉框
      wx.stopPullDownRefresh();
      // 关闭导航中的加载框
      wx.hideNavigationBarLoading();
      
    }
  },
  // // 请求影院热映数据
  mounted() {
    // 调用接口发送请求得到热映数据
    this.getDataList();
  },
   components: {
    myheader
  },
  // 上拉加载事件
  onReachBottom(){
    // 将开始数据加上每页的容器
    this.data.start += this.data.count;
    // console.log(this.data.start);
    
    // 加载更多数据
    this.getDataList();
  },
  // 下拉刷新
  onPullDownRefresh(){
    //刷新页面（将所有数据恢复到默认值）
    this.data.start = 0;
    this.dataList = [];
    this.isEnd = false;
    // 数据重新请求
    this.getDataList();
  }
}
</script>

<style lang="less">
// 全局颜色
@color: #42bd56;
.headTop {
  height: 94rpx;
  display: flex;
  line-height: 94rpx;
  justify-content: space-between;
  padding: 0 35rpx;
  border-bottom: 1px solid #ccc;
  .left {
    display: flex;
    .title {
      color: @color;
      font-size: 36px;
      font-weight: 700;
      margin-right: 36rpx;
    }
    .search {
      margin-top: 14rpx;
    }
  }
  .right {
    button {
      background-color: @color;
      color: #fff;
      font-size: 16px;
      padding: 0 20rpx;
      margin-top: 9rpx;
    }
  }
}
.movieList {
  padding: 0 35rpx;
  .title {
    height: 100rpx;
    line-height: 100rpx;
    padding: 0 35rpx;
    font-weight: 700;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 33.33%;
      img {
        width: 96%;
        height: 286rpx;
      }
      .name {
        font-size: 16px;
        text-align: center;
        overflow: hidden;
        /*超出部分隐藏*/
        white-space: nowrap;
        /*不换行*/
        text-overflow: ellipsis;
        /*超出部分文字以...显示*/
      }
      .range {
        text-align: center;
        color: #ccc;
        img {
          width: 20rpx;
          height: 20rpx;
        }
      }
      .score{
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
.foot {
  text-align: center;
  font-size: 16px;
  color: #ccc;
}
</style>
