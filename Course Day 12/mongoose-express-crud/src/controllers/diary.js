const Diary = require("../models/diary.model")

const ifErrorInResSendIt = (res, next) => {
  if (Object.keys(res.locals).length) return next()
}

module.exports = {
  getAll: async (req, res, next) => {
    ifErrorInResSendIt(res, next)
    try {
      const data = await Diary.find({})
      res.status(200).send(data)
    } catch (error) {
      res.locals.error = error.message
      return next()
    }
  },
  getByUser: async (req, res, next) => {
    ifErrorInResSendIt(res, next)
    try {
      const data = await Diary.find({ "user.email": req.user.email })
      res.status(200).send(data)
    } catch (error) {
      res.locals.error = error.message
      return next()
    }
  },
  getById: async (req, res, next) => {
    ifErrorInResSendIt(res, next)
    try {
      const _id = req.params._id
      const singleEntry = await Diary.find({ _id })

      if (!singleEntry) {
        res.locals.status = 404
        res.locals.error = `Account with id: ${_id} not found!`
        return next()
      } else {
        res.send(singleEntry)
      }
    } catch (error) {
      res.locals.error = error.message
      return next()
    }
  },
  create: async (req, res, next) => {
    ifErrorInResSendIt(res, next)
    try {
      const { title, body } = req.body

      if (!title || !body) {
        res.locals.status = 400
        res.locals.error = "Not all fields have been entered"
        return next()
      }

      const user = {
        email: req.user.email,
      }

      let newEntry = new Diary({
        title,
        body,
        user,
      })

      newEntry = await newEntry.save()

      res.status(201).json(newEntry)
    } catch (error) {
      res.locals.error = error.message
      return next()
    }
  },
  updateById: async (req, res, next) => {
    ifErrorInResSendIt(res, next)
    try {
      const _id = req.params._id

      if (!_id || !req.body) {
        res.locals.status = 400
        res.locals.error = "Not all fields have been entered"
        return next()
      }

      const updateRes = await Diary.findOneAndUpdate({ _id }, req.body)

      res.status(200).json(updateRes)
    } catch (error) {
      res.locals.error = error.message
      return next()
    }
  },
  deleteById: async (req, res, next) => {
    ifErrorInResSendIt(res, next)
    try {
      const _id = req.params._id

      if (!_id) {
        res.locals.status = 404
        res.locals.error = "Not all fields have been entered"
        return next()
      }

      const deletedItem = await Diary.findByIdAndDelete(_id)

      res.status(200).json(deletedItem)
    } catch (error) {
      return next(error)
    }
  },
}
