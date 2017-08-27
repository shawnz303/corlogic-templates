var Vue = require('vue');
Vue.use(require('vue-resource'));
Vue.use(require('vue-moment'));

var Header = require('./components/Header.vue');
var MessageBox = require('./components/MessageBox.vue');
var TransmissionsTable = require('./components/TransmissionsTable.vue');


window.onload = function() {

    new Vue({
        el: 'header',
        render: h => h(Header)
    });

    new Vue({
        el: '#message-box',
        render: h => h(MessageBox)
    });

    new Vue({
        el: '#transmissions-table',
        render: h => h(TransmissionsTable)
    });

};
