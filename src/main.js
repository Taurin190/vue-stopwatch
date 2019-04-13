import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase";

config = {
    apiKey: "AIzaSyBxYRO0esh6j8jp2PFAvOYHnzauBqbXebg",
    authDomain: "taurin190com-1baea.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
};
firebase.initializeApp(config);

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')