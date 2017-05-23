<template>
  <div>
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

          <div class="columns" v-if="isNewEmployee">
            <div class="column">
              <div class="field">
                <label for="" class="label">Position</label>
                <div class="control">
                  <input v-model="newPosition.name" type="text" id="address" class="input">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label for="" class="label">Work Percentage</label>
                <div class="control">
                  <input v-model="newPosition.workPercentage" type="text" id="address_zip" class="input">
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button @click="reset" href="#" type="submit" class="button is-default is-fullwidth">Add new employee</button>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button href="#" type="submit" class="button is-success is-fullwidth" @click.stop="save">Save employee</button>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <pre v-if="errors" class="notification is-danger">{{ errors }}</pre>
            </div>
          </div>
        </form>


        <template v-if="!isNewEmployee">
          <hr>
          <div class="title is-3">Work history</div>
          <div class="box" v-for="position in positions" :key="position">
             <article class="media">
              <div class="media-content">
                <p>
                  <div>
                    <span class="title is-4">{{ position.name }}</span>
                    <span class="is-pulled-right"><strong>{{ position.workPercentage }}%</strong></span>
                  </div>
                  Started {{ position.startDate | date('YYYY-MM-DD') }}
                  <span v-if="position.endDate"> and quit at {{ position.endDate | date('YYYY-MM-DD') }}</span>
                </p>
              </div>
            </article>
          </div>
        </template>

        <template v-if="!isNewEmployee">
          <hr>
          <h2 class="title">Comments</h2>
          <div class="box" v-for="comment in comments" :key="comment">
            <article class="media">
              <div class="media-content">
                <p>
                  <strong>{{ author(comment).name }}</strong> ({{ comment.date | date('YYYY-MM-DD HH:MM:ss') }})
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
        </template>
      </div>

      <modal v-model="showModal">
        <span slot="title">Good job!</span>
        <span slot="body">{{ employee.name }} was saved!</span>
        <button slot="footer" @click="showModal = false" class="button is-info">close</button>
      </modal>
    </div>
  </div>
</template>

<script>
  import Store from '../mixins/store'
  import Api from '../mixins/api'
  import Modal from './Modal'

  export default {
    mixins: [Store, Api],

    components: {
      Modal,
    },

    data () {
      return {
        showModal: false,
        isNewEmployee: false,
        newPosition: {
          name: '',
          workPercentage: ''
        },
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
        this.isNewEmployee = true
      },

      save () {
        this.errors = ''
        let promise = null
        if (this.employee._id) {
          promise = this.api('put', `/api/stores/${this.store._id}/employees/${this.employee._id}`, this.employee)
        } else {
          this.employee.positions.push(this.newPosition)
          promise = this.api('post', `/api/stores/${this.store._id}/employees/`, this.employee)
        }

        promise
          .then(result => Promise.all([result, result.json()]))
          .then(promises => {
            const [result, json] = promises

            if (!result.ok) {
              this.errors = JSON.stringify(json, null, 2)
            } else {
              this.store.employees = json
              this.showModal = true
            }
          })
          .catch(err => {
            this.errors = JSON.stringify(err, null, 2)
          })
      },

      addComment () {
        this.comment.date = new Date()
        this.employee.comments.push(this.comment)

        this.api('put', `/api/stores/${this.store._id}/employees/${this.employee._id}`, this.employee)
          .then(res => res.json())
          .then(json => {
            this.store.employees = json
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
          positions: []
        }
      },

      author (comment) {
        return this.store.employees.find(employee => comment.author === employee._id)
      }
    },

    watch: {
      employees () {
        this.selectedEmployee = this.employee && this.employees.find(e => e.name === this.employee.name) || this.employees[0]
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
      },

      positions () {
        return this.employee && this.employee.positions
      }
    },

    created () {
      this.employee = this.newEmployee()
    }
  }
</script>

<style>

</style>
