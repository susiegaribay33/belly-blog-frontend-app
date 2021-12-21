<template>
  <div class="myrestaurants-edit">
    <section id="book-a-table" class="book-a-table">
      <div class="php-email-form" data-aos="fade-up" data-aos-delay="100">
        <section id="about" class="about">
          <div class="container" data-aos="fade-up">
            <!-- <div class="row event-item"> -->
              <!-- <div class="col-lg-6"> -->
                <div class="row">
                  <!-- <div class="col-lg-4 col-md-6 form-group"> -->

                    <form v-on:submit.prevent="updateRestaurant(updateParams)">
                      <h1>Update MyRestaurant Content</h1>
                      <ul>
                        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                      </ul>
                      <p>Update the restaurant status:</p>
                      <select v-model="updateParams.restaurant_status">
                        <option value="been">I've been here!</option>
                        <option value="go">I'd like to go here!</option>
                        <option value="fav">This is my #1 favorite place!</option>
                      </select>
                      <br>
                      <br>
                      <br>
                      <p>What was you favortite menu item?:</p>
                      <input type="text" v-model="updateParams.fav_menu_item" placeholder="ex. Shrimp Tacos"/>
                      <br>
                      <br>
                      <br>
                      <p>Write a post about your restaurant experience here:</p>
                      <div class="form-group mt-3">
                        <textarea v-model="updateParams.post" class="form-control" name="message" rows="5" placeholder="Write here"></textarea>
                      </div>

                      <!-- <p>Write a post about your restaurant experience here:</p> -->
                      <!-- <input type="text" v-model="updateParams.post" id="text" name="post-text" class="input-text"/> -->
                      
                      <section id="book-a-table" class="book-a-table">
                        <div class="php-email-form" data-aos="fade-up" data-aos-delay="100">
                          <button type="submit" class="btn btn-success" @click="updateRestaurant">Update</button>
                        </div>
                      </section>
                    </form>
                    
                  <!-- </div> -->
                </div>
              <!-- </div> -->
            <!-- </div> -->
          </div>
        </section>
      </div>
    </section>
    <!-- <h1>Update MyRestaurant</h1>
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
    </form> -->
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