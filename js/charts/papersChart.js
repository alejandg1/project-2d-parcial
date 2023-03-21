$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "https://sga.unemi.edu.ec/api?a=apitotalareapublicacion",
    data: {},
    success: function (data) {
      areas = [];
      valores = [];

      data.forEach((element) => {
        area = element.area;
        valor = element.totalarticulos;

        areas.push(area);
        valores.push(valor);
      });
      graficAreas(areas, valores);
    },
  });
});

function graficAreas(areas, valores) {
  var ctx = document.getElementById("papersChart");
  console.log(valores);

  const data = {
    labels: areas,
    datasets: [
      {
        label: "total areas ",
        data: valores,
        fill: false,
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
            'rgb(41, 40, 122)',
            'rgb(66, 65, 198)',
            'rgb(46, 162, 240)',
            'rgb(75, 192, 192)',
            'rgb(82, 72, 112)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "horizontalBar",
    data,
    options: {
      legend: {
        display: true,
      },
    },
  };

  var myLineChart = new Chart(ctx, config);
}
