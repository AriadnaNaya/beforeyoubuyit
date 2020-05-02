![](http://janioisacura.com/images/bub/logoBub.png)
# Before u Buy it | Marketplace de Videojuegos

>**Es un marketplace de videojuegos que engloba las plataformas más utilizadas del mercado, PC, PS4, Xbox One y Nintendo Switch.**
>No solo se trata de comprar, el valor agregado de *Before u Buy it* ó *BuB* es ofrecer al comprador toda la info necesaria antes de adquirir el juego que tanto estaba esperando.

#### Features de lanzamiento
- Plataformas disponibles y si soporta *cross-play*.
- Requisitos de sistema.
- Categorías.
- Un gameplay para que no te apresures a comprarlo sin saber cómo es realmente.
- Una demo *(Si está sisponible)* por si el gameplay no te parece sufucuente.
- Puntaje de los sitios de videojuegos más importantes IGN / PCGAMER / Metacritic.
- Video review de tus gamers favoritos.
- Comentarios y valoración de tus compañeros gamers-

#### Sitios de referencia:
- [Steam](https://store.steampowered.com/)
- [PSN Store](https://store.playstation.com/es-ar/home/games)
- [Nintendo](https://store.nintendo.com)
- [Blizzard](https://www.blizzard.com/en-us)
- [GameFly.com](https://www.gamefly.com/games)
- [G2A](www.g2a.com)

#### ¿Para quién es *BuB*?
Para usar *BuB* solo tienes que tener una conexión a internet y que minimamente te gusten los videojuegos. *BuB* está dirigido a todo público y no te preocupes, si eres menor de edad no podrás ver el contenido de adultos.

#### Puedes visualizar todo el proceso de prototipado en: 
[Figma](https://www.figma.com/proto/zse18BbOkFbvIqQHmgsASB/Desktop-view?node-id=41%3A2023&viewport=-11185%2C316%2C0.7564056515693665&scaling=min-zoom)

#### Puedes ver el avance de nuestro proyecto en:    
[Trello](https://trello.com/b/AlFf7ezV/proyecto-integrador-dh)

#### Para utlizar este template debes tener instalado Node, Sass y LiveReload:
- Primero instalar [Node.js](https://nodejs.org/) v4+
- Agregar la extensión de chrome [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) *"Recarga el browser automáticamente al realizarse cambios en el código"*
- Luego Sass, *nuestro compilador de css* ejecutando el siguiente comando desde la consola:  
```sh
$ npm install -g sass
```

#### Instalar las respectivas dependencias con:
```sh
$ cd <ruta del template>
$ npm install
```

#### Poner en marcha el servidor:  
```sh
$ npm start
```
#### Arquitectura:
La arquitectura de la aplicación está hecha con *[Node.js](https://nodejs.org/) v4+*, *[express](https://expressjs.com/en/4x/api.html)* y *[ejs]((https://ejs.co/)*

Dada la estructura de *[ejs](https://expressjs.com/en/starter/generator.html)* tenemos una conjunto de ***“reglas”*** para manipular nuestra app según el ***patrón MVC***.

```sh
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
```
En ***app.js*** se gestionan las ***rutas de navegación***. Para ello es necesario agregar un ***controlador*** y una ***vista***.

![](http://janioisacura.com/images/bub/AppJs.png)

El controlador ***(Ej: controlador.js)*** debe estar ubicado en la carpeta routes. Este maneja la lógica y parámetros que recibirá la vista. La vista ***(Ej. vista.ejs)*** contendrá etiquetas ***HTML*** y contenido dinámico que recibirá del controlador en forma de etiquetas ***<% nombreUsuario %>***. A su vez puede invocar contenido parcial, es decir, un componente que puede reutilizarse en otras vistas como es el contenido de la etiqueta de ***HTML*** ***<head>***.

***VISTA:*** *users.ejs*
![](http://janioisacura.com/images/bub/vistasTags.png)

***PARCIAL:*** *head.ejs*
![](http://janioisacura.com/images/bub/head.png)
Las etiquetas de ***ejs*** (***Ej: <% nombreUsuario %>***) nos permiten usar código JS dentro de ellas.


En este caso *gameList* está declarada dentro de su respectivo controlador.
***CONTROLADOR:*** *user.js*
![](http://janioisacura.com/images/bub/controladorUser.png)
Notese que se está importando un ***modelo***, este es el que se encarga de hacer la consulta a la ***API*** que trae nuestro contenido, en el ***controlador*** lo parseamos y lo enviamos a la vista a través de la propidead ***gameList***.

***PARCIAL:*** *game-card.ejs*
![](http://janioisacura.com/images/bub/parcialContenido.png)
Acá iteramos sobre la data que nos trae ***gameList*** en el array ***results*** y mostramos lo que nos interesa en los respectivos ***tags HTML***.
*card-img* muestra la imagen pricipal accediendo al contenido de ***background_image***, en ***card-title*** colocamos el nombre y para los íconos iteramos de nuevo en otro array dentro de otro array llamado ***stores*** que está dentro de ***results***. Luego condicionamos para que nos muestre el ícono de nuestro store según creamos conveniente.

#### API:
Para el contenido utilizamos la *[API RAWG Video Games Database](https://rapidapi.com/accujazz/api/rawg-video-games-database)* y visualizamos la respuesta a través de la herramienta *[Postman](https://www.postman.com/)*.

***RAWG Video Games***
![](http://janioisacura.com/images/bub/rapidapi.png)
Ahí obtenemos la ***url*** y los ***headers*** que usaremos para visualizar la respuesta en ***postman***

***Postman***
![](http://janioisacura.com/images/bub/postman.png)
Una vez cofigurada la ***url*** y los ***headers*** presionamos send para visualizar la ***respuesta*** y utlizarla en nuestro código

#### Estilos:
Utilizamos *[bootstrap 4](https://getbootstrap.com/)* y *[sass](https://sass-lang.com/)*.
**IMPORTANTE**: Los estilos deben ser editados en ***public/scss/main.scss***, nunca tocar la carpeta ***build*** ni la ruta ***public/css***

#### Fonts e íconos:
Las fonts se usan localmente. La fuente principal es *OpenSans* de *[Google Fonts](https://fonts.google.com/specimen/Open+Sans?query=open+sa)* y para el logo *League Gothic* de *[Font squirrel](https://www.fontsquirrel.com/fonts/league-gothic)* y finalmente *[Font awesome](https://fontawesome.com/v4.7.0/cheatsheet/)*, *[Material icons](https://material.io/resources/icons/?style=baseline)* y una font creada en *[Fontello](http://fontello.com/)* para los íconos.

#### Comandos npm
A través del comando*** npm start***, configurado en ***package.json***, la app mira ***“watch”*** constantemente la ruta ***public*** y compila los estilos de la ruta ***public/scss*** en ***build/css***, de igual forma lo hace con los scripts de ***public/js*** al archivo ***scripts.js*** en la ruta ***build/js***. En resumen mira todos lo cambios en archivos ***ejs***, ***js*** y ***scss***, los compila y levanta un servidor recargando el browser en cada cambio. Para esto último dependemos de la extensión de chrome *[LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)*.

Todos los ***scripts*** tienen una función configurada y se ejecutan de forma simultánea con el comando ***npm start***. Lo que hace ***npm start*** a través de la ejecución de estos comandos es lo siguiente:
![](http://janioisacura.com/images/bub/packajeJson.png)

1. ***build-css***: compila el contenido de ***public/scss/main.scss*** en ***build/css/main.css***
2. ***build-js***: a través del paquete ***browserify*** compila el contenido de ***public/main.js*** en ***build/scripts.js***
3. ***build***: ejecuta el comando npm run levantando ***build-css*** y ***build-js***
4. ***server***: Levanta la aplicación o mejor dicho, crea el server con el paquete ***nodemon*** en la ruta ***bin/www tal*** y como lo especifica la documentación de ***express generator***
5. ***start***: Finalmente es ***npm start*** quien a través de ***nodemon*** mira todos los cambios en los archivos que nos interesan mediante el comando: ***nodemon -e ejs,js, scss -x***. Paralelamente ejecuta los comandos que creamos para hacer el build y crear el server, ignorando la carpeta build, para que no quede loopeando infinitamente. Es por esa razón que se agregó la carpeta build a la arquitectura. Trabajamos en la carpeta public todos nuestros estilos scss y nuestro código js para que sea compilado en una ruta que no sea evaluada por ***nodemon*** y ***LiveReload***, para que de esta forma podamos *trabajar de forma ordenada, cómoda y el browser reaccione al save de los cambios hechos en dicha ruta*.

*Realizado por Ariadna Naya, Ezequiel Turchetti y Janio Isacura*