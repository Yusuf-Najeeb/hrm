import React, { useEffect } from 'react'
import PayrollTab from '../../../views/users/payroll/PayrollTab'
import { useAppDispatch } from '../../../hooks'
import { fetchDeductionCategory } from '../../../store/apps/deductionCatergory/asyncthunk'
import { fetchStaffs } from '../../../store/apps/staffs/asyncthunk'



const PayrollHome = () => {
  const dispatch = useAppDispatch()

useEffect(() => {
  dispatch(fetchDeductionCategory())
  dispatch(fetchStaffs())

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return <PayrollTab tab='payroll' />
}

export default PayrollHome
