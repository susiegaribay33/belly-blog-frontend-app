<template>
  <div class="home">
    <h1>{{ message }}</h1>

    <h1>Browse All Restaurants</h1>
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
    </div>

    <!-- <pagination :pagination="pagination"  
      @prev="--restaurantsData.page; indexRestaurants();"
      @next="restaurantsData.page++; indexRestaurants();">
    </pagination> -->

    <div id="pagination">
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
    </div>

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
        message: "Welcome to Belly Blog! This is the home page.",
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
          console.log("searching in this zipcode...", response);
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