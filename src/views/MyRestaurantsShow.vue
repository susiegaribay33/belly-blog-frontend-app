<template>
  <div class="myrestaurants-show">

    <section id="about" class="about">
    <div class="container" data-aos="fade-up">
      <br>
      <br>
      <br>
      <div class="row">
        <!-- <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content"> -->
          <h2>{{ restaurant.restaurant_name }}</h2>
          <p class="fst-italic">
            {{ restaurant.address }}
          </p>
          <p>Status: {{ restaurant.restaurant_status }}</p>
          <p>Price Range: {{ restaurant.price_range }}</p>
          <!-- <p>Cuisines: </p>
          <div v-if="restaurant.cuisines == 'Not Available'">
            <p>{{ restaurant.cuisines }}</p>
          </div>
          <div v-else>
            <div v-for="cuisine in restaurant.cuisines">
              <p>{{ cuisine }}</p>
            </div>
          </div> -->
          <br>
          <br>
          <h4>Contact</h4>
          <p>Hours: {{ restaurant.hours }}</p>
          <p>Phone Number: {{ restaurant.restaurant_phone }}</p>
          <p>Website: {{ restaurant.restaurant_website }}</p>
          <br>
          <br>
          <h4>~ My Thoughts ~</h4>
          <p>What food item did I like most from this restaurant? :</p><p class="fst-italic">{{ restaurant.fav_menu_item }}</p>

          <div v-if="restaurant.post">
            <section id="testimonials" class="testimonials section-bg">
              <!-- <div class="container" data-aos="fade-up"> -->

                <!-- <div class="section-title"> -->
                  <!-- <h2>My Experience</h2> -->
                  <!-- <p>My Experience</p> -->
                <!-- </div> -->

                <!-- <div class="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100"> -->
                  <!-- <div class="swiper-wrapper"> -->

                    <!-- <div class="swiper-slide"> -->
                      <div class="testimonial-item">
                        <p>
                          <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                          {{ restaurant.post }}
                          <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                        </p>
                      </div>
                    <!-- </div>End testimonial item -->

                  <!-- </div> -->
                  <!-- <div class="swiper-pagination"></div> -->
                <!-- </div> -->

              <!-- </div> -->
            </section> 
            <!-- End Testimonials Section -->
          </div>
          <!-- <p>{{ restaurant.post }}</p>  -->

          <section id="book-a-table" class="book-a-table">
            <div class="php-email-form" data-aos="fade-up" data-aos-delay="100">
              <router-link v-bind:to="`/my_restaurants/${restaurant.id}/edit`">Update My Content</router-link>
            </div>
          </section>
        <!-- </div> -->
      </div>

    </div>
  </section>

    <!-- <h1>{{ restaurant.restaurant_name }}</h1>
    <p>Status: {{ restaurant.restaurant_status }}</p>
    <p>Address: {{ restaurant.address }}</p>
    <p>Phone Number: {{ restaurant.restaurant_phone }}</p>
    <p>Hours: {{ restaurant.hours }}</p>
    <p>Price Range: {{ restaurant.price_range }}</p>
    <p>Cuisines: {{ restaurant.cuisines }}</p>
    <p>Website: {{ restaurant.restaurant_website }}</p>
    <p>What did I like most from this restaurant? : {{ restaurant.fav_menu_item }}</p>
    <p>{{ restaurant.post }}</p> 
    <router-link v-bind:to="`/my_restaurants/${restaurant.id}/edit`">Update (status, menu item, post)</router-link>
    <hr> 
    
    <button type="submit" class="btn btn-success" @click="addRestaurant">Add</button>-->

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