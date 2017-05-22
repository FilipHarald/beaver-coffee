import utils from '../../utils'

export default function Employees (Store) {
  const list = async (req, res) => {
    try {
      const store = await Store.findOne({ _id: req.params.id }, { orders: 1 })

      store && res.json(store.orders) || res.sendStatus(404)
    } catch (err) {
      utils.handleError(err, res)
    }
  }

  // const get = (req, res) => {
  //   Store.findOne({ _id: req.params.id, 'employees. })
  // }

  const create = async (req, res) => {
    try {
      const store = await Store.findOne({ _id: req.params.id })
      const items = req.body.items

      const sortedItems = items.reduce((acc, val) => {
        const item = acc.find(x => x._id === val._id)
        if (!item) {
          acc.push(val)
          val.amount = 1
          val.price = val.price[store.location.country.countryCode.toLowerCase()]
        } else {
          item.amount++
        }
        return acc
      }, [])

      req.body.items = sortedItems
      req.body.date = new Date()

      const order = store.orders.create(req.body)
      store.orders.push(order)
      await store.save()
      res.json(order)
    } catch (err) {
      utils.handleError(err, res)
    }
  }

  const update = async (req, res) => {
    try {
      const store = await Store.findOneAndUpdate(
        {
          _id: req.params.id,
          'employees._id': req.params.employeeId
        },
        {
          '$set': {
            'employees.$': req.body
          }
        })

      res.json(store.employees)
    } catch (err) {
      utils.handleError(err, res)
    }
  }

  const destroy = (req, res) => {
  }

  return {
    list,
    //get,
    create,
    update,
    destroy
  }
}

