export default {
  handleError: (err, res) => {
    console.error('Error: ' + err)
    if (err.name == 'ValidationError'){
      return res.status(400).send(err)
    } else {
      return res.status(500).send(err)
    }
  }
}
