# Dijkstra's and A* Simulation

**Link**: 

## Project Summary

This web app compares the Dijkstra's pathfinding algorithm with the A* algorithm. You can use the user interface to draw a map and pick a starting point and an ending point. Then, you can watch step-by-step how both algorithms navigate the map to get from the starting point to the ending point.

---

## How to Use

- Draw the map:
    - Select the type of tile (start, end, wall, increase cost, decrease cost, clear) and click on a square in the grid to place the tile at that square. Press the reset button if you want to draw a new map.
    - Walls are impassable tiles, meaning the algorithms won't path through them.
    - The cost of a tile is how expensive it is to pass through that tile. The algorithms will try to find the least expensive path possible.
- Save the map.
- Set the speed of the pathing animation.
- Press play to watch both algorithms try to find a path:
    - Blue tiles are tiles that the algorithm has visited during its search.
    - Teal tiles reveal the shortest path that the algorithm found.

---

## How it Works

If you want to understand how these algorithms work, check out this reading here: 