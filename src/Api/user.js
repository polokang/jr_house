import axios from "axios"

const API_BASE_URL = "https://jr-house-api.herokuapp.com/jr"

export function addUser(User) {
  return axios
    .post(`${API_BASE_URL}/users`, {
      user: User
    })
    .then(response => {
      const user = response.data.data
      return { user }
    })
}
