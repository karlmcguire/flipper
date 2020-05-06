const api = "http://lvh.me:8080"

export default {
  client: {
    tokenCookie: "flipper_token",
    tokenExDays: 7,
  },
  api: {
    url: api,
    signup: api + "/signup",
    login: api + "/login",
    save: api + "/user/save",
    unsave: api + "/user/unsave",
    sessions: {
      has: api + "/sessions/has",
    },
  },
}
