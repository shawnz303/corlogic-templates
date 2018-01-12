<template>
    <div class="header__avatar">
        <a href="#" class="btn-dropdown" :class="{ active }" @click="toggle">
            <img :src="avatarImgSrc" alt="">
            <i class="ico-arrow-dropdown">
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4">
                    <path fill="#354052" fill-rule="evenodd" d="M3.536 2.657L1.059.18a.494.494 0 0 0-.705.002.504.504 0 0 0-.002.705L3.184 3.72a.493.493 0 0 0 .703 0L6.72.887c.2-.2.194-.51-.001-.705A.504.504 0 0 0 6.012.18L3.536 2.657z" opacity=".5"/>
                </svg>
            </i>
        </a>

        <nav class="nav" :class="{ active }">
            <ul>
                <li>
                    <a href="/admin">Admin</a>
                </li>
                <li>
                    <a href="/logout">Logout</a>
                </li>
            </ul>
        </nav><!-- /.nav -->
    </div><!-- /.header__avatar -->
</template>

<script>
    export default {
        data: () => ({
            active: false,
            avatarImgSrc,
        }),
        methods: {
            toggle() {
                this.active ^= true;
            },
        }
    };
</script>
