const Users = pool => pool
  .query(`CREATE TABLE IF NOT EXISTS users
            (id SERIAL PRIMARY KEY,
             name VARCHAR(100),
             email VARCHAR(100) UNIQUE NOT NULL,
             hash VARCHAR(60) NOT NULL,
             created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`)
  .then().catch(err => console.error(err.stack))

const Saved = pool => pool
  .query(`CREATE TABLE IF NOT EXISTS saved
            (id SERIAL PRIMARY KEY,
             "user" INT NOT NULL REFERENCES users(id),
             item VARCHAR(16) NOT NULL,
             created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`)
  .then().catch(err => console.error(err.stack))

module.exports = pool => {
  Users(pool)
}
