<template>
  <v-app>
    <headerMenu></headerMenu>

    <v-main>
      <div id="app">
        <!-- Ini Content -->
        <router-view></router-view>
        </div>
    </v-main>

  </v-app>

</template>

<script>
  import headerMenu from './components/headerMenu.vue'
  import axios from "axios";

export default {
  name: 'App',
  beforeCreate: function () {
    if (!this.$session.exists() && this.$router.name) {
      this.$router.push('/')
    }
  },
  components: {
    headerMenu
  },
  data() {
    return {

    };
  },
  methods: {
    refreshAccessToken(){
      const options = {
        url: "http://localhost:8000/api/refresh",
        method: "post",
        headers: {
            'Authorization': 'Bearer '+this.$session.get('token')
        }
        };
      
      axios(options)
        .then(response => {
          this.$session.set('token', response.data.token);
        })
        .catch(e => {
          // 
            alert(e + "Failed to Refresh Token");
            this.$router.push('/');
            this.$session.destroy();
        });

        
    }
  },
  created: function () {
    axios.interceptors.request.use(config => {
        console.log('Req Intercept'+JSON.stringify(config));
        return config
      }, error => Promise.reject(error))

  
    axios.interceptors.response.use(response => {
      console.log('Res Intercept'+JSON.stringify(response));
      return response
    }, error =>{
      const originalRequest = error.config;

      // console.log(JSON.stringify(error.response.data.refresh.token));
      if(error.response.status==401){
        //Set New Token
        let token=error.response.data.refresh.token
        this.$session.set('token', token);
        // console.log('OLD ' + JSON.stringify(originalRequest));
        
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        // axios.defaults['Authorization'] = 'Bearer ' + token;
        originalRequest.headers['Authorization']='Bearer ' + token;

        console.log('NEW ' + JSON.stringify(originalRequest));
        return axios(originalRequest);
      }else{
        alert("Failed to Refresh Token");
        this.$router.push('/');
        this.$session.destroy();

        return Promise.reject(error)
      }
      // this.cover = false
    })
    
  }
};
</script>
