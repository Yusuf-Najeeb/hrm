import React, { useEffect } from 'react'
import OutflowTabs from '../../../views/users/outflow/OutflowTabs'

// import { useAppDispatch } fromoutflow/OutflowTabs./hooks'
// import { fetchDeductionCategory } from '../../../store/apps/deductionCatergory/asyncthunk'
// import { fetchStaffs } from '../../../store/apps/staffs/asyncthunk'
// import { fetchDepartments } from '../../../store/apps/departments/asyncthunk'

const OutflowHome = () => {
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(fetchDeductionCategory())
  //   dispatch(fetchStaffs())
  //   dispatch(fetchDepartments({ page: 1, limit: 200 }))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  return <OutflowTabs tab='operating' />
}

export default OutflowHome
