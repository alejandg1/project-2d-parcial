import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

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
        console.log(element);
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

function autoresUnicos(papers, grupo) {
  const nodes = [];
  let encontrado = false;
  papers.forEach((paper) => {
    //crea arreglo con los autores de cada paper
    const autores = Object.values(paper.autores);
    //itera en los autores para registrarlos en el arreglo de nodos+
    autores.forEach((autor) => {
      let node = { id: autor, group: grupo };
      //si no hay nodos, agrega uno
      if (nodes.length == 0) {
        nodes.push(node);
      } 
      //si hay nodos, verifica que no se repitan
      else {
        nodes.forEach((element) => {
          if (element.id == node.id) {
            encontrado = true;
          }
        });
        if (!encontrado) {
          nodes.push(node);
        }
        encontrado = false;
      }
    });
  });
  return nodes;
}

function detectCollaborations(papers) {
  let relaciones=[], links=[]
  let encontrado = false;
  papers.forEach((paper) => {
    //crea arreglo con los autores de cada paper
    let autores = Object.values(paper.autores);
    //itera en los autores para generar relaciones entre todos
    for (let i = 0; i < autores.length - 1; i++) {
      for (let j = i + 1; j < autores.length; j++) {
        const relacion = { source: autores[i], target: autores[j], value: 1 };
        relaciones.push(relacion)
        //si no hay relaciones, agrega una
        if (relaciones.length == 0) {
          relaciones.push(relacion);
        }
        //si hay relaciones, verifica que no se repitan
        else {
          relaciones.forEach((element) => {
            if ((element.source == relacion.source && element.target == relacion.target) || (element.target == relacion.source && element.source == relacion.target)) {
              element.value=element.value+1
              encontrado = true;
            }
          });
        }
        if(encontrado==false){
          relaciones.push(relacion);
          encontrado=false;
        }
        
      }
    } 
  });
  console.log(relaciones)
  relaciones.splice(0,1)
  return relaciones;
}

$("#areaconocimiento").change(() => {
  let collaborations = { nodes: [], links: [] };
  let area = $("#areaconocimiento").val();
  $.ajax({
    type: "GET",
    url: "https://sga.unemi.edu.ec/api?a=apigrupoautores&area=" + area,

    success: (data) => {
      console.log(data)
      $("#networks").empty();
      let nodos = autoresUnicos(data, area);
      collaborations.nodes = nodos;
      let links = detectCollaborations(data);
      collaborations.links = links
      let chart = ForceGraph(collaborations, {
        nodeId: (d) => d.id,
        nodeGroup: (d) => d.group,
        nodeTitle: (d) => `${d.id}\n${d.group}`,
        linkStrokeWidth: (l) => Math.sqrt(l.value),
        width: 1000,
        height: 800,
        //invalidation// a promise to stop the simulation when the cell is re-run
      });
      $(chart).appendTo("#networks");
      console.log(collaborations);
    },
  });
});


















// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/force-directed-graph
function ForceGraph({
  nodes, // an iterable of node objects (typically [{id}, …])
  links // an iterable of link objects (typically [{source, target}, …])
}, {
  nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
  nodeGroup, // given d in nodes, returns an (ordinal) value for color
  nodeGroups, // an array of ordinal values representing the node groups
  nodeTitle, // given d in nodes, a title string
  nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
  nodeStroke = "#fff", // node stroke color
  nodeStrokeWidth = 1.5, // node stroke width, in pixels
  nodeStrokeOpacity = 1, // node stroke opacity
  nodeRadius = 6, // node radius, in pixels
  nodeStrength,
  linkSource = ({source}) => source, // given d in links, returns a node identifier string
  linkTarget = ({target}) => target, // given d in links, returns a node identifier string
  linkStroke = "#999", // link stroke color
  linkStrokeOpacity = 0.6, // link stroke opacity
  linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
  linkStrokeLinecap = "round", // link stroke linecap
  linkStrength,
  colors = d3.schemeTableau10, // an array of color strings, for the node groups
  width = 540, // outer width, in pixels
  height = 300, // outer height, in pixels
  invalidation // when this promise resolves, stop the simulation
} = {}) {
  // Compute values.
  const N = d3.map(nodes, nodeId).map(intern);
  const LS = d3.map(links, linkSource).map(intern);
  const LT = d3.map(links, linkTarget).map(intern);
  if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
  const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
  const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
  const W = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);
  const L = typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);

  // Replace the input nodes and links with mutable objects for the simulation.
  nodes = d3.map(nodes, (_, i) => ({id: N[i]}));
  links = d3.map(links, (_, i) => ({source: LS[i], target: LT[i]}));

  // Compute default domains.
  if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

  // Construct the scales.
  const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

  // Construct the forces.
  const forceNode = d3.forceManyBody();
  const forceLink = d3.forceLink(links).id(({index: i}) => N[i]);
  if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
  if (linkStrength !== undefined) forceLink.strength(linkStrength);

  const simulation = d3.forceSimulation(nodes)
      .force("link", forceLink)
      .force("charge", forceNode)
      .force("center",  d3.forceCenter())
      .on("tick", ticked);

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  const link = svg.append("g")
      .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
      .attr("stroke-opacity", linkStrokeOpacity)
      .attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
      .attr("stroke-linecap", linkStrokeLinecap)
    .selectAll("line")
    .data(links)
    .join("line");

  const node = svg.append("g")
      .attr("fill", nodeFill)
      .attr("stroke", nodeStroke)
      .attr("stroke-opacity", nodeStrokeOpacity)
      .attr("stroke-width", nodeStrokeWidth)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("r", nodeRadius)
      .call(drag(simulation));

  if (W) link.attr("stroke-width", ({index: i}) => W[i]);
  if (L) link.attr("stroke", ({index: i}) => L[i]);
  if (G) node.attr("fill", ({index: i}) => color(G[i]));
  if (T) node.append("title").text(({index: i}) => T[i]);
  if (invalidation = null) invalidation.then(() => simulation.stop());

  function intern(value) {
    return value !== null && typeof value === "object" ? value.valueOf() : value;
  }

  function ticked() {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  }

  function drag(simulation) {    
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    
    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  return Object.assign(svg.node(), {scales: {color}});
}