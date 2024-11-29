
const User = require("../models/User");
const AccessLevel = require("../models/AccessLevel");
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  createNewUser: (req, res) => {
    const body = req.body
    bcrypt.hash(body.password, saltRounds, (err, hash) => {
      if (err) {
        console.error(err)
      }
      const user = {
        username: body.username,
        email: body.email,
        password: hash,
        accessId: body.accessId
      }
      User.create(user)
        .then(result => {
          res.status(200).json({ id: result.id })
        })
        .catch(error => {
          console.error(error)
          res.status(500).json({ error })
        })
    })
  },
  getAllUsers: (req, res) => {
    User.findAll({
      attributes: ['_id', 'username', 'email', 'accessId'],
      include: [
        {
          model: AccessLevel,
          attributes: ['type']
        }
      ],
      order: [['_id', 'ASC']]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(error => {
        console.error(error)
        res.status(500).json({ error })
      })
  },
  getUserById: (req, res) => {
    User.findByPk(req.params.id, {
      attributes: ['_id', 'username', 'email', 'accessId'],
      include: [
        {
          model: AccessLevel,
          attributes: ['type']
        }
      ]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(error => {
        console.error(error)
        res.status(500).json({ error })
      })
  },
  updateUserById: (req, res) => {
    const userData = req.body
    if (userData.password) {
      bcrypt.hash(userData.password, saltRounds, (err, hash) => {
        if (err) {
          console.error(err)
        }
        userData.password = hash
        console.log("params", req.params)
        User.update(userData, {
          where: { _id: req.params.id }
        })
          .then(result => {
            if (result[0] === 0) {
              res.status(204).end()
            } else {
              res.status(200).end()
            }
          })
          .catch(error => {
            console.error(error)
            res.status(500).json({ error })
          })
      })
    } else {
      console.log("params", req.params)
      User.update(userData, {
        where: { _id: req.params.id }
      })
        .then(result => {
          if (result[0] === 0) {
            res.status(204).end()
          } else {
            res.status(200).end()
          }
        })
        .catch(error => {
          console.error(error)
          res.status(500).json({ error })
        })
    }
  },
  deleteUserById: (req, res) => {
    console.log("came here")
    User.destroy({
      where: { _id: req.params.id }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(error => {
        console.error(error)
        res.status(500).json({ error })
      })
  },
  getUserByUsernameWithPassword: async (username, done) => {
    try {
      const user = await User.findOne({
        where: {
          email: username
        },
        include: [AccessLevel]
      })
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    } catch (err) {
      done(err)
    }
  }
}
