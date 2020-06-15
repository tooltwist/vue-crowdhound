import Vue from 'vue'
import Crowdhound from '../components/index.js'
import TestComments from './TestComments.vue'
import {} from './crowdhound+overrides.scss'
import {} from 'bulma'


// Initialise Crowdhound
Vue.use(Crowdhound, {
  // version: '2.0',
  // apiVersion: '2.0',
  // protocol: 'http',
  // host: 'localhost',
  // port: 4521,

  version: '2.0',
  protocol: 'http',
  host: 'uat.crowdhound.io',
  port: 80,
  apikey: 'API11OHHOKHGFQ0OYEZZZM7I79OF7',
  debug: true,

});


// Now run the site
new Vue({
  render (h) {
    let currentRoute = window ? window.location.pathname : '/'
    console.log(`Route is ${currentRoute}.`)
    switch (currentRoute) {
      case '/comments': return h(TestComments)
    }
    return h(TestComments)
  },
}).$mount('#app')
