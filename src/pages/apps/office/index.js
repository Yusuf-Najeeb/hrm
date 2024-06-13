import React, { useEffect } from 'react'
import OfficeTabs from '../../../views/users/office/OfficeTabs'

import { useAppDispatch } from '../../../hooks'
import { fetchDepartments } from '../../../store/apps/departments/asyncthunk'

const OfficeHome = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchDepartments())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <OfficeTabs tab='branches' />
}

export default OfficeHome
