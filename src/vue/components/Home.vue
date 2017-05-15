<template>
  <div>
    <h1 class="title">Day-to-day</h1>
    <div class="field"><router-link to="/add_order" class="button is-primary">Add new order</router-link></div>
    <div class="field"><router-link to="/add_customer" class="button is-info">Add new customer</router-link></div>
    <div class="field"><router-link to="/generate_report" class="button is-warning">Generate new report(s)</router-link></div>

    <hr>

    <h1 class="title">Management</h1>
    <div class="field"><router-link to="/manage_stock" class="button is-default">Manage stock</router-link></div>
    <div class="field"><router-link to="/manage_customers" class="button is-default">Manage customer</router-link></div>
    <div class="field"><router-link to="/manage_employees" class="button is-default">Manage employees</router-link></div>

    <hr>

    <h1 class="title">Global</h1>
    <div class="field"><router-link to="/manage_products" class="button is-default">Manage products</router-link></div>
  </div>
</template>
