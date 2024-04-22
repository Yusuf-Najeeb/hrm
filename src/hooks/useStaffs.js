import { useMemo } from 'react'
import { useAppSelector } from '.'

export const useStaffs = () => {
  const StaffsData = useAppSelector(store => store.staffs.StaffsData)
  const loading = useAppSelector(store => store.staffs.loading)

  const paging = useAppSelector(store => store.staffs.paging)

  return useMemo(() => [StaffsData, loading, paging], [StaffsData, loading, paging])
}
