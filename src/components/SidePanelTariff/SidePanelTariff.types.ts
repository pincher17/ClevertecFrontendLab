import { Tariff } from "@redux/tariffSlice"
import { Dispatch, SetStateAction } from "react"

export interface SidePanelProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  openDrawer: boolean
  resolution: {width: number, height: number}
  tariffList: Tariff[]
  tariffExpired?: string
  valueDaysTariff: number
  setValueDaysTariff: Dispatch<SetStateAction<number>>
  updteTariff: ()=> void
}
