<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title">Enter an order</div>
    </div>
    <div class="card-content">
      <form action="">
        {{ $router.store }}
        <div class="field">
          <label for="" class="label">Customer ID</label>
          <div class="control">
            <input ref="customerId" type="text" id="customer_id" class="input" autofocus>
          </div>
        </div>

        <div class="field">
          <label for="" class="label">Product(s)</label>
          <div class="control">
            <span class="select is-fullwidth">
              <select @change="addProduct" v-model="selectedProduct" name="products" id="products">
                <option v-for="product in products" :key="product._id" :value="product">{{ product.name }}</option>
              </select>
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <ul>
              <li v-for="item in newOrder.orderItems" :key="item._id" class="tag is-medium">{{ item.name }}
                <button @click="removeItem(item)" class="delete is-small" style="margin-left: auto"></button>
              </li>
            </ul>
          </div>
        </div>

        <div class="field">
          <label for="" class="label">Cashier</label>
          <div class="control">
            <span class="select is-fullwidth">
              <select v-model="selectedCashier">
                <option v-for="cashier in cashiers" :key="cashier._id" :value="cashier._id">{{ cashier.name }}</option>
              </select>
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button @click="reset" href="#" class="button is-default is-fullwidth">Clear fields</button>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button href="#" @click.stop="save" type="submit" class="button is-success is-fullwidth" id="btn_place_order">Place order</button>
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
</template>

<script>
  export default {
    data() {
      return {
        errors: '',
        newOrder: {
          customerId: '',
          items: [],
        },
        products: [],
        selectedProduct: null,
        selectedCashier: null,
        store: null,
      }
    },

    created() {
      // Get products
      fetch('/api/products', {
        method: 'get',
      })
      .then(result => {
        this.products = [
          { _id: 123, name: 'hej'},
          { _id: 1234, name: 'hejsan'},
          { _id: 1235, name: 'hejdu'},
          { _id: 1236, name: 'hejasda'},
        ]
        console.log(result.json())
      })
      .catch(err => {
        console.log(err)
      })

      // Get stores
      fetch(`/api/stores/${this.$router.store}`, {
        method: 'get',
      })
      .then(result => {
        this.products = [
        ]
        console.log(result.json())
      })
      .catch(err => {
        console.log(err)
      })
    },

    computed: {
      cashiers() {
        return this.store ? this.store.employees.filter(e => !e.endDate || new Date(e.endDate) < new Date()) : []
      }
    },

    methods: {
      addProduct() {
        this.newOrder.items.push(this.selectedProduct)
        this.selectedProduct = null
        console.log(this.newOrder.items)
      },

      save() {
        fetch('/api/products', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newOrder)
        })
        .then(result => {
          console.log(result)
          if (!result.ok) {
            result.json().then(x => {
              this.errors = result.status < 500 ? x.message : x.errmsg
            })
          } else {
            this.reset()
          }
        })
        .catch(err => {
          console.log(err)
        })
      },

      reset() {
        this.newOrder = {
          customerId: '',
          items: [],
        }

        this.$refs.customerId.focus()
      },

      removeItem(item) {
        this.newOrder.items = this.newOrder.items.filter(i => i._id != item._id)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .tag
    display: flex
    width: 100%
    justify-content: flex-start
    margin-bottom: 0.5rem
</style>
