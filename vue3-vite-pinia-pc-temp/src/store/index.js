import { defineStore } from 'pinia'

export const userTokenStore = defineStore('userStore', {
  state: () => {
    return {
      token: '123',
      name: '3333'
    }
  },
  actions: {
    // 退出登录
    logOut() {
      return new Promise((resolve, reject) => {
      })
    }
  },
  getters: {
  }
})
