import { TrainingListType } from "@redux/trainingSlice"
import { Dispatch, SetStateAction } from "react"

export interface SidePanelProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  openDrawer: boolean
  selectedDate: string
  selectedExercise: string
  exercisesDrawer: any
  setExercisesDrawer: Dispatch<SetStateAction<any>>
  resolution: {width: number, height: number}
  trainingsListAll: TrainingListType[] | undefined
  editExercise: boolean
  namePartner?: string
  setNamePartner?: Dispatch<SetStateAction<any>>
  imgSrc?: string
  idPartner?: string
}
