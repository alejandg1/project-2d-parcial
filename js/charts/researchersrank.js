$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "https://sga.unemi.edu.ec/api?a=apirankingautorespublicacion",
    data: {},
    success: function (data) {
      nombres = [];
      valores = [];

      data.forEach((element) => {
        nombre = element.autor;
        valor = element.totalarticulos;

        nombres.push(nombre);
        valores.push(valor);
      });

      grafico(nombres, valores);
    },
  });
});

function grafico(nombres, valores) {
  var ctx = document.getElementById("resear");

  var myLineChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: nombres,
      datasets: [
        {
          label: "total articles per researcher",
          data: valores,
          backgroundColor: [
            "rgb(41, 40, 122,0.2)",
            "rgb(66, 65, 198,0.2)",
            "rgb(46, 162, 240,0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgb(82, 72, 112,0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(41, 40, 122)",
            "rgb(66, 65, 198)",
            "rgb(46, 162, 240)",
            "rgb(75, 192, 192)",
            "rgb(82, 72, 112)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      legend: {
        display: true,

      }
    },
  });
}
