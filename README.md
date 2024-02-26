# ⚽🚀Football touch maps

### Proyecto que actúa como consumidor de la Open API [StatsBomb](https://github.com/statsbomb/open-data), para posteriormente, con los datos recibidos, generar el mapa de toques o intervenciones de un jugador de interés.

## ⚙Lenguajes & tecnologías utilizadas
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
[![StatsBomb API](https://img.shields.io/badge/StatsBomb_API-005571?style=for-the-badge&logo=python&logoColor=white)](https://www.statsbomb.com/)
[![mplsoccer](https://img.shields.io/badge/mplsoccer-377EB8?style=for-the-badge&logo=python&logoColor=white)](https://github.com/andrewRowlinson/mplsoccer)
[![Matplotlib](https://img.shields.io/badge/Matplotlib-377EB8?style=for-the-badge&logo=python&logoColor=white)](https://matplotlib.org/)
[![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)](https://pandas.pydata.org/)



[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![child-process](https://img.shields.io/badge/child--process-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://www.npmjs.com/package/child-process)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![EJS](https://img.shields.io/badge/EJS-2D2D2D?style=for-the-badge&logo=ejs&logoColor=white)](https://ejs.co/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

* ### Front end
    * Html  
    * CSS
        * Flex
        * Grid
    * [Flags API](https://flagsapi.com/)
* ### Back End
    * NodeJS
        * Express
        * child_process
        * EJS view Engine
        * fs
    * Python
        * pandas
        * statsbomb
        * matplotlib
        * mplsoccer
    * JSON
    
## 💡Funcionamiento

* **Players**: Se recuperan los datos de todos los jugadores con el módulo fs, del archivo players.json. Posteriormente se hace un render de la vista, y la página permite al cliente seleccionar un jugador de los 34 posibles para solicitar su mapa de toques.

* **Map**: Cuando llega la request del usuario con el ID del jugador de interés, ocurren dos subprocesos
    * **1) Borrado de todas las imagenes generadas anteriormente:** Se elimnan todas las imagenes que existan en la carpeta gen_img, para ahorrar espacio.
    * **2) Ejecución del script de python:** Haciendo uso del método "exec" del paquete "child-process" de node, se ejecuta el script "main.py", que se encarga de crear el mapa del jugador con el ID solicitado, el cual se pasa como parámetro de consola. Este script devuelve una dirección que corresponde a la imagen generada, la cual se utilizada luego para hacer el render.

* **main.py**: Rescata el ID del jugador recibido como parámetro y se encarga de ejecutar la solicitud a la open API de statsbomb para pedir información sobre todas las intervenciones de ese jugador en el partido. Posteriormente rescata los datos de ubicación de esas intervenciones y las integra en una instancia de la clase Pitch, del módulo mplsoccer. Luego, diferenciando los goles con un color diferente, dibuja el mapa y lo guarda en la carpeta gen_img, en formato png. Para nombrar las imágnes se utiliza un número que corresponde a una fecha en milisegundos. Al finalizar, imprime en consola la url de la imagen generada, para ser rescatada por node.


## 📋Requerimientos
Debe tener instalado el intérprete de [python](https://www.python.org/) y las bibliotecas que se encuentran en requeriments.txt

Para la instalación de los módulos necesarios de python, abrir una terminal en el directorio y ejecutar:
```
pip install -r requirements.txt
```
Para instalar todos los módulos necesarios de node, ejecutar el siguiente comando:
```
npm install
```
Una vez finalizada la instalación de todo lo necesario, ejecutar el siguiente comando para levantar el servidor:
```
npm run start
```

Aclaración: El puerto por defecto en el que se levantará el servidor es el 3006, pero puedes cambiarlo editando la variable PORT que se encuentra en index.js.

##  📂Estructura
```
├──index.js     # Entrypoint
├──package.json 
├──package-lock.json
├──README.md
├──.gitignore
├──requirements.txt 
├──node_modules
├──public
    ├──gen_img          #Imágenes generadas
    ├──players_img      #Imágenes de los jugadores
    ├──styles
├──src
    ├──routes
        ├──map.routes.js
    ├──controllers
        ├──mapController.js
    ├──scripts
        ├──main.py
    ├──views
        ├──home.ejs
        ├──map.ejs
        ├──players.ejs
    ├──data
        ├──players.json

```

## 🖼️Views
### Players
![Captura de pantalla de la página ](/public/MD_img/players.png "This is a sample image.")

### Map
![Captura de pantalla de la página ](/public/MD_img/map.png "This is a sample image.")