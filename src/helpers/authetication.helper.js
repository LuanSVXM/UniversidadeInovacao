export const setToken = (token) => {
  if (!token) return
  localStorage.setItem('token', String(token))
}

export const clearToken = () => {
  localStorage.clear()
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const verifyToken = () => {
  const token = getToken() || undefined
  if (token) return true
  return false
}
