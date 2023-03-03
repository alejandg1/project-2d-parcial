$(document).ready(() => {
  $.ajax({
    type: "GET",
    url: "https://sga.unemi.edu.ec/api?a=apitotales",
    beforeSend:()=>{
      $("#loading").show()
      $(".row").hide()
    },
    success: (data) => {
      tjournals = data.totalrevistas;
      tpapers = data.totalarticulos;
      tareas = data.totalareasconocimientos;
      tautores = data.totalautores;
      $("#totaljournals").html(tjournals);
      $("#totalareas").html(tareas);
      $("#totalresearchers").html(tautores);
      $("#totalpapers").html(tpapers);
      $("#loading").hide()
      $(".row").show()
    },
  });
});