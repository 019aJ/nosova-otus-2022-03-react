const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
] as const

type OrderState = typeof orderStates[number]
type FIXME = Omit<typeof orderStates[number], "buyingSupplies" | "producing">[]
// Hint: type guards
export const getUserOrderStates = (orderStates: OrderState[]): FIXME =>
  orderStates.filter(
    (state) => state !== "buyingSupplies" && state !== "producing"
  )
