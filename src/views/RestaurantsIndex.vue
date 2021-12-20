<template>
  <div class="restaurants-index">
  <!-- ======= Why Us Section ======= -->
    <section id="why-us" class="why-us">
      <div class="container" data-aos="fade-up">
        <br>
        <br>
        <br>
        <div class="section-title">
          <h2>Time to eat</h2>
          <p>Browse Restaurants</p>
        </div>
      
        <!-- <p><b>Search by Zipcode: </b><input type="text" v-model="zipParams.zipcode"/><button v-on:click="searchZip()">Search</button></p>
        <br>
        <p><b>Search by State (example: IL): </b><input type="text" v-model="stateParams.state"/><button v-on:click="searchState()">Search</button></p>
        <br>
        <p><b>Search by Restaurant Name: </b><input type="text" v-model="nameParams.name"/><button v-on:click="searchName()">Search</button></p>
        <br> -->

        <!-- ======= Book A Table Section ======= -->
        <section id="book-a-table" class="book-a-table">
          <!-- <div class="container" data-aos="fade-up"> -->

            <!-- <div class="section-title">
              <h2>Reservation</h2>
              <p>Book a Table</p>
            </div> -->

            <div class="php-email-form" data-aos="fade-up" data-aos-delay="100">

              <div class="row">
                <div class="col-lg-4 col-md-6 form-group">
                  <p><b>Search by Restaurant Name: </b>
                  <input type="text" v-model="nameParams.name" class="form-control" placeholder="ex. Patino's Grill"><button v-on:click="searchName()">Search</button></p>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-4 col-md-6 form-group">
                  <p><b>Search by Zipcode: </b><input type="text" v-model="zipParams.zipcode" class="form-control" placeholder="ex. 60603"><button v-on:click="searchZip()">Search</button></p>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-4 col-md-6 form-group">
                  <p><b>Search by State: </b><input type="text" v-model="stateParams.state" class="form-control" placeholder="ex. IL"><button v-on:click="searchState()">Search</button></p>
                </div>
              </div>

            </div>

          <!-- </div> -->
        </section>
        <!-- End Book A Table Section -->

        <div v-for="restaurant in restaurants">
          <div class="row">
              <div class="box" data-aos="zoom-in" data-aos-delay="100">
                <span>{{ restaurant.restaurant_name }}</span>
                <h4>{{ restaurant.address.formatted }}</h4>
                <h4>{{ restaurant.price_range }}</h4>
                <div v-for="cuisine in restaurant.cuisines">
                  <p>{{ cuisine }}</p>
                </div>
                <br>
                <h4>Contact</h4>
                <p>{{ restaurant.hours }}</p>
                <p>{{ restaurant.restaurant_phone }}</p>
                <p>{{ restaurant.restaurant_website }}</p>
                <p><router-link v-bind:to="`/restaurant/${restaurant.restaurant_id}`">View Info / Save</router-link></p>
              </div>
          </div>
          <br>
        </div>

      </div>
    </section>
    <!-- End Why Us Section -->

    <!-- <h1>Browse All Restaurants</h1>
    <br>
    <p><b>Search by Zipcode: </b><input type="text" v-model="zipParams.zipcode"/><button v-on:click="searchZip()">Search</button></p>
    <br>
    <p><b>Search by State (example: IL): </b><input type="text" v-model="stateParams.state"/><button v-on:click="searchState()">Search</button></p>
    <br>
    <p><b>Search by Restaurant Name: </b><input type="text" v-model="nameParams.name"/><button v-on:click="searchName()">Search</button></p>
    <br>
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
    </div> -->

    <div id="pagination">
      <pagination v-if="cuisineParams.cuisine" :pagination="pagination" 
        @prev="--cuisineParams.page; searchCuisine();"
        @next="cuisineParams.page++; searchCuisine();">
      </pagination>

      <pagination v-if="zipParams.zipcode" :pagination="pagination" 
        @prev="--zipParams.page; searchZip();"
        @next="zipParams.page++; searchZip();">
      </pagination>

      <pagination v-else-if="stateParams.state" :pagination="pagination" 
        @prev="--stateParams.page; searchState();"
        @next="stateParams.page++; searchState();">
      </pagination>

      <pagination v-else-if="nameParams.name" :pagination="pagination" 
        @prev="--nameParams.page; searchName();"
        @next="nameParams.page++; searchName();">
      </pagination>

      <pagination v-else :pagination="pagination"  
        @prev="--restaurantsData.page; indexRestaurants();"
        @next="restaurantsData.page++; indexRestaurants();">
      </pagination>
    </div> -->

  </div>
</template>

<style></style>

