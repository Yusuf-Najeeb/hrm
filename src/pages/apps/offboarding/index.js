import React, { useEffect } from 'react'
import OffBoardingTab from '../../../views/users/offBoarding/OffBoardingTab'

// import PayrollTab from '../../../views/users/payroll/PayrollTab'
// import { useAppDispatch } from '../../../hooks'
// import { fetchDeductionCategory } from '../../../store/apps/deductionCatergory/asyncthunk'
// import { fetchStaffs } from '../../../store/apps/staffs/asyncthunk'
// import { fetchDepartments } from '../../../store/apps/departments/asyncthunk'

const OffBoardingHome = () => {
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(fetchDeductionCategory())
  //   dispatch(fetchStaffs())
  //   dispatch(fetchDepartments({ page: 1, limit: 200 }))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  return <OffBoardingTab tab='retirement' />
}

export default OffBoardingHome
