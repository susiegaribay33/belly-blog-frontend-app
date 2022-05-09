<template>
  <div class="restaurants-show">
    <br>
    <br>
    <br>
    <br>
    <br>
    <section id="about" class="about">
      <div class="container" data-aos="fade-up">
        <div class="row event-item">
          <div class="col-lg-6">
            <div class="row">
              <!-- <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content"> -->
                <h3>{{ restaurant.restaurant_name }}</h3>
                <p class="fst-italic">
                  {{ restaurant.address.formatted }}
                </p>
                <p>{{ restaurant.price_range }}</p>
                <div v-for="cuisine in restaurant.cuisines">
                  <p>{{ cuisine }}</p>
                </div>
                <br>
                <h4>Contact</h4>
                <p>{{ restaurant.hours }}</p>
                <p>{{ restaurant.restaurant_phone }}</p>
                <p>{{ restaurant.restaurant_website }}</p>
              <!-- </div> -->
            </div>
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0 content">
            <h4>Add to MyRestaurants?</h4>
            <br>
            <p>Please select a status:</p>
            <select v-model="selected">
              <option value="been">I've been here!</option>
              <option value="go">I'd like to go here!</option>
              <option value="fav">This is my #1 favorite place!</option>
            </select>
            
            <section id="book-a-table" class="book-a-table">
              <div class="php-email-form" data-aos="fade-up" data-aos-delay="100">
                <button type="submit" class="btn btn-success" @click="addRestaurant">Add</button>
              </div>
            </section>
          </div>
          
        </div>
      </div>
    </section>

    <!-- <div v-for="menu in restaurant.menus">
      <p>{{ menu.menu_name }}</p>
      <div v-for="menu_section in menu.menu_sections">
        <p>{{ menu_section.section_name }}</p>
        <div v-for="section_name in menu_section.section_names">
          <p>{{ section_name }}</p>
        </div>

        <div v-for="menu_item in menu_section.menu_items">
          <p>{{ menu_item.name }}</p>
          <p>{{ menu_item.description }}</p>
            <div v-for="pricing in menu_item.pricing">
              <p>{{ pricing.priceString }}</p>
            </div>
        </div>

      </div>
    </div> -->

    <section id="menu" class="menu section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Menu</h2>
          <p>Check Out Their Menu</p>
        </div>

        <!-- <div class="row" data-aos="fade-up" data-aos-delay="100">
          <div class="col-lg-12 d-flex justify-content-center">
            <ul id="menu-flters">
              <li data-filter="*" class="filter-active">All</li>
              <li data-filter=".filter-starters">Starters</li>
              <li data-filter=".filter-salads">Salads</li>
              <li data-filter=".filter-specialty">Specialty</li>
            </ul>
          </div>
        </div> -->

        <div class="row menu-container" data-aos="fade-up" data-aos-delay="200">
          <div v-for="menu in restaurant.menus">
            <div v-for="menu_section in menu.menu_sections">
              <div v-for="menu_item in menu_section.menu_items">

                <div class="col-lg-6 menu-item filter-starters">
                  <!-- <img src="assets/img/menu/lobster-bisque.jpg" class="menu-img" alt=""> -->
                  <div class="menu-content">
                    <a href="">{{ menu_item.name }}</a>
                    <div v-for="pricing in menu_item.pricing">
                      <span>{{ pricing.priceString }}</span>
                    </div>
                  </div>
                  <div class="menu-ingredients">
                    {{ menu_item.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section><!-- End Menu Section -->

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
        cuisines: [],
        selected: '',
        menus: {}
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
          this.menus = response.data.result.menus;
        });
      },
      addRestaurant: function() {
        axios.post("/my_restaurants", {
          user_id: localStorage.user_id,
          restaurant_id: this.restaurant.restaurant_id,
          restaurant_status: this.selected,
          restaurant_name: this.restaurant.restaurant_name,
          restaurant_phone: this.restaurant.restaurant_phone,
          restaurant_website: this.restaurant.restaurant_website,
          hours: this.restaurant.hours,
          price_range: this.restaurant.price_range,
          cuisines: this.restaurant.cuisines,
          address: this.restaurant.address.formatted
        })
        .then((response) => {
          console.log("adding to list...", response);
          this.$router.push("/my_restaurants");
          alert("You have successfully saved this restaurant")
        })
        .catch((error) => {
          console.log(selected);
          console.log("my_restaurants add error", error.response);
          this.errors = error.response.data.errors;
        });
      }
    },
  };
</script>