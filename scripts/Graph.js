class Graph {

  constructor() {
    this.vertices = []
    this.nodes = []
    this.adjacencyList = {}
    this.path = []
  }


  addNode(node) {
    this.vertices.push(node)
    this.nodes.push(node.id);
    this.adjacencyList[node.id] = [];
  }

  addEdge(node1, node2, weight) {
    this.adjacencyList[node1.id].push({node:node2.id, weight: weight});
    this.adjacencyList[node2.id].push({node:node1.id, weight: weight});
  }

  findPathWithDijkstra(startNode, endNode) {
    let times = {};
    let backtrace = {};
    let pq = new PriorityQueue();
    times[startNode] = 0;

    this.nodes.forEach(node => {
      if (node !== startNode) {
        times[node] = Infinity
      }
    });
    pq.enqueue([startNode, 0]);
    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue();
      let currentNode = shortestStep[0];
      this.adjacencyList[currentNode].forEach(neighbor => {
        let time = times[currentNode] + neighbor.weight;
        if (time < times[neighbor.node]) {
          times[neighbor.node] = time;
          backtrace[neighbor.node] = currentNode;
          pq.enqueue([neighbor.node, time]);
        }
      });
    }
    let path = [endNode];
    let lastStep = endNode;
    while(lastStep !== startNode && lastStep !== undefined) {
      path.unshift(backtrace[lastStep])
      lastStep = backtrace[lastStep]
    }

    this.path = path
    return `Path is ${path} and time is ${times[endNode]}`
  }

  show() {

    for (let i = 0; i < this.vertices.length; i++) {
      let point = this.vertices[i];
      stroke(255);
      text(i, point.x, point.y - 20)
      circle(point.x, point.y, 10);
      for (let j in this.adjacencyList) {
        let list = this.adjacencyList[j]
        for (let k = 0; k < list.length; k++) {
          // console.log(this.adjacencyList[j][k])
          let p2 = this.adjacencyList[j][k].node;
          p2 = this.vertices[p2];
          line(point.x, point.y, p2.x, p2.y)
          // line(point.x, point.y, point.x + 10, point.y + 10)
        }
      }
    }

    let previus = null;
    if (this.path) {
      for (let i = 0; i < this.path.length; i++) {
        let point = this.vertices[this.path[i]]
        if (!point) point = this.vertices[0]
        if (previus !== null) {
          if (i < 2)
            stroke(0, 255, 0);
          else
            stroke(255, 0, 0);
          circle(previus.x, previus.y, 20);
          line(previus.x, previus.y, point.x, point.y);
        }
        previus = point;
      }
      stroke(125, 125, 125);
      fill(125, 125, 125)
      circle(previus.x, previus.y, 20);
    }
  }
}