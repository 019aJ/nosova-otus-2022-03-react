import TodoInfo from "./TodoInfo"

export default {
  title: "Одно задание",
  component: TodoInfo,
}

export const StubTodoInfo = () => (
  <TodoInfo
    todo={{ id: 1, userId: 1, title: "test todo title", completed: true }}
  />
)

export const MultilineTodoInfo = () => (
  <div style={{width:100}}>
    <TodoInfo
      todo={{ id: 1, userId: 1, title: "test todo long multiline title", completed: true }}
    />
  </div>
)
