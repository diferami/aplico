<!doctype html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="en"><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" lang="en"><!--<![endif]-->
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="X-UA-Compatible" content="IE=9">
	
	<script type="text/javascript"
  		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAsTEMEPiqxEtq9xlzSE-LsUE7q5DXdX-0" >
	</script>


    <link rel="shortcut icon" href="<?=base_url()?>assets/images/iconweb.png">
    
	<title><?= $this->config->item('app_name') ?></title>

	<link rel="stylesheet" href="<?=base_url()?>assets/css/app.css" />
 
   	<link rel="stylesheet" href="<?=base_url()?>assets/js/jqm1.4.5/jquery.mobile-1.4.5.min.css" /> 
   	<link rel="stylesheet" href="<?=base_url()?>assets/css/theme-classic.css" />

	<script src="<?=base_url()?>assets/js/jqm1.4.5/jquery-1.11.1.min.js"></script>
	<script src="<?=base_url()?>assets/js/jqm1.4.5/jquery.mobile-1.4.5.min.js"></script>


<script>

 		var lang = '<?=current_lang()?>';
 		var verification_interval = <?=ci_config('verification_interval')?>;
 		var app_country = '<?=ci_config('app_country')?>';
 		var searching_msg = '<h1><?=lang('dashboard.searching')?></h1>';
 		var msg_cancel_service = '<?=lang('dashboard.cancel_service')?>';
 		var msg_nomenclature = '<?=lang('dashboard.nomenclature')?>';
 		var msg_nomenclature_empty = '<?=lang('dashboard.nomenclature_empty')?>';
 		var msg_configure_device = '<?=lang('dashboard.configure_device')?>';
 		var msg_error_attempts = '<?=lang('dashboard.error_attempts')?>';
 		var msg_address_not_found = '<?=lang('dashboard.address_not_found')?>';
 		var msg_error_geolocation = '<?=lang('dashboard.error_geolocation')?>';
 		var msg_error_share_position = '<?=lang('dashboard.error_share_position')?>';
 		var msg_error_current_position = '<?=lang('dashboard.error_current_position')?>';
 		var msg_error_exceeded_timeout = '<?=lang('dashboard.error_exceeded_timeout')?>';
 		var average = '<?=$average?>';
 		var uuid = '<?=$uuid?>';
 		var model = '<?=$model?>';
 		var platform = '<?=$platform?>';
 		var version = '<?=$version?>';
 		var app_path = '<?=ci_config('app_path')?>';
 		var max_verification_attemps = '<?=ci_config('max_verification_attemps')?>';
</script>
  	
<script src="<?=base_url()?>assets/js/mitrapana.js"></script>

</head>
 
<body>

<div data-role="page" id="page1"  >
    <div data-theme="e" data-role="header">

        <h3><?= $this->config->item('app_name') ?></h3>
        <div id="agent-call-wrapper">
    		<a id="agent-call" data-role="button" data-theme="a" href="#" class="ui-btn-right"><?=lang('dashboard.calltaxi')?></a>
    	</div>
    	<div id="agent-call2-wrapper">
    		<a id="agent-call2" data-role="button" data-theme="b" href="#call-modal" class="ui-btn-right" data-rel="dialog" data-transition="pop" ><?=lang('dashboard.showtaxi')?></a>
    	</div>   
    	<?= form_open('api/call', array('id' => 'call-form', 'class' => '')) ?>
			<input id="lat" name="lat" type="hidden" value="">
			<input id="lng" name="lng" type="hidden" value="">
			<input id="zone" name="zone" type="hidden" value="">
			<input id="city" name="city" type="hidden" value="">
			<input id="state_c" name="state_c" type="hidden" value="">
			<input id="country" name="country" type="hidden" value="">
            <div data-role="fieldcontain">
            	<table border=0 width="100%"><tbody>
        		<tr><td >
        			<?=lang('dashboard.enter_address')?>
                	<input name="address" id="address" value="" type="text" data-mini="true" onkeydown="return validarEnter(event)">
            	</td><td >
                	<a href="#" id='btn-address-search'  align="left" data-role="button" data-icon="search" data-iconpos="notext" data-theme="a" data-inline="true"><?=lang('dashboard.search')?></a>
                </td>
                <td >
                	<a href="#" id='btn-localizame'  align="left" data-role="button" data-icon="home" data-iconpos="notext" data-theme="a" data-inline="true"><?=lang('dashboard.localizame')?></a>
                </td>
				</tr>
                </tbody></table>
            </div>    		
    	 </form>   

    </div>
    
   <!-- Mapa -->
    <div data-role="content" class="padding-0" >
         <div id="map_canvas" ></div>
   </div>
  

    <div data-theme="e" data-role="footer" data-position="fixed" align="center">
	   <!--	
	   <a href="<?= $this->config->item('app_link') ?>" ><?= $this->config->item('copyright') ?></a>
	   -->
	   <?= $this->config->item('copyright') ?>
    </div>

    <div id="sound_"></div>    
    <a href="#call-modal" data-role="button" id="show-call" style="display: none;" data-rel="dialog" data-transition="pop" >Show call</a>
