import { useMemo } from 'react'
import { useAppSelector } from '.'

export const useRoster = () => {
  const RosterData = useAppSelector(store => store.roster.RosterItems)
  const loading = useAppSelector(store => store.roster.loading)
  const paging = useAppSelector(store => store.roster.Paging)

  return useMemo(() => [RosterData, loading, paging], [RosterData, loading, paging])
}
