<template>
  <div class="login">
    <section id="book-a-table" class="book-a-table">
      <div class="php-email-form" data-aos="fade-up" data-aos-delay="100">
        <section id="about" class="about">
          <div class="container" data-aos="fade-up">
            <!-- <div class="row event-item"> -->
              <!-- <div class="col-lg-6"> -->
                <div class="row">
                  <div class="col-lg-4 col-md-6 form-group">

                    <form v-on:submit.prevent="createSession()">
                      <h1>Login</h1>
                      <ul>
                        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                      </ul>
                      <div>
                        <label>Email: </label>
                        <input type="email" v-model="newSessionParams.email" />
                      </div> 
                      <div>
                        <label>Password: </label>
                        <input type="password" v-model="newSessionParams.password" />
                      </div>
                      <!-- <div class="text-center"> -->
                        <button type="submit">Login</button>
                      <!-- </div> -->
                      <!-- <input type="submit" value="Submit" /> -->
                    </form>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    
                  </div>
                </div>
              <!-- </div> -->
            <!-- </div> -->
          </div>
        </section>
      </div>
    </section>
      
  </div>
</template>

<style></style>

<script>
  import axios from "axios";
  
  export default {
    data: function () {
      return {
        message: "Login Page",
        newSessionParams: {},
        errors: []
      };
    },
    created: function () {},
    methods: {
      createSession: function () {
        axios
          .post("/sessions", this.newSessionParams)
          .then((response) => {
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.jwt;
            localStorage.setItem("jwt", response.data.jwt);
            localStorage.setItem("user_id", response.data.user_id)
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error.response);
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          });
      }
    },
  };
</script>