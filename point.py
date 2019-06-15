import math


class Point():

	def __init__(self, x, y):
		self.x = x
		self.y = y


	def distance_to(self, p):
		x = p.x - self.x
		y = p.y - self.y
		x *= x
		y *= y

		return math.sqrt(x + y)