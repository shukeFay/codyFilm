<template>
  <div>
    <!-- 头部 -->
    <myheader/>
    <!-- 电影 -->
    <div class="box">
      <div class="title">
        <div hover-class="none" class="work">影院热映</div>
        <div hover-class="none" class="more">
          <a href="/pages/list/main?type=in_theaters">更多</a>
        </div>
      </div>
      <scroll-view scroll-x class="list">
        <div class="item" v-for="(item,index) in hotList" :key="index">
          <img :src="item.images.small" alt>
          <div class="name">{{item.title}}</div>
          <!-- <star :starnum="item.rating.average" /> -->
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
      </scroll-view>
    </div>
    <div class="box">
      <div class="title">
        <div hover-class="none" class="work">经典电影</div>
        <div hover-class="none" class="more">
          <a href="/pages/list/main?type=top250">更多</a>
        </div>
      </div>
      <scroll-view scroll-x class="list">
        <div class="item" v-for="(item,index) in oldList" :key="index">
          <img :src="item.images.small" alt>
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
          <div v-else>暂无评分</div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
//引入封装的请求接口文件
import myrequest from "../../utils/myrequest.js";
import myheader from "../../components/myheader";
// import star from "../../components/star";

export default {
  data() {
    return {
      hotList: [],
      oldList: []
    };
  },
  methods: {
    async gethotList() {
      var res = await myrequest({
        url: "http://douban.wangboqing.top/v2/movie/in_theaters",
        method: "get",
        data: {
          start: 0,
          count: 8,
          city: "深圳"
        },
        header: {
          "content-type": "json"
        }
      });
      this.hotList = res.data.subjects;
    },
    // 请求经典数据
    async getoldList() {
      var res = await myrequest({
        url: "http://douban.wangboqing.top/v2/movie/top250",
        method: "get",
        data: {
          start: 0,
          count: 8
        },
        header: {
          "content-type": "json"
        }
      });
      this.oldList = res.data.subjects;
    }
  },
  // // 请求影院热映数据
  mounted() {
    // 调用接口发送请求得到热映数据
    this.gethotList();
    this.getoldList();

    // wx.request({
    //   url:'http://douban.wangboqing.top/v2/movie/in_theaters',
    //   method:'get',
    //   data:{
    //     start: 0,
    //     count: 8,
    //     city: '深圳'
    //   },
    //   // 请求代理服务器必须在请求头中上 content-type: json
    //   header:{
    //     'content-type': 'json'
    //   },
    //   success: res =>{
    //     this.hotList = res.data.subjects;
    //   }
    // })
  },
  components: {
    myheader
    // star
  }
};
</script>

<style lang="less">
// 全局颜色
@color: #42bd56;

.box {
  .title {
    height: 98rpx;
    display: flex;
    line-height: 98rpx;
    justify-content: space-between;
    padding: 0 35rpx;
    font-size: 28px;
    font-weight: 700;
    .more {
      color: @color;
    }
  }
  .list {
    width: 100%;
    white-space: nowrap;
    .item {
      width: 200rpx;
      height: 400rpx;
      margin-right: 10rpx;
      display: inline-block;
      text-align: center;
      &:first-child {
        margin-left: 35rpx;
      }
      &:last-child {
        margin-right: 35rpx;
      }
      img {
        width: 200rpx;
        height: 286rpx;
      }
      .name {
        font-size: 16px;
        overflow: hidden;
        /*超出部分隐藏*/
        white-space: nowrap;
        /*不换行*/
        text-overflow: ellipsis;
        /*超出部分文字以...显示*/
      }
      .range {
        font-size: 14px;
        margin-top: 10rpx;
        color: #ccc;
        img {
          width: 20rpx;
          height: 20rpx;
        }
      }
      .score {
        font-size: 16px;
        margin-top: 6rpx;
      }
    }
  }
}
</style>
