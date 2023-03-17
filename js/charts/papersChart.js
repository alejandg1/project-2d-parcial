$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://sga.unemi.edu.ec/api?a=apitotalareapublicacion",
        data: {},
        success: function (data) {
            areas=[]
            valores=[]

            data.forEach(element => {
                area= element.area
                valor = element.totalarticulos

                areas.push(area);
                valores.push(valor);
            });
            graficAreas(areas,valores)

        }
    });
});


function graficAreas(areas, valores) {
 
    var ctx = document.getElementById("papers");
    console.log(valores)
    
    const data = {
    labels: areas,
    datasets: [{
    label: 'Total de areas',
    data: valores,
    fill: false,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

    const config = {
        type: 'horizontalBar',
        data,
        options: {
          legend: {
            display: false
        }
        }
      };

    var myLineChart = new Chart(ctx, config)

}
  
