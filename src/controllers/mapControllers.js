const fs = require("fs");
const { exec } = require("child_process");
const path = require("path")
const dataUrl = path.resolve(__dirname, "../data/players.json")
module.exports = {
    home: (req, res) => {
        res.render("home", {
            view: {
                
            }
        })
    },
    players: (req, res) => {
        
        const result = JSON.parse(fs.readFileSync(dataUrl))
        return res.render("players", {
            view: {
                result,
                imgPath: "/players_img/"
            }
        })
    },
    getMap: (req, res) => {

        // --- Borrar imágenes generadas anteriormente
        const dirPath = path.resolve(__dirname, "../../public/gen_img");
        const archivos = fs.readdirSync(dirPath);
    
        archivos.forEach((file) => {
            const filePath = path.join(dirPath, file);
    
            if(fs.statSync(filePath).isFile()){
                fs.unlinkSync(filePath);
            }
        })
    

        // --- Generar mapa
        //Ruta del script generador
        const script = path.resolve(__dirname, "../scripts/main.py")

        //Jugador
        const player_id = req.params.id;
        const player_name = JSON.parse(fs.readFileSync(dataUrl, "utf-8")).find(player => player.player_id == Number(player_id)).name

        //Ejecución del script
        exec(`python ${script} ${player_id}`, (error, stdout, stderror) => {
            if(error){
                console.log(`Hubo un error al ejecutar el script: ${error}`)
                return res.send("Hubo un error")
            }
            if(stderror){
                console.log(`Hubo un error al ejecutar el script: ${error}`)
                return res.send("Hubo un error")
            }  
            const filePath = stdout;

            return res.render("map", {
                        view: {
                            player_name,
                            filePath
                        }
                    })
            })
    }
}