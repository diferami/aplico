<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Solicitud de Taxis</title>

<meta name="viewport" content="width=device-width, initial-scale=1"> 


<link rel="stylesheet" href="<?=base_url()?>assets/css/jquery.mobile-1.3.2.min.css" />
<link rel="stylesheet" href="<?=base_url()?>assets/css/appagt.css" /> 
<script src="<?=base_url()?>assets/js/jquery-1.10.2.min.js"></script>
<script src="<?=base_url()?>assets/js/jquery.mobile-1.3.2.min.js"></script>
<script src="<?=base_url()?>assets/js/jquery.price_format.js"></script>
<!--<script src="assets/js/jquery.price_format.min.js"></script>-->

<script type="text/javascript"
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6DTzndSIlbMN0Vo-jjoQU7lah6YnfOHw" >
</script>

<script src="<?=base_url()?>assets/js/komira.js"></script>


<script type='text/javascript' src='<?=base_url()?>assets/js/jquery.marquee.min.js'></script>

    
<script type='text/javascript' src='//cdn.jsdelivr.net/jquery.marquee/1.3.1/jquery.marquee.min.js'></script>

<script>
        var lang = '';
</script>

</head>

<body>
<div data-role="popup" id="popupBasic"></div>
<div id="audio-wrap">
	
    <audio id="pito" src="<?=base_url()?>assets/audio/pito.mp3" type="audio/mpeg"  autobuffer controls></audio>
    
    <!--<audio id="click" src="assets/audio/click.mp3"  type="audio/mpeg"  autobuffer controls></audio>-->

	<!--
	<audio id="alerta" src="assets/audio/alerta.mp3" type="audio/mpeg"  autobuffer controls></audio>
    
    <audio id="pito" src="assets/audio/pito.mp3" type="audio/mpeg"  autobuffer controls></audio>
	<audio id="yes"  src="assets/audio/yes.mp3"  type="audio/mpeg"  autobuffer controls></audio>
	<audio id="not"  src="assets/audio/not.mp3"  type="audio/mpeg"  autobuffer controls></audio>
	-->
</div>

<!-- Login -->
<div data-role="page" id="login-page">
    <div data-theme="e" data-role="header">
        <h3>
            <label id="app_name" name ="app_name"></label>
        </h3>
    </div>
    <div data-role="content">

        <form id="login-form" action="" method="POST">

            <div data-role="fieldcontain">
                <label for="username">
                    Codigo
                </label>
                <input name="username" id="username" placeholder="" value="" type="text">
            </div>
            <div data-role="fieldcontain">
                <label for="password">
                    Clave
                </label>
                <input name="password" id="password" placeholder="" value="" type="password">
            </div>
            <a href="#dashboard" data-role="button" id="show-dashboard" style="display: none;">Show page "two"</a>
            <input type="button" data-theme="e" data-icon="arrow-r" data-iconpos="right"
            value="Ingresar" id="do-login">
        </form>

    </div>
    <div style=" text-align:center">
           <img id="app_icon" style="width: 96px; height: 96px" src="<?=base_url()?>assets/images/taxi-logo.png">
    </div>
    <div data-theme="e" data-role="footer" data-position="fixed">
        <!-- Mensajes -->
        <h3>
			<label id="copyright" name ="copyright"></label>
        </h3>
    </div>
</div>
<!-- EndLogin -->


