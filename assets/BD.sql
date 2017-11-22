
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agente`
--

CREATE TABLE IF NOT EXISTS `agente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` char(250) DEFAULT NULL,
  `codigo` char(20) DEFAULT NULL,
  `codigo2` varchar(100) DEFAULT NULL,
  `clave` char(100) NOT NULL,
  `telefono` char(100) DEFAULT NULL,
  `foto` char(200) DEFAULT NULL,
  `direccion` char(250) DEFAULT NULL,
  `ciudad` char(100) DEFAULT NULL,
  `departamento` char(100) DEFAULT NULL,
  `pais` char(100) DEFAULT NULL,
  `latitud` float NOT NULL DEFAULT '0',
  `longitud` float NOT NULL DEFAULT '0',
  `ubicacion` varchar(250) NOT NULL,
  `estado` enum('A','P','C') NOT NULL DEFAULT 'P',
  `estado_servicio` enum('LIBRE','OCUPADO') NOT NULL DEFAULT 'LIBRE',
  `fecha_localizacion` datetime DEFAULT NULL,
  `vehiculo` int(11) NOT NULL,
  `sos` int(11) DEFAULT '0',
  `fecha_sos` datetime DEFAULT NULL,
  `direccion_sos` char(250) DEFAULT NULL,
  `idsucursal` int(11) NOT NULL DEFAULT '0',
  `fecha_sancion` datetime DEFAULT '0000-00-00 00:00:00',
  `activo` enum('S','N') NOT NULL DEFAULT 'S',
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  KEY `fecha_sos` (`fecha_sos`),
  KEY `latitud` (`latitud`,`longitud`),
  KEY `latitud_2` (`latitud`),
  KEY `longitud` (`longitud`),
  KEY `fecha_localizacion` (`fecha_localizacion`),
  KEY `codigo_2` (`codigo`),
  KEY `fecha_localizacion_2` (`fecha_localizacion`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ci_sessions`
--

CREATE TABLE IF NOT EXISTS `ci_sessions` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(45) NOT NULL DEFAULT '0',
  `user_agent` varchar(120) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE IF NOT EXISTS `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcliente_e` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `uuid` varchar(40) DEFAULT NULL,
  `modelo` varchar(15) DEFAULT NULL,
  `plataforma` varchar(10) DEFAULT NULL,
  `version` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idcliente_e` (`idcliente_e`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_e`
--

CREATE TABLE IF NOT EXISTS `cliente_e` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idsucursal` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `consecutivo_ini` varchar(15) DEFAULT NULL,
  `consecutivo_fin` varchar(15) DEFAULT NULL,
  `activo` enum('S','N') NOT NULL DEFAULT 'S',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_loc`
--

CREATE TABLE IF NOT EXISTS `cliente_loc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcliente` int(11) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `observacion` varchar(50) DEFAULT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `latitud` float NOT NULL,
  `longitud` float NOT NULL,
  `sector` varchar(100) DEFAULT NULL,
  `ciudad` char(100) DEFAULT NULL,
  `departamento` char(100) DEFAULT NULL,
  `pais` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idcliente` (`idcliente`),
  KEY `telefonno` (`telefono`),
  KEY `celular` (`celular`),
  KEY `celular_2` (`celular`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE IF NOT EXISTS `configuracion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `terminos` text NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `motivos_sanciones`
--

CREATE TABLE IF NOT EXISTS `motivos_sanciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  `horas` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicidad`
--

CREATE TABLE IF NOT EXISTS `publicidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  `contenido` text NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  `fecha_activo` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sanciones`
--

CREATE TABLE IF NOT EXISTS `sanciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NOT NULL,
  `idagente` int(11) NOT NULL,
  `idmotivo` int(11) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `fecha_fin` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sms`
--

CREATE TABLE IF NOT EXISTS `sms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idsucursal` int(11) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `descripcion` varchar(160) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `enviado` enum('S','N') NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`),
  KEY `enviado` (`enviado`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE IF NOT EXISTS `solicitud` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ubicacion` char(250) DEFAULT NULL,
  `latitud` float NOT NULL DEFAULT '0',
  `longitud` float NOT NULL DEFAULT '0',
  `sector` varchar(100) DEFAULT NULL,
  `ciudad` char(100) DEFAULT NULL,
  `departamento` char(100) DEFAULT NULL,
  `pais` char(100) DEFAULT NULL,
  `estado` enum('P','A','C','E') DEFAULT 'P' COMMENT 'P: Pendiente;A=Aceptado;C=Cancelada;E=Entregado',
  `fecha_solicitud` datetime DEFAULT NULL,
  `fecha_respuesta` datetime DEFAULT NULL,
  `idagente` int(11) DEFAULT NULL,
  `lat_entrega` float DEFAULT NULL,
  `lng_entrega` float DEFAULT NULL,
  `agente_arribo` int(11) NOT NULL DEFAULT '0',
  `medio` enum('APP','CALL','WEB','PC') NOT NULL,
  `uuid` varchar(40) DEFAULT NULL,
  `idcall` int(11) DEFAULT '0',
  `nombre` varchar(50) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `idcliente_e` int(11) NOT NULL DEFAULT '-1',
  `forma_pago` enum('E','V') NOT NULL DEFAULT 'E',
  `voucher` varchar(15) NOT NULL DEFAULT '',
  `valor` decimal(15,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `fecha_solicitud` (`fecha_solicitud`),
  KEY `latitud` (`latitud`),
  KEY `longitud` (`longitud`),
  KEY `fecha_solicitud_2` (`fecha_solicitud`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursales`
--

CREATE TABLE IF NOT EXISTS `sucursales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `msj_texto` varchar(1000) NOT NULL DEFAULT '',
  `msj_activo` enum('S','N') NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_app`
--

CREATE TABLE IF NOT EXISTS `user_app` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(40) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `modelo` varchar(15) DEFAULT NULL,
  `plataforma` varchar(10) DEFAULT NULL,
  `version` varchar(10) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `fecha_log` datetime DEFAULT NULL,
  `tyc` enum('N','S') NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_2` (`uuid`),
  KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` char(250) DEFAULT NULL,
  `codigo` char(20) DEFAULT NULL,
  `perfil` enum('ADMIN','CALL','CUST') NOT NULL DEFAULT 'ADMIN',
  `clave` char(100) NOT NULL,
  `telefono` char(100) DEFAULT NULL,
  `direccion` char(250) DEFAULT NULL,
  `ciudad` char(100) DEFAULT NULL,
  `departamento` char(100) DEFAULT NULL,
  `pais` char(100) DEFAULT NULL,
  `latitud` float NOT NULL DEFAULT '0',
  `longitud` float NOT NULL DEFAULT '0',
  `fecha_localizacion` datetime DEFAULT NULL,
  `idsucursal` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE IF NOT EXISTS `vehiculos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `placa` char(10) NOT NULL,
  `unidad` int(5) NOT NULL,
  `modelo` char(4) DEFAULT NULL,
  `marca` char(50) DEFAULT NULL,
  `propietario` int(11) NOT NULL,
  `idsucursal` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `placa` (`placa`),
  UNIQUE KEY `placa_3` (`placa`),
  KEY `placa_2` (`placa`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`idcliente_e`) REFERENCES `cliente_e` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `cliente_loc`
--
ALTER TABLE `cliente_loc`
  ADD CONSTRAINT `cliente_loc_ibfk_1` FOREIGN KEY (`idcliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
