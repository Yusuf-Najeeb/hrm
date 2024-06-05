import React, { useEffect } from 'react'
import CashflowTabs from '../../../views/users/cashflow/CashflowTabs'

// import { useAppDispatch } from '../../../hooks'
// import { fetchDeductionCategory } from '../../../store/apps/deductionCatergory/asyncthunk'
// import { fetchStaffs } from '../../../store/apps/staffs/asyncthunk'
// import { fetchDepartments } from '../../../store/apps/departments/asyncthunk'

const CashflowHome = () => {
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(fetchDeductionCategory())
  //   dispatch(fetchStaffs())
  //   dispatch(fetchDepartments({ page: 1, limit: 200 }))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  return <CashflowTabs tab='inflow' />
}

export default CashflowHome
