import * as jwtDecode from 'jwt-decode'




const checkTokenExp = (token) => {
  try {
    const decodedToken = jwtDecode.jwtDecode(token)

    if (decodedToken.exp * 1000 < Date.now()) {
      console.log('Time Expired')

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('access-token')

        return (window.location.href = '/login')
      }
    } else {
      console.log('Token has time', decodedToken.exp * 1000, '&', Date.now())
    }
  } catch (error) {
    console.log(error, 'error')
    window.localStorage.removeItem('access-token')

    return (window.location.href = '/login')
  }
}

export default checkTokenExp
