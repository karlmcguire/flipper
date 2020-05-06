module.exports = {
  user: {
    signup: req => ({
      session: req.session,
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    }),
  },
}
