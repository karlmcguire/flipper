const api = "http://localhost:8080"

export default {
  client: {
    tokenCookie: "flipper_token",
    tokenExDays: 7,
  },
  api: {
    url: api,
    signup: api + "/signup",
    login: api + "/login",
    sessions: {
      has: api + "/sessions/has",
    },
  },
}
