# Nodepop
Con nodepop podremos gestionar nuestros artículos usando filtros de una forma fácil y rápida.

## Demo

Primero haremos una primera carga inicial en la base de datos con el siguiente script:

```diff
! Precaución, este Script eliminará el contenido de la base de datos nodepop.productos

npm run initDB
```

Instalamos las correspondientes **dependencias**:

```sh
npm i
```

Arrancar herramienta y los microservicios con **PM2**:

```sh
pm2 start ecosystem.config.js
```

El endpoint de autenticación es:

[http://localhost:3000/api/authenticate](http://localhost:3000/api/authenticate)

Este te devolverá un token JWT que servirá para acceder al resto de la api

La url donde se ejecuta la api es:

[http://localhost:3000/api/productos](http://localhost:3000/api/productos)

para ver las etiquetas de todos los productos:

[http://localhost:3000/api/tags](http://localhost:3000/api/tags)


----
## Filtrado

1. **?nombre=** //Utiliza una expresión regular y busca los productos que empiezan por dicha terminología
2. **?venta=**  //Tipo booleano (true/false) define si el producto se encuentra en compra o venta
3. **?precio=** //Este filtro sirve para seleccionar productos por un rango de precio (EJ: 100-200)
4. **?tags=** //Busqueda por etiquetas
5. **?select=** //para seleccionar el campo que queramos obtener
6. **?sort=** //para ordenar los resultados

**Paginación**:

1. **?skip=** //ignora productos según el orden de la base de datos(utiliza valor numérico para saber cuantos campos debe saltarse)
2. **?limit=** //limitar la cantidad de produtos visibles (al igual que **skip** tambien utiliza valore numéricos)

----
## Útiles

### PriceSplitter:
A la hora de aplicar el filtro precio se ejecuta una funcion llamada **priceSplitter** la cual devuelve 2 valores con los cuales ayuda a la hora del filtrado, esta función siempre devuelve 2 valores siendo el mínimo 0
### Thumbnail conversor:
El microservicio **Thumbnail conversor** devuelve los datos necesarios para el trato de las imágenes que se realizan con **sharp**

----

##Front-End

La web cuenta con un aspecto minimo en el cual se permiten todos los filtros previamente mencionados y cuenta con paginación.

Además cuenta con un formulario de creación de productos completamente funcional.

[http://localhost:3000/](http://localhost:3000/)