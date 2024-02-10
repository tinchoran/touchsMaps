const express = require("express")

const app = express();

const PORT = 3006;
const path = require("path")
const fs = require("fs")
const { exec } = require("child_process")


//Scripts Path
const script = path.resolve(__dirname, "./src/scripts/main.py")

app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "./src/views"))

app.get("/", (req, res) => {

    const dirPath = path.resolve(__dirname, "./public/gen_img");
    const archivos = fs.readdirSync(dirPath);

    archivos.forEach((file) => {
        const filePath = path.join(dirPath, file);

        if(fs.statSync(filePath).isFile()){
            fs.unlinkSync(filePath);
        }
    })

    exec(script, (error, stdout, stderror) => {
        if(error){
            console.log(`Hubo un error al ejecutar el script: ${error}`)
            return res.send("Hubo un error")
        }
        if(stderror){
            console.log(`Hubo un error al ejecutar el script: ${error}`)
            return res.send("Hubo un error")
        }  
        const filePath = stdout;
        res.render("map", {
                view: {
                    filePath
                }
            })
    })

})

app.listen(PORT, console.log(`Servidor corriendo en http://localhost:3006`))