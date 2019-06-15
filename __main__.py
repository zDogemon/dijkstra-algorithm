from point import Point
from dijkstra import Dijkstra
from grafo import Grafo

if __name__ == "__main__":
  point1 = Point(10, 10)
  point2 = Point(20, 20)

  print("Distance: {}".format(point1.distance_to(point2)))