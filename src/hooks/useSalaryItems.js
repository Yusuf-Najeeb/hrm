import { useMemo } from "react"
import { useAppSelector } from "."

export const useSalaryItems = () => {
    const SalaryItemsData = useAppSelector(store => store.salaryItems.SalaryItemsData)
    const loadingSalaryItems = useAppSelector(store => store.salaryItems.loadingSalaryItems)

    return useMemo(() => [SalaryItemsData, loadingSalaryItems], [SalaryItemsData, loadingSalaryItems]);
}