<!-- Home -->
<div data-role="page" id="dashboard">
    <div data-theme="e" data-role="header">
        <table border=0 width="100%"><tbody>
        <tr>
            <td  align="right" width="20%">
                <a data-role="button" data-theme="a" href="#sos-modal" data-rel="dialog" data-transition="pop" id="sos-modal">s.o.s</a>
            </td>
            <td align="center" width="20%">
               <img id="agent-photo" style="width: 50px;" src="" >
            </td>
            <td align="left" width="40%">
                <p id="agent-name"></p>
            </td>
            <td  align="right" width="20%">
                <a href="#" data-role="button" data-mini="true" data-theme="a" data-inline="true" id="btn-close">Salir</a>
                <a href="#login-page" data-role="button" id="show-login" style="display: none;">Show page "login"</a>
            </td>
        </tr>
        </tbody></table>
         <span id="latlong" style="font-size: .5em;text-shadow: none;font-style: oblique;color: blue;">Esperando posición...</span> 
         <img id="gps-state" style="width: 30px;" src=""></p>
    </div>
    
 
    <div data-role="article">
        
        <div data-role="section">
            <input name="current-position" id="current-position" placeholder="" value="" type="text" readonly> 
            <span id="verificacion-cod"></span>
            <br>
            <span id="user-data"></span>
            <textarea name="service-addr" id="service-addr" placeholder="Dirección" readonly></textarea>
            <a data-role="button" data-theme="a" href="#maps-modal" data-rel="dialog" data-transition="pop" id="btn-vermapa">Ver mapa</a>
        </div>
        
        <div data-role="section">
            <div id="btn-aplico-wrap">
                <input type="button" id="btn-aplico" value="ACEPTAR" data-theme="e" data-icon="plus"  data-iconpos="top" >
            </div>  
        </div>
        <div data-role="section">
            <div id="btn-llego-wrap">
			     <input type="button" data-theme="a" data-icon="arrow-r" data-iconpos="top" value="ARRIBO" id="btn-llego">
			</div>
        </div>
        <div data-role="section">
            <div id="btn-entregado-wrap">
                <input type="button" id="btn-entregado" value="ENTREGADO" data-theme="e" data-icon="check" data-iconpos="top">
            </div>
        </div>
      
        <div data-role="section">
            <div id="btn-cancelar-wrap">
                <input type="button" id="btn-cancelar" value="CANCELAR" data-icon="delete" data-iconpos="top" >
            </div>
        </div>


        <a href="#pay-modal" data-role="button" id="show-pay-modal" data-rel="dialog" data-transition="pop"  style="display: none;">Pay modal</a>
    </div>

   
    <div data-theme="e" data-role="footer" data-position="fixed">
        
        <span id="msg-marquee"></span>
        <h3>
           <label id="copyright2" name ="copyright2"></label>
        </h3>
    </div>
</div>
<!-- Home -->

<!-- Start of third page: #popup -->
<div data-role="page" id="maps-modal" data-close-btn="none">
    
        <div data-role="header" data-theme="e">
            <a href="#" data-role="button" data-mini="true" data-inline="true" data-rel="back" id="btn-regresar">Regresar</a>
            <h1>Mapa del servicio</h1>
        </div><!-- /header -->
        <div data-role="content" id="map_content" data-theme="a">
            <div id="map_content">
                <div id="map_canvas"></div>
            </div>
        </div>
   
</div><!-- /page popup -->

<!-- Start of third page: #popup -->
<div data-role="page" id="sos-modal" data-close-btn="none">
    
        <div data-role="header" data-theme="e">
            <h1>Solicitar ayuda</h1>
            <a id="btn-address" data-role="button"  data-theme="a" class="ui-btn-right"  >Mi localización</a>
        </div><!-- /header -->
        <div data-role="content" id="sos_content" data-theme="a">
            <textarea name="text-sos" id="text-sos" ></textarea>
        </div>
        
        <p>
            <a href="#" data-role="button" data-mini="true" data-inline="true" data-rel="back" id="btn-sos">Pedir ayuda</a>
            <a href="#" data-role="button" data-mini="true" data-inline="true" data-rel="back" id="btn-cancelation">Regresar</a>
        </p>
</div><!-- /page popup -->



<div data-role="page" id="pay-modal" data-close-btn="none">
    <div data-role="header" data-theme="e">
        <h1>Forma de pago</h1>
    </div><!-- /header -->

    <div data-role="content" id="pay_content">
        <div>
            <select name="select-pay" id="select-pay" data-role="slider" onchange="setPay(this.value)">
                <option value="E"> Efectivo </option>
                <option value="V">  Voucher </option>
            </select>
        </div>
        <div>
            Valor servicio:
            <input name="service-price" id="service-price" placeholder="" value="number" type="number">
        </div>
        <div id="wraper-voucher">
            Cliente:
            <select name="select-cust" id="select-cust"  data-native-menu="true" > </select>
            Código:
            <input name="code-cust" id="code-cust" placeholder="código del voucher" value="" type="text">
        </div>
    </div>
    <p>
        <a href="#" data-role="button" data-mini="true" data-inline="true" data-rel="back">Regresar</a>
        <a href="#" data-role="button" data-mini="true" data-inline="true" data-rel="back" id="btn-save-entrega">Grabar</a>
    </p>
</div><!-- /page popup -->



</body>
</html>