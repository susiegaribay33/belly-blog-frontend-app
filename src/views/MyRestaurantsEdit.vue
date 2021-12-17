<template>
  <div class="myrestaurants-edit">
    <h1>Update MyRestaurant</h1>
    <form v-on:submit.prevent="updateRestaurant(updateParams)">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>

      <p>Update the restaurant status:</p>
      <select v-model="updateParams.restaurant_status">
        <option value="been">I've been here!</option>
        <option value="go">I'd like to go here!</option>
        <option value="fav">This is my #1 favorite place!</option>
      </select>

      <p>What was you favortite menu item?:</p>
      <input type="text" v-model="updateParams.fav_menu_item" />

      <p>Write a post about your restaurant experience here:</p>
      <input type="text" v-model="updateParams.post" id="text" name="post-text" class="input-text"/>
      <p><input type="submit" value="Update" /></p>
    </form>
  </div>
</template>

<style>
.input-text {
    width: 300px;
    height: 120px;
    overflow: auto;
}
</style>

<script>
  import axios from "axios";
  
  export default {
    data: function () {
      return {
       updateParams: {},
       errors: [],
      };
    },
    created: function () {
      this.showMyRestaurant();
    },
    methods: {
      updateRestaurant: function () {
        axios.patch("/my_restaurants/" + this.$route.params.id, this.updateParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/my_restaurants");
          alert("You have successfully updated this restaurant")
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
      },
      showMyRestaurant: function() {
      console.log("showing the restaurant...")
      axios.get("/my_restaurants/" + this.$route.params.id).then(response => {
        console.log(response.data);
        this.updateParams = response.data;
      });
      }
    },
  };
</script>