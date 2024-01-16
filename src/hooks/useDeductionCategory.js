import { useMemo } from 'react'
import { useAppSelector } from '.'

export const useDeductionCategory = () => {

  const deductioncategoryData = useAppSelector(store => store.deductioncategory.deductioncategoryData)

  const loading = useAppSelector(store => store.deductioncategory.loading)

  return useMemo(() => [deductioncategoryData, loading], [deductioncategoryData, loading])
}
