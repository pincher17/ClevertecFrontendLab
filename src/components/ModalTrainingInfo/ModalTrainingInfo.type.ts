import { TrainingPalType } from "@redux/jointTrainingsSlice"

export interface ModalTrainingInfoProps {
  toggleOpenModal: () => void
  openModal: boolean
  trainingPalsSeleceted: TrainingPalType | null
  resolutionWidth: number
  }