import { useMemo } from 'react'
import { useAppSelector } from '.'

export const usePayrolls = () => {
  const PayrollData = useAppSelector(store => store.payroll.PayrollData)
  const loading = useAppSelector(store => store.payroll.loading)
  const paging = useAppSelector(store => store.payroll.paging)
  const aggregations = useAppSelector(store => store.payroll.aggregations)

  return useMemo(() => [PayrollData, loading, paging, aggregations], [PayrollData, loading, paging, aggregations])
}
