<template>
  <div class="myrestaurants-index">
    <h1>{{ message }}</h1>
    <h1>My Restaurants</h1>
    <div v-for="restaurant in my_restaurants">
      <h2>{{ restaurant.restaurant_name }}</h2>
      <p>Status: {{ restaurant.restaurant_status }}</p>
      <p>Address: {{ restaurant.address }}</p>
      <p>Phone Number: {{ restaurant.restaurant_phone }}</p>
      <p>Hours: {{ restaurant.hours }}</p>
      <p>Price Range: {{ restaurant.price_range }}</p>
      <!-- <div v-for="cuisine in restaurant.cuisines">
        <p>{{ cuisine }}</p>
      </div> -->
      <p>Website: {{ restaurant.restaurant_website }}</p>    
      <router-link v-bind:to="`/my_restaurants/${restaurant.id}`">View</router-link>
      <hr>
    </div>
  </div>
</template>

<style></style>

<script>
  import axios from "axios";
  
  export default {
    data: function () {
      return {
        message: "this is myrest index",
        my_restaurants: [],
      };
    },
    created: function () {
      this.indexMyRestaurants();
    },
    methods: {
      indexMyRestaurants: function () {
        axios.get("/my_restaurants").then((response) => {
          console.log("my_restaurants index ...", response);
          this.my_restaurants = response.data;
        })
      },
    },
  };
</script>