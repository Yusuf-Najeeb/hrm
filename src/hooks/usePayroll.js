import { useMemo } from 'react'
import { useAppSelector } from '.'

export const usedDeductionCategory = () => {
  //const PayrollData = useAppSelector(store => store.payroll.PayrollData)
  const deductioncategoryData = useAppSelector(store => store.deductioncategory.deductioncategoryData)
  //const loading = useAppSelector(store => store.payroll.loading)
  const loading = useAppSelector(store => store.deductioncategory.loading)
  //const paging = useAppSelector(store => store.deductioncategory.paging)
  return useMemo(() => [deductioncategoryData, loading], [deductioncategoryData, loading])
}
