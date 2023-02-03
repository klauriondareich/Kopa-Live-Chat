<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3"></div>
            <div class="col-lg-5 pt-5 mt-5">
                <div class="card text-center">
                    <p class="text-center pt-5 pb-4"><img src="/images/live-tech-colored.png" width="150px"  alt="Logo"></p>
                    <div class="mb-3, px-5 py-2">
                        <input type="text" v-model="username" class="form-control" placeholder="Entrer votre username" width="100%">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Kopa Live Chat</h5>
                        <p class="card-text">Chattez en live avec tous les autres utilisateurs.</p>
                        <button class="btn" style="background-color: #f9a225; color: #fff;" @click="openSession()">Ouvrir la session</button>
                    </div>
                    <div class="card-footer text-muted"></div>
                </div>
            </div>
            <div class="col-lg-3"></div>
        </div>
    </div>
</template>
<script>

export default{
    name: "home",

    data(){
        return {
            username: ""
        }
    },
    methods:{
        openSession(){
            if (this.username != ""){
                localStorage.setItem("chatUsername", this.username);
                this.$router.push('/chatView')
            }
        }
    }
}
</script>
<style scoped>
    .card-footer{
        background: #482912!important;
    }
</style>