<template>
    <div class="main">
        <sidebar></sidebar>

        <div class="content content--patient">
            <div class="content__body">
                <div class="profile profile--list">
                    <div class="profile__head">
                        <h4>{{ this.dataSource }}</h4>
                        <div class="btn btn--blue" @click="clearSearch" v-if="lastSearchQuery">
                            Clear Search
                        </div>
                    </div><!-- /.profile__head -->

                    <div class="profile__body">
                        <div class="table table--patients table--list">
                            <div class="table__head">
                                <div class="table-items">
                                    <div
                                        class="table-item table-item--lg table__head--actionable"
                                        @click="sortByName"
                                    >
                                        <h5>Name</h5>
                                        <i class="ico-arrow-dropdown">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4">
                                                <path
                                                    fill="#354052"
                                                    fill-rule="evenodd"
                                                    d="M3.536 2.657L1.059.18a.494.494 0 0 0-.705.002.504.504 0 0 0-.002.705L3.184 3.72a.493.493 0 0 0 .703 0L6.72.887c.2-.2.194-.51-.001-.705A.504.504 0 0 0 6.012.18L3.536 2.657z"
                                                    opacity=".5"
                                                    :transform="arrowTransform(sortOrderName, 7, 4)"
                                                />
                                            </svg>
                                        </i>
                                    </div><!-- /.table-item table-item-/-lg -->

                                    <div class="table-item table-item--lg">
                                        <h5>DOB</h5>
                                    </div><!-- /.table-item table-item-/-md -->

                                    <div
                                        class="table-item table-item--lg table__head--actionable"
                                        @click="sortByVendor"
                                    >
                                        <h5>Vendor</h5>
                                        <i class="ico-arrow-dropdown">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4">
                                                <path
                                                    fill="#354052"
                                                    fill-rule="evenodd"
                                                    d="M3.536 2.657L1.059.18a.494.494 0 0 0-.705.002.504.504 0 0 0-.002.705L3.184 3.72a.493.493 0 0 0 .703 0L6.72.887c.2-.2.194-.51-.001-.705A.504.504 0 0 0 6.012.18L3.536 2.657z"
                                                    opacity=".5"
                                                    :transform="arrowTransform(sortOrderVendor, 7, 4)"/>
                                                />
                                            </svg>
                                        </i>
                                    </div><!-- /.table-item table-item-/-md -->

                                    <div
                                        class="table-item table-item--lg table__head--actionable"
                                        @click="sortByDevice"
                                    >
                                        <h5>Device</h5>
                                        <i class="ico-arrow-dropdown">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4">
                                                <path
                                                    fill="#354052"
                                                    fill-rule="evenodd"
                                                    d="M3.536 2.657L1.059.18a.494.494 0 0 0-.705.002.504.504 0 0 0-.002.705L3.184 3.72a.493.493 0 0 0 .703 0L6.72.887c.2-.2.194-.51-.001-.705A.504.504 0 0 0 6.012.18L3.536 2.657z"
                                                    opacity=".5"
                                                    :transform="arrowTransform(sortOrderDevice, 7, 4)"/>
                                                />
                                            </svg>
                                        </i>
                                    </div><!-- /.table-item table-item-/-md -->
                                </div><!-- /.table-items -->
                            </div><!-- /.table__head -->

                            <div class="table__body">
                                <patient-record
                                    v-for="p in records"

                                    :id="p.id"
                                    :dob="p.dob"
                                    :manufacturer="p.power_source.manufacturer"
                                    :model="p.power_source.model_id"
                                    :name="p.name"
                                />
                            </div><!-- /.table__body -->
                        </div><!-- /.table -->
                    </div><!-- /.profile__body -->
                </div><!-- /.profile -->
            </div><!-- /.content__body -->
        </div><!-- /.content -->
    </div><!-- main -->
</template>

<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    import PatientRecord from './PatientRecord.vue';
    import Sidebar from './Sidebar.vue';

    export default {
        data: () => ({
            sortOrderName: -1,
            sortOrderDevice: -1,
            sortOrderVendor: -1,
        }),
        components: {
            patientRecord: PatientRecord,
            sidebar: Sidebar,
        },
        computed: {
            ...mapState([
                'searchQuery',
                'lastSearchQuery',
                'records',
            ]),
            dataSource() {
                return this.lastSearchQuery ?
                    `Search results for "${this.lastSearchQuery}"` :
                    'Patient List';
            },
        },
        methods: {
            ...mapActions([
                'clearSearch',
                'refresh',
            ]),
            ...mapMutations([
                'sortRecords',
                'updatePageData',
            ]),
            arrowTransform(sortOrder, width, height) {
                const rotation = -sortOrder * 90 + 90;
                width = width || 0;
                height = height || 0;
                return `rotate(${rotation} ${width/2.} ${height/2.})`;
            },
            sortByName() {
                this.sortOrderName *= -1;
                this.sortRecords((sortOrder => (a, b) => {
                    const lastName1 = a.name.split(' ').slice(-1)[0].toLowerCase();
                    const lastName2 = b.name.split(' ').slice(-1)[0].toLowerCase();
                    return (
                        lastName1 < lastName2 ? -1 : lastName1 == lastName2 ? 0 : 1
                    ) * sortOrder;
                })(this.sortOrderName));
            },
            sortByDevice() {
                this.sortOrderDevice *= -1;
                this.sortRecords((sortOrder => (a, b) => {
                    const device1 = a.power_source.model_id;
                    const device2 = b.power_source.model_id;
                    return (
                        device1 < device2 ? -1 : device1 == device2 ? 0 : 1
                    ) * sortOrder;
                })(this.sortOrderDevice));
            },
            sortByVendor() {
                this.sortOrderVendor *= -1;
                this.sortRecords((sortOrder => (a, b) => {
                    const vendor1 = a.power_source.manufacturer;
                    const vendor2 = b.power_source.manufacturer;
                    return (
                        vendor1 < vendor2 ? -1 : vendor1 == vendor2 ? 0 : 1
                    ) * sortOrder;
                })(this.sortOrderVendor));
            },
        },
        mounted() {
            const params = {
                appName: 'medical',
                model: 'patients',
            };
            this.updatePageData(params);
            this.refresh();
        },
    };
</script>
