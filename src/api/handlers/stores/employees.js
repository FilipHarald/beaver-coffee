import utils from '../../utils'

export default function Employees (Store) {
  const list = async (req, res) => {
    try {
      const store = await Store.findOne({ _id: req.params.id }, { employees: 1 })

      store && res.json(store.employees) || res.sendStatus(404)
    } catch (err) {
      utils.handleError(err, res)
    }
  }

  /*
  const get = (req, res) => {
    Store.findOne({ _id: req.params.id, 'employees. })
  }
  */

  const create = async (req, res) => {
    try {
      const store = await Store.findOne({ _id: req.params.id})
      store.employees.push(req.body)
      await store.save()

      res.json(store.employees)
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

