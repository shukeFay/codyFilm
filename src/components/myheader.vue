<template>
   <!-- 头部区域 -->
    <div class="headTop">
      <div class="left">
        <a hover-class="none" class="title" href="#">豆瓣</a>
        <a hover-class="none" class="search" href="#">
          <!-- 小程序的字体图标 -->
          <icon type="search" size="30" color="#42bd56"/>
        </a>
      </div>
      <div class="right">
        <button>打开豆瓣APP</button>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
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
</style>
