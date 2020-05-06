module.exports = {
  name: "flipper",

  sessions: {
    secret: "secret",
    cookie: {
      secure: false,
      httpOnly: true,
      domain: "localhost",
      path: "/",
    },
    redis: client => ({
      host: "localhost",
      port: 6379,
      client: client,
      ttl: 86400,
    }),
  },

  database: {
    secret: "secret",
    postgres: {
      user: "karl",
      host: "localhost",
      port: 5432,
      database: module.exports.name,
    },
  },
}
