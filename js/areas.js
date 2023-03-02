$(document).ready(() => {
  $.ajax({
    type: "GET",
    url: "https://sga.unemi.edu.ec/api?a=areaconocimiento",
    success: (data) => {
      let info = data.areasconocimiento;

      info.forEach((element) => {
        id = element.id;
        nombre = element.nombre;
        linea = "<tr><td>" + id + "</td><td>" + nombre + "</td></tr>";
        $(linea).appendTo("#dataTable tbody");
      });
      $("#dataTable").DataTable();
    },
  });
});