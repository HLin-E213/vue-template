<template>
  <div class="not-find">
    <div class="img-box">
      <img class="img-box__image" v-lazy="$imgCutting(imgUrl)" alt="" />
      <div class="img-box__btn-box">
        <button class="img-box__btn-box-button" @click="backHome()">
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance()
const { $imgCutting } = proxy
const imgUrl =
  'https://shigongbang.obs.cn-east-3.myhuaweicloud.com/app/2021/07/1627010212765.png'
const backHome = () => {
  console.log(process.env);
  window.location.href = process.env.VUE_APP_H5_HOME
}
</script>

<style lang="scss" scoped>
.not-find {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .img-box {
    margin: auto;
    &__image {
      width: 336px;
      height: 260px;
    }
    &__btn-box {
      display: flex;
      margin-top: 30px;
      &-button {
        width: 194px;
        height: 60px;
        margin: auto;
        color: var(--baseColor);
        background: var(--bgColor);
        border-radius: 10px;
        border: 1px solid var(--baseColor);
      }
    }
  }
}
</style>
