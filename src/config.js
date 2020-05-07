const api = "http://localhost:8080"

export default {
  session: {
    cookie: "flipper_session",
  },
  api: {
    info:    api + "/user/info",
    signup:  api + "/user/signup",
    signin:  api + "/user/signin",
    signout: api + "/user/signout",
    save:    api + "/user/save",
    unsave:  api + "/user/unsave",
    saved:   api + "/user/saved",
  },
}
