import api from '@/services/api'

export const Auth = async (payload) => {
  try {
    const data = {
      ...payload
    }
    console.log(data)
    const result = await api.post('/auth', {
      ...data
    })
    return result.data
  } catch (err) {
    return {
      message: err?.response?.data?.message || 'erro interno',
      token: ''
    }
  }
}
