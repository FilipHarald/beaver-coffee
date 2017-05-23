<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="card-header-title">Enter an order</div>
      </div>
      <div class="card-content">
        <form action="">
          <div class="field">
            <label for="" class="label">Customer ID</label>
            <div class="control">
              <input ref="customerId" v-model="newOrder.customerId" type="text" id="customer_id" class="input" autofocus>
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
                <li v-for="(item, index) in newOrder.items" :key="item._id" class="tag is-medium">{{ item.name }}
                  <button @click="removeItem(index)" class="delete is-small" style="margin-left: auto"></button>
                </li>
              </ul>
            </div>
          </div>

          <div class="field">
            <label for="" class="label">Cashier</label>
            <div class="control">
              <span class="select is-fullwidth">
                <select v-model="newOrder.cashier">
                  <option v-for="cashier in cashiers" :key="cashier._id" :value="cashier._id">{{ cashier.name }}</option>
                </select>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button @click="clear" href="#" class="button is-default is-fullwidth">Clear fields</button>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button href="#" @click.stop="save" type="submit" class="button is-success is-fullwidth" :disabled="!newOrder.items.length || !newOrder.cashier">Place order</button>
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

    <modal v-model="showModal">
      <span slot="title">Receipt</span>
      <div slot="body">
        <div class="title is-3">Items</div>
        <div class="box" v-for="item in savedOrder.items" :key="item">
          <div class="title is-4">{{ item.name }} <span class="is-pulled-right"><strong>x{{ item.amount }}</strong></span></div>
        </div>

        <div class="title is-2">Total {{ savedOrder.total }} {{ currency }}</div>
      </div>
      <span slot="footer">
        <button class="button is-info" @click="showModal = false">Close</button>
      </span>
    </modal>
  </div>
</template>

<script>
  import Modal from './Modal'
  import Store from '../mixins/store'

  export default {
    mixins: [Store],

    components: {
      Modal,
    },

    data() {
      return {
        errors: '',
        showModal: false,
        newOrder: {
          customerId: '',
          items: [],
          cashier: null
        },
        savedOrder: {
          total: 0,
          items: []
        },
        products: [],
        selectedProduct: null,
        selectedCashier: null,
        store: null,
      }
    },

    created() {
      this.getProducts()
    },

    computed: {
      cashiers() {
        return this.store ? this.store.employees.filter(e => !e.endDate || new Date(e.endDate) < new Date()) : []
      },
      currency () {
        return this.store && this.store.location.country.currency || ''
      }
    },

    methods: {
      setStore(storeId) {
        fetch(`/api/stores/${storeId}`, { method: 'get' })
          .then(result => result.json().then(x => this.store = x))
          .catch(err => console.log(err))
      },

      getProducts() {
        fetch('/api/products', { method: 'get' })
          .then(result => result.json())
          .then(x => this.products = x.filter(f => f.productType === 'Product'))
          .catch(err => console.log(err))
      },

      addProduct() {
        this.newOrder.items.push(this.selectedProduct)
        this.selectedProduct = null
      },

      save() {
        fetch(`/api/stores/${this.store._id}/orders`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newOrder)
        })
        .then(result => {
          if (!result.ok) {
            result.json().then(x => {
              this.errors = result.status < 500 ? x.message : x.errmsg
            })
          } else {
            result.json().then(order => {
              this.savedOrder = order
              this.showModal = true
            })
          }
        })
        .catch(err => console.log(err))
      },

      clear() {
        this.newOrder = {
          customerId: '',
          items: [],
        }
        this.$refs.customerId.focus()
      },

      removeItem(index) {
        this.newOrder.items = this.newOrder.items.filter((item, i) => i !== index)
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
