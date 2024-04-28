import { useMemo } from 'react'
import { useAppSelector } from '.'

export const useStaffs = () => {
  const StaffsData = useAppSelector(store => store.staffs.StaffsData)
  const loading = useAppSelector(store => store.staffs.loading)
  const paging = useAppSelector(store => store.staffs.paging)
  const aggregations = useAppSelector(store => store.staffs.aggregations)

  return useMemo(() => [StaffsData, loading, paging, aggregations], [StaffsData, loading, paging, aggregations])
}
