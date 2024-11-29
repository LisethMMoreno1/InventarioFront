import { create } from 'zustand'
import { InventoryData, SalesData } from '../types/types'

export const useDashboardStore = create((set) => ({
    inventoryData: [] as InventoryData[],   
    salesData: [] as SalesData[],          


    setInventoryData: (data: InventoryData[]) => set({ inventoryData: data }),
    setSalesData: (data: SalesData[]) => set({ salesData: data }),
}))
