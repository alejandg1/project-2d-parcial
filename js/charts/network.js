// import { link } from "d3";
// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// const { link } = require("d3");

$(document).ready(() => {
  $("#areaconocimiento").empty().append('<option value="0">All</option>');
  $.ajax({
    type: "GET",
    url: "https://sga.unemi.edu.ec/api?a=apiareasconocimiento",
    beforesend: () => {
      $("#onload").show();
      $("#content").hide();
    },
    success: (data) => {
      data.forEach((element) => {
        let number = element.codigo,
          option = element.nombre,
          insert = "<option value=" + number + ">" + option + "</option>";
        $(insert).appendTo("#areaconocimiento");
      });
      $("#onload").hide();
      $("#content").show();
    },
    error: () => {
      alert("error");
    },
  });
});

function getAuthorRelations(names) {
  const pairs = [];
  for (let i = 0; i < names.length; i++) {
    for (let j = i + 1; j < names.length; j++) {
      pairs.push([names[i], names[j]]);
    }
  }

  const relations = pairs.map((pair) => {
    return { source: pair[0], target: pair[1], value: 1 };
  });

  return relations;
}

$("#areaconocimiento").change(() => {
  let collaborations = { nodes: [], links: [] };
  let area = $("#areaconocimiento").val();
  $.ajax({
    type: "GET",
    url: "https://sga.unemi.edu.ec/api?a=apigrupoautores&area=" + area,

    success: (data) => {
      data.forEach((publicacion) => {
        let autores = Object.values(publicacion.autores);
        autores.forEach((autor) => {
          let newNode = { id: autor, group: area };
          if (!collaborations.nodes.includes(newNode)) {
            collaborations.nodes.push(newNode);
          }
        });
      });
      console.log(collaborations);
    },
  });
  // $(chart).appendTo("#networks");
});
