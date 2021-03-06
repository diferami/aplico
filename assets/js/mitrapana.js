
var styles = [
                    {
                        "featureType": "poi",
                        "stylers": [
                          { "visibility": "off" }
                        ]
                      },{
                        "featureType": "transit",
                        "stylers": [
                          { "visibility": "off" }
                        ]
                      },{
                        "featureType": "landscape.man_made",
                        "stylers": [
                          { "visibility": "off" }
                        ]
                      }
            ];
    
var map;
var latitud;
var longitud;
var latitudOriginal;
var longitudOriginal;
var geocoder = new google.maps.Geocoder();
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var page_state  = 'dashboard';
var id_user_app = -1;
var flag_tyc  = 'S';

var demonId;
var queryId;
var verifyServiceStatus;
var taxiLocationDemonId;
var agentId;
var taxiMarker;
var userMarker;

var addressTemp ='';

var attemp = 0;

//window.oncontextmenu = function(){return false};


window.onpopstate = function(event) {
 
  if (window.history && window.history.pushState) {
    $(window).on('popstate', function() {
     console.log('-->'+page_state);
      var hashLocation = location.hash;
      var hashSplit = hashLocation.split("#!/");
      var hashName = hashSplit[1];
      
      if (hashName !== '') {
        var hash = window.location.hash;
        console.log(hash);
        if ((hash === '') && (page_state==='call')) {
            console.log('history.go(1)');
            history.go(1); 
        }
      }
    });
  }
};
    

$(document).ready(function() {
    
    $('#progress-bar, #waiting-msg, #agent-wrapper, #agent-call2-wrapper').hide();
    
    
    localizame(); /*Cuando cargue la pÃ¡gina, cargamos nuestra posiciÃ³n*/ 

    //$('#address-calle, #address-numero, #address-alterna').change(function(e){
      //  var address = trim($('input[name="address-calle"]').val()) +' '+ trim($('input[name="address-numero"]').val()) +' ' + trim($('input[name="address-alterna"]').val());
       // $('#address').html(address);
    //});
    
    $('#address').change(function(e){
        $('#address-calle').val(trim($('input[name="address"]').val()));
       
    });

    $('#calling-agent').click(function (e){
        e.preventDefault();
    });
    
    $('#agent-confirmation').click(function(e){
        $.ajax({
            type : "GET",
            url : app_path + lang + '/api/agent_accept',           
            dataType : "json",
            data : {
                queryId : queryId
            }
        }).done(function(response){
            reset_modal();
        });
        
    });
    
    $('#call-cancelation').click(function (e){
        e.preventDefault();
        reset_modal();
    });

    $('#query-cancelation').click(function (e){
        e.preventDefault();
        if (confirm(msg_cancel_service))
        {   
            cancel_service();
            $("[data-role=panel]").panel("close");
        }
    });


    $('#call-confirmation').click(function(e){
       e.preventDefault();
       
       call_confirmation();
    });
    
    $('#btn-localizame').click(function(e){
        e.preventDefault();
        setUserIcon(latitudOriginal, longitudOriginal);
    });    
    
     
    $('#show-taxi').click(function(e){
    
        $("[data-role=panel]").panel("close");

        if(directionsDisplay != null) { 
            directionsDisplay.setMap(null);
            directionsDisplay = null; 
        }
        
        if(taxiMarker){
            taxiMarker.setMap(null);
            taxiMarker = null;
        }
        setTimeout(cargarMapa, 500);
        setTimeout(viewTaxi, 1000);
    });

    $('#call-cancelationreverse').click(function(e){
        setTimeout(cargarMapa, 500);
    });

    $('#btn-address-search').click(function(e){
        e.preventDefault();
        //address_search();
        google.maps.event.trigger(map, 'resize');   
    });

  
    $('#agent-call').click(function(e){
        //$('input[name="address-calle"]').val(trim($('input[name="address"]').val()));
        /// $('input[name="address-reference"]').val(trim($('input[name="address"]').val()));
        $('#sp-address-calle').html(trim($('input[name="address"]').val()));
       
        clearInterval(taxiLocationDemonId);
         //$('#address-calle').html(trim($('input[name="address"]').val()));
        //$('#address-calle').val(trim($('input[name="address"]').val()));
        
        $("#show-call").trigger('click');

    });

});


function viewTaxi(){
    clearInterval(taxiLocationDemonId);
    getTaxiLocation();
    taxiLocationDemonId = setInterval(getTaxiLocation, verification_interval);
}

