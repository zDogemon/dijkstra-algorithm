const VERTICES = 25;

var graph = null;
var globalX = null;
var globalY = null;
var add = null;
var dijkstraButton = null;

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('canvas');

  graph = new Graph();

  let points = []
  for (let i = 0; i < VERTICES; i++) {
    let x = Math.floor((Math.random() * width) + 1);
    let y = Math.floor((Math.random() * width) + 1);
    points.push(new Point(x, y, i))
    graph.addNode(points[i]);
  }

  for (let i = 0; i < VERTICES; i++) {
    for (let j = i + 1; j < VERTICES; j++) {
      if (Math.floor((Math.random() * 100) + 1) > 95) {
        graph.addEdge(points[i], points[j], points[i].distance_to(points[j]))
      }
    }
  }

  // graph.addNode(p2.id);
  // graph.addNode(p1.id);
  // graph.addNode(p3.id)
  // graph.addEdge(p1.id, p2.id, p1.distance_to(p2));
  // graph.addEdge(p2.id, p3.id, p2.distance_to(p3));
  // console.log(points[VERTICES -])
  console.log(graph)
  console.log(graph.findPathWithDijkstra(points[0].id, points[VERTICES - 1].id))
  globalX = createInput('');
  globalY = createInput('');
  add = createButton('Adicionar');
  dijkstraButton = createButton('Calcular rota');
  add.mousePressed(addPoint)
  // dijkstraButton.mousePressed(dodijkstraButton)
}

function draw() {
  background(0);
  stroke(255);
  fill(255)
  graph.show()
}

var addPoint = () => {
  console.log('here')
  // console.log(points)
  // let x = parseFloat(globalX.value());
  // let y = parseFloat(globalY.value());
  // points.push(new Point(x, y));
  // connectAll()
}