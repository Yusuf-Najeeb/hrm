'use client'

// ** React Imports
import { createContext, useEffect, useLayoutEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'
import { useDispatch } from 'react-redux'

// ** Config
import authConfig from 'src/configs/auth'

// import { notifyError } from '../@core/components/toasts/notifyError'
// import { notifySuccess } from '../@core/components/toasts/notifySuccess'

import GetToken from '../../@core/utils/getToken'
import GetUserData from '../../@core/utils/getUserData'
import { toggleLoadingState } from '../../store/apps/auth/index'

const storedToken = GetToken()
const storedUser = GetUserData()

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean

  // staffLogin: () => Promise.resolve(),
  // userLogin: () => Promise.resolve(),
  // applicantLogin: () => Promise.resolve(),
  // logout: () => Promise.resolve(),
  // loginStatus: false,
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [loginStatus, setLoginStatus] = useState(defaultProvider.loginStatus)
  const [redirect, setRedirect] = useState('')

  const dispatch = useDispatch()

  // ** Hooks
  const router = useRouter()

  console.log(redirect, 'redirect')

  // useEffect(() => {
  //   if (router.isReady) {
  //     setRedirect(decodeURIComponent(router.query.redirect || ""));
  //   }

  //   console.log(router.query.from, 'return url')

  // }, [router.isReady, router.query]);

  useEffect(() => {
    if (storedToken) {
      if (Object.keys(storedUser).includes('id')) {
        setUser({ ...storedUser })
        dispatch(toggleLoadingState(false))

        // setLoading(false)
      } else {
        router.push('/login')
        window.localStorage.removeItem(accessToken)
        window.localStorage.removeItem(loggedInUser)
        setUser(null)

        // setLoading(false)
      }
    } else {
      router.push('/login')

      // setLoading(false)
    }

    // initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const handleStaffLogin = async (values) => {

  //   try {
  //       const { data } = await axios({
  //         method: 'post',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json;charset=UTF-8'
  //         },
  //         url: ${baseUrl}/auth/login/staff,
  //         data: {
  //           ...values
  //         }
  //       })
  //       if (data) {

  //         const returnUrl = router.query.returnUrl

  //         const userObject = JSON.stringify(data?.data?.user)
  //         setUser({...data?.data?.user})
  //         localStorage.setItem(authConfig.storageTokenKeyName, data?.data?.token)
  //         localStorage.setItem(authConfig.storageUserKeyName, userObject)
  //         localStorage.setItem("loginStatus", true)
  //         notifySuccess('Login successful')
  //         setLoginStatus(true)
  //         setLoading(false)

  //         // setCookie('loginStatus', true, 2)

  //             const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/dashboard'
  //             router.replace(redirectURL)
  //       }

  //     } catch (error) {
  //       notifyError(error.response.data.message || 'Login failed')
  //     }
  // }

  // const handleUserLogin = async (values) => {

  //   try {
  //       const { data } = await axios({
  //         method: 'post',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json;charset=UTF-8'
  //         },
  //         url: ${baseUrl}/auth/login/user,
  //         data: {
  //           ...values
  //         }
  //       })
  //       if (data) {
  //         const returnUrl = router.query.returnUrl

  //         const userObject = JSON.stringify(data?.data?.user)
  //         setUser({...data?.data?.user})
  //         localStorage.setItem(authConfig.storageTokenKeyName, data?.data?.token)
  //         localStorage.setItem(authConfig.storageUserKeyName, userObject)
  //         notifySuccess('Login successful')
  //         setLoginStatus(true)
  //         localStorage.setItem("loginStatus", true)
  //         setLoading(false)
  //             const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/dashboard'
  //             router.replace(redirectURL)
  //       }

  //     } catch (error) {
  //       notifyError(error.response.data.message || 'Login failed')
  //     }
  // }

  // const handleApplicantLogin = async (values) => {

  //   try {
  //       const { data } = await axios({
  //         method: 'post',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json;charset=UTF-8'
  //         },
  //         url: ${baseUrl}/auth/login?type=others,
  //         data: {
  //           ...values
  //         }
  //       })
  //       if (data) {
  //         // const returnUrl = router.query.returnUrl

  //         const userObject = JSON.stringify(data?.data?.user)
  //         setUser({...data?.data?.user})
  //         localStorage.setItem(authConfig.storageTokenKeyName, data?.data?.token)
  //         localStorage.setItem(authConfig.storageUserKeyName, userObject)
  //         notifySuccess('Login successful')
  //         setLoginStatus(true)
  //         localStorage.setItem("loginStatus", true)
  //         setLoading(false)
  //         router.replace('/apps/applicantCBTExam')
  //       }

  //     } catch (error) {
  //       notifyError(error.response.data.message || 'Login failed')
  //     }
  // }

  // const handleLogout = () => {
  //   setUser(null)
  //   window.localStorage.removeItem(authConfig.storageUserKeyName)
  //   window.localStorage.removeItem(authConfig.storageTokenKeyName)
  //   router.push('/login')
  // }

  const values = {
    user,
    loading,
    setUser,
    setLoading

    // staffLogin: handleStaffLogin,
    // userLogin: handleUserLogin,
    // applicantLogin: handleApplicantLogin,
    // logout: handleLogout,
    // loginStatus
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
