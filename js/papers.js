$(document).ready(() => {
  $.ajax({
    type: "GET",
    url: "https://sga.unemi.edu.ec/api?a=apiarticulos",
    success: (data) => {
      data.forEach((element) => {
        nombre = element.nombre;
        revista = element.revista;
        anio=element.anio
        linea = "<tr><td>" + anio + "</td><td>" + revista + "</td></td><td>" + nombre + "</td></tr>";
        $(linea).appendTo("#dataTable tbody");
      });
      $("#dataTable").DataTable();
    },
  });
});
