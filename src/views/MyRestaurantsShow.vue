<template>
  <div class="myrestaurants-show">
    <h1>{{ restaurant.restaurant_name }}</h1>
    <p>Status: {{ restaurant.restaurant_status }}</p>
    <p>Address: {{ restaurant.address }}</p>
    <p>Phone Number: {{ restaurant.restaurant_phone }}</p>
    <p>Hours: {{ restaurant.hours }}</p>
    <p>Price Range: {{ restaurant.price_range }}</p>
    <!-- <div v-for="cuisine in restaurant.cuisines">
      <p>{{ cuisine }}</p>
    </div> -->
    <p>Website: {{ restaurant.restaurant_website }}</p>
    <p>What did I like most from this restaurant? : {{ restaurant.fav_menu_item }}</p>
    <p>{{ restaurant.post }}</p> 
    <router-link v-bind:to="`/my_restaurants/${restaurant.id}/edit`">Update (status, menu item, post)</router-link>
    <hr>
  </div>
</template>

<style></style>

<script>
  import axios from "axios";
  
  export default {
    data: function () {
      return {
        message: "View Page",
        restaurant: {},
      };
    },
    created: function () {
      this.showMyRestaurant();
    },
    methods: {
      showMyRestaurant: function() {
        console.log("showing the restaurant...")
        axios.get("/my_restaurants/" + this.$route.params.id).then(response => {
          console.log(response.data);
          this.restaurant = response.data;
        });
      }
    },
  };
</script>