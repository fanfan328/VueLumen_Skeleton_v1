<template>
  <v-app id="login">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip> -->
              </v-toolbar>
                <v-form @submit.prevent="onSubmit()">
                    <v-card-text>
                        <v-text-field
                            label="Login (E-mail)"
                            name="login"
                            prepend-icon="mdi-account"
                            type="email" 
                            v-model="email"
                        ></v-text-field>

                        <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            v-model="password"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" type="submit">Login</v-btn>
                    </v-card-actions>
                </v-form>
                </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
    name: "Home",
    components: {},
    props: {
      source: String,
    },
    data() {
        return {
        email: "",
        password: "",
        currentRouteName: ""
        };
    },
    created() {
        this.currentRouteName = this.$route.name;
    },
    methods: {
        onSubmit() {
            if (this.email.trim() && this.password.trim()) {
                let formData = new FormData();
                formData.append("email", this.email.trim());
                formData.append("password", this.password);

                const options = {
                url: "http://localhost:8000/api/login",
                method: "post",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: formData
                };

                axios(options)
                .then(response => {
                    const token = response.data.token;
                    if (token) {
                      this.$session.set('role', response.data.role);
                      this.$session.set('token', response.data.token);

                      // Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token              
                      if(response.data.role==1){
                          console.log('Login as Admin');
                          this.$router.push({
                              name: "DashAdmin"
                          });
                      }else if(response.data.role==2){
                          console.log('Login as User');
                          this.$router.push({name: 'DashUser'});
                      }
                      window.location.reload();
                    // this.$router.push({
                    //   name: "Backend",
                    //   params: {
                    //     token: token
                    //   }
                    // });
                    }
                })
                .catch(e => {
                    alert(e + "\n" + "email / password yang dimasukkan salah.");
                });
            }
        }
  }
}
</script>