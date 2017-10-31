var Promise = require('bluebird');

var Vue = require('vue');
Vue.use(require('vue-cookie'));
Vue.use(require('vue-event-bus'));
Vue.use(require('vue-moment'));
Vue.use(require('vue-resource'));

var VueRouter = require('vue-router');
Vue.use(VueRouter);

var Vuex = require('vuex');
Vue.use(Vuex);

Vue.http.headers.common['X-CSRFToken'] = Vue.cookie.get('csrftoken');

var Content = require('./components/Content.vue');
var Header = require('./components/Header.vue');
var BillingPage = require('./components/BillingPage.vue');
var PatientDetail = require('./components/PatientDetail.vue');
var PatientList = require('./components/PatientList.vue');
var Transmissions = require('./components/Transmissions.vue');


window.onload = () => {

    const routes = [
        { path: '/billing-page', component: BillingPage },
        { path: '/patient-detail/:id', component: PatientDetail },
        { path: '/patient-list', component: PatientList },
        { path: '/', component: Transmissions },
    ];
    const router = new VueRouter({
        routes,
        scrollBehavior(to, from, savedPosition) {
            return savedPosition ? savedPosition : { x: 0, y: 0 };
        },
    });

    const store = new Vuex.Store({
        state: {
            lastLogin: new Date(),
            transmissions: [],
            cachedTransmissions: [],
            searchQuery: '',
            patients: [],
            patientDetail: {},
            physicians: [],
            billings: [],
        },
        getters: {
            filteredPatients(state) {
                return state.patients;
            },
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
                if (!state.searchQuery) {
                    state.transmissions = state.transmissions.filter(byId);
                }
                state.cachedTransmissions = state.cachedTransmissions.filter(byId);
            },
            removeNote(state, id) {
                const byId = note => note.id != id;
                state.patientDetail.notes = state.patientDetail.notes.filter(byId);
            },
            updateTransmissions(state, transmissions) {
                state.transmissions = transmissions;
            },
            updatePatients(state, patients) {
                state.patients = patients;
            },
            sortPatients(state, compareFunction) {
                state.patients.sort(compareFunction);
            },
            updateBillings(state, billings) {
                state.billings = billings;
            },
            updatePatientDetail(state, patientDetail) {
                state.patientDetail = patientDetail;
            },
            updatePhysicians(state, physicians) {
                state.physicians = physicians;
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
                const url = `/api/v1/reports/transmissions/${id}/`;
                const body = {archived: true};
                return Vue.http.patch(url, body).then(res => {
                    commit('remove', id);
                });
            },
            archiveBillings({ dispatch, state }) {
                const ids = state.billings.map(b => b.pk);
                Promise.map(ids, id => {
                    const url = `/api/v1/reports/billings/${id}/`;
                    const body = {archived: true};
                    return Vue.http.patch(url, body);
                }).then(res => {
                    dispatch('refreshBillings');
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
            refreshPatients({ commit }) {
                const url = '/api/v1/medical/patients/';
                return Vue.http.get(url).then(res => {
                    commit('updatePatients', res.body);
                });
            },
            refreshBillings({ commit }) {
                const url = '/api/v1/reports/billings/';
                return Vue.http.get(url).then(res => {
                    commit('updateBillings', res.body);
                });
            },
            updateBilling({ commit }, { id, body }) {
                const url = `/api/v1/reports/billings/${id}/`;
                return Vue.http.patch(url, body);
            },
            refreshPatientDetail({ commit }, id) {
                const url = `/api/v1/medical/patients/${id}/`;
                return Vue.http.get(url).then(res => {
                    commit('updatePatientDetail', res.body);
                });
            },
            updatePatientDetail({ commit }, { id, body }) {
                const url = `/api/v1/medical/patients/${id}/`;
                return Vue.http.patch(url, body).then(res => {
                    commit('updatePatientDetail', res.body);
                });
            },
            createPatientNote({ commit }, body) {
                const url = `/api/v1/medical/patient-notes/`;
                return Vue.http.post(url, body);
            },
            updatePatientNote({ commit }, { id, body }) {
                const url = `/api/v1/medical/patient-notes/${id}/`;
                return Vue.http.patch(url, body);
            },
            refreshPhysicians({ commit }) {
                const url = `/api/v1/medical/professionals/`;
                return Vue.http.get(url).then(res => {
                    commit('updatePhysicians', res.body);
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
        el: '#content',
        render: h => h(Content),
        router,
        store,
    });

};
