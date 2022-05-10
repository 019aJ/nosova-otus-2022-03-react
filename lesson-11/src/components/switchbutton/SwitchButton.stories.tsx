import SwitchButton from "./SwitchButton"

export default {
  title: "Кнопка-переключатель",
  component: SwitchButton,
}

export const TrueSwitchButton = () => (
  <div style={{ width: 20, height: 100 }}>
    <SwitchButton
      todoVisible={true}
      onClick={() => {
        console.log("true")
      }}
    />
  </div>
)
export const FalseSwitchButton = () => (
  <div style={{ width: 20, height: 100 }}>
    <SwitchButton
      todoVisible={false}
      onClick={() => {
        console.log("false")
      }}
    />
  </div>
)
