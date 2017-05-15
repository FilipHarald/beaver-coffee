<template>
  <div class="columns">
    <div class="column">
      <div class="section is-grouped">
        <h1 class="title">Day-to-day</h1>
        <router-link to="/order" class="button is-primary">Add new order</router-link>
        <a href="add_order.html" class="button is-primary">Add new order</a>
        <a href="add_customer.html" class="button is-info">Add new customer</a>
        <a href="generate_report.html" class="button is-warning">Generate new report(s)</a>
      </div>
    </div>

    <div class="column">
      <div class="section is-grouped">
        <h1 class="title">Management</h1>
        <a href="manage_stock.html" class="button is-default">Manage stock</a>
        <a href="manage_customers.html" class="button is-default">Manage customer</a>
        <a href="manage_employees.html" class="button is-default">Manage employees</a>
      </div>
    </div>

    <div class="column">
      <div class="section is-grouped">
        <h1 class="title">Global</h1>
        <a href="manage_products.html" class="button is-default">Manage products</a>
      </div>
    </div>
  </div>
</template>
