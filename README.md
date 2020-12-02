# REACT-SALIDAS

## Description

Aplicacion frontend de creacion de tickes de salida de materiales o equipos, lleva el control de las personas, transporte y tiempo que permanecen los equipos afuera.

El backend de esta apps, es [apisalidas](https://github.com/pedroobando/apisalidas)

## Guia Docker

```bash
# Crear la imagen
  $ docker build -t reactsalida .

# Crear el contenedor
# puerto_expuesto: puerto_interno
# -it: modo interactivo
# -d: modo deployment
  $ docker run --name frontappsalida -it -d --restart always -p 8080:80 reactsalida

# Guida de node Docker
  https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

# Entrar a un contenedor
  $ docker exec -i -t contenedorId /bin/bash #
  $ docker exec -i -t contenedorId /bin/sh # <= alpine

# Extraer la base datos del contenedor
  $ docker cp contenedorId:/app/logisticadb.sqlite  .

# Copiar archivo al contenedor
  $ docker cp nombredelarchivo  contenedorId:/rutadestino
```

## License

Pedro Obando is [MIT licensed](LICENSE).
