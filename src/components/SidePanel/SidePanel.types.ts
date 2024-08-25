import { Dispatch, SetStateAction } from "react"

export interface SidePanelProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  openDrawer: boolean
  selectedDate: string
  selectedExercise: string
  exercisesDrawer: any
  setExercisesDrawer: Dispatch<SetStateAction<any>>
  resolution: {width: number, height: number}
}
