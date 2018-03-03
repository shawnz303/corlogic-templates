<template>
    <div class="main">
        <sidebar></sidebar>

        <div class="content content--patient">
            <div class="content__body">
<h1>Frequently Asked Questions</h1>
        <h2><a href='#new'>How do I add a new user to Corlogic?</a></h2>
        <h2><a href='#urgent'>How do I filter my dashboard to see Urgent Transmissions only?</a></h2>
        <h2><a href='#serial'>How do I search for a particular serial number or patient name?</a></h2>
        <h2><a href='#hf'>How do I stop receiving HF transmissions for a particular patient?</a></h2>

        <h2 id='new'>How do I add a new user to Corlogic?</h2>

    <p>
            If you have Staff priviledges, go to the Admin section as seen below:   
            <img src='/static/images/admin-settings-section.png' height='300' width='1000'><br>
	   <br>
        
        Then click on Users, and use the Green plus sign to add a new user!
    </p>
        
    <h2 id='urgent'>How do I filter my dashboard to see Urgent Transmissions only?</h2>
    <p>
	Click on the Urgent Transmissions Icon on the Dashboard. This filter will show patients with an ERI alert or with shocks.
            <img src='/static/images/filter-urgent.png'>
	</p>
	
    <p>
    <h2 id='serial'>How do I search for a particular serial number or patient name?</h2>
	<img src='search.png'>
    </p>
    <h2 id='hf'>How do I stop receiving HF transmissions for a particular patient?</h2>
    
    <p>    	
    If the patient is an Abbott/St. Jude patient, remove the patient from the HF Portal inside merlin.net.  If the patient has a Medtronic device, remove the patient from your stand-alone Medtronic HF portal.
    </p>



            </div><!-- /.content__body -->
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
