import { Component } from "react"
import { User } from "../../dto/User"
import styles from "./UserInfo.module.css"

interface UserProps {
  user: User
}

export default class UserInfo extends Component<UserProps> {
  render() {
    const user = this.props.user
    const address = user.address
    const company = user.company
    const addressString = `${address.city}, ${address.suite}, ${address.street}, ${address.zipcode}`
    return (
      <div key={"uc" + this.props.user.id} className={styles.userInfo}>
        <div>{user.username}</div>
        <div>{user.email}</div>
        <div>{user.phone} </div>
        <div>{user.website} </div>
        <div>{addressString} </div>
        <div>{company.name} </div>
      </div>
    )
  }
}
