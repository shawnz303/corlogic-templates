var Promise = require('bluebird');

var Vue = require('vue');
Vue.use(require('vue-cookie'));
Vue.use(require('vue-event-bus'));
Vue.use(require('vue-moment'));
Vue.use(require('vue-resource'));

var Vuex = require('vuex');
Vue.use(Vuex);

Vue.http.headers.common['X-CSRFToken'] = Vue.cookie.get('csrftoken');

var Header = require('./components/Header.vue');
var OverviewBox = require('./components/OverviewBox.vue');
var MessageBox = require('./components/MessageBox.vue');
var TransmissionsTable = require('./components/TransmissionsTable.vue');


window.onload = () => {

    const store = new Vuex.Store({
        state: {
            lastLogin: new Date(),
            transmissions: [],
            cachedTransmissions: [],
            searchQuery: '',
        },
        mutations: {
            updateLogin(state, lastLogin) {
                state.lastLogin = lastLogin;
            },
            clearSearch(state) {
                state.searchQuery = '';
                state.transmissions = state.cachedTransmissions;
            },
            setSearch(state, searchQuery) {
                state.searchQuery = searchQuery;
            },
            remove(state, id) {
                const byId = tx => tx.id != id;
                state.transmissions = state.transmissions.filter(byId);
                state.cachedTransmissions = state.cachedTransmissions.filter(byId);
            },
            updateTransmissions(state, transmissions) {
                state.transmissions = transmissions;
            },
            cacheTransmissions(state) {
                state.cachedTransmissions = state.transmissions;
            },
        },
        actions: {
            updateUserInfo({ commit }) {
                const url = `/api/v1/users/detail/`;
                return Vue.http.get(url).then(res => {
                    commit('updateLogin', res.body.last_login);
                });
            },
            archive({ commit }, id) {
                const url = `/api/v1/reports/transmissions/${id}/archive/`;
                return Vue.http.put(url).then(res => {
                    commit('remove', id);
                });
            },
            refresh({ commit }) {
                const url = '/api/v1/reports/transmissions/';
                commit('clearSearch');
                return Vue.http.get(url).then(res => {
                    commit('updateTransmissions', res.body);
                    commit('cacheTransmissions');
                });
            },
            search({ commit }, searchQuery) {
                if (!searchQuery) {
                    commit('clearSearch');
                } else {
                    const url = '/api/v1/reports/transmissions/search/';
                    return Vue.http.get(url, {
                        params: {
                            query: searchQuery,
                        },
                    }).then(res => {
                        commit('setSearch', searchQuery);
                        commit('updateTransmissions', res.body);
                    });
                }
            },
        },
    });

    new Vue({
        el: 'header',
        render: h => h(Header),
        store,
    });

    new Vue({
        el :'#overview-box',
        render: h => h(OverviewBox),
        store,
    });

    new Vue({
        el: '#message-box',
        render: h => h(MessageBox),
        store,
    });

    new Vue({
        el: '#transmissions-table',
        render: h => h(TransmissionsTable),
        store,
    });

};
