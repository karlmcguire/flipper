module.exports = {
  user: {
    info: req => ({
      session: req.session,
    }),
    signup: req => ({
      session: req.session,
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    }),
    signin: req => ({
      session: req.session,
      email: req.body.email,
      password: req.body.password,
    }),
    save: req => ({
      session: req.session,
      item: req.body.item,
    }),
    unsave: req => ({
      session: req.session,
      item: req.body.item,
    }),
    saved: req => ({
      session: req.session,
    }),
  },
}
