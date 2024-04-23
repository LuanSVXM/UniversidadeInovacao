import api from '@/services/api'

export const GetEmployees = async () => {
  try {
    const result = await api.get('/employee')
    return result.data
  } catch (err) {
    console.log(err, 'resultado')
    return { company: { name: '' }, employess: [] }
  }
}
