<template>
    <div class="posts">
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            Tambah Post Baru
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="PostStore">
                                <div class="form-group">
                                    <label>Title</label>
                                    <input type="text" class="form-control" v-model="post.title" placeholder="Masukkan Title">
                                    <div v-if="validation.title">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{validation.title[0]}}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Konten</label>
                                    <textarea type="text" class="form-control" v-model="post.content" placeholder="Masukkan Konten" rows="5"></textarea>
                                    <div v-if="validation.content">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{validation.content[0]}}
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-md btn-success mr-2">Simpan</button>
                                <button type="reset" class="btn btn-md btn-danger">Reset</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data(){
            return{
                post: {},
                validation: []
            }
        },
        methods:{
            PostStore(){
                axios.post('http://localhost:8000/posts', this.post)
                    .then((response)=>{
                        this.$router.push({
                            name: 'posts'
                        });
                        console.log(response.data.data);
                    }).catch(error => {
                        this.validation = error.response.data.data;
                });

            }
        }
    }   
</script>