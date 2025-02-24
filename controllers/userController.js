const db = require('../db')


const getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if(err) {
      res.status(404).json({ error: err.message })
    } else {
      res.json(result)
    }
  })
}

const getUserID = (req, res) => {
  const id = req.params.id
  db.query("SELECT * FROM users where id = ?", [id], (err, result) => {
    if(err) {
      res.status(404).json({ error: err.message })
    } else {
      if(!result.length) return res.status(404).json({ message: "User not found" })
      res.json(result[0])
    }
  })
}

const createUser = (req, res) => {
  const { name, email } = req.body
  db.query("INSERT INTO users(name, email) values(?, ?)", [name, email], (err, result) => {
    if(err) {
      res.status(500).json({ error: err.message })
    } else {
      res.json({ name, email })
    }
  })
}

const updateUser = (req, res) => {
  const { name, email } = req.body
  const id = req.params.id
  db.query("SELECT * FROM users where id = ?", [id], (err, result) => { // get old values
    if(err) {
      res.status(404).json({ error: err.message })
    } else {
      if(!result.length) {
        res.status(404).json({ error: "User not found" })
      } else {
        const newName = name || result[0].name
        const newEmail = email || result[0].email
        db.query("UPDATE users set name = ?, email = ? where id = ?", [newName, newEmail, id], (err, result) => {
          if(err) {
            res.status(404).json({ error: err.message })
          } else {
            res.json({ name: newName, email: newEmail })
          }
        })
      }
    }
  })
}

const deleteUser = (req, res) => {
  const id = req.params.id
  db.query("DELETE from users where id = ?", [id], (err, result) => {
    if(err) {
      res.status(404).json({ error: err.message })
    } else {
      res.status(200).json({ message: `Successfully deleted User ID: ${id}`})
    }
  })
}

module.exports =  { getUsers, getUserID, createUser, updateUser, deleteUser }