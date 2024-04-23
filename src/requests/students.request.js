import api from '@/services/api'

export const GetStudents = async (payload) => {
  try {
    const result = await api.get('/students', {
      params: payload
    })
    return result.data
  } catch (err) {
    return {
      message: err?.response?.data?.message || 'erro interno'
    }
  }
}

export const GetStudentsPages = async (payload) => {
  try {
    const result = await api.get('/students/count', {
      params: payload
    })
    return result?.data?.total_pages || 1
  } catch (err) {
    return {
      message: err?.response?.data?.message || 'erro interno'
    }
  }
}

export const CreateStudents = async (payload) => {
  try {
    const result = await api.post('/students', { ...payload })
    return result.data
  } catch (err) {
    return {
      message: err?.response?.data?.message || 'erro interno'
    }
  }
}

export const UpdateStudents = async (payload) => {
  try {
    const result = await api.put('/students', { ...payload })
    return result.data
  } catch (err) {
    return {
      message: err?.response?.data?.message || 'erro interno'
    }
  }
}

export const DeleteStudents = async (id) => {
  try {
    const result = await api.delete(`/students/${id}`)
    return result.data
  } catch (err) {
    return {
      message: err?.response?.data?.message || 'erro interno'
    }
  }
}
