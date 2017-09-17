<template>
    <div class="sidebar">
        <div class="sidebar__inner">
            <div class="sidebar__entry">
                <h6>MENU</h6>
            </div><!-- /.sidebar__entry -->

            <div class="sidebar__nav">
                <ul>
                    <li class="active">
                        <router-link to="/">
                            <i class="ico-home"></i>
                            <span>Dashboard</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/patient-list">
                            <i class="ico-patients"></i>
                            <span>Patient List</span>
                        </router-link>
                    </li>
                </ul>
            </div><!-- /.sidebar__nav -->

            <div class="sidebar__foot">
                <a href="#">
                    <h6>NEED HELP?</h6>

                    <i class="ico-dropdown">
                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4">
                            <path fill="#354052" fill-rule="evenodd" d="M3.536 2.657L1.059.18a.494.494 0 0 0-.705.002.504.504 0 0 0-.002.705L3.184 3.72a.493.493 0 0 0 .703 0L6.72.887c.2-.2.194-.51-.001-.705A.504.504 0 0 0 6.012.18L3.536 2.657z" opacity=".5"/>
                        </svg>
                    </i>
                </a>
            </div><!-- /.sidebar__foot -->
        </div><!-- /.sidebar__inner -->

        <div class="sidebar__actions">
            <a href="#" class="btn btn--white">
                <i class="ico-gear"></i>
            </a>
        </div><!-- /.sidebar__actions -->
    </div><!-- /.sidebar -->
</template>
