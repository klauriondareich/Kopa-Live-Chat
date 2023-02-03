<template>
     <section style="background-color: #eee;">
        <div class="container py-5">

            <div class="row d-flex justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-6">

                    <div class="card" id="chat2">
                        <div class="card-header d-flex justify-content-between align-items-center p-3">
                            <h5 class="mb-0">Kopa Live Chat</h5>
                        </div>
                        <div class="card-body" v-chat-scroll="{smooth: true}" data-mdb-perfect-scrollbar="true" style="position: relative; height: 400px; overflow: auto;">

                            <div class="divider d-flex align-items-center mb-4">
                                <p class="text-center mx-3 mb-0" style="color: #a2aab7;">Aujourd'hui</p>
                            </div>

                            <div class="d-flex flex-row mb-4 chat-view" v-for="(item, index) in chatMessages" :key="index">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                    alt="avatar 1" style="width: 45px; height: 100%;">
                                <div>
                                    <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7; font-size: 15px">{{ item.message }}</p>
                                    <p class="small ms-3 mb-3 rounded-3 text-muted">@{{ item.sender }}</p>
                                    
                                </div>
                            </div>

                        </div>
                        <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                            alt="avatar 3" style="width: 40px; height: 100%;">
                            <input type="text" class="form-control form-control-lg" id="exampleFormControlInput1"
                            placeholder="Ecrire un message" v-model="messageObj.message" @keyup.enter="sendMessage()">
                            <!-- <a class="ms-3 p-3" href="#!" @click="sendMessage()"><i class="fas fa-paper-plane"></i></a> -->
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>
<script>
import firebase from '../firebase/init'
import 'animate.css';


export default{
    name: "chatView",

    data(){
        return {
            chatMessagesRef: firebase.firestore().collection("chatMessages"),
            chatMessages : [],
            messageObj: {
                sender: "",
                message: "", 
                createdAt: null
            }
        }
    },
    methods:{

        // This func sends user chat message
        sendMessage(){

            this.messageObj.sender = localStorage.getItem("chatUsername");
            this.messageObj.createtAt = firebase.firebase_.firestore.FieldValue.serverTimestamp();

            if (this.messageObj.sender != "" && this.messageObj.message != ""){
                this.chatMessagesRef.add(this.messageObj).then(() =>{
                    console.log("message sent");
                    // Refresh fields
                    this.messageObj.sender = "";
                    this.messageObj.message = "";
                    this.messageObj.createdAt = null
                })
                .catch(() =>{
                    console.log("Error : Can't send message")
                })
            }

          
        }
    },
    created(){

        this.chatMessagesRef.orderBy("createdAt", "asc").onSnapshot((snapshot) =>{
            if (!snapshot.empty){
                this.chatMessages = []; 
                snapshot.forEach((doc) =>{
                    let obj = doc.data();
                    obj.id = doc.id;
                    this.chatMessages.push(obj)
                })
            }
        })
    }
}
</script>
<style scoped>
#chat2 .form-control {
    border-color: transparent;
}

#chat2 .form-control:focus {
    border-color: transparent;
    box-shadow: inset 0px 0px 0px 1px transparent;
}

.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}
.rounded-3{border-radius: 15px!important;}
.chat-view {
  animation: zoom-in-zoom-out; 
  animation-duration: 2s;
}
@keyframes zoom-in-zoom-out {
  0% {
    transform: scale(0.6, 0.6);
  }
  50% {
    transform: scale(0.9, 0.9);
  }
  100% {
    transform: scale(1, 1);
  }
 
}

</style>