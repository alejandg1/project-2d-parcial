$(document).ready(() => {
  $.ajax({
    type: "GET",
    url: "https://sga.unemi.edu.ec/api?a=apitotaltiporevista",
    data: {},
    success: (data) => {
      tipo = Object.keys(data);
      valor = Object.values(data);
      graficarBase(tipo, valor);
    },
  });
});

graficarBase = (tipo, valor) => {
  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: tipo,
      datasets: [
        {
          data: valor,
          backgroundColor: ["#4e73df", "#1cc88a"],
          hoverBackgroundColor: ["#2e59d9", "#17a673"],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: "#dddfeb",
        borderWidth: 2,
        yPadding: 15,
        xPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: true,
      },
      cutoutPercentage: 80,
    },
  });
};
