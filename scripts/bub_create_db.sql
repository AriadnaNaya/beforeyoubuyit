-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: laravel-database
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table
--

DROP DATABASE IF EXISTS byb_db;
CREATE DATABASE byb_db;
USE byb_db;

DROP TABLE IF EXISTS `orders_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders_products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `products_id` int(10) unsigned NOT NULL,
  `orders_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_products_products_id_foreign` (`products_id`),
  KEY `orders_Products_orders_id_foreign` (`orders_id`),
  CONSTRAINT `orders_products_products_id_foreign` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`),
  CONSTRAINT `orders_Products_orders_id_foreign` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `orders_products` WRITE;
/*!40000 ALTER TABLE `orders_products` DISABLE KEYS */;
INSERT INTO `orders_products` VALUES ( 1, 1, 1 ),( 2, 2,  1),( 3, 1, 2),( 4, 2, 3),( 5, 4, 4),( 6, 5, 5),( 7, 2, 5),( 8, 1, 5);
/*!40000 ALTER TABLE `orders_products` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `products_stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_stores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `products_id` int(10) unsigned NOT NULL,
  `stores_id` int(10) unsigned NOT NULL,
  `product_key` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_stores_products_id_foreign` (`products_id`),
  KEY `products_stores_stores_id_foreign` (`stores_id`),
  CONSTRAINT `products_stores_products_id_foreign` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`),
  CONSTRAINT `products_stores_stores_id_foreign` FOREIGN KEY (`stores_id`) REFERENCES `stores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `products_stores` WRITE;
/*!40000 ALTER TABLE `products_stores` DISABLE KEYS */;
INSERT INTO `products_stores` VALUES ( 1, 1, 1, 'HQKL5237JI'),( 2, 1, 2, 'FGHT2587LO'),( 3, 1, 3, 'LORT1547JU'),( 4, 1, 4,'SWDE8765KY'),( 5, 2, 1,'FTWQ5243VQ'),( 6, 3, 1,'JKWQ1243VQ'),( 7, 3, 2, 'TYRT1547KL'),( 8, 3, 3, 'BBTG4448XL'),( 9, 4, 1, 'GRFT9173GC'),( 10, 4, 2, 'QPSL2584BT'),( 11, 4, 3, 'MCGH6719RM'),( 12, 5, 1, 'ZOLP1478QL'),( 13, 5, 2, 'UVRG9362JH');
/*!40000 ALTER TABLE `products_stores` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `users_id` int(10) unsigned DEFAULT NULL,
  `estado` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `cantidad` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_users_orders_id_foreign` (`users_id`),
  CONSTRAINT `orders_users_orders_id_foreign` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ( 1, 1, 'Activo', 2 ),( 2, 2, 'Activo', 1),( 3, 3, 'Activo', 1),( 4, 4, 'Activo', 1),( 5, 5, 'Activo', 3);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `orders_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` LONGBLOB NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_orders_users_id_foreign` (`orders_id`),
  CONSTRAINT `users_orders_users_id_foreign` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1, 1, 'Felipe', 'Galope', '$2b$10$cyu2FV8dXZ/etRNLoEEkaODopgeRscCNmAgzwVPfhdlCzOucyJtDe', 'felipe@gmail.com', 'default-img.jpg'),(2, 2, 'Janio', 'Isacura', '$2b$10$pPMCYDxms77OI64AfMNPNuls9XXB9.YCihD29wlsdq57Y0I6WCA5O', 'janioisacura@gmail.com', 'default-img.jpg'),(3,3, 'Ezequiel', 'Turchetti', '$2b$10$iip1pm2tW8rf7l8Pf6r82OdtUAtlsfPKhxqHdhIGLRBiTp0lzBWgK', 'eze@turchetti.com', '1592093401353.jpg'),(4,4 ,'Kiko', 'De Zona Sur', '$2b$10$KYlVtaln5Y7NiWH751HOe.lOU7njsajRRvr5BowbnsvyZlMowZKDC', 'kikozonasur@newells.com', 'hqdefault.jpg'),(5,5, 'Ariadna', 'Naya', '$2b$10$B65a16VQXpJv2g7fQ0qNp.nnFrlGTG4eLSwqzV85NN8UQ.wk8eg1q', 'ariadnanaya2016@gmail.com', 'default-img.jpg')	;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `developers_id` int(10) unsigned NOT NULL,
  `categories_id` int(10) unsigned NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(7,2) DEFAULT NULL,
  `discount` int(10) unsigned NOT NULL,
  `release` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `background_image` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `about` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `metacritic` int(10) unsigned NOT NULL,  
  `rating_bub` int(10) unsigned NOT NULL,
  `game_trailer` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `game_review` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `game_gameplay` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `requirements_min` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `requirements_rec` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
   KEY `products_developers_developers_id_foreign` (`developers_id`),
  CONSTRAINT `products_developers_developers_id_foreign` FOREIGN KEY (`developers_id`) REFERENCES `developers` (`id`),
  CONSTRAINT `products_categories_categories_id_foreign` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,3,'Grand Theft Auto V', 2300, 50, '2013-09-17', 'https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg', 'Se trata de una aventura de acción de mundo abierto con multitud de misiones en la que encarnamos a tres personajes distintos: Trevor, Michael y Franklin. Además, cuenta con GTA Online, el modo multijugador en lína de GTA 5. ... GTA V se ambienta en Los Santos, ciudad ficticia basada en Los Angeles', 97, 90, 'QkkoHAzjnUs', 'XDQspactbrk', 'EnGc3mPkZ38', 'Procesador intel i5, ATI RADEON tu vieja', 'Procesador intel i11, ENVIDIA 5000 tu vieja en tanga'),
(2,2,22, 'Portal 2', 1500, 50, '2011-04-19', 'https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg', 'Portal 2 es el segundo videojuego mezcla de videojuego de lógica y de disparos en primera persona, de la saga Portal.<br> Fue desarrollado por Valve Corporation. Tras los eventos del primer Portal, Chell (nuestra protagonista) despierta 50 días después de haber sido criogenizada en lo que parece ser una habitación de hotel, donde una máquina alternativa le da una serie de indicaciones para moverse y finalmente volver a dormir. Posteriormente Chell es despertada de nuevo, pero esta vez la habitación donde se encuentra está seriamente deteriorada, con el contador de tiempo fallando. De fondo suena una voz al otro lado de la puerta, tras abrirla aparece Wheatley, el módulo de personalidad que despertó a Chell de su letargo.', 95, 90, 'tax4e4hBBZc', 'w9aG2qU9okk', 'wbRTqZxfdag', 'SO: Windows 7 / Vista / XP.Procesador: 3.0 GHz P4, Dual Core 2.0 (or higher) or AMD64X2 (or higher).Memoria: 2 GB de RAM.Gráficos: Video card must be 128 MB or more and with support for Pixel Shader 2.0b (ATI Radeon X800 or higher / NVIDIA GeForce 7600 or higher / Intel HD Graphics 2000 or higher).DirectX: Versión 9.0c.Almacenamiento: 8 GB de espacio disponible.Tarjeta de sonido: DirectX 9.0c compatible', 'Procesador intel i11, ENVIDIA 5000 tu vieja en tanga'),
(3,3,6,'The Witcher 3: Wild Hunt', 1500, 50, '2015-05-18', 'https://media.rawg.io/media/games/088/088b41ca3f9d22163e43be07acf42304.jpg', 'Es un juego de perspectiva en tercera persona, el jugador controla al protagonista Geralt de Rivia, un cazador de monstruos conocido como Lobo Blanco, es un brujo, el cual emprende un largo viaje a través de Los reinos del norte.', 93, 90, 'XHrskkHf958', 'Wdw_m6DvF8s', 'YdHc3JZixRY', 'SO: 64-bit Windows 7, 64-bit Windows 8 (8.1) or 64-bit Windows 10.Procesador: Intel CPU Core i5-2500K 3.3GHz / AMD CPU Phenom II X4 940.Memoria: 6 GB de RAM.Gráficos: Nvidia GPU GeForce GTX 660 / AMD GPU Radeon HD 7870.Almacenamiento: 35 GB de espacio disponible', 'SO: 64-bit Windows 7, 64-bit Windows 8 (8.1) or 64-bit Windows 10.Procesador: Intel CPU Core i7 3770 3.4 GHz / AMD CPU AMD FX-8350 4 GHz.Memoria: 8 GB de RAM.Gráficos: Nvidia GPU GeForce GTX 770 / AMD GPU Radeon R9 290.Almacenamiento: 35 GB de espacio disponible'),
(4,4,4,'Rise of the Tomb Raide', 1900, 0, '2013-03-05', 'https://media.rawg.io/media/games/81b/81b138691f027ed1f8720758daa0d895.jpg', 'En "Rise of the Tomb Raider" Lara no solo se enfrenta a enemigos de todo el mundo, sino también al propio mundo. ', 86, 90, 'zmk-frY9qKU', '_9nRVwGr--w', 'x_Ow26-mBGo', 'SO: Windows 7 64bit.Procesador: Intel Core i3-2100 or AMD equivalent.Memoria: 6 GB de RAM.Gráficos: NVIDIA GTX 650 2GB or AMD HD7770 2GB.DirectX: Versión 11.Almacenamiento: 25 GB de espacio disponible', 'SO: Windows 10 64 bit.Procesador: Intel Core i7-3770K.Memoria: 8 GB de RAM.Gráficos: NVIDIA GTX 980Ti 2560x1440 or NVIDIA GTX 970 1920x1080.DirectX: Versión 11.Almacenamiento: 25 GB de espacio disponible'),
(5,5,6,'The Elder Scrolls V: Skyrim', 1000, 0, '2011-11-11', 'https://media.rawg.io/media/games/e9c/e9cbc91e2090638ddab6ae0b3d334f90.jpg', 'La historia de Skyrim se centra en los esfuerzos del personaje, dovahkiin (sangre de dragón), para derrotar a Alduin, un dragón/dovah que, según la profecía, destruirá el mundo. La trama está fechada doscientos años después de los sucesos de Oblivion y tiene lugar en la provincia ficticia de Skyrim', 94, 90, 'JSRtYpNRoN0', 'rjTOF8IC528', 'PjqsYzBrP-M', 'SO: Windows 7/8.1/10 (requiere versión de 64 bits).Procesador: Intel Core i5-750/AMD Phenom II X4-945.Memoria: 8 GB de RAM.Gráficos: NVIDIA GTX 470 de 1 GB/AMD HD 7870 de 2 GB.Almacenamiento: 12 GB de espacio disponible', 'SO: Windows 7/8.1/10 (requiere versión de 64 bits).Procesador: Intel Core i5-2400/AMD FX-8320.Memoria: 8 GB de RAM.Gráficos: NVIDIA GTX 780 de 3 GB/AMD R9 290 de 4 GB.Almacenamiento: 12 GB de espacio disponible');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `developers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `developers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `developers` WRITE;
/*!40000 ALTER TABLE `developers` DISABLE KEYS */;
INSERT INTO `developers` VALUES (1,'Rockstar Games'), (2,'Valve'),(3,'CD Projekt Red'),(4,'Crystal Dynamics'),(5,'Bethesda'),(6,'Capcom'), (7,'EA'),(8,'Netherealm Studios'),(9,'Blizzard'),(10,'Epic Games'),(11,'Ubisoft'),(12,'Konami'),(13,'2K'),(14,'Mojang'),(15,'Nintendo'),(16,'Sega'),(17,'Sony'),(18,'Telltale Games'),(19,'Unknown Worlds Entertainment'),(20,'WB Games'),(21,'Kalypso Media Digital'),(22,'Hasbro Interactive'),(23,'Activision');
/*!40000 ALTER TABLE `developers` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `stores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'Steam'), (2,'X-Box Store'),(3,'GOG'),(4,'Epic Games'),(5,'PlayStation Store');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'FPS'), (2,'TPS'),(3,'Mundo Abierto'),(4,'Aventura'),(5,'Fantasía'),(6, 'RPG'),(7,'Shooter'),(8,'Carreras'),(9, 'Peleas'), (10, 'Horror'), (11, 'Cirujas en tanga'), (12, 'Supervivencia'), (13, 'Simulación'), (14, 'Vielencia'), (15, 'Plataformas'), (16, 'Single Player'), (17, 'Multiplayer'), (18, 'Deportes'), (19, 'Estratégia'), (20, 'Retro'), (21, 'VR'), (22, 'Cooperativo');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-12 10:09:28