function publicar() {
    const estado = document.getElementById("estado")
    estado.innerText = "⏳ Publicando..."

    fetch("https://TU-SERVIDOR.com/publicar", {
        method: "POST",
        headers: {
            "clave": "1234"
        }
    })
    .then(res => res.text())
    .then(data => estado.innerText = data)
    .catch(() => estado.innerText = "❌ Error")
}
