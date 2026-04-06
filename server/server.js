const express = require("express");
const fs = require("fs");
const axios = require("axios");

const app = express();
const config = require("./config.json");

app.use(express.json());

app.post("/publicar", async (req, res) => {

    const clave = req.headers["clave"]

    if (clave !== "1234") {
        return res.send("❌ No autorizado")
    }

    console.log("📦 Publicando juego...");

    try {
        const file = fs.readFileSync("juego.rbxl");

        await axios({
            method: "post",
            url: `https://apis.roblox.com/universes/v1/${config.UNIVERSE_ID}/places/${config.PLACE_ID}/versions?versionType=Published`,
            headers: {
                "x-api-key": config.API_KEY,
                "Content-Type": "application/octet-stream"
            },
            data: file
        });

        console.log("✅ Juego publicado");
        res.send("✅ Juego publicado");

    } catch (error) {
        console.log("❌ Error:", error.response?.data || error);
        res.send("❌ Error al publicar");
    }
});

app.listen(3000, () => {
    console.log("🚀 Servidor corriendo en puerto 3000");
});
