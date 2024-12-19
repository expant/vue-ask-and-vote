import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'
import axiosApiInstance from '@/axios/request'

const url = import.meta.env.VITE_FIREBASE_DB_CARDS_URL

export const useCardsStore = defineStore('cards', () => {
  const cards = ref([])
  const error = ref('')
  const loader = ref(false)

  // const getCard = async (cardId) => {
  //   try {
  //     const response = await axiosApiInstance.get(`/cards/${cardId}`)
  //     card.value = response.data
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const getAllCards = async () => {
    cards.value = []
    loader.value = true
    try {
      const response = await axiosApiInstance.get(`${url}.json`)
      const data = Object.entries(response.data)

      cards.value = data
        .map(([id, card]) => ({
          text: card.text,
          options: card.options,
          createdAt: card.createdAt,
          totalVotes: card.totalVotes || 0,
          voterIds: card.voterIds || [],
          id,
        }))
        .reverse()
    } catch (err) {
      const message = err.response.data.error.message
      error.value = message
      console.log(err)
    } finally {
      loader.value = false
    }
  }

  const addNewCard = async (payload) => {
    try {
      const response = await axiosApiInstance.post(`${url}/.json`, JSON.stringify(payload))
      getAllCards()
    } catch (err) {
      console.log(err)
    }
  }

  const checkVotedByCard = async (card) => {
    const authStore = useAuthStore()
    const responseVoterIds = await axiosApiInstance.get(`${url}/${card.id}/voterIds/.json`)
    if (!responseVoterIds.data) {
      return false
    }

    const userId = responseVoterIds.data.find((id) => id === authStore.userInfo.userId)
    if (userId) {
      return true
    }
    return false
  }

  const updateCard = async (card, payload) => {
    try {
      await axiosApiInstance.patch(`${url}/${card.id}/.json`, JSON.stringify(payload))
    } catch (err) {
      console.error(err)
    }
  }

  const getCardsByUser = async () => {
    const authStore = useAuthStore()

    try {
      const response = await axiosApiInstance.get(`${url}/.json`)
      const data = Object.entries(response.data)
      const userCards = data.filter(([_, card]) => card.authorId === authStore.userInfo.userId)
      console.log(userCards)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    cards,
    error,
    loader,
    getAllCards,
    addNewCard,
    checkVotedByCard,
    updateCard,
    getCardsByUser,
  }
})
