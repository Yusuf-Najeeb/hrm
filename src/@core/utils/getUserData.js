const GetUserData = () => {
  // const token = window.localStorage.getItem('access-token')
  let userData = null

  if (typeof window !== 'undefined') {
    userData = JSON.parse(localStorage.getItem('loggedInUser'))
  }

  return userData ? userData : null
}

export default GetUserData
