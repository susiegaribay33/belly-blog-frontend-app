<template>
  <div class="myrestaurants-index">
    <section id="why-us" class="why-us">
      <div class="container" data-aos="fade-up">
        <br>
        <br>
        <br>
        <div class="section-title">
          <h2>Time to eat</h2>
          <p>My Restaurants</p>
        </div>

        <div v-for="restaurant in my_restaurants">
          <div class="row">
              <div class="box" data-aos="zoom-in" data-aos-delay="100">
                <span>{{ restaurant.restaurant_name }}</span>
                <h4>{{ restaurant.address }}</h4>
                <p>Status: {{ restaurant.restaurant_status }}</p>
                <h4>Price Range: {{ restaurant.price_range }}</h4>
                <!-- <div v-for="cuisine in restaurant.cuisines">
                  <p>{{ cuisine }}</p>
                </div> -->
                <br>
                <h4>Contact Info</h4>
                <p>Hours: {{ restaurant.hours }}</p>
                <p>Phone Number: {{ restaurant.restaurant_phone }}</p>
                <p>Website: {{ restaurant.restaurant_website }}</p>
                <p><router-link v-bind:to="`/my_restaurants/${restaurant.id}`">More Details</router-link></p>
              </div>
          </div>
          <br>
        </div>
      </div>
    </section>

    
    <!-- <br>
    <br>
    <br>
    <br>
    <br>
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
      <!-- <p>Website: {{ restaurant.restaurant_website }}</p>    
      <router-link v-bind:to="`/my_restaurants/${restaurant.id}`">View</router-link>
      <hr>
    </div>  -->
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