import { Component } from "react"
import { User } from "../../dto/User"
import UserInfo from "../userinfo/UserInfo"
import styles from "./UserCard.module.css"
import TodoCard from "../todocard/TodoCard"
import ErrorBoundary from "../error/ErrorBoundry"
import SwitchButton from "../switchbutton/SwitchButton"

interface UserCardProps {
  user: User
  width: number
  height: number
  todoVisible?: boolean
}

interface UserState {
  todoVisible: boolean
}

export default class UserCard extends Component<UserCardProps, UserState> {
  constructor(props: UserCardProps) {
    super(props)
    this.state = {
      todoVisible: props.todoVisible ? true : false,
    }
  }

  onClick = () => {
    this.setState((prevState) => {
      return { todoVisible: !prevState.todoVisible }
    })
  }

  shouldComponentUpdate = (nextProps: UserCardProps) => {
    return nextProps.width > 0 && nextProps.height > 0
  }

  render() {
    return (
      <div
        className={styles.userCard}
        key={"uc" + this.props.user.id}
        style={{
          width: this.props.width,
          height: this.props.height,
        }}
      >
        <div className={styles.header}>{this.props.user.name}</div>
        {this.state.todoVisible ? (
          <ErrorBoundary>
            <TodoCard
              userId={this.props.user.id}
              height={this.props.height - 30}
            />
          </ErrorBoundary>
        ) : (
          <UserInfo user={this.props.user} />
        )}
        <SwitchButton
          todoVisible={this.state.todoVisible}
          onClick={this.onClick}
        />
      </div>
    )
  }
}
