$(document).ready(() => {
  $.ajax({
    type: "GET",
    url: "https://sga.unemi.edu.ec/api?a=apiinvestigadores",
    beforeSend: () => {
      $("#onload").show();
      $("#content").hide();
    },
    success: (data) => {
      data.forEach((element) => {
        mail = element.correoinstitucional;
        nombre = element.nombrecompleto;
        orcid = element.orcid;
        linea =
          "<tr><td>" +
          nombre +
          "</td><td><a target='_blank' href='mailto:''" +
          mail +
          "'>" +
          mail +
          "</td><td><a target='_blank' href='" +
          orcid +
          "'><i class='fa fa-link'></i></a></td></tr>";
        $(linea).appendTo("#dataTable tbody");
        
      });
      $("#onload").hide();
      $("#content").show();
      $("#dataTable").DataTable();
    },
  });
});
