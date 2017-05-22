const seed = async (mongoose) => {
  const Employee = mongoose.model('Employee')
  const Store = mongoose.model('Store')

  console.log('=== COMMENTS ===')
  let manager = null
  const store = await Store.findOne()
  try {
    manager = store.employees.find(e => e.personId === managerId)
    console.log(manager.name + " commenting on employees")
  } catch (err) {
    console.log('ERROR MANAGER: ' + err)
  }

  if (manager) {
    const comments = [
      'He is lazy...',
      'He is not lazy...'
    ]

    for (let i = 0; i < employeeIds.length; i++) {
      const employee = await store.employees.find(e => e.personId === employeeIds[i])

      employee.comments.push({ // All employees get the same comment
        author: manager._id,
        text: comments[i]
      })

      try {
        await store.save()
        console.log(employee.name)
      } catch (err) {
        console.log('ERROR CUSTOMERS: ' + err)
      }
    }
  }
}

const managerId = '19991212-3939'
const employeeIds = ['19861212-3939', '1337-7331']

export default {
  seed
}
