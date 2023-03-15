import { defineStore } from 'pinia'

export const userTokenStore = defineStore('userStore', {
  state: () => {
    return {
      token: '123'
    }
  },
  actions: {
  },
  getters: {
  }
})
