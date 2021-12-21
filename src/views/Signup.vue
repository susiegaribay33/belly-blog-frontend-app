<template>
  <div class="signup">
    <section id="book-a-table" class="book-a-table">
      <!-- <div class="php-email-form" data-aos="fade-up" data-aos-delay="100"> -->
        <section id="about" class="about">
          <div class="container" data-aos="fade-up">
            <!-- <div class="row event-item"> -->
              <!-- <div class="col-lg-6"> -->
                <div class="row">
                  <!-- <div class="col-lg-4 col-md-6 form-group"> -->

                    <form v-on:submit.prevent="createUser()">
                      <h1>Signup</h1>
                      <ul>
                        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                      </ul>
                      <div>
                        <p>Name: <input type="text" v-model="newUserParams.name" /></p>
                        <!-- <input type="text" v-model="newUserParams.name" /> -->
                      </div> 
                      <div>
                        <p>Email: <input type="email" v-model="newUserParams.email" /></p>
                        <!-- <input type="email" v-model="newUserParams.email" /> -->
                      </div> 
                      <div>
                        <p>Password: <input type="password" v-model="newUserParams.password" /></p>
                        <!-- <input type="password" v-model="newUserParams.password" /> -->
                      </div>
                      <div>
                        <p>Password confirmation: <input type="password" v-model="newUserParams.password_confirmation" /></p>
                        <!-- <input type="password" v-model="newUserParams.password_confirmation" /> -->
                      </div>
                      <!-- <div class="text-center"> -->
                        <button type="submit">Submit</button>
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
                    
                  <!-- </div> -->
                </div>
              <!-- </div>  -->
            <!-- </div> -->
          </div>
        </section>
      <!-- </div> -->
    </section>
    <!-- <form v-on:submit.prevent="createUser()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Name:</label>
        <input type="text" v-model="newUserParams.name" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newUserParams.email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newUserParams.password" />
      </div>
      <div>
        <label>Password confirmation:</label>
        <input type="password" v-model="newUserParams.password_confirmation" />
      </div>
      <input type="submit" value="Submit" />
    </form> -->
  </div>
</template>

<style></style>

<script>
  import axios from "axios";
  
  export default {
    data: function () {
      return {
        message: "Signup Page",
        newUserParams: {},
        errors: []
      };
    },
    created: function () {},
    methods: {
      createUser: function () {
        axios
          .post("/users", this.newUserParams)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/login");
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      }
    },
  };
</script>