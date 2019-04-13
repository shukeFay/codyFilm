<template>
  <div>
    <div v-if="starnum != 0" id="range">
      <img v-if="starnum / 2 >0" src="../../../static/images/a.png" alt>
      <img v-else src="../../../static/images/b.png" alt>
      <img v-if="starnum / 2 >1" src="../../../static/images/a.png" alt>
      <img v-else src="../../../static/images/b.png" alt>
      <img v-if="starnum / 2 >2" src="../../../static/images/a.png" alt>
      <img v-else src="../../../static/images/b.png" alt>
      <img v-if="starnum / 2 >3" src="../../../static/images/a.png" alt>
      <img v-else src="../../../static/images/b.png" alt>
      <img v-if="starnum / 2 >4" src="../../../static/images/a.png" alt>
      <img v-else src="../../../static/images/b.png" alt>
      {{starnum}}
    </div>
    <div class="score" v-else>暂无评分</div>
  </div>
</template>

<script>
export default {
    props:['starnum']
};
</script>

<style lang="less">
#range {
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
</style>
