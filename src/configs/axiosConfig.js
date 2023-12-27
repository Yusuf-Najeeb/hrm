import axios from 'axios'
import checkTokenExp from 'src/@core/utils/checkTokenExp'
import GetToken from 'src/@core/utils/getToken'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

axios.interceptors.request.use(
  config => {
    const accessToken = GetToken()

    // config.headers['Content-Type'] = 'application/json;charset=UTF-8';

    if (accessToken) {
      checkTokenExp(accessToken)

      config.headers.Authorization = `Bearer ${accessToken}`

      console.log(`${config.method?.toUpperCase()} request sent to ${config.url}`)
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // console.log('moved to errored', error)

    if (error?.response?.statusText === 'Unauthorized') {
      window.localStorage.removeItem('accessToken')

      window.location.href = '/login'

      // console.log('getting res err', error.response?.statusText)
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
