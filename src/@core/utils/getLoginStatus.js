const getLoginStatus = () => {
  let status = false

  if (typeof window !== 'undefined') {
    status = localStorage.getItem('loginStatus')
  }

  return status
}

export default getLoginStatus
