<template>
    <a class="btn" :class="classes" @click="transition">
        {{ text }}
    </a>
</template>

<script>
    export default {
        props: [
            'callPromise',
            'isWide',
            'normalText',
            'transitionText',
        ],
        data: () => ({
            inTransition: false,
        }),
        computed: {
            classes() {
                return {
                    'btn--blue': !this.inTransition,
                    'btn--gray': this.inTransition,
                    'btn--wide': this.isWide,
                };
            },
            text() {
                return this.inTransition ?
                    `${this.transitionText}...` :
                    this.normalText;
            },
        },
        methods: {
            transition() {
                this.inTransition = true;
                this.callPromise().then(() => {
                    this.inTransition = false;
                });
            },
        },
    };
</script>
