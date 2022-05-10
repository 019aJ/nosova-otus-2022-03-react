import { Component } from "react"
import UserService from "../../api/UserService"
import { Todo } from "../../dto/Todo"
import styles from "./TodoInfo.module.css"
interface TodoInfoProps {
  todo: Todo
}

interface TodoInfoState {
  changedTodo: Todo | undefined
}

export default class TodoInfo extends Component<TodoInfoProps, TodoInfoState> {
  constructor(props: TodoInfoProps) {
    super(props)
    this.state = {
      changedTodo: undefined,
    }
  }

  onChange = (todo: Todo) => {
    todo.completed = !todo.completed
    this.setState({ changedTodo: todo })
  }

  componentDidUpdate(prevProps: TodoInfoProps, prevState: TodoInfoState) {
    if (this.state.changedTodo) {
      UserService.saveUsersTasks(this.state.changedTodo).finally(() => {
        console.log("Save Stub " + this.state.changedTodo?.id)
        this.setState({ changedTodo: undefined })
      })
    }
  }

  render() {
    const todo = this.props.todo
    return (
      <div key={todo.id} className={styles.todo}>
        <div>{todo.title}</div>
        <input
          className={styles.todoCheckbox}
          type="checkbox"
          checked={todo.completed}
          onChange={() => this.onChange(todo)}
        ></input>
      </div>
    )
  }
}
