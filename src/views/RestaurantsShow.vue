<template>
  <div class="restaurants-show">
    <h1>{{ message }}</h1>
    <h2>{{ restaurant.restaurant_name }}</h2>
    <p>{{ restaurant.address.formatted }}</p>
    <p>{{ restaurant.restaurant_phone }}</p>
    <p>{{ restaurant.hours }}</p>
    <p>{{ restaurant.price_range }}</p>
    <div v-for="cuisine in restaurant.cuisines">
      <p>{{ cuisine }}</p>
    </div>
    <p>{{ restaurant.restaurant_website }}</p>
    <div>
      <p><button v-on:click="addRestaurant()">Add to MyRestaurants</button></p>
      <label for="statuses">Please select a status: </label>
      <select name="statuses" id="statuses">
        <option value="been">I've been here!</option>
        <option value="go">I'd like to go here!</option>
        <option value="fav">This is my #1 favorite place!</option>
      </select>
      <br><br>
      <input type="submit" value="Submit">
    </div>
  </div>
</template>

<style></style>

<script>
  import axios from "axios";
  
  export default {
    data: function () {
      return {
        message: "This is restaurants show",
        restaurant: {},
        cuisine: [],
      };
    },
    created: function () {
      this.getRestaurant();
    },
    methods: {
      getRestaurant: function() {
        axios.get("/restaurant/" + this.$route.params.restaurant_id).then(response => {
          console.log("getting the restaurant info...", response);
          this.restaurant = response.data.result;
          this.cuisines = response.data.result.cuisines;
        });
      },
      addRestaurant: function() {
        axios.post("/my_restaurants", {
          user_id: localStorage.user_id,
          restaurant_id: this.restaurant.restaurant_id,
          // restaurant_status: this.restaurant.,
          restaurant_name: this.restaurant.restaurant_name,
          restaurant_phone: this.restaurant.restaurant_phone,
          restaurant_website: this.restaurant.restaurant_website,
          hours: this.restaurant.hours,
          price_range: this.restaurant.price_range,
          // cuisines: params[:cuisines],
          address: this.restaurant.address.formatted
        })
        .then((response) => {
          console.log("adding to list...", response);
          this.$router.push("/my_restaurants");
        })
        .catch((error) => {
          console.log("my_restaurants add error", error.response);
          this.errors = error.response.data.errors;
        });
      }
    },
  };
</script>