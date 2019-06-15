const MAX_POINTS = 5;
const CHANCE = 55;

var points = [];
var globalX = null,
    globalY = null;
var add = null;
var dijkstra = null;

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('canvas');
  for (let i = 0; i < MAX_POINTS; i++) {
    let x = Math.floor((Math.random() * 500) + 1);
    let y = Math.floor((Math.random() * 500) + 1);
    points.push(new Point(x, y, i));
  }

  connectAll()
  globalX = createInput('');
  globalY = createInput('');
  add = createButton('Adicionar');
  dijkstra = createButton('Calcular rota');
  add.mousePressed(addPoint)
  dijkstra.mousePressed(doDijkstra)
}

function draw() {
  background(0);
  stroke(255);

  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    let s = map(point.id, 0, points.length, 0, 100);
    let col = getColorForPercentage(s)
    text(i, point.x, point.y - 10)
    // if (i == 0) {
    // } else if (i == points.length - 1) {
    //   text('Fim', point.x, point.y - 10)
    // }
    fill(col.r, col.g, col.b);
    circle(point.x, point.y, 10);
    for (let j = 0; j < point.points.length; j++) {
      let p = points[i].points[j];
      line(points[i].x, points[i].y, p.x, p.y)
    }
    prevPoint = points[i];
  }
}

var doDijkstra = () => {
  console.log('doing')
  let matriz = new Array(points.length),
      matriz2 = new Array(points.length);
  for (let i = 0; i < matriz.length; i++) {
    matriz[i] = new Array(points.length);
    matriz2[i] = new Array(points.length);
  }
  console.log(matriz)
  console.log(matriz2)

  for (let i = 0; i < matriz.length; i++) {
    let p1 = points[i];
    console.log(p1)
    for (let j = 0; j < matriz.length; j++) {
      let p2 = points[j];
      let point = null;
      if (p1.points.includes(p2)) {
        point = p2;
      }
      matriz[i][j] = point;
      matriz2[i][j] = point;
    }
  }

  

  // algoritmo de Warshall
  for (let k = 0; k < matriz.length; k++) {
    for (let i = 0; i < matriz.length; i++) {
      if (matriz2[i][k]) {
        for (let j = 0; j < matriz.length; j++) {
          matriz2[i][j] = matriz2[i][j] || matriz2[k][j];
        }
      }
    }
  }


  console.log(matriz)
  console.log(matriz2)
}

var connectAll = () => {
  for (let i = 0; i < points.length; i++) {
    var p = points[i];
    p.points = []
    for (let j = 0; j < points.length; j++) {
      let canConnect = Math.floor((Math.random() * 100) + 1);
      let mp = points[j];
      if (mp !== p && canConnect < (100 * (CHANCE / 100))) {
        let d = p.distance_to(mp);
        p.points.push(mp);
        p.distance.push(d);
      }
    }

    if (p.points > points.length - 1) {
      for (let j = 0; j < 2; j++) {
        let id = Math.floor((Math.random() * points.length - 1) + 0);
        p.points.splice(id, 1);
        p.distance.splice(id, 1);
      }
    }

    if (p.points.length <= 0) {
      let id = Math.floor((Math.random() * points.length - 1) + 0);
      let d = p.distance_to(points[id]);
      p.points.push(points[id]);
      p.distance.push(d);
    }
  }
}

var percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];

var getColorForPercentage = function(pct) {
  for (var i = 1; i < percentColors.length - 1; i++) {
      if (pct < percentColors[i].pct) {
          break;
      }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
  var range = upper.pct - lower.pct;
  var rangePct = (pct - lower.pct) / range;
  var pctLower = 1 - rangePct;
  var pctUpper = rangePct;
  var color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
  };
  return color;
  // return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  // or output as hex if preferred
}

var addPoint = () => {
  console.log('here')
  console.log(points)
  let x = parseFloat(globalX.value());
  let y = parseFloat(globalY.value());
  points.push(new Point(x, y));
  connectAll()
}