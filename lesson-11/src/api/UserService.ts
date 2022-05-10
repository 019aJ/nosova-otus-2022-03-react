import axios from "axios"
import { Todo } from "../dto/Todo"
import { User } from "../dto/User"

export default class UserService {
  static async getAllUsers() {
    try {
      const response = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      )
      return response.data
    } catch (error) {
      console.log(error)
      return []
    }
  }

  static async getUsersTasks(
    userId: number,
    controller = new AbortController()
  ) {
    try {
      const response = await axios.get<Todo[]>(
        `https://jsonplaceholder.typicode.com/users/${userId}/todos`,
        {
          signal: controller.signal,
        }
      )
      return response.data
    } catch (error) {
      console.log(error)
      return []
    }
  }

  static async saveUsersTasks(todo: Todo) {
    try {
      return "ok"
    } catch (error) {
      console.log(error)
      return "error"
    }
  }
}
