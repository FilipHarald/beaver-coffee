import utils from '../../utils'

export default function Stock (Store) {
  return {
    async list (req, res) {
      try {
        const store = await Store.findOne({ _id: req.params.id }, { stock: 1 })

        store && res.json(store.stock) || res.sendStatus(404)
      } catch (err) {
        utils.handleError(err, res)
      }
    },

    async create (req, res) {
      try {
        const store = await Store.findOne({ _id: req.params.id})
        store.stock.push(req.body)
        await store.save()

        res.json(store.stock)
      } catch (err) {
        utils.handleError(err, res)
      }
    },

    async update (req, res) {
      try {
        const store = await Store.findOneAndUpdate(
          {
            _id: req.params.id,
            'stock._id': req.params.stockId
          },
          {
            '$set': {
              'stock.$': req.body
            }
          },
          { new: true })

        res.json(store.stock)
      } catch (err) {
        utils.handleError(err, res)
      }
    },

    async delete (req, res) {
      try {
        const store = await Store.findOneAndUpdate(
          {
            _id: req.params.id,
            'stock._id': req.params.stockId
          },
          {
            $pull: {
              stock: { _id: req.params.stockId }
            }
          },
          { new: true })

        res.json(store.stock)
      } catch (err) {
        utils.handleError(err, res)
      }
    }
  }
}

