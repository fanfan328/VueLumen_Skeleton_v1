<template>
    <v-app-bar
        app
        color="primary"
        dark
    >
        <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
        />

        <h3>INI HEADER</h3>
        </div>

        <v-spacer></v-spacer>
        <div v-if="authenticated">
            <v-btn color="primary" v-on:click="logout">Logout</v-btn>
        </div>
    </v-app-bar>
</template>

<script>
export default {
    created() {
    },
    components: {
    },
    data() {
        return {
            authenticated: false
        };
    },
    mounted() {
        // console.log(this.$session.get('role'));
        if(!this.authenticated && !this.$session.get('role')) {
            if(this.$router.name && this.$router.name!='Login'){
                this.$router.push({name: "Login"});
                // console.log(this.$router.name);
            }
            else{//Belum Login
                this.authenticated=false;
                // console.log('Here '+this.$router.name)
            }
        }
        else if(this.$session.get('role')){
            this.authenticated=true;
            // window.location.reload();
        }
    },
    methods: {
        logout: function () {
            this.authenticated = false;
            this.$session.destroy()
            this.$router.push('/')
        }
    }
}
</script>