function call_confirmation(){
        //var address = trim($('input[name="address-calle"]').val()) +' '+ trim($('input[name="address-numero"]').val()) +' ' + trim($('input[name="address-alterna"]').val())+' ' + trim($('input[name="address-reference"]').val());
        attemp = 0;
        document.getElementById("progress-bar").value = 0;
        
        var address = trim($('input[name="address-calle"]').val()) +' '+   trim($('input[name="address-reference"]').val());
        console.log('call_confirmation:'+address);
        if (address!=''){  

                if ( ($('input[name="lat"]').val()!='') && ($('input[name="lat"]').val()!='0') ){   
               
                    page_state  = 'call';
                    $.mobile.loading("show");
                    $('#call-confirmation, #confirmation-msg').hide();
                    $('#waiting-msg').html('<h1>'+searching_msg+'</h1>');

                    $('#waiting-msg').show();
                    $('#progress-bar').show();
                    
                    $.ajax({
                        type : "GET",
                        url : app_path +  lang + '/api/call',        
                        dataType : "json",
                        data : {
                            hms1    : $('input[name="hms1"]').val(),
                            address : address,
                            lat     : $('input[name="lat"]').val(),
                            lng     : $('input[name="lng"]').val(),
                            zone    : $('input[name="zone"]').val(),
                            city    : $('input[name="city"]').val(),
                            country : $('input[name="country"]').val(),
                            state_c : $('input[name="state_c"]').val(),
                            name    : $('input[name="call-name"]').val(),
                            phone   : $('input[name="call-phone"]').val(),
                            cell    : $('input[name="call-phone"]').val(),
                            average : average,
                            uuid    : uuid,
                            idcall  : '-1',
                            cachehora   : (new Date()).getTime()
                        }
                    }).done(function(response){
                        if(response.queryId > 0){
                            queryId = response.queryId;
                            clearInterval(demonId);
                            demonId = setInterval(verifyCall, verification_interval);
                        }else{
                            page_state  = 'dashboard';
                            alert(msg_error_attempts);
                        }
                    });
                    
            }else{
                alert(msg_configure_device);
            }
        
      }else{
        alert(msg_nomenclature_empty);
      }

}

function play_sound(element) {
        document.getElementById(element).play();
}
   
function validarEnter(e) {
    if (window.event) {
        keyval=e.keyCode
    } else 
        if (e.which) {
            keyval=e.which
        } 
    if (keyval=="13") {
        e.preventDefault();
        address_search();
    } 
}

function cancel_service(){

        
        page_state  = 'dashboard';       

        $.mobile.loading("hide");
        clearInterval(demonId);
        clearInterval(verifyServiceStatus);
        
        
        if(!queryId){
            return true;
        }
        
        reset_modal();
         
        
        if(taxiMarker){
            taxiMarker.setMap(null);
            taxiMarker = null;
        }
                
        $.ajax({
            type : "GET",
            url : app_path +  lang + '/api/request_cancel',           
            dataType : "json",
            data : {
                queryId : queryId
            }
        }).done(function(response){});

}

function trim(myString)
{
    return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}
    
function getTaxiLocation(){
       $.ajax({
            type : "GET",
            url : app_path +  lang + '/api/get_taxi_location',        
            dataType : "json",
            data : {
                agent_id : agentId,
                queryId  : queryId,
                cachehora : (new Date()).getTime()
            }
        }).done(function(response){
            if(response.state == 'ok'){
                setTaxiIcon(response.lat, response.lng);
            }
        });
       
}

function setTaxiIcon(lat, lng){
    if(taxiMarker){
        taxiMarker.setPosition( new google.maps.LatLng( lat, lng ) );
    }else{
        taxiMarker = new google.maps.Marker({
            position: new google.maps.LatLng( lat, lng ),
            map: map,
            icon : app_path +'/assets/images/taxi.png'
        });
        
        tracerRoute(lat, lng, latitud, longitud);
    }
}

