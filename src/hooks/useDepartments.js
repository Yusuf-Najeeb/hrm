import { useMemo } from "react"
import { useAppSelector } from "."

export const useDepartments = () => {
    const DepartmentsData = useAppSelector(store => store.departments.DepartmentsData)
    const loadingDepartments = useAppSelector(store => store.departments.loadingDepartments)

    return useMemo(() => [DepartmentsData, loadingDepartments], [DepartmentsData, loadingDepartments]);
}