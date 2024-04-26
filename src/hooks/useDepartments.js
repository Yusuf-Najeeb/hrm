import { useMemo } from 'react'
import { useAppSelector } from '.'

export const useDepartments = () => {
  const DepartmentsData = useAppSelector(store => store.departments.DepartmentsData)
  const loadingDepartments = useAppSelector(store => store.departments.loadingDepartments)
  const paging = useAppSelector(store => store.departments.DepartmentsPaging)
  const aggregations = useAppSelector(store => store.departments.aggregations)

  return useMemo(
    () => [DepartmentsData, loadingDepartments, paging, aggregations],
    [DepartmentsData, loadingDepartments, paging, aggregations]
  )
}
