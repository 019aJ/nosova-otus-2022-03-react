import { Stepper } from "./Stepper"
export default {
  title: "Stepper",
  component: Stepper,
}
export const Basic = () => <Stepper step={1} onValueChange={(value) => {}} />
