/** enviar a imaxe por whataapp */
function sendWhatsp() {
  const photoSrc = document.getElementById("foto").src;
  const data = document.getElementById("dataInput").value;
  if (!photoSrc) return;
  const whatsappUrl =
    "https://wa.me/?text=" + encodeURIComponent(data + " " + photoSrc);
  window.open(whatsappUrl, "_blank");
}

/** Envio de peticion para obtear a imaxe */
function sendData() {
  const shareButton = document.getElementById("whatsapp-share");
  const foto = document.getElementById("foto");
  const data = document.getElementById("dataInput").value;
  const modal = document.getElementById("myModal");

  if (data.length < 4 || data.length > 150) {
    return;
  }

  const btnBuscar = document.getElementById("btnBuscar");
  btnBuscar.disabled = true;
  //foto.setAttribute("src", barraCcarga);
  modal.style.display = "block";
  fetch("/getFlan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: data }),
  })
    .then((response) => response.text())
    .then((data) => {
      const datos = JSON.parse(data);

      // Extraer la URL
      const url = datos.data[0].url;
      btnBuscar.disabled = false;
      modal.style.display = "none";
      shareButton.style.display = "block";
      foto.setAttribute("src", url);
    })
    .catch((error) => {
      console.log(error);
      btnBuscar.disabled = false;
      modal.style.display = "none";
      shareButton.style.display = "block";
      foto.setAttribute("src", "error.png");
    });
}
