import { useMemo } from 'react'
import { useAppSelector } from '.'

export const usePermissions = () => {
  const PermissionsData = useAppSelector(store => store.permissions.PermissionsData)
  const loading = useAppSelector(store => store.permissions.loading)

  return useMemo(() => [PermissionsData, loading], [PermissionsData, loading])
}
