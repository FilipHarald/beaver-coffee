<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="card-header-title space-between">
          <div>Run Reports</div>
        </div>
      </div>
      <div class="card-content">
        <form action="">
          <div class="columns">
            <div class="column">
              <div class="field">
                <label for="" class="label">From</label>
                <div class="control">
                  <input v-model="fromDate" type="date" class="input">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label for="" class="label">To</label>
                <div class="control">
                  <input v-model="toDate" type="date" class="input">
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <label for="" class="label">Limit report to an employee</label>
            <div class="control">
              <span class="select is-fullwidth">
                <select v-model="selectedEmployee" @change="employee = selectedEmployee">
                  <option v-for="employee in employees" :key="employee" :value="employee">{{ employee.name }}</option>
                  <option :value="null"></option>
                </select>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button href="#" type="submit" class="button is-success is-fullwidth" @click.stop="save">Run Report</button>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <div v-if="errors" class="notification is-danger">{{ errors }}</div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div v-if="reports.length > 0">
      <br>
      <br>
      <div class="card reports-card">
        <div class="card-header">
          <div class="card-header-title">
            <div>Reports</div>
          </div>
        </div>
        <div v-for="report in reversedReports" class="card-content">
          <div class="box">
            <div class="">
              Time period: {{report.from}} - {{report.to}} ({{report.amountOfDays}} days)<br>
              <span v-if="report.employee">Employee: {{report.employee}}<br></span>
              Amount of orders: {{report.amountOfOrders}}<br>
              Total amount of money for all orders: {{report.totalAmount}}<br>
              Avarage amount of money per order: {{report.avarageAmount}}<br>
              Avarage amount of money per day: {{report.amountPerDay}}<br>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Store from '../mixins/store'
  import Api from '../mixins/api'

  export default {
    mixins: [Store, Api],

    data () {
      return {
        selectedEmployee: null,
        fromDate: null,
        toDate: null,
        reports: [],
        errors: ''
      }
    },

    watch: {
      employees () {
        this.fromDate = '2017-05-20'
        this.toDate = '2017-06-20'
      }
    },

    methods: {

      save () {
        this.errors = null
        let url = `/api/stores/${this.store._id}`
        if (this.selectedEmployee !== null) {
          url = `${url}/employees/${this.selectedEmployee._id}`
        }
        url = `${url}/report?from=${this.fromDate}&to=${this.toDate}`
        this.api('get', url)
        .then(result => {
          if (result.status == 404) {
            return Promise.reject({
              message: "Not found",
              status: 404
            })
          }
          if (result.status >= 400) {
            return result.json().then(x => {
              x.status = result.status
              return Promise.reject(x)
            })
          }
          return result.json()
        }).then(report => {
          report.from = this.fromDate
          report.to = this.toDate
          if (this.selectedEmployee) {
            report.employee  = this.selectedEmployee.name
          }
          this.reports.push(report)
        })
        .catch(err => {
          this.errors = err.status < 500 ? err.message : err.errmsg
          console.log(err)
        })
      },
    },

    computed: {
      employees() {
        return this.store && this.store.employees || []
      },
      reversedReports() { 
        return this.reports.reverse()
      }
    }
  }
</script>

<style lang="stylus">
</style>
