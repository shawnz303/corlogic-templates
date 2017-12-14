<template>
    <div class="content__head">
        <div class="preview">
            <div class="profile">
                <div class="profile__head">
                    <h4>Preview Transmission</h4>
                </div>
                <div class="profile__body">
                    <div class="table">
                        <div class="table__head">
                            <div class="table-items">
                                <div class="table-item table-item--lg table-item--fluid">
                                    <h5>Patient Name</h5>
                                </div>
                                <div class="table-item table-item--lg table-item--fluid">
                                    <h5>Alerts</h5>
                                </div>
                                <div class="table-item table-item--lg table-item--fluid">
                                    <h5>Session Date</h5>
                                </div>
                                <div class="table-item table-item--lg table-item--fluid">
                                    <h5>Session Trigger</h5>
                                </div>
                                <div class="table-item table-item--lg table-item--fluid">
                                    <h5>Session Type</h5>
                                </div>
                                <div class="table-item table-item--lg table-item--fluid">
                                    <h5>Manufacturer</h5>
                                </div>
                                <div class="table-item table-item--lg table-item--fluid">
                                    <h5>Model</h5>
                                </div>
                            </div>
                        </div>

                        <div class="table__body">
                            <div class="table__group">
                                <div class="table-items">
                                    <div class="table-item table-item--lg table-item--fluid">
                                        <h5>{{ name }}</h5>
                                    </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

                                    <div class="table-item table-item--lg">
                                        <span
                                            class="tag"
                                            v-for="alert in alerts"
                                            :class="{
                                                'tag--red': alertColour(alert) == 'red',
                                                'tag--yellow': alertColour(alert) == 'yellow',
                                            }"
                                        >
                                            {{ alert }}
                                        </span>
                                    </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

                                    <div class="table-item table-item--lg table-item--fluid">
                                        <p>{{ sessionDate | moment('MM/DD/YYYY') }}</p>
                                    </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

                                    <div class="table-item table-item--lg table-item--fluid">
                                        <div v-if="sessionTrigger">{{ sessionTrigger }}</div>
                                    </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

                                    <div class="table-item table-item--lg table-item--fluid">
                                        <div v-if="sessionTypeHumanized">{{ sessionTypeHumanized }}</div>
                                    </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

                                    <div class="table-item table-item--lg table-item--fluid">
                                        <p>{{ manufacturer }}</p>
                                    </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

                                    <div class="table-item table-item--lg table-item--fluid">
                                        <p>{{ model }}</p>
                                    </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->
                                </div><!-- /.table-items -->
                            </div><!-- /.table__group -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { alertsInfo } from './alerts';
    import { sessionTypesInfo } from './sessions';

    export default {
        props: {
            alerts: {
                default: () => ['Sh', 'ATAF', ],
            },
            manufacturer: {default: 'XYZ'},
            model: {default: 'ABC123'},
            name: {default: 'Winona Ryder'},
            notes: {default: 'Some notes...'},
            sessionDate: {default: '01/01/1970'},
            sessionTrigger: {default: 'Remote'},
            sessionType: {default: 'type-session-device-check'},
        },
        computed: {
            sessionTypeHumanized() {
                return sessionTypesInfo[this.sessionType];
            },
        },
        methods: {
            alertColour(alert) {
                return alertsInfo.find(elem => elem.code === alert).colour;
            },
        },
    };
</script>
