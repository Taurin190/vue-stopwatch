import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CountDown from './views/CountDown.vue'
import Watch from './views/Watch.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/countdown',
            name: 'countdown',
            component: CountDown
        },
        {
            path: '/watch',
            name: 'watch',
            component: Watch
        }
    ]
})