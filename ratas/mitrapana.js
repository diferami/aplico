var http = location.protocol;
var slashes = http.concat("//");
var server = slashes.concat(window.location.hostname);
var attemp = 0;
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
var latSearch;
var lngSearch;
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
var flagtaxi = 0;
var widthwin;


(function ($, global) {
    if (page_state !== '---call') {
    var _hash = "!",
    noBackPlease = function () {
        global.location.href += "#";

        setTimeout(function () {
            global.location.href += "!";
        }, 50);
    };

    global.setInterval(function () {
        if (global.location.hash != _hash) {
            global.location.hash = _hash;
            //$("[data-role=panel]").panel("close");
        }
    }, 100);

    global.onload = function () {
        noBackPlease();
        // disables backspace on page except on input fields and textarea.
        $(document.body).keydown(function (e) {
            var elm = e.target.nodeName.toLowerCase();
            if (e.which == 8 && elm !== 'input' && elm  !== 'textarea') {
                e.preventDefault();
            }
            // stopping event bubbling up the DOM tree..
            e.stopPropagation();
        });
    }
    }


})(jQuery, window);


//window.onload = getUserApp();


    //$(document).on('pagebeforeshow', function () {
    //var URL = $.mobile.path.parseUrl(window.location).toString().toLowerCase();

    //   alert(URL);
    //})
/*
$(window).on("navigate", function (event, data) {
  var direction = data.state.direction;
  if (direction == 'back') {
    // do something
  }
  if (direction == 'forward') {
    // do something else
  }
});
*/

$(document).ready(function() {  

    page_state = 'call';
    localStorage.setItem('radius', '2500');
    localStorage.setItem('payway', 'E');

    getUserApp();
    dispositivo();
    //chargestoredinfo();

    $('#msg-marquee').html("<MARQUEE BGCOLOR='#ccc'>"+"Bienvenido al sistema de taxis más seguro de Quito, disfruta del servicio que ofrecen MITAXI JJ y GeoCommerce"+"</MARQUEE>");
    //$('#msg-marquee').html(page_state);
    $('#msg-marquee').show(); 
    $('#address-calle').balloon({ contents: "Ingresa el sector" });
    $('#address-numero').balloon({ contents: "Ingresa el número de casa, p.ej. S8-21", offsetX: -20, offsetY: 12});
    $('#address-alterna').balloon({ contents: "Calle principal" });
    //$('#address-reference').balloon({ contents: "Ingresa referencias para que el taxi llegue lo más pronto", offsetY: 6 });
    $('#call-phone').balloon({ contents: "Ingresa tu # teléfono" });
    $('#radioservice > div:nth-child(2)').balloon({ contents: "Coloca el radio de búsqueda para encontrar una unidad. Por defecto es 2500m.", offsetY: 6  });

    $('#ayuda').click(function (){
        html =  "<h2>Ayuda</h2>" + 
                '<img src="http://i.stack.imgur.com/1INz9.png" style="width:30px;height:22px;">' +
                'Utiliza este ícono para recargar la página</br>';
        $('#btn-real-time').showBalloon({ contents: html, position: "" , offsetX: -200, offsetY: -200});
        setTimeout(function(){$('#btn-real-time').hideBalloon()},3000)
    });


    $('#closemapmenu1').click(function (e){
        e.preventDefault();
    });
    $('#closemapmenu2').click(function (e){
        e.preventDefault();
        ion.sound.play("click");
    });

    $('#btn-data-user').click(function (e){
        e.preventDefault();
        //alert('ok');
    });

    $( "#carreraPanel" ).panel({
    close: function( event, ui ) {
        ion.sound.play("click");
        saveuserdata();
    }
    });

    $( "#carreraPanel" ).panel({
    open: function( event, ui ) {
        ion.sound.play("click");
        loaduserdata();
    }
    });

    
    $( "#userdatapanel" ).panel({
    open: function( event, ui ) {
        ion.sound.play("click");
        //loaduserdata();
    }
    });

    $( "#userdatapanel" ).panel({
    close: function( event, ui ) {
        ion.sound.play("click");
        //loaduserdata();
    }
    });
    
    

    //$(this).bind("contextmenu", function(e) {
    //    e.preventDefault();
    //})

    /*
      //write file
      var usuario;
      var clave;
      function saveCourseToFile(user, pass) {
        usuario = user;
        clave = pass;
          console.log("checkpoint 1");
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, onFSError);
      }
      function onFSSuccess(fileSystem) {
          console.log("checkpoint 2");
          console.log("Opened file system: " + fileSystem.name);
          fileSystem.root.getFile("bkoo.bk", {create:true, exclusive:false}, gotFileEntry, onFSError);
      }
      function gotFileEntry(fileEntry) {
          console.log("checkpoint 3");
          fileEntry.createWriter(gotFileWriter, onFSError);
      }
      function gotFileWriter(writer) {
          writer.onwrite = function(evt) {
          console.log("checkpoint 4: write success!");
          };
          writer.write(usuario+","+clave);
      }
      function onFSError(err) {
          console.log(err.code);
      }


      //read file
      function readFile() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
        fileSystem.root.getFile("bkoo.bk", null, gotFileEntry1, fail);
    }

    function gotFileEntry1(fileEntry1) {
        fileEntry1.file(gotFile, fail);
    }

    function gotFile(file){
        //readDataUrl(file);
        readAsText(file);
    }

    function readDataUrl(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as data URL");
            alert(evt.target.result);
        };
        reader.readAsDataURL(file);
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as text");
            alert(evt.target.result);
        };
        reader.readAsText(file);
    }

    function fail(error) {
        console.log(error.code);
    }
    */

    /*$('#saving').click(function (e){
        e.preventDefault();
    saveCourseToFile('pato','clavepato');
    });

    $('#reading').click(function (e){
        e.preventDefault();
    readFile('uno','dos');
    }); */   

    //alert(average+" / "+uuid+" / "+model+" / "+" / "+platform+" / "+version);
 
    //ocultar publidad

    $('#banner-wrapper').hide();

    $('#btn-real-time').click(function(e){
        e.preventDefault();
        ion.sound.play('errorunidad');
        if(confirm("Realmente desea recargar la aplicación? (perderás toda la información almacenada y de carrera)")) {
            //clearuserdata();
            //app.exitApp();
            location.reload();
            }
        //getIconLocation();
    });

    if ((average=='WEB') || (uuid=='') || (uuid=='undefined') || (uuid=='indefinido')){
        $("#btn-data-user").hide();
        $("#close-page").hide();
        //$("#btn-localizame1").closest('.ui-btn').show();
    }

    $('#close-page').click(function(e){
        ion.sound.play('errorunidad');
         if (confirm("Estás seguro que deseas cerrar la app?")){
        e.preventDefault();
        //clearInterval(verifyServiceStateDemonId);

        //window.close() ;
        page_state  = 'do-login';
        $("#show-login").trigger('click');
        history.back();
        return false; 
        }
    });
   
    $('#waiting-msg, #agent-wrapper, #agent-call2-wrapper').hide();
    
    localizame(); //Cuando cargue la pÃ¡gina, cargamos nuestra posiciÃ³n 
    //$('#map_canvas').showBalloon({ contents: "Arrastra el muñeco hasta tu ubicación para solicitar una unidad."}, 
    //    { offsetX: 0, offsetY: 0 });
    //setTimeout(function(){$('#map_canvas').hideBalloon()},3000);

    if ((average=='PC')){
        $("#btn-localizame").closest('.ui-btn').hide();
        //address_search();
    } 

    $('#address-calle, #address-numero, #address-alterna').change(function(e){
        var address = trim($('input[name="address-calle"]').val()) +' '+ trim($('input[name="address-numero"]').val()) +' ' + trim($('input[name="address-alterna"]').val());
        $('#address').html(address);

    });  
    
    $('#calling-agent').click(function (e){
        e.preventDefault();
    });
    
    $('#agent-confirmation').click(function(e){
        $.ajax({
            type : "GET",
            url : server + '/' + lang + '/api/agent_accept',           
            dataType : "json",
            data : {
                queryId : queryId
            }
        }).done(function(response){
            reset_modal();
        });
        
    });

    $('#call-cancelation').click(function(e){
        e.preventDefault();
         if (page_state == "waitingservice") {
            if (confirm(msg_cancel_service)) {
               cancel_service() 
            }
         } else {
        $("[data-role=panel]").panel("close");
        }
        });

    $('#query-cancelation').on('change', function () {
        var selected = $(this).find(":selected").text();
        console.log("Cancel: " + selected);
        if (confirm(msg_cancel_service + ' (Razón: ' + selected + ')')) {
            cancel_service(selected);
        }
    });
    
    $('#query-cancelation1').click(function(e){
        e.preventDefault();
        //if (confirm(msg_cancel_service))
        {
            //reset_modal();
            //return true;
            //cancel_service();
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
        if (flagtaxi == 0) {
        flagtaxi = 1;
        if(directionsDisplay != null) { 
            directionsDisplay.setMap(null);
            directionsDisplay = null; 
        }
        //$('#agent-call-wrapper').hide(); --
        //$('#agent-call2-wrapper').show(); --       
        clearInterval(taxiLocationDemonId);
        //getTaxiLocation();
        taxiLocationDemonId = setInterval(getTaxiLocation, verification_interval);
        //getTaxiLocation();
        }
    });

    $('#btn-address-search').click(function(e){
        e.preventDefault();
        address_search();
    });

    $('#btn_user_save').click(function(e){
        e.preventDefault();
        $('#i-agree-wrapper').hide();
        //$("#user-modal").dialog('close');
        save_user_app();
    });

    $('#btn_banner_close').click(function(e){
        e.preventDefault();
        $('#banner-wrapper').hide();
    });
    
    $('#ck-i-agree').click(function(e){
        e.preventDefault();
        if (this.checked)
            $('#btn_user_save-wrapper').show();
        else
            $('#btn_user_save-wrapper').hide();
    });

    $('#agent-call').click(function(e){  //Pide tu taxi
       // $('#address-numero').focus();
        clearInterval(taxiLocationDemonId);
        if (flag_tyc=='N') {}
           // $("#show-user").trigger('click');
        else {}
           // $("#show-call").trigger('click');
        
    });


   
    $('#i-agree-wrapper').hide(); 
    getbanner();

    $("#messg2taxi").bind( "change", function(event, ui) {
        var selected = $(this).find(":selected").text();
        if (localStorage.getItem('queryId')>0) queryId = localStorage.getItem('queryId');
        sendmsguser(selected);
    });

    
});

function dispositivo() {
    widthwin = $( window ).width();
    if (widthwin > 800) {
    }   
}

function sendmsguser(msg){
    if (msg != "" && queryId > 0){
        $.ajax({
            type : "GET",
            url : server + '/' + lang + '/api/send_message' ,        
            dataType : "json",
            data : {
                msg : msg,
                id  : queryId
            }
    }).done(function(response){
        if(response.state == 'ok'){
        
        var dt = new Date();
        var dtmonth = dt.getMonth();
        var hora = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

         $('#chatarea').prepend('<font color="blue"><font size="4"><b>Usuario - ' + hora + 
            ':</br></b></font><font size="4">->' + msg + '</br></font></font>');
         ion.sound.play("confirmation");
        }
    });
    }
}

function verify_data() {
        if ($('input[name="call-name"]').val() == ''){ 
            ion.sound.play('errorunidad');
            alert('Ingresa tu nombre para que te podamos ubicar.');
            $('input[name="call-name"]').focus();
            return 'error';
        }
        if ($('input[name="call-name"]').val().length < 3){ 
            ion.sound.play('errorunidad');
            alert('El nombre debe contener al menos 3 letras.');
            $('input[name="call-name"]').focus();
            return 'error';
        }

        var firstChar = $('input[name="call-phone"]').val()[0];
        if ($('input[name="call-phone"]').val() == ''){ 
            ion.sound.play('errorunidad');
            alert('Ingresa un teléfono para que podamos ubicarte.');
            $('input[name="call-phone"]').focus();
            return 'error';
        } 
        if ($('input[name="call-phone"]').val().length < 9 || 
            $('input[name="call-phone"]').val().length > 10 || firstChar != 0) {
            ion.sound.play('errorunidad');
            alert('Hay un error en el teléfono ingresado, recuerda que debe empezar con 0 y tener 9 dígitos para fijos y 10 dígitos para celulares, intenta nuevamente.');
            $('input[name="call-phone"]').focus();
            return 'error';
        }

        //var address = trim($('input[name="address-calle"]').val()) +' '+ trim($('input[name="address-numero"]').val()) +' ' + trim($('input[name="address-alterna"]').val())+' ' + trim($('input[name="address-reference"]').val());
        
        if ($('input[name="address-numero"]').val() == ''){ 
            ion.sound.play('errorunidad');
            alert('Ingresa el número de casa o edificio en el que estás para que la unidad pueda encontrar tu ubicación.');
            $('input[name="address-numero"]').focus();
            return 'error';
        } 

        if ($('input[name="address-alterna"]').val() == ''){ 
            ion.sound.play('errorunidad');
            alert('Ingresa el nombre de la calle principal (en la que estás).');
            $('input[name="address-alterna"]').focus();
            return 'error';
        } 

        if ($('input[name="address-calle2"]').val() == ''){ 
            ion.sound.play('errorunidad');
            alert('Ingresa el nombre de la calle secundaria (de referencia).');
            $('input[name="address-calle2"]').focus();
            return 'error';
        } 

        if($('input[name="user-mail"]').val() != "") {
        var firstChar = $('input[name="user-mail"]').val()[0];
        var largo = $('input[name="user-mail"]').val().length;
        var lastChar = $('input[name="user-mail"]').val()[largo];
        var mail = $('input[name="user-mail"]').val();
        /*
        if ($('input[name="user-mail"]').val() == ''){ 
            ion.sound.play('errorunidad');
            alert('Ingresa un correo electrónico para enviarte la información de la unidad asignada.');
            $('input[name="user-mail"]').focus();
            return 'error';
        } 
        */
        if (largo < 6 || firstChar == '@' || firstChar == '.' || lastChar == '@' || lastChar == '.' || 
            mail.indexOf('@') <= 0 || mail.indexOf('.') <= 0 ){ 
            ion.sound.play('errorunidad');
            alert('Al parecer el correo electrónico ingresado no es correcto, revísalo por favor e intenta nuevamente.');
            $('input[name="user-mail"]').focus();
            return 'error';
        }
        }
       
        if ( $('input[name="lat"]').val() == '' || $('input[name="lat"]').val() == '0' ){
            alert(msg_configure_device);
            return 'error';
            }  
 }

function call_confirmation(){
        var address = trim($('input[name="address-calle"]').val()) +' '+ trim($('input[name="address-numero"]').val()) +' ' + trim($('input[name="address-alterna"]').val())+' ' + trim($('input[name="address-reference"]').val());
        var check = verify_data();  
       
        if ( check != "error"){                  
                    page_state  = 'call';
                    $.mobile.loading("show");
                    $('#call-confirmation, #confirmation-msg').hide();
                    $('#radioservice').hide();
                    $('#errorwaiting').hide();
                    $('#waiting-msg').show();

                    saveuserdata();
                    
                    $.ajax({
                        type : "GET",
                        url : server + '/' + lang + '/api/call',        
                        dataType : "json",
                        data : {
                            hms1    : $('input[name="hms1"]').val(),
                            address : address,
                            callep  : $('input[name="address-alterna"]').val(),
                            calles  : $('input[name="address-calle2"]').val(),
                            numhome : $('input[name="address-numero"]').val(),
                            refer   : $('input[name="address-reference"]').val(),
                            lat     : $('input[name="lat"]').val(),
                            lng     : $('input[name="lng"]').val(),
                            zone    : $('input[name="zone"]').val(),
                            city    : $('input[name="city"]').val(),
                            country : $('input[name="country"]').val(),
                            state_c : $('input[name="state_c"]').val(),
                            name    : $('input[name="call-name"]').val(),
                            phone   : $('input[name="call-phone"]').val(),
                            mail    : $('input[name="user-mail"]').val(),
                            radius  : $("#slider-1").val(),
                            payway  : $('#payway').val(),
                            //average : average,
                            uuid    : uuid,
                            idcall  : '-1',
                            cachehora   : (new Date()).getTime()
                        }
                    }).done(function(response){
                        if(response.queryId > 0){
                            page_state = 'waitingservice';
                            queryId = response.queryId;
                            clearInterval(demonId);
                            $('#slider-mini').val(0);
                            $('#slider-mini').slider('refresh');
                            latSearch = latitudOriginal;
                            lngSearch = longitudOriginal;
                            flagtaxi = 0;
                            demonId = setInterval(verifyCall, verification_interval);
                            console.log("verification_interval:" + verification_interval);
                        }else{
                            page_state  = 'dashboard';
                            $('#radioservice').show();
                            attemp = 0;
                            alert('No se han encontrado unidades, prueba nuevamente con un radio mayor.');//alert("msg_error_attempts");
                        }
                    });                    
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


function getbanner(){
    $.ajax({
        type : "GET",
        url : server + '/' + lang + '/api/get_banner',           
        dataType : "json",
        data : {
            cachehora : (new Date()).getTime()
        }
    }).done(function(response){
        if(response.state == 'ok'){
            var style = "background-image: url("+ server + "/assets//images/banner/"+ response.result.imagen+"); height: 50px; width: 320px; border: 0px solid black";
            document.getElementById("banner-wrapper").setAttribute("style",style);
           // $('#banner-label').html(response.result.descripcion);
            $('#banner-wrapper').show();
        }    
    });
}

function getUserApp(){
    if(uuid != ''){
       $.ajax({
            type : "GET",
            url : server + '/' + lang + '/api/get_user_app',        
            dataType : "json",
            data : {
                uuid        : uuid,
                model       : model,
                platform    : platform,
                version     : version,
                cachehora   : (new Date()).getTime()
            }
        }).done(function(response){
            //alert(JSON.stringify(response));
            if(response.state == 'ok'){
                $('#user-name').val(response.user.nombre);
                $('#user-phone').val(response.user.telefono);
                $('#user-email').val(response.user.email);
                localStorage.setItem('name'  , response.user.nombre);
                localStorage.setItem('phone'  , response.user.telefono);
                localStorage.setItem('mail'  , response.user.mail);
                
                id_user_app = response.user.id;
                flag_tyc = response.user.tyc;
                
                if(response.user.tyc=='N'){
                    $('#i-agree-wrapper').show();  
                    //$('#agent-call-wrapper').hide(); 
                    $('#btn_user_save-wrapper').hide(); 
                    //$("#show-user").trigger('click');
                    getTyC();
                }
            }
        });
    }else{
        $("#btn-data-user").closest('.ui-btn').hide();
    }
}

function getTyC(){
   $.ajax({
        type : "GET",
        url : server + '/' + lang + '/api/get_tyc',        
        dataType : "json",
        data : {
            cachehora : (new Date()).getTime()
        }
    }).done(function(response){
        if(response.state == 'ok'){
            $('#tyc-msj').html(response.result.terminos);
         }
    });
}

function save_user_app(){
    $('#call-name').val($('#user-name').val());
    $('#call-phone').val($('#user-phone').val());
    $('#user-mail').val($('#user-email').val());
    //$('#call-address').val($('#address').val());
    if ($('#user-name').val() == '' || $('#user-phone').val() == '') {
    ion.sound.play('errorunidad');
    alert('Ooops, al parecer hay un error con la información ingresada, revísalo e intenta nuevamente.');
} else {
    $.ajax({
        type        : "GET",
        url         : server + '/' + lang + '/api/save_user_app',        
        dataType    : "json",
        data : {
            id      : id_user_app,
            uuid    : uuid,
            name    : $('input[name="user-name"]').val(),
            phone   : $('input[name="user-phone"]').val(),
            email   : $('input[name="user-email"]').val(),
            cachehora : (new Date()).getTime()

        }
    }).done(function(response){
        if(response.state == 'ok'){
            ion.sound.play('confirmation');
            alert('La información ha sido actualizada, gracias por usar nuestros servicios.');
            $("[data-role=panel]").panel("close");
            $('#i-agree-wrapper').hide();   
            if (flag_tyc=='N'){
                flag_tyc='S';
                //$("#show-call").trigger('click');
            }
        }
    });
    }
}

function cancel_service(selected){
        console.log("Cancel-service: " + selected + " ID: " + queryId);
        page_state  = 'dashboard'; 
        clearInterval(verifyServiceStatus);
        clearInterval(taxiLocationDemonId);
            if(taxiMarker){
                        taxiMarker.setMap(null);
                        taxiMarker = null;
            }      
            if(directionsDisplay != null) { 
                        directionsDisplay.setMap(null);
                        directionsDisplay = null; 
            } 
        attemp = 0; 
        $('#radioservice').show();     
        if(!queryId || queryId == 0){
            reset_modal();
            //location.reload();
            return true;
        }


            
        $.mobile.loading("hide");
        clearInterval(demonId);
        clearInterval(verifyServiceStatus);
        
        reset_modal();
        
        if(taxiMarker != null){
            taxiMarker.setMap(null);
            taxiMarker = null;
        }     
        if(directionsDisplay != null) { 
                    directionsDisplay.setMap(null);
                    directionsDisplay = null; 
        } 
                
        $.ajax({
            type : "GET",
            url : server + '/' + lang + '/api/request_cancel',           
            dataType : "json",
            data : {
                queryId : queryId,
                cancel  : selected
            }
        }).done(function(response){
            if (response.state == "ok") {
            ion.sound.play("errorunidad");            
            alert('El servicio ha sido cancelado, no dudes en solicitar nuevamente el servicio.');
            }
        });
        //location.reload();
}


function trim(myString)
{
    if (myString)
        return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}
    

function getTaxiLocation(){
    $.ajax({
            type : "GET",
            url : server + '/' + lang + '/api/get_taxi_location',        
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

function getTaxiLocation4d(){
       $.ajax({
            type : "GET",
            url : server + '/' + lang + '/api/get_taxi_location',        
            dataType : "json",
            data : {
                agent_id : agentId,
                queryId  : queryId,
                cachehora : (new Date()).getTime()
            }
        }).done(function(response){
            if(response.state == 'ok'){
                //console.log('User: ' + latitud + " , " + longitud + 'Taxi: ' + response.lat + ' , ' + response.lng);
                var dist = distancia(latitud,longitud,response.lat,response.lng);
                $('#waitingtaxi').html('<p><font color="red">Esperando unidad...</br><b>Distancia al taxi: </b>' + dist + ' km</font></p>');
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
            icon : server +'/assets/images/taxi.png'
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

function setUserIcon1(lat, lng){
    var latlon = new google.maps.LatLng(lat, lng);
    codeLatLng(lat, lng);
    userMarker.setPosition(latlon);

    latitud = lat;
    longitud = lng;
    $('#lat').val(lat);
    $('#lng').val(lng);
    
}

function reset_modal(){
    $('#confirm-wrapper').show();
    $('#waiting-msg').hide();
    $('#call-confirmation').show();
    
    $('#confirmation-msg').show();
    $('#agent-wrapper').hide();

    $('#agent-call2-wrapper').hide();
    $('#agent-call-wrapper').show();

}

function verifyCall(){
    setUserIcon1(latSearch, lngSearch);
    attemp = attemp + 1;
    var avance = attemp*100/17;
    $('#slider-mini').val(avance);
    $('#slider-mini').slider('refresh');
    
    ion.sound.play("searching");
    console.log("attemp: " + attemp);
    $.ajax({
        type : "GET",
        url : server + '/' + lang + '/api/verify_call',        
        dataType : "json",
        data : {
            queryId : queryId,
            demonId : demonId,
            attemp  : attemp,
            cachehora : (new Date()).getTime()
        }
    }).done(function(response){
        console.log(JSON.parse(JSON.stringify(response)));        
        if(response.state == 'error'){
            page_state  = 'dashboard';
            $.mobile.loading("hide");
            //$('#radioservice').show();
            clearInterval(demonId);
            ion.sound.play("errorunidad");  
            $('#waiting-msg').hide();
            $('#errorwaiting').show();    
            $('#errorwaiting').html('<p style="color:blue"> No se han encontrado unidades, puedes intentar nuevamente con un radio de búsqueda mayor.</p>' + 
                '<a href="#" id="reintentar" data-role="button" data-icon="alert" data-theme="e"' + 
                ' data-inline="true" onClick="sinunidades()">Intentar nuevamente</a>' );//.html(response.msg);
            $('#errorwaiting').trigger( "create" );            
        }

        if (response.state == '2'){
            var dia = new Date();
            //var numsem = dia.getDay();
            var hora = dia.getHours();
            var saludo = "Buenos días, ";
                if (hora>12 && hora <18 ) saludo = "Buenas tardes, ";
                if (hora>=18) saludo = "Buenas noches, ";

            ion.sound.play("ring");
            if(confirm(saludo + "mi nombre es " + response.agent.nombre + 
                " y me han asignado su carrera, llegaré a recogerle en " + response.agent.tiempoarribo + 
                ", por favor confirme que esperará la carrera.")) {
                aceptaTime(queryId);
            } else {
                noaceptaTime(queryId);
                //alert('Un gusto servirle, un excelente día.');
                //reset_modal();
                //location.reload();
            }
        }
         
        if(response.state == '1'){
            //console.log(JSON.parse(JSON.stringify(response)));
            sendmail(queryId);
            page_state  = 'call';
            $( "#carreraPanel" ).panel( "open" );
            var foto = response.agent.foto;
            var lastChar = foto[foto.length-1]
            if (lastChar == "/") foto = response.agent.foto + "default-driver.png";
            $('#agent-photo').html('<img  style="imagenagent" src="' + foto + '"/>');
            $('#agent-name').html(response.agent.nombre);
            agentId = response.agent.id
            localStorage.setItem('queryId', queryId);
            localStorage.setItem('agentId', agentId);
            $('#agent-id').html(response.agent.codigo);
            $('#agent-phone').html('<a href="tel:' + response.agent.telefono + '">' + response.agent.telefono+' </a>');
            $('#btn-phone').attr('href','tel:'+response.agent.telefono);
            //$('#btn-phone').text(response.agent.telefono);

            $('#confirmation-code').html('<span style="color: red; font-weight:bold; font-size: 1.5em;">' + queryId + '</span>');
            $('#agent-placa').html(response.agent.placa);
            $('#agent-unidad').html(response.agent.unidad);
            $('#chatarea').html('');            
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
            $('#show-taxi').show();
            $('#messages').show();
            
            $.mobile.loading("hide");
            
            play_sound('yes'); 
            alert('Hemos enviado la información de la unidad asignada a tu correo (' +
                localStorage.getItem('mail') + '), ' +
                ' si no recibes la información revisa en la carpeta de no deseados.' +
                ' Gracias por utilizar nuestros servicios. Mi TAXI JJ.');

            clearInterval(demonId);
            clearInterval(verifyServiceStatus);
            verifyServiceStatus = setInterval(verifyServiceState, verification_interval);
        }
    });
}

function sinunidades(){
    attemp = 0;
    $('#errorwaiting').hide();
    $('#waiting-msg').hide();
    $('#radioservice').show();
    $('#call-confirmation').show();
}

function verifyServiceState(){
    setUserIcon1(latSearch, lngSearch);
    $.ajax({
        type : "GET",
        url : server + '/' + lang + '/api/verify_service_status',        
        dataType : "json",
        data : {
            queryId : queryId,
            demonId : verifyServiceStatus,
            cachehora : (new Date()).getTime()
        }
    }).done(function(response){
        if (response.state == 'wtng') {
            getTaxiLocation4d();
            ion.sound.play("beep1"); }

        if(response.state == 'message'){
            ion.sound.play("errorunidad");
            var dt = new Date();
            var dtmonth = dt.getMonth();
            var hora = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

        $('#chatarea').prepend('<font color="red"><font size="4"><b>Taxista - ' + hora + 
        ':</br></b></font><font size="4">->' + response.msg + '</br></font></font>');
        $( "#messagespanel" ).panel( "open" );   
        }
        
        if(response.state == 'error'){
            page_state  = 'dashboard';
            clearInterval(verifyServiceStatus);
            ion.sound.play("errorunidad");
            if (response.flag == 1) {
                alert("El servicio ha sido suspendido, motivo: " + response.msg + ". Mil dusculpas por las molestias, por favor intenta nuevamente.");
                } else {
                alert(response.msg);
             }
            cancel_service();
            //reset_modal();
            //$("#call-modal").dialog('close');
            //$('radioservice').show();
        }
        
        if(response.state == 'arrival'){
            play_sound('pito'); 
            updateStatusArribo();
            alert(response.msg);
            $( "#carreraPanel" ).panel( "open" );
            $('#waitingtaxi').html('<p><font color="red"><font size="4">' + 
               '<b>La unidad ha llegado..!!!</b></font></font></p></br>' + 
               '<a href="#" id="taxiarrive" data-role="button" data-icon="check" data-theme="b"' + 
               ' data-inline="true" onClick="serviceaccept()">Confirmar arribo</a>' );
            $('#waitingtaxi').trigger( "create" );
            $('#show-taxi').hide();
            $('#messages').hide();
            clearInterval(verifyServiceStatus);
            clearInterval(taxiLocationDemonId);
        }

        if(response.state == 'delivered'){
            //hacer llamado a la pantalla de encuesta
            page_state  = 'dashboard';
            clearInterval(verifyServiceStatus);
            clearInterval(taxiLocationDemonId);
            reset_modal();
            $('#radioservice').show();
            //$("#call-modal").dialog('close');
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

function serviceaccept() {
    ion.sound.play("confirmation");
    alert('Gracias por usar los servicios de MITAXI JJ esperamos que disfrutes tu viaje.');
    queryId = 0;
    attemp = 0;
    $("[data-role=panel]").panel("close");
    cancel_service();
}



function updateStatusArribo(){
    $.ajax({
        type : "GET",
        url : server + '/' + lang + '/api/updateStatusArribo',        
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
        center: latlon,//{lat:-0.188654, lng:-78.485942}, /* Definimos la posicion del mapa con el punto */
        navigationControlOptions: {style: google.maps.NavigationControlStyle.DEFAULT,},
        zoomControl: true,
        zoomControlOptions: { position: google.maps.ControlPosition.LEFT_CENTER}, 
        mapTypeControl: true, 
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles : styles

    };/* HYBRID  Configuramos una serie de opciones como el zoom del mapa y el tipo.*/

    map = new google.maps.Map($("#map_canvas").get(0), myOptions); /*Creamos el mapa y lo situamos en su capa */

    var coorMarcador = new google.maps.LatLng(latitud,longitud); /*Un nuevo punto con nuestras coordenadas para el marcador (flecha) */

    /*Creamos un marcador*/             
    userMarker = new google.maps.Marker({
        position: coorMarcador, /*Lo situamos en nuestro punto */
        map: map, /* Lo vinculamos a nuestro mapa */
        animation: google.maps.Animation.DROP, 
        draggable: true,
        icon : server + '/assets/images/male.png'
    });

    google.maps.event.addListener(userMarker, "dragend", function(evento) {
        latitud = evento.latLng.lat();
        longitud = evento.latLng.lng();
        latitudOriginal = latitud;
        longitudOriginal = longitud;
        $('#lat').val(evento.latLng.lat());
        $('#lng').val(evento.latLng.lng());

        codeLatLng(evento.latLng.lat(), evento.latLng.lng());
        console.log(latitud);
    }); 
    


    


   /*
    google.maps.event.addListener(map, "drag", function() {
        userMarker.setPosition(map.getCenter());
    });

    google.maps.event.addListener(map, "dragend", function(evento) {
       
        var posicion = map.getCenter();
        userMarker.setPosition(posicion);
         
        latitud = posicion.lat();
        longitud = posicion.lng();
            
        codeLatLng(posicion.lat(), posicion.lng());
       
        //console.log('solto: '+posicion.lat()+' - '+ posicion.lng());
        $('#lat').val(posicion.lat());
        $('#lng').val(posicion.lng());
    }); 

    //evento sobre map ‘mouseover’ ( al entrar en el mapa )
    google.maps.event.addListener(userMarker, 'mouseover', function()
    {
        //map.setCenter(marcador.getPosition());
        map.setZoom(20);
    });
    //evento sobre map ‘mouseout’ ( al salir  mapa )
    google.maps.event.addListener(userMarker, 'mouseout', function()
    {
        //map.setCenter(pos_original);
        map.setZoom(17);
    });
    
    */

   // google.maps.event.addListener(taxiMarker, 'click', function() {
     //   console.log('entrooooo..');
   // });


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
                    $('#address-calle').val(formatted_addr);
                    $('#address-numero').val('');
                    $('#address-alterna').val('');
                     $('#address-reference').val('');

                } else{
                    formatted_addr = sector.long_name + ', ' + results[0].address_components[1].long_name + ' # ' +results[0].address_components[0].long_name;
                    $('#address-calle').val(sector.long_name + ', ' + results[0].address_components[1].long_name);
                    $('#address-numero').val('');
                    $('#address-alterna').val(results[0].address_components[0].long_name);
                }

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

function aceptaTime(queryId) {
    $.ajax({
            type : "GET",
            url : server + '/' + lang + '/api/usertime_accept',           
            dataType : "json",
            data : {
                queryId : queryId
            }
        }).done(function(response){
            //reset_modal();
        });

}

function noaceptaTime(queryId) {
    console.log("noaceptaTime: " + queryId);
    $.ajax({
            type : "GET",
            url : server + '/' + lang + '/api/usertime_noaccept',           
            dataType : "json",
            data : {
                queryId : queryId
            }
        }).done(function(response){
            //reset_modal();
        });
    }

function distancia(lat_user,lng_user,lat,lng){

    if(!lat || lat==0 || !lng || lng==0 || !lat_user || lat_user==0 || !lng_user || lng_user==0){
        d = 0;
        return d; 
    } else {
    var R = 6371; // km
    var dLat = (lat-lat_user)*Math.PI/180;
    var dLon = (lng-lng_user)*Math.PI/180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat_user*Math.PI/180) * Math.cos(lat*Math.PI/180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    d = d.toString(); //If it's not already a String
    d = d.slice(0, (d.indexOf("."))+3); //With 3 exposing the hundredths place

        }
        return d;
    }

    function saveuserdata() {
    localStorage.setItem('callep', $('input[name="address-alterna"]').val());
    localStorage.setItem('calles', $('input[name="address-calle2"]').val());
    localStorage.setItem('numhome',  $('input[name="address-numero"]').val());
    localStorage.setItem('refer', $('input[name="address-reference"]').val());
    localStorage.setItem('name'  , $('input[name="call-name"]').val());
    localStorage.setItem('phone' , $('input[name="call-phone"]').val());
    localStorage.setItem('mail' , $('input[name="user-mail"]').val());
    localStorage.setItem('radius', $("#slider-1").val());
    localStorage.setItem('payway', $('#payway').val());
} 

function loaduserdata() {
    //$('input[name="address-alterna"]').val(localStorage.getItem('callep'));
    $('input[name="address-calle2"]').val(localStorage.getItem('calles'));
    $('input[name="address-numero"]').val(localStorage.getItem('numhome'));
    $('input[name="address-reference"]').val(localStorage.getItem('refer'));
    $('input[name="call-name"]').val(localStorage.getItem('name'));
    $('input[name="call-phone"]').val(localStorage.getItem('phone'));
    $('input[name="mail-user"]').val(localStorage.getItem('mail'));
    if (localStorage.getItem('radius') == '' || localStorage.getItem('radius') == 0) {
      $("#slider-1").val(2500);  
      } else {
        $('#slider-1').val(localStorage.getItem('radius'));
      }
    $('#payway').val(localStorage.getItem('payway'));
}   


function clearuserdata() {
    localStorage.setItem('callep', '');
    localStorage.setItem('calles', '');
    localStorage.setItem('numhome',  '');
    localStorage.setItem('refer', '');
    localStorage.setItem('name'  , '');
    localStorage.setItem('phone' , '');
    localStorage.setItem('radius', '2500');
    localStorage.setItem('payway', 'E');
} 

function sendmail(id){
    console.log('Send mail ID: '+id);
    $.ajax({
            type : "GET",
            url : server + '/' + lang + '/api/send_mail',           
            dataType : "json",
            data : {
                id : id
            }
        }).done(function(response){
            //reset_modal();
        });
    }


