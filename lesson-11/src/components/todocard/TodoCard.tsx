import { Component } from "react"
import UserService from "../../api/UserService"
import { Todo } from "../../dto/Todo"
import ErrorBoundary from "../error/ErrorBoundry"
import TodoInfo from "../todoinfo/TodoInfo"
import styles from "./TodoCard.module.css"
interface TodoCardProps {
  userId: number
  height?: number
}

interface TodoCardState {
  todos: Todo[]
  isLoading: boolean
}

export default class TodoCard extends Component<TodoCardProps, TodoCardState> {
  controller = new AbortController()

  constructor(props: TodoCardProps) {
    super(props)
    this.state = {
      isLoading: true,
      todos: [],
    }
  }

  componentDidMount = () => {
    UserService.getUsersTasks(this.props.userId, this.controller).then(
      (todos) => {
        this.setState({ todos, isLoading: false })
      }
    )
  }

  componentWillUnmount() {
    this.controller.abort()
  }

  render() {
    if (this.state.isLoading) {
      return <div></div>
    }
    return (
      <div key={"ut" + this.props.userId} className={styles.todoCard}>
        <div className={styles.scrollDiv} style={{ height: this.props.height }}>
          {this.state.todos.map((todo) => (
            <ErrorBoundary key={"eb" + todo.id}>
              <TodoInfo key={todo.id} todo={todo} />
            </ErrorBoundary>
          ))}
        </div>
      </div>
    )
  }
}