function tracerRoute(lat, lng, lat2, lng2){
    //para el calculo de la ruta
    var rendererOptions = {
          map: map,
          suppressMarkers : true
        }
    
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    directionsDisplay.setMap(map);
 
    var request = {
      origin:  new google.maps.LatLng(lat2, lng2),
      destination:new google.maps.LatLng(lat, lng),
      
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

}

function setUserIcon(lat, lng){
    var latlon = new google.maps.LatLng(lat, lng);
    codeLatLng(lat, lng);
    userMarker.setPosition(latlon);
    map.setCenter(latlon); 

    latitud = lat;
    longitud = lng;
    $('#lat').val(lat);
    $('#lng').val(lng);
    
}

function reset_modal(){
    attemp = 0;
    document.getElementById("progress-bar").value = 0;
    
    $('#confirm-wrapper').show();
    $('#waiting-msg').html(searching_msg);
    $('#waiting-msg').hide();
    $('#progress-bar').hide();
    $('#call-confirmation').show();
    
    $('#confirmation-msg').show();
    $('#agent-wrapper').hide();

    $('#agent-call2-wrapper').hide();
    $('#agent-call-wrapper').show();
}

function verifyCall(){
    attemp = attemp + 1;
    var avance = (attemp*100)/max_verification_attemps;
    document.getElementById("progress-bar").value = avance;
    
    console.log("avance:"+avance);
    $.ajax({
        type : "GET",
        url : app_path + lang + '/api/verify_call',        
        dataType : "json",
        data : {
            queryId : queryId,
            demonId : demonId,
            cachehora : (new Date()).getTime()
        }
    }).done(function(response){
        
        if(response.state == 'error'){
            page_state  = 'dashboard';
            $.mobile.loading("hide");
            clearInterval(demonId);
            
            reset_modal();
            
            $('#waiting-msg').html(response.msg);
            play_sound('yes'); 
            alert(response.msg);
            
        }
         
        if(response.state == '1'){
            page_state  = 'call';
            $('#agent-photo').html('<img  style="imagenagent" src="' + response.agent.foto + '"/>');
            $('#agent-name').html(response.agent.nombre);
            agentId = response.agent.id
            $('#agent-id').html(response.agent.codigo);
            $('#agent-phone').html(response.agent.telefono);
            $('#btn-phone').attr('href','tel:'+response.agent.telefono);
            //$('#btn-phone').text(response.agent.telefono);

            $('#confirmation-code').html('<span style="color: red; font-weight:bold;">' + queryId + '</span>');
            $('#agent-placa').html(response.agent.placa);
            $('#agent-unidad').html(response.agent.unidad);
            
            /*
            addr = response.agent.direccion;
            addr=addr.replace("#","Num.");
            coment = 'Viajo en el taxi con placa '+response.agent.placa+' saliendo de '+addr; 
            url = 'http://twitter.com/share?url=http://www.pidataxi.com/&text='+coment+'&via=pidataxi&related=hptxt';
            tw = '<a href="'+url+'" rel="nofollow" target="_parent" data-rel="dialog" data-transition="slideup"><img src="assets/images/social/twitter.png" /></a>';
            url = 'http://www.facebook.com/sharer.php?s=100&p[url]=http://www.pidataxi.com&p[title]=Servicio de taxi por dispositivo móvil PidaTaxi.com&p[summary]='+coment+'&&p[images][0]=http://www.pidataxi.com/icon.png';
            fc = '<a href="'+url+'" target="_blank" data-rel="dialog" data-transition="slideup"><img src="assets/images/social/facebook.png" /></a>';
            $('#share-twitter').html(tw);
            $('#share-facebook').html(fc);
            */
    
            $('#confirm-wrapper').hide();
            $('#agent-wrapper').show();
            
            $.mobile.loading("hide");
            
            play_sound('yes'); 

            clearInterval(demonId);
            clearInterval(verifyServiceStatus);
            verifyServiceStatus = setInterval(verifyServiceState, verification_interval);
        }
    });
}

function verifyServiceState(){
    $.ajax({
        type : "GET",
        url : app_path + lang + '/api/verify_service_status',        
        dataType : "json",
        data : {
            queryId : queryId,
            demonId : verifyServiceStatus,
            cachehora : (new Date()).getTime()
        }
    }).done(function(response){
        
        if(response.state == 'error'){
            page_state  = 'dashboard';
            clearInterval(verifyServiceStatus);
            alert(response.msg);
            reset_modal();
            $("#call-modal").dialog('close');
        }
        
        if(response.state == 'arrival'){
            //$.playSound('/assets/audio/ring.mp3');
            play_sound('pito'); 
			updateStatusArribo();
            alert(response.msg);
        }

        if(response.state == 'delivered'){
            //hacer llamado a la pantalla de encuesta
            page_state  = 'dashboard';
            clearInterval(verifyServiceStatus);
            clearInterval(taxiLocationDemonId);
            reset_modal();
            $("#call-modal").dialog('close');
            if(taxiMarker){
                        taxiMarker.setMap(null);
                        taxiMarker = null;
            }      
            if(directionsDisplay != null) { 
                        directionsDisplay.setMap(null);
                        directionsDisplay = null; 
            }          
        }

    }); 
}

function updateStatusArribo(){
    $.ajax({
        type : "GET",
        url : app_path +  lang + '/api/updateStatusArribo',        
        dataType : "json",
        data : {
            queryId : queryId,
            demonId : verifyServiceStatus,
            cachehora : (new Date()).getTime()
        }
    }).done(function(response){
      
    }); 
}

function localizame() {
    if (navigator.geolocation) { /* Si el navegador tiene geolocalizacion */
        navigator.geolocation.getCurrentPosition(coordenadas, errores);
    }else{
        alert(msg_error_geolocation);
    }
}

function coordenadas(position) {
    latitud = position.coords.latitude; /*Guardamos nuestra latitud*/
    longitud = position.coords.longitude; /*Guardamos nuestra longitud*/
    latitudOriginal  = latitud;
    longitudOriginal = longitud;
    
    codeLatLng(latitud, longitud);
    console.log(latitud +'  '+ longitud);

    $('#lat').val(latitud);
    $('#lng').val(longitud);
    
    cargarMapa();
}

function errores(err) {
    /*Controlamos los posibles errores */
    if (err.code == 0) {
      alert(msg_error_geolocation);
    }
    if (err.code == 1) {
      alert(msg_error_share_position);
    }
    if (err.code == 2) {
      alert(msg_error_current_position);
    }
    if (err.code == 3) {
      alert(msg_error_exceeded_timeout);
    }
}
 
function address_search() {
 var address = app_country+','+document.getElementById("address").value;
 geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
                
        latitud=results[0].geometry.location.lat();
        longitud=results[0].geometry.location.lng();
        
        codeLatLng(latitud, longitud);
       
        $('#lat').val(latitud);
        $('#lng').val(longitud);
        
        cargarMapa();

    } else {
        alert(msg_error_geolocation);
    }
 });
}

