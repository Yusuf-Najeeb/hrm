import { useMemo } from 'react'
import { useAppSelector } from '.'

export const usePayslip = () => {

  const payslipData = useAppSelector(store => store.payslip.payslipData)
  const loading = useAppSelector(store => store.payslip.loading)

  return useMemo(() => [payslipData, loading], [payslipData, loading])
}
