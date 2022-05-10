import TodoCard from "./TodoCard"

export default {
  title: "Список заданий",
  component: TodoCard,
}

export const StubTodoCard = () => <TodoCard userId={1} />

export const ScrollTodoCard = () => (
  <div style={{ width: 200 }}>
    <TodoCard userId={1} height={200}  />
  </div>
)