function cargarMapa() {
    var latlon = new google.maps.LatLng(latitud,longitud); /* Creamos un punto con nuestras coordenadas */
    var myOptions = {
        zoom: 17,
        center: latlon, /* Definimos la posicion del mapa con el punto */
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        zoomControl: true,
        zoomControlOptions: { position: google.maps.ControlPosition.LEFT_CENTER}, 
        mapTypeControl: true, 
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        
    };/* HYBRID  Configuramos una serie de opciones como el zoom del mapa y el tipo.*/

    map = new google.maps.Map($("#map_canvas").get(0), myOptions); /*Creamos el mapa y lo situamos en su capa */

    
    var coorMarcador = new google.maps.LatLng(latitud,longitud); /*Un nuevo punto con nuestras coordenadas para el marcador (flecha) */

    /*Creamos un marcador*/             
    userMarker = new google.maps.Marker({
        position: coorMarcador, /*Lo situamos en nuestro punto */
        map: map, /* Lo vinculamos a nuestro mapa */
        animation: google.maps.Animation.DROP, 
        draggable: true,
        icon : app_path + '/assets/images/male.png'
    });

   
    google.maps.event.addListener(userMarker, "dragend", function(evento) {
        latitud = evento.latLng.lat();
        longitud = evento.latLng.lng();
        $('#lat').val(evento.latLng.lat());
        $('#lng').val(evento.latLng.lng());

        codeLatLng(evento.latLng.lat(), evento.latLng.lng());
    }); 
    
}

var calle = '';
var ruta = '';
var sector = '';
var ciudad = '';
var pais = '';
var depto = ''; 
var formatted_addr = '';

function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
             
                sector = results[0].address_components[2] ;
                for (var i = 0; i < results[0].address_components.length; i++)
                {
                    var addr = results[0].address_components[i];
                    if (addr.types[0] == 'country') 
                      pais = addr.long_name;
                    if (addr.types[0] == 'administrative_area_level_1') 
                      depto = addr.long_name;
                    if (addr.types[0] == 'locality') 
                      ciudad = addr.long_name;
                    //if (addr.types[0] == 'sublocality_level_1') 
                      //sector = addr.long_name;
                    if (addr.types[0] == 'route') 
                      ruta = addr.long_name;
                    if (addr.types[0] == 'street_number') 
                      calle = addr.long_name;
                    //console.log('address: '+addr.types[0]+' - '+addr.long_name)
                }
                
                formatted_addr = sector.long_name + ', ' + results[0].formatted_address;
                var guion = formatted_addr.indexOf("-");
                if (guion>0) {
                    formatted_addr = formatted_addr.substring(0, guion) + ' - ';
                    //$('#address-calle').val(formatted_addr);
                    
                    $('#address-numero').val('');
                    $('#address-alterna').val('');
                     $('#address-reference').val('');

                } else{
                    formatted_addr = sector.long_name + ', ' + results[0].address_components[1].long_name + ' # ' +results[0].address_components[0].long_name;
                    //$('#address-calle').val(sector.long_name + ', ' + results[0].address_components[1].long_name);

                    $('#address-numero').val('');
                    $('#address-alterna').val(results[0].address_components[0].long_name);
                }
                //por caprichos del cliente
                //$('#address-calle').val(formatted_addr);
                $('#address').val(formatted_addr);
                //--------------------------------            
                //$('#zone').val(sector.long_name);
                $('#zone').val(formatted_addr);
                $('#city').val(ciudad);
                $('#state_c').val(depto);
                $('#country').val(pais);
                    
            } else {
                $('#address').val(msg_address_not_found);
            }
            

        } else {
            //$('#address').val("Fallo en las Appis de Google : "+ status);
        }
    });
}



