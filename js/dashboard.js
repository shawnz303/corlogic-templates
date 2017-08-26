var Vue = require('vue');
Vue.use(require('vue-resource'));

var MessageBox = require('./components/MessageBox.vue');


window.onload = function() {

    new Vue({
        el: '#message-box',
        render: h => h(MessageBox)
    });

};
