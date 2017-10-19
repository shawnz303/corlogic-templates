<template>
    <div class="main">
        <sidebar></sidebar>

        <div class="content content--patient">
            <div class="content__body">
                <div class="profile profile--list">
                    <div class="profile__head">
                        <h4>Patient List</h4>
                    </div><!-- /.profile__head -->

                    <div class="profile__body">
                        <div class="table table--patients table--list">
                            <div class="table__head">
                                <div class="table-items">
                                    <div class="table-item table-item--lg" @click="sortByName">
                                        <h5>Name</h5>
                                        <i class="ico-arrow-dropdown table__head--actionable">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4">
                                                <path fill="#354052" fill-rule="evenodd" d="M3.536 2.657L1.059.18a.494.494 0 0 0-.705.002.504.504 0 0 0-.002.705L3.184 3.72a.493.493 0 0 0 .703 0L6.72.887c.2-.2.194-.51-.001-.705A.504.504 0 0 0 6.012.18L3.536 2.657z" opacity=".5"/>
                                            </svg>
                                        </i>
                                    </div><!-- /.table-item table-item-/-lg -->

                                    <div class="table-item table-item--lg">
                                        <h5>DOB</h5>
                                    </div><!-- /.table-item table-item-/-md -->

                                    <div class="table-item table-item--lg" @click="sortByVendor">
                                        <h5>Vendor</h5>
                                        <i class="ico-arrow-dropdown table__head--actionable">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4">
                                                <path fill="#354052" fill-rule="evenodd" d="M3.536 2.657L1.059.18a.494.494 0 0 0-.705.002.504.504 0 0 0-.002.705L3.184 3.72a.493.493 0 0 0 .703 0L6.72.887c.2-.2.194-.51-.001-.705A.504.504 0 0 0 6.012.18L3.536 2.657z" opacity=".5"/>
                                            </svg>
                                        </i>
                                    </div><!-- /.table-item table-item-/-md -->

                                    <div class="table-item table-item--lg" @click="sortByDevice">
                                        <h5>Device</h5>
                                        <i class="ico-arrow-dropdown table__head--actionable">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4">
                                                <path fill="#354052" fill-rule="evenodd" d="M3.536 2.657L1.059.18a.494.494 0 0 0-.705.002.504.504 0 0 0-.002.705L3.184 3.72a.493.493 0 0 0 .703 0L6.72.887c.2-.2.194-.51-.001-.705A.504.504 0 0 0 6.012.18L3.536 2.657z" opacity=".5"/>
                                            </svg>
                                        </i>
                                    </div><!-- /.table-item table-item-/-md -->
                                </div><!-- /.table-items -->
                            </div><!-- /.table__head -->

                            <div class="table__body">
                                <patient-record
                                    v-for="p in patients"

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

        <div class="main__aside">
            <div class="main__head">
                <h3>Filter Patients</h3>
            </div><!-- /.main__head -->

            <div class="main__content">
                <div class="widgets">
                    <div class="widget-search">
                        <div class="widget__head">
                            <p>Search by name</p>
                        </div><!-- /.widget__head -->

                        <div class="widget__content">
                            <div class="search search--name">
                                <form action="" method="get">
                                    <div class="search__inner">
                                        <label for="search-name" class="hidden">Search</label>

                                        <button type="submit" class="search__btn">
                                            <i class="ico-search-grey"></i>
                                        </button>

                                        <input type="text" name="search-tags" id="search-names" value="" class="search__field" placeholder="e.g. Mike Jones, Barty Crouch, Marg Simpson"/>
                                    </div><!-- /.search__inner -->
                                </form>
                            </div><!-- /.search -->
                        </div><!-- /.widget__content -->
                    </div><!-- /.widget-search -->

                    <div class="widget-search widget-search--grey">
                        <div class="widget__head">
                            <p>Filter by Vendor</p>
                        </div><!-- /.widget__head -->

                        <div class="widget__content">
                            <div class="search search--name">
                                <form action="" method="get">
                                    <div class="search__inner">
                                        <label for="search-vendor" class="hidden">Search</label>

                                        <button type="submit" class="search__btn">
                                            <i class="ico-search-grey"></i>
                                        </button>

                                        <input type="text" name="search-vendor" id="search-vendor" value="BIO, SJM" class="search__field" placeholder="e.g. SJM, BSX, BIO"/>
                                    </div><!-- /.search__inner -->
                                </form>
                            </div><!-- /.search -->
                        </div><!-- /.widget__content -->
                    </div><!-- /.widget-search -->

                    <div class="widget-search">
                        <div class="widget__head">
                            <p>Filter by Device</p>
                        </div><!-- /.widget__head -->

                        <div class="widget__content">
                            <div class="select">
                                <select name="select-device" id="#select">
                                    <option value="select1">Select a device</option>

                                    <option value="select2">Select a device</option>

                                    <option value="select3">Select a device</option>
                                </select>
                            </div><!-- /.select -->
                        </div><!-- /.widget__content -->
                    </div><!-- /.widget-search -->
                </div><!-- /.widgets -->
            </div><!-- /.main__content -->
        </div><!-- /.main__aside -->
    </div><!-- main -->
</template>

<script>
    import { mapActions, mapState } from 'vuex';
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
                'patients',
            ]),
        },
        methods: {
            ...mapActions([
                'refreshPatients',
            ]),
            sortByName() {
                this.sortOrderName = -this.sortOrderName;
                this.$store.commit('sortPatients', (sortOrder => (a, b) => {
                    const lastName1 = a.name.split(' ').slice(-1)[0].toLowerCase();
                    const lastName2 = b.name.split(' ').slice(-1)[0].toLowerCase();
                    return (
                        lastName1 < lastName2 ? -1 : lastName1 == lastName2 ? 0 : 1
                    ) * sortOrder;
                })(this.sortOrderName));
            },
            sortByDevice() {
                this.sortOrderDevice = -this.sortOrderDevice;
                this.$store.commit('sortPatients', (sortOrder => (a, b) => {
                    const device1 = a.power_source.model_id;
                    const device2 = b.power_source.model_id;
                    return (
                        device1 < device2 ? -1 : device1 == device2 ? 0 : 1
                    ) * sortOrder;
                })(this.sortOrderDevice));
            },
            sortByVendor() {
                this.sortOrderVendor = -this.sortOrderVendor;
                this.$store.commit('sortPatients', (sortOrder => (a, b) => {
                    const vendor1 = a.power_source.manufacturer;
                    const vendor2 = b.power_source.manufacturer;
                    return (
                        vendor1 < vendor2 ? -1 : vendor1 == vendor2 ? 0 : 1
                    ) * sortOrder;
                })(this.sortOrderVendor));
            },
        },
        mounted() {
            this.refreshPatients();
        },
    };
</script>
