var Promise = require('bluebird');

var Vue = require('vue');
Vue.use(require('vue-cookie'));
Vue.use(require('vue-event-bus'));
Vue.use(require('vue-moment'));
Vue.use(require('vue-resource'));

import VueModal from 'vue-js-modal';
Vue.use(VueModal);

var VueRouter = require('vue-router');
Vue.use(VueRouter);

var Vuex = require('vuex');
Vue.use(Vuex);

Vue.http.headers.common['X-CSRFToken'] = Vue.cookie.get('csrftoken');

var Content = require('./components/Content.vue');
var Header = require('./components/Header.vue');
var BillingPage = require('./components/BillingPage.vue');
var BlankPage = require('./components/BlankPage.vue');
var PatientDetail = require('./components/PatientDetail.vue');
var PatientList = require('./components/PatientList.vue');
var Transmissions = require('./components/Transmissions.vue');


window.onload = () => {

    const routes = [
        { path: '/billing-page', component: BillingPage },
        { path: '/blank-page', component: BlankPage },
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
            appName: '',
            model: '',
            lastLogin: new Date(),
            records: [],
            cachedRecords: [],
            searchQuery: '',
            lastSearchQuery: '',
            patientDetail: {},
            physicians: [],
        },
        mutations: {
            updatePageData(state, { appName, model }) {
                state.appName = appName;
                state.model = model;
            },
            updateLogin(state, lastLogin) {
                state.lastLogin = lastLogin;
            },
            clearSearch(state) {
                state.searchQuery = '';
                state.lastSearchQuery = '';
                state.records = state.cachedRecords;
            },
            cacheRecords(state) {
                state.cachedRecords = state.records;
            },
            updateSearchQuery(state, searchQuery) {
                state.searchQuery = searchQuery;
            },
            updateLastSearchQuery(state) {
                state.lastSearchQuery = state.searchQuery;
            },
            remove(state, id) {
                const byId = r => r.id != id;
                if (!state.searchQuery) {
                    state.records = state.records.filter(byId);
                }
                state.cachedRecords = state.cachedRecords.filter(byId);
            },
            removeNote(state, id) {
                const byId = note => note.id != id;
                state.patientDetail.notes = state.patientDetail.notes.filter(byId);
            },
            updateRecords(state, records) {
                state.records = records;
            },
            updateSingleRecord(state, record) {
                const byId = r => r.id == record.id;
                state.records = state.records.map(r => (r.id == record.id) ? record : r);
            },
            sortRecords(state, compareFunction) {
                state.records.sort(compareFunction);
            },
            updatePatientDetail(state, patientDetail) {
                state.patientDetail = patientDetail;
            },
            updatePhysicians(state, physicians) {
                state.physicians = physicians;
            },
        },
        actions: {
            updateUserInfo({ commit }) {
                const url = `/api/v1/users/detail/`;
                return Vue.http.get(url).then(res => {
                    commit('updateLogin', res.body.last_login);
                });
            },
            archive({ commit, state }, id) {
                const url = `/api/v1/${state.appName}/${state.model}/${id}/`;
                const body = {archived: true};
                return Vue.http.patch(url, body).then(res => {
                    commit('remove', id);
                });
            },
            archiveRecords({ dispatch, state }) {
                const ids = state.records.map(r => r.id);
                Promise.map(ids, id => {
                    return dispatch('archive', id);
                }).then(res => dispatch('refresh'));
            },
            refresh({ commit, state }) {
                const url = `/api/v1/${state.appName}/${state.model}/`;
                commit('clearSearch');
                return Vue.http.get(url).then(res => {
                    commit('updateRecords', res.body);
                    commit('cacheRecords');
                });
            },
            updateSingleRecord({ commit, state }, { id, body }) {
                const url = `/api/v1/${state.appName}/${state.model}/${id}/`;
                return Vue.http.patch(url, body).then(res => {
                    commit('updateSingleRecord', res.body);
                });
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
            search({ commit, state }) {
                if (state.searchQuery != state.lastSearchQuery) {
                    const url = `/api/v1/${state.appName}/${state.model}/search/`;
                    const params = {query: state.searchQuery};
                    return Vue.http.get(url, {
                        params,
                    }).then(res => {
                        commit('updateRecords', res.body);
                        commit('updateLastSearchQuery');
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
