import { useContext } from 'react'
import { AuthContext } from 'src/@core/context/authContext'

export const useAuthContext = () => useContext(AuthContext)
