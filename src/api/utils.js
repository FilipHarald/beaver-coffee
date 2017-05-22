export default {
  handleError: (err, res) => {
    console.error('DB error: ' + err)
    if (err.name == 'ValidationError'){
      res.status(400).send(err)
    } else {
      res.status(500).send(err)
    }
  }
}
