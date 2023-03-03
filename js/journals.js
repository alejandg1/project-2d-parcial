$(document).ready(() => {
  $.ajax({
    type: "GET",
    url: "https://sga.unemi.edu.ec/api?a=apirevistas",
    beforeSend: () => {
      $("#loading").show();
      $("#journals").hide();
    },
    success: (data) => {
      data.forEach((element) => {
        tipo = element.tipo;
        nombre = element.nombre;
        enlace = element.enlace;
        if (element.enlace == false) {
          linea =
            "<tr><td>" + tipo + "</td><td>" + nombre + "</td><td></td></tr>";
        } else {
          linea = `<tr><td>${tipo}</td><td>${nombre}</td><td><a target ='blank' href='${enlace}' ><i class="fa fa-link"></i></a></td></tr>`;
        }
        $("#loading").hide();
        $("#journals").show();

        $(linea).appendTo("#dataTable tbody");
      });
      $("#dataTable").DataTable();
    },
  });
});
