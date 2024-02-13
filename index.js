const express = require("express")
const app = express();

const PORT = 3006;

const path = require("path");

app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "./src/views"))

const routes = require("./src/routes/map.routes")

app.use("/", routes)

app.listen(PORT, console.log(`Servidor corriendo en http://localhost:3006`))