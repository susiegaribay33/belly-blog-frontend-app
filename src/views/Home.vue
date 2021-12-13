<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h1>Browse All Restaurants</h1>
    <div v-for="restaurant in restaurants">
      <h2>{{ restaurant.restaurant_name }}</h2>
      <p>{{ restaurant.address.formatted }}</p>
      <p>{{ restaurant.restaurant_phone }}</p>
      <p>{{ restaurant.hours }}</p>
      <p>{{ restaurant.price_range }}</p>
      <div v-for="cuisine in restaurant.cuisines">
        <p>{{ cuisine }}</p>
      </div>
      <p>{{ restaurant.restaurant_website }}</p>
      <router-link v-bind:to="`/restaurant/${restaurant.restaurant_id}`">View Info / Save</router-link>
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
        message: "Welcome to Belly Blog! This is the home page.",
        restaurants: [],
        cuisines: [],
      };
    },
    created: function () {
      this.indexRestaurants();
    },
    methods: {
      indexRestaurants: function () {
        axios.get("/restaurants/2").then((response) => {
          console.log("restaurants index page 1...with cuisines", response);
          this.restaurants = response.data.data;
          this.cuisines = response.data.data.cuisines;
        })
      },
    },
  };
</script>