let cache

const sendGet = async (url) => {
  const headers = await _getHeaders()
  return _unwrap(await fetch(url, { method: 'GET', headers }))
}

const sendPost = async (url, data) => {
  const headers = await _getHeaders()
  return _unwrap(await fetch(url, { method: 'POST', headers, body: JSON.stringify(data) }))
}

const sendPut = async (url, data) => {
  const headers = await _getHeaders()
  return _unwrap(await fetch(url, { method: 'PUT', headers, body: JSON.stringify(data) }))
}

const sendDelete = async (url, data) => {
  const headers = await _getHeaders()
  return _unwrap(await fetch(url, { method: 'DELETE', headers, body: JSON.stringify(data) }))
}

const _unwrap = async (response) => {
  let data
  try {
    data = await response.json()
  } catch (_) {
    throw new Error('Malformed respoinse')
  }
  if (response.ok) return data

  throw new Error(data.description ?? 'Uknown error')
}

const _getHeaders = async () => {
  const { user } = await _getDependencies()
  const token = user.getToken

  if (!token)
    return {
      'Content-Type': 'application/json'
    }
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

const _getDependencies = async () => {
  if (cache) return cache

  const [{ useUserStore }] = await Promise.all([await import('@/stores/user')])
  cache = {
    user: useUserStore()
  }

  return cache
}

export { sendGet, sendPost, sendPut, sendDelete }
