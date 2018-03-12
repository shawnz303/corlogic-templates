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
var TransmissionUploader = require('./components/TransmissionUploader.vue');
var HfPortal = require('./components/HfPortal.vue');


window.onload = () => {

    const routes = [
        { path: '/billing-page', component: BillingPage },
        { path: '/blank-page', component: BlankPage },
        { path: '/patient-detail/:id', component: PatientDetail },
        { path: '/patient-list', component: PatientList },
        { path: '/hf', component: HfPortal },
        { path: '/uploads', component: TransmissionUploader },
        { path: '/', component: Transmissions },
    ];
    const router = new VueRouter({
        routes,
        linkActiveClass: 'active',
        scrollBehavior(to, from, savedPosition) {
            return savedPosition ? savedPosition : { x: 0, y: 0 };
        },
    });

    const store = new Vuex.Store({
        state: {
            apiPath: '',
            lastLogin: new Date(),
            records: [],
            loadingRecords: false,
            cachedRecords: [],
            searchQuery: '',
            lastSearchQuery: '',
            recordsFiltered: false,
            patientDetail: {},
            physicians: [],
        },
        mutations: {
            updatePageData(state, { appName, model, subModel }) {
                state.apiPath = `${appName}/${model}`;
                state.apiPath += subModel ? `/${subModel}` : '';
            },
            updateLogin(state, lastLogin) {
                state.lastLogin = lastLogin;
            },
            clearSearch(state) {
                state.searchQuery = '';
                state.lastSearchQuery = '';
            },
            startRefresh(state) {
                state.loadingRecords = true;
            },
            endRefresh(state) {
                state.loadingRecords = false;
            },
            filterRecords(state, filteredRecords) {
                state.recordsFiltered = true;
                state.records = filteredRecords;
            },
            cacheRecords(state) {
                state.cachedRecords = state.records;
            },
            restoreCachedRecords(state) {
                state.recordsFiltered = false;
                state.records = state.cachedRecords;
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
            resetRecords(state){
                state.records = [];
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
                const url = `/api/v1/${state.apiPath}/${id}/`;
                const body = {archived: true};
                return Vue.http.patch(url, body).then(res => {
                    commit('remove', id);
                });
            },
            bill({ commit, state }, id){
                const url = `/api/v1/reports/billings/${id}/`;
                const body = {billed: true};
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
            refresh({ commit, state }, params) {
                const url = `/api/v1/${state.apiPath}/`;
                
                commit('startRefresh');
                commit('clearSearch');
                commit('restoreCachedRecords');

                return Vue.http.get(url, {
                    params
                }).then(res => {
                    commit('updateRecords', res.body);
                    commit('cacheRecords');
                    commit('endRefresh');
                });
            },
            updateSingleRecord({ commit, state }, { id, body }) {
                const url = `/api/v1/${state.apiPath}/${id}/`;
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
            import({ commit }, { id, body }) {
                const url = `/api/v1/${state.apiPath}/${id}/import/`;
                return Vue.http.post(url, body);
            },
            clearSearch({ commit }) {
                commit('clearSearch');
                commit('restoreCachedRecords');
            },
            search({ commit, state }) {
                if (state.searchQuery != state.lastSearchQuery) {
                    const url = `/api/v1/${state.apiPath}/search/`;
                    const params = {query: state.searchQuery};
                    return Vue.http.get(url, {
                        params,
                    }).then(res => {
                        commit('restoreCachedRecords');
                        commit('updateRecords', res.body);
                        commit('updateLastSearchQuery');
                    });
                }
            },
            filterRecords({ commit, state }, filter) {
                commit('clearSearch');
                if (state.recordsFiltered) {
                    commit('restoreCachedRecords');
                } else {
                    const filteredRecords = state.cachedRecords.filter(filter);
                    commit('filterRecords', filteredRecords);
                }
            },
        },
    });

    new Vue({
        el: 'header',
        render: h => h(Header),
        router,
        store,
    });

    new Vue({
        el: '#content',
        render: h => h(Content),
        router,
        store,
    });

};
