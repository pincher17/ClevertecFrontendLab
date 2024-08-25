
type mostFrequentExercisesByDay = {
  type: string;
  value: number;
  dayOfWeek: string;
}

export type FrequentExercisesWeekProps = {
  mostFrequentExercisesByDay: mostFrequentExercisesByDay[] | null | undefined
}
