$(document).ready(function () {
  $.ajax({
      type: "GET",
      url: "https://sga.unemi.edu.ec/api?a=apitotaltiporevista",
      data: {},
      success: function (data) {
          tipo = Object.keys(data)
          valor = Object.values(data)
          graficarBase(tipo, valor)
      }
  });
});

function graficarBase(tipo, valor) {
  
var ctx = document.getElementById("myPieChart")
var myPieChart= new Chart(ctx, {
  type: 'doughnut',
  data: {
      labels: tipo,
      datasets: [{
        label: valor,
        data: valor,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    },

    options: {
      maintainAspectRatio: false,
      tooltips: {

        borderWidth: 5,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: true
      },
      cutoutPercentage: 0,
    },

} 
)

  

}
