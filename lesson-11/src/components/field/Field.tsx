import { Component } from "react"
import UserService from "../../api/UserService"
import { User } from "../../dto/User"
import UserCard from "../usercard/UserCard"
import styles from "./Field.module.css"
interface FieldProps {
  title: string
  width: number
  height: number
}

interface FieldState {
  selectedCell?: string | null
  isLoading: boolean
  users: User[]
}

const cellMargin = 5

export default class Field extends Component<FieldProps, FieldState> {
  static defaultProps = {
    title: "Пользователи",
    width: 800,
    height: 800,
  }

  constructor(props: FieldProps) {
    super(props)
    this.state = {
      selectedCell: null,
      isLoading: true,
      users: [],
    }
    this.renderChildren = this.renderChildren.bind(this)
  }

  componentDidMount = () => {
    UserService.getAllUsers().then((users) => {
      this.setState({ users, isLoading: false })
    })
  }

  render() {
    const width = this.props.width
    const height = this.props.height
    const cellCount = this.state.isLoading ? 0 : this.state.users.length
    const elemInRow = cellCount ? Math.ceil(Math.sqrt(cellCount)) : 0
    const elemWidth = cellCount ? width / elemInRow - cellMargin : 0
    const elemHeight = cellCount ? height / elemInRow - cellMargin : 0
    return (
      <div
        key="fld"
        className={styles.field}
        style={{
          width: width,
          height: height,
        }}
      >
        {cellCount
          ? this.renderChildren(elemWidth, elemHeight, cellCount)
          : this.props.title}
      </div>
    )
  }

  renderChildren(width: number, height: number, cellCount: number) {
    const cards = []
    for (let index = 0; index < cellCount; index++) {
      cards.push(
        <div key={this.state.users[index].id} className={styles.cell}>
          <UserCard
            user={this.state.users[index]}
            width={width - 2}
            height={height - 2}
          ></UserCard>
        </div>
      )
    }
    return cards
  }
}
