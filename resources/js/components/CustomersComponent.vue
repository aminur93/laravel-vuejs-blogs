<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Customers</h4>

                        <div class="card-tools" style="position: absolute;right: 1rem; top: .5rem;">
                            <button type="button" v-on:click="reload()" class="btn btn-primary">Reload <i class="fa fa-refresh"></i></button>
                        </div>
                    </div>

                    <div class="card-body">

                        <div class="mb-3">
                            <div class="row">
                                <div class="col-md-2">
                                    <strong>Search By : </strong>
                                </div>
                                <div class="col-md-3">
                                    <select v-model="queryField" name="field" id="field" class="form-control">
                                        <option value="name">name</option>
                                        <option value="email">email</option>
                                        <option value="phone">phone</option>
                                        <option value="total">total</option>
                                    </select>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" v-model="query" class="form-control" placeholder="Search">
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-hover table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Total</th>
                                    <th scope="col" class="text-center">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-show="customers.length" v-for="(customer,index) in customers" :key="customer.id">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <th>{{ customer.name}}</th>
                                    <th>{{ customer.email}}</th>
                                    <th>{{ customer.phone}}</th>
                                    <th>{{ customer.total}}</th>
                                    <th>
                                        <button class="btn btn-info btn-sm"><i class="fa fa-eye"></i></button>
                                        <button class="btn btn-primary btn-sm"><i class="fa fa-edit"></i></button>
                                        <button class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
                                    </th>
                                </tr>

                                <tr v-show="!customers.length">
                                    <td colspan="6">
                                        <div class="alert alert-danger" role="alert">
                                            Sorry: (No Data Found)
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <pagination :pagination="pagination" :offset="5" @paginate="query === '' ? getData() : searchData()" v-if="this.pagination.last_page > 1"></pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                customers: [],
                perPage: [10,25,50,100],
                limit_page: 0,
                pagination: {
                    current_page: 1,
                },
                query: '',
                queryField: 'name',
            }
        },
        
        watch:{
            query:function (newQ, old) {
                if (newQ === '')
                {
                    this.getData();
                }else {
                    console.log(newQ);
                    this.searchData();
                }
            },
        },


        mounted() {

            this.getData();
        },

        methods: {

            getData(){

                this.$Progress.start();

                axios.get('/api/customers?page='+this.pagination.current_page)
                    .then(response => {
                        this.customers = response.data.data;
                        this.pagination = response.data.meta;
                        this.$Progress.finish();
                    })
                    .catch(error => {
                        console.log(error);
                        this.$Progress.fail();
                    })
            },

            searchData(){
                this.$Progress.start();
                axios.get('/api/search/customer/'+this.queryField+'/'+this.query+'?page='+this.pagination.current_page)
                    .then(response => {
                        this.customers = response.data.data;
                        this.pagination = response.data.meta;
                        this.$Progress.finish();
                    })
                    .catch(error => {
                        console.log(error);
                        this.$Progress.fail();
                    })
            },

            reload(){
                this.getData();
                this.query = '';
                this.queryField = 'name';
            }

        },
    }
</script>