</div>

<!-- Start of third page: #popup -->
<div data-role="panel" id="call-modal" data-display="push" data-position="right" data-display="overlay" data-position-fixed="true" data-swipe-close="false" data-dismissible="false">
<!-- <div data-role="page" id="call-modal" data-close-btn="none">-->
	<div id="confirm-wrapper">
		<div data-role="header" data-theme="e" align="center">
			<b><?=lang('dashboard.callconfirm.title')?></b>
		</div><!-- /header -->
			<div data-role="content" data-theme="d">	
				<!--<p><?=lang('dashboard.callconfirm.msg')?></p>-->	
			    <div class="ui-grid-a">
			      <div class="ui-block-a">
			        <input name="call-name" id="call-name" placeholder="<?=lang('dashboard.user_name')?>" value="" type="text">
			      </div>
			      <div class="ui-block-b">
			       <input name="call-phone" id="call-phone" placeholder="<?=lang('dashboard.user_phone')?>" value="" type="text">        
			      </div>
			    </div>

				<!--<?=lang('dashboard.callconfirm.you_addrees')?>-->
				<input name="address-calle" id="address-calle" value="" type="text">
				
			    <input name="address-reference" id="address-reference" placeholder="<?=lang('dashboard.callconfirm.address-reference')?>" value="" type="text">

			<div id="waiting-msg"><h1><?=lang('dashboard.searching')?></h1></div>
			<!-- 
				<input type="range" name="slider-mini" id="slider-mini" value="0" min="0" max="100" data-highlight="true" />
			-->
		</div><!-- /content -->

		<p>
			<a href="#" data-role="button" data-mini="true" data-inline="true" data-rel="back" data-transition="reverse"   id="call-cancelationreverse"><?=lang('dashboard.reverse')?></a>
		    <a href="#" data-role="button" data-mini="true" data-inline="true" data-icon="check" data-theme="b" id="call-confirmation"><?=lang('dashboard.confirm')?></a>
		</p>	
	</div>
	
	<div id="agent-wrapper">
		<div data-role="header" data-theme="e">
			<h1><?=lang('dashboard.assinged')?></h1>
		</div><!-- /header -->
	
		<div data-role="content" data-theme="d">	
			<p><?=lang('dashboard.confimationcode')?>: <span id="confirmation-code"></span></p>
			<p id="agent-photo"></p>
			<p id="agent-name"></p>
			
			<p>
			<?=lang('dashboard.agentcode2')?>: <span id="agent-placa"></span>,&nbsp;
			<?=lang('dashboard.unidad')?>: <span id="agent-unidad"></span>
			</p>
			<p>
			<?=lang('dashboard.agentphone')?>: <span id="agent-phone"></span>
			<a href="#" id='btn-phone'  data-role="button" data-icon="grid" data-theme="a" data-inline="true"><?=lang('dashboard.call')?></a>
			</p>
				
		</div><!-- /content -->
				
		<p>
			<!--<a href="#" data-role="button" data-mini="true" data-inline="true"  id="show-taxi"><?=lang('dashboard.showtaxi')?></a>-->
			<a href="#" data-role="button" data-mini="true" data-inline="true" data-rel="back" id="show-taxi"><?=lang('dashboard.showtaxi')?></a>   <!--ver taxi-->
			<a href="#" data-role="button" data-mini="true" data-inline="true" data-rel="back" id="query-cancelation"><?=lang('dashboard.cancel')?></a>
		</p>
	</div>
	
</div><!-- /page popup -->


<!-- 
<audio id="yes" src="assets/audio/yes.mp3" preload="auto"></audio>
<audio id="not" src="assets/audio/not.mp3" preload="auto"></audio>
<audio id="ring" src="assets/audio/ring.mp3" preload="auto"></audio>
 -->
<audio id="pito" src="<?=base_url()?>assets/audio/pito.mp3" preload="auto"></audio>
<audio id="yes" src="<?=base_url()?>assets/audio/yes.mp3" preload="auto"></audio>



</body>
</html>
