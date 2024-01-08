import { useMemo } from 'react'
import { useAppSelector } from '.'

export const useRoles = () => {
  const RolesData = useAppSelector(store => store.roles.RolesData)
  const loading = useAppSelector(store => store.roles.loading)
  const paging = useAppSelector(store => store.roles.paging)

  return useMemo(() => [RolesData, loading, paging], [RolesData, loading, paging])
}
