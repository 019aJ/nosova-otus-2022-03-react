import { ActionTypeNames } from "./store"
export const createInitAction = (cellCount: number, percentage: number) => {
  const type: ActionTypeNames = "INIT"
  return { type, payload: { cellCount, percentage } }
}
export const createNextStepAction = (cellInRow: number) => {
  const type: ActionTypeNames = "NEXT_STEP"
  return { type, payload: { cellInRow } }
}

export const createMutateAction = (cellIndex: number) => {
  const type: ActionTypeNames = "MUTATE"
  return { type, payload: { cellIndex } }
}