<script>
  import axios from "axios";
  import pagination from '../components/pagination.vue';

  export default {
    mounted() {
      this.indexRestaurants();
    },
    components: {
      'pagination': pagination
    },
    data: function () {
      return {
        message: "this is the restaurants-index page.",
        restaurants: [],
        cuisines: [],
        restaurantsData: {
            page: 1
        },
        pagination: {
            prevPage: '',
            nextPage: '',
            totalPages: '',
            from: '',
            to: '',
            total: '',
        },
        cuisineParams: {
          page: 1,
          cuisine: '',
        },
        zipParams: {
          page: 1,
          zipcode: '',
        },
        stateParams: {
          page: 1,
          state: '',
        },
        nameParams: {
          page: 1,
          name: '',
        },
      };
    },
    // created: function () {
    //   this.indexRestaurants();
    // },
    methods: {
      indexRestaurants: function () {
        axios.get("/restaurants/" + this.restaurantsData.page).then((response) => {
          console.log("all restaurants index...", response);
          this.restaurants = response.data.data;
          this.cuisines = response.data.data.cuisines;
          this.configPagination(response.data)
        })
      },
      searchCuisine: function() {
        axios.get("/restaurants_cuisine/" + this.cuisineParams.cuisine + "/" + this.cuisineParams.page).then((response) => {
          console.log("searching this cuisine...", response);
          this.restaurants = response.data.data;
          this.cuisines = response.data.data.cuisines;
          this.cuisinePagination(response.data)
        })
      },
      searchZip: function() {
        axios.get("/restaurants_zip/" + this.zipParams.zipcode + "/" + this.zipParams.page).then((response) => {
          console.log("searching in this zipcode...", response);
          this.restaurants = response.data.data;
          this.cuisines = response.data.data.cuisines;
          this.zipPagination(response.data)
        })
      },
      searchState: function() {
        axios.get("/restaurants_state/" + this.stateParams.state + "/" + this.stateParams.page).then((response) => {
          console.log("searching in this state...", response);
          this.restaurants = response.data.data;
          this.cuisines = response.data.data.cuisines;
          this.statePagination(response.data)
        })
      },
      searchName: function() {
        axios.get("/restaurants_name/" + this.nameParams.name + "/" + this.nameParams.page).then((response) => {
          console.log("searching by this name...", response);
          this.restaurants = response.data.data;
          this.cuisines = response.data.data.cuisines;
          this.namePagination(response.data)
        })
      },
      configPagination(data) {
          this.pagination.total = +data['totalResults'];
          this.pagination.totalPages = +data['total_pages'];
          this.pagination.from = this.pagination.total ? ((this.restaurantsData.page - 1) * 25) + 1 : ' ';
          this.pagination.to = (this.restaurantsData.page * 25) > this.pagination.total ? this.pagination.total : this.restaurantsData.page * 25;
          this.pagination.prevPage = this.restaurantsData.page > 1 ? this.restaurantsData.page : '';
          this.pagination.nextPage = this.restaurantsData.page < this.pagination.totalPages ? this.restaurantsData.page + 1 : '';
      },
      cuisinePagination(data) {
          this.pagination.total = +data['totalResults'];
          this.pagination.totalPages = +data['total_pages'];
          this.pagination.from = this.pagination.total ? ((this.cuisineParams.page - 1) * 25) + 1 : ' ';
          this.pagination.to = (this.cuisineParams.page * 25) > this.pagination.total ? this.pagination.total : this.cuisineParams.page * 25;
          this.pagination.prevPage = this.cuisineParams.page > 1 ? this.cuisineParams.page : '';
          this.pagination.nextPage = this.cuisinearams.page < this.pagination.totalPages ? this.cuisineParams.page + 1 : '';
      },
      zipPagination(data) {
          this.pagination.total = +data['totalResults'];
          this.pagination.totalPages = +data['total_pages'];
          this.pagination.from = this.pagination.total ? ((this.zipParams.page - 1) * 25) + 1 : ' ';
          this.pagination.to = (this.zipParams.page * 25) > this.pagination.total ? this.pagination.total : this.zipParams.page * 25;
          this.pagination.prevPage = this.zipParams.page > 1 ? this.zipParams.page : '';
          this.pagination.nextPage = this.zipParams.page < this.pagination.totalPages ? this.zipParams.page + 1 : '';
      },
      statePagination(data) {
          this.pagination.total = +data['totalResults'];
          this.pagination.totalPages = +data['total_pages'];
          this.pagination.from = this.pagination.total ? ((this.stateParams.page - 1) * 25) + 1 : ' ';
          this.pagination.to = (this.stateParams.page * 25) > this.pagination.total ? this.pagination.total : this.stateParams.page * 25;
          this.pagination.prevPage = this.stateParams.page > 1 ? this.stateParams.page : '';
          this.pagination.nextPage = this.stateParams.page < this.pagination.totalPages ? this.stateParams.page + 1 : '';
      },
      namePagination(data) {
          this.pagination.total = +data['totalResults'];
          this.pagination.totalPages = +data['total_pages'];
          this.pagination.from = this.pagination.total ? ((this.nameParams.page - 1) * 25) + 1 : ' ';
          this.pagination.to = (this.nameParams.page * 25) > this.pagination.total ? this.pagination.total : this.nameParams.page * 25;
          this.pagination.prevPage = this.nameParams.page > 1 ? this.nameParams.page : '';
          this.pagination.nextPage = this.nameParams.page < this.pagination.totalPages ? this.nameParams.page + 1 : '';
      },
    },
  };
</script>