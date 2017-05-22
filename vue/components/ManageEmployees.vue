<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title space-between">
        <div>Manage Employees</div>
        <div class="field">
          <div class="control">
            <span class="select is-fullwidth">
              <select v-model="selectedEmployee" @change="employee = selectedEmployee">
                <option v-for="employee in employees" :key="employee" :value="employee">{{ employee.name }}</option>
              </select>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <form action="">
        <div class="field">
          <label for="" class="label">ID (SSN/Personnummer)</label>
          <div class="control">
            <input v-model="employee.personId" type="text" id="customer_id" class="input" autofocus>
          </div>
        </div>

        <div class="field">
          <label for="" class="label">Name</label>
          <div class="control">
            <input v-model="employee.name" type="text" id="customer_name" class="input">
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label for="" class="label">Address</label>
              <div class="control">
                <input v-model="employee.location.address" type="text" id="address" class="input">
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label for="" class="label">Zip code</label>
              <div class="control">
                <input v-model="employee.location.zip" type="text" id="address_zip" class="input">
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label for="" class="label">Country</label>
              <div class="control">
                <input v-model="employee.location.country.name" type="text" id="address_country" class="input">
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label for="" class="label">Position</label>
              <div class="control">
                <input v-model="employee.position.name" type="text" id="address" class="input">
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label for="" class="label">Work Percentage</label>
              <div class="control">
                <input v-model="employee.position.workPercentage" type="text" id="address_zip" class="input">
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button @click="reset" href="#" type="submit" class="button is-default is-fullwidth">Register new employee</button>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button href="#" type="submit" class="button is-success is-fullwidth" @click.stop="save">Save employee</button>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <div v-if="errors" class="notification is-danger">{{ errors }}</div>
          </div>
        </div>
      </form>

      <hr>

      <h2 class="title">Comments</h2>
      <div class="box" v-for="comment in comments" :key="comment">
        <article class="media">
          <div class="media-content">
            <p>
              <strong>{{ author(comment).name }}</strong> ({{ comment.date }})
              <br>
              {{ comment.text }}
            </p>
          </div>
        </article>
      </div>
      <div class="columns">
        <div class="column is-one-quarter">
          <div class="field">
            <label for="" class="label">Author</label>
            <div class="select is-fullwidth">
              <select v-model="comment.author">
                <option v-for="author in authors" :key="author" :value="author._id">{{ author.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label for="" class="label">Comment</label>
            <div class="control">
              <input class="input" type="text" v-model="comment.text">
            </div>
          </div>
        </div>
        <div class="column is-one-quarter">
          <div class="field">
            <label for="" class="label">&nbsp;</label>
            <button href="#" class="button is-success is-fullwidth" @click="addComment">Add comment</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Store from '../mixins/store'

  export default {
    mixins: [Store],
    data () {
      return {
        store: null,
        employee: null,
        selectedEmployee: null,
        errors: '',
        comment: {
          author: '',
          text: ''
        }
      }
    },

    methods: {
      reset () {
        this.employee = this.newEmployee()
      },

      save () {
        let promise = null
        if (this.employee._id) {
          promise = fetch(`/api/stores/${this.store._id}/employees/${this.employee._id}`,
            {
              method: 'put',
              body: JSON.stringify(this.employee),
              headers: {
                'Content-Type': 'application/json'
              }
            })
        } else {
          promise = fetch(`/api/stores/${this.store._id}/employees/`,
            {
              method: 'post',
              body: JSON.stringify(this.employee),
              headers: {
                'Content-Type': 'application/json'
              }
            })
        }

        promise
          .then(result => result.json())
          .then(json => {
            console.log('zxc')
          })
      },

      addComment () {
        comment.date = new Date()
        this.employee.comments.push(comment)
        fetch(`/api/stores/${this.store.id}/employees/${this.selectedEmployee.id}`,
          {
            method: 'post',
            body: this.selectedEmployee,
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(json => {
            console.log('update store instance?')
          })
          .catch(err => console.log(err))
      },

      newEmployee () {
        return {
          personId: '',
          name: '',
          location: {
            country: {
              name: ''
            }
          },
          position: {
            name: '',
            workPercentage: ''
          }
        }
      },

      author (comment) {
        return this.store.employees.find(employee => comment.author === employee._id)
      }
    },

    watch: {
      employees () {
        this.selectedEmployee = this.employees[0]
        this.employee = this.selectedEmployee
      }
    },

    computed: {
      comments () {
        return this.employee.comments || []
      },

      authors () {
        return this.store && this.store.employees.filter(e => e.personId !== this.employee.personId) || []
      },

      employees () {
        return this.store && this.store.employees
      }
    },

    created () {
      this.employee = this.newEmployee()
    }
  }
</script>

<style>

</style>
