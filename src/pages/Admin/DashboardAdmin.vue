<template>
<div class="col-md-12">
    <div class="card">
        <div class="card-header">
        </div>
        <div class="card-body">
            <v-data-table
                :headers="headers"
                :items="users"
                class="elevation-1"
            >
                <template v-slot:top>
                <v-toolbar flat color="white">
                    <!-- <v-toolbar-title>List User</v-toolbar-title> -->
                    <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" @click="newuser">New User</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                        <v-container>
                            <v-row>
                            <input type="hidden" v-model="editedItem.id" >
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.username" label="Username"
                                :rules="[rules.required]"
                                :disabled="flagEdited"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.name" label="Name"
                                :rules="[rules.required]"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.role" label="Role"
                                :rules="[rules.required]"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.email" label="Email"
                                    :rules="[rules.required, rules.email]"
                                    >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="Password"
                                    type="password"
                                    v-model="editedItem.password"
                                    :disabled="flagEdited"
                                ></v-text-field>
                            
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="Confirmation Password"
                                    type="password"
                                    v-model="editedItem.password_con"
                                    :disabled="flagEdited"
                                ></v-text-field>
                            
                            </v-col>
                            </v-row>
                        </v-container>
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
                </template>
                <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
        </div>
    </div>
</div>

</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        dialog: false,
        headers: [
        {
            text: 'Username',
            align: 'start',
            sortable: false,
            value: 'username',
        },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        users:[],
        editedIndex: -1,
        editedItem: {
            id:'',
            username:'',
            name:'',
            role:'',
            email:'',
            password:''
        },
        defaultItem: {
            id:'',
            username:'',
            name:'',
            role:'',
            email:'',
            password:''
        },
        flagEdited:false,
        rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
    }),
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },  
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
    },
    created () {
        this.initialize()
    },
    beforeCreate: function () {
        if (!this.$session.exists()) {
        this.$router.push('/')
        }
    },
    methods: {
        initialize () {
            
            this.users=[];
            axios.get('http://localhost:8000/api/users', {
                headers: {
                    'Authorization': 'Bearer '+this.$session.get('token')
                }
            }).then(response => {
                this.users=response.data.users;
            }).catch(error=>{
                console.log('Error Fetch Data '+error);
                // var status = error.response.status
            });
        },
        editItem (item) {
            this.flagEdited=true;
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            confirm('Are you sure you want to delete this item?') &&
            axios.delete('http://localhost:8000/api/delete/'+item.id, {
                headers: {
                    'Authorization': 'Bearer '+this.$session.get('token')
                }
            }).then(response => {
                if(response.data.status){
                    this.posts.splice(this.users.indexOf(item), 1);
                }
                console.log(response);
            }).catch(error => {
                console.log(error.response);
            });
        },
        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },
        save () {
            if (this.editedIndex > -1) {
                axios({
                    method:'post',
                    url:'http://localhost:8000/api/update/',
                    data:{
                        id: this.editedItem.id,
                        name: this.editedItem.name,
                        email: this.editedItem.email,
                        role: this.editedItem.role,
                        username: this.editedItem.username
                    },
                    headers: {
                        'Authorization': 'Bearer '+this.$session.get('token')
                    }
                }).then(response => {
                    if(response.data.status){
                        this.initialize();
                    }
                    console.log(response);
                }).catch(error => {
                    console.log(error.response);
                });

            // Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.users.push(this.editedItem);
                axios.post('http://localhost:8000/api/register', {
                    name: this.editedItem.name,
                    email: this.editedItem.email,
                    password: this.editedItem.password,
                    password_confirmation: this.editedItem.password_con,
                    role: this.editedItem.role,
                    username: this.editedItem.username

                }).then((response)=>{
                    this.initialize();
                    console.log(response.data.data);
                }).catch(error => {
                    this.validation = error.response.data.data;
                });
            }
            this.flagEdited=false;
            this.close()
        },
        newuser(){
            this.flagEdited=false;
            // alert(JSON.stringify(this.defaultItem));
            this.editedItem=Object.assign({}, this.defaultItem);
        }
    }
}
</script>