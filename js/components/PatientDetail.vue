<template>
    <div class="main main--detail">
        <sidebar></sidebar>

        <div class="content content--list">
            <div class="content__inner">
                <div class="content__head">
                    <div class="tile tile--full-width">
                        <div class="tile__inner">
                            <div class="tile__head">
                                <div class="tile__entry">
                                    <h4>Patient Information</h4>

                                    <span></span>
                                </div><!-- /.tile__entry -->
                            </div><!-- /.tile__head -->

                            <div class="tile__content">
                                <div class="services">
                                    <div class="service service--list">
                                        <div class="service__inner">
                                            <div class="service__head service__head--width">
                                                <h1></h1>

                                                <h6>PATIENT NAME</h6>
                                            </div><!-- /.service__head -->
                                        </div><!-- /.service__inner -->
                                    </div><!-- /.service -->

                                    <div class="service service--list">
                                        <div class="service__inner">
                                            <div class="service__head">
                                                <h1></h1>

                                                <h6>VENDOR</h6>
                                            </div><!-- /.service__head -->
                                        </div><!-- /.service__inner -->
                                    </div><!-- /.service -->

                                    <div class="service service--list">
                                        <div class="service__inner">
                                            <div class="service__head">
                                                <h1></h1>

                                                <h6>DEVICE</h6>
                                            </div><!-- /.service__head -->
                                        </div><!-- /.service__inner -->
                                    </div><!-- /.service -->
                                </div><!-- /.services -->
                            </div><!-- /.tile__content -->
                        </div><!-- /.tile__inner -->
                    </div><!-- /.tile -->
                </div><!-- /.content__head -->

                <div class="content__body">
                    <div class="profile profile--list">
                        <div class="profile__body">
                            <div class="table table--list">
                                <div class="table__head">
                                    <div class="table-items">
                                        <div class="table-item table-item--lg">
                                            <h5>Session Date</h5>
                                        </div><!-- /.table-item table-item-/-lg -->

                                        <div class="table-item table-item--lg">
                                            <h5>Session Type</h5>
                                        </div><!-- /.table-item table-item-/-md -->

                                        <div class="table-item table-item--lg">
                                            <h5>Episodes</h5>
                                        </div><!-- /.table-item table-item-/-md -->
                                    </div><!-- /.table-items -->
                                </div><!-- /.table__head -->

                                <div class="table__body">

                                </div><!-- /.table__body -->
                            </div><!-- /.table -->
                        </div><!-- /.profile__body -->
                    </div><!-- /.profile -->
                </div><!-- /.content__body -->
            </div><!-- /.content__inner -->

            <div class="content__aside">
                <div class="tile-grey">
                    <div class="tile__inner">
                        <div class="tile__head">
                            <h4>Patient Notes</h4>

                            <span>Last note: </span>

                            <a href="#">
                                <i class="ico-export">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15">
                                        <path fill="#C5D0DE" fill-rule="evenodd" d="M7.241 10.711a1 1 0 0 0 .708.293c.013 0 .023-.007.036-.007L8 11c.337 0 .62-.177.801-.431l2.894-2.882a.997.997 0 0 0 0-1.414 1.004 1.004 0 0 0-1.417 0L9 7.544V1a1 1 0 1 0-2 0v6.62L5.691 6.281a1.003 1.003 0 0 0-1.416 0 .997.997 0 0 0 0 1.414l2.966 3.016zM15 9a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 1 0-2 0v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3a1 1 0 0 0-1-1z"/>
                                    </svg>
                                </i>
                            </a>
                        </div><!-- /.tile__head -->

                        <div class="tile__content">
                            <div class="box box--notes">
                                <div class="box__inner">
                                    <p></p>
                                </div><!-- /.box__inner -->
                            </div><!-- /.box -->

                            <div class="box box--notes">
                                <div class="box__inner">
                                    <div class="box__body">
                                        <ul class="list-checks">
                                            <li>
                                                <div class="checkbox">
                                                    <input type="checkbox" id="checkbox_terms1"/>

                                                    <label for="checkbox_terms1" class="form-label">Anti-coagulated</label>
                                                </div><!-- /.checkbox -->
                                            </li>

                                            <li>
                                                <div class="checkbox">
                                                    <input type="checkbox" id="checkbox_terms2"/>

                                                    <label for="checkbox_terms2" class="form-label">Rate Controlled</label>
                                                </div><!-- /.checkbox -->
                                            </li>
                                        </ul><!-- /.list-checks -->

                                        <ul class="list-checks">
                                            <li>
                                                <div class="search-box">
                                                    <form action="" method="get">
                                                        <div class="search__inner">
                                                            <label for="q" class="hidden">Search</label>

                                                            <input type="text" name="q" id="q" value="" class="search__field" placeholder="DX Codes"/>

                                                            <button type="submit" class="search__btn">
                                                                <i class="ico-search">
                                                                <path fill="#CED0DA" fill-rule="evenodd" d="M9.222 3.033a4.376 4.376 0 1 0-6.19 6.19 4.376 4.376 0 1 0 6.19-6.19m4.552 10.741a.877.877 0 0 1-1.239 0L9.78 11.017c-2.4 1.794-5.804 1.624-7.984-.557a6.126 6.126 0 0 1 0-8.665 6.126 6.126 0 0 1 8.665 0c2.181 2.18 2.351 5.584.557 7.984l2.757 2.757a.876.876 0 0 1 0 1.238"/>
                                                                    </svg>
                                                                </i>
                                                            </button>
                                                        </div><!-- /.search__inner -->
                                                    </form>
                                            </div><!-- /.search -->
                                            </li>

                                            <li>
                                                <div class="checkbox">
                                                    <input type="checkbox" id="checkbox_terms3"/>

                                                    <label for="checkbox_terms3" class="form-label">Presence of cardiac pacemaker</label>
                                                </div><!-- /.checkbox -->
                                            </li>

                                            <li>
                                                <div class="checkbox">
                                                    <input type="checkbox" id="checkbox_terms4"/>

                                                    <label for="checkbox_terms4" class="form-label">Presence of defibrillator</label>
                                                </div><!-- /.checkbox -->
                                            </li>

                                            <li>
                                                <div class="checkbox">
                                                    <input type="checkbox" id="checkbox_terms5"/>

                                                    <label for="checkbox_terms5" class="form-label">Heart Failure</label>
                                                </div><!-- /.checkbox -->
                                            </li>
                                        </ul><!-- /.list-checks -->
                                    </div><!-- /.box__inner -->

                                </div><!-- /.box__inner -->
                            </div><!-- /.box -->
                        </div><!-- /.tile__content -->
                    </div><!-- /.tile__inner -->
                </div><!-- /.tile-grey -->

                <div class="tile tile--list">
                    <div class="tile__inner">
                        <div class="tile__head">
                            <h4>Right Atrial Lead</h4>
                        </div><!-- /.tile__head -->

                        <div class="tile__content">
                            <ul class="list-leads">
                                <li>
                                    <h5>Lead Name</h5>

                                    <span></span>
                                </li>

                                <li>
                                    <h5>Serial #</h5>

                                    <span></span>
                                </li>

                                <li>
                                    <h5>Manufacturer</h5>

                                    <span></span>
                                </li>

                                <li>
                                    <h5>Implant Date</h5>

                                    <span>XX/XX/XX</span>
                                </li>
                            </ul><!-- /.list-leads -->
                        </div><!-- /.tile__content -->
                    </div><!-- /.tile__inner -->
                </div><!-- /.tile -->

                <div class="tile tile--list">
                    <div class="tile__inner">
                        <div class="tile__head">
                            <h4>Right Ventricular Lead</h4>
                        </div><!-- /.tile__head -->

                        <div class="tile__content">
                            <ul class="list-leads">
                                <li>
                                    <h5>Lead Name</h5>

                                    <span></span>
                                </li>

                                <li>
                                    <h5>Serial #</h5>

                                    <span></span>
                                </li>

                                <li>
                                    <h5>Implant Date</h5>

                                    <span></span>
                                </li>
                            </ul><!-- /.list-leads -->
                        </div><!-- /.tile__content -->
                    </div><!-- /.tile__inner -->
                </div><!-- /.tile -->

                <div class="tile tile--list">
                    <div class="tile__inner">
                        <div class="tile__head">
                            <h4>Left Ventricular Lead</h4>
                        </div><!-- /.tile__head -->

                        <div class="tile__content">
                            <ul class="list-leads">
                                <li>
                                    <h5>Lead Name</h5>

                                    <span></span>
                                </li>

                                <li>
                                    <h5>Serial #</h5>

                                    <span></span>
                                </li>

                                <li>
                                    <h5>Implant Date</h5>

                                    <span></span>
                                </li>
                            </ul><!-- /.list-leads -->
                        </div><!-- /.tile__content -->
                    </div><!-- /.tile__inner -->
                </div><!-- /.tile -->
            </div><!-- /.content__aside -->
        </div><!-- /.content -->
    </div><!-- main -->
</template>

<script>
    import Sidebar from './Sidebar.vue';

    export default {
        components: {
            sidebar: Sidebar,
        },
    };
</script>
