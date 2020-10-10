require('./bootstrap');

import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';

const VueProgressBarOptions = {
    color: '#58d3ba',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
};

Vue.use(VueProgressBar, VueProgressBarOptions);

Vue.component('customers-component', require('./components/CustomersComponent.vue').default);
Vue.component('pagination', require('./components/partial/PaginationComponent.vue').default);


const app = new Vue({
    el: '#app',
});
