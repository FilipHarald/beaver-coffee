export default function Employees (Store) {
  const list = (req, res) => {
    Store.findOne({ _id: req.params.id}, { employees: 1 } )
      .then((store) => {
        if (store) {
          res.json(store.employees)
        } else {
          res.sendStatus(404)
        }
      }).catch((err) => {
        utils.handleError(err, res)
      })
  }

  const get = (req, res) => {

  }

  const create = (req, res) => {
  }

  const update = (req, res) => {
  }

  const destroy = (req, res) => {
  }

  return {
    list,
    get,
    create,
    update,
    destroy
  }
}

