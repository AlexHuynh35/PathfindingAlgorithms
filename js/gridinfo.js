class Tile {
    constructor() {
        this.weight = 1;
        this.wall = false;
        this.visited = false;
        this.xPrev = null;
        this.yPrev = null;
    }

    getWeight() {
        return this.weight;
    }

    getWall() {
        return this.wall;
    }

    getVisited() {
        return this.visited;
    }

    getPrevious() {
        return [this.xPrev, this.yPrev];
    }

    resetTile() {
        this.weight = 1;
        this.wall = false;
        this.visited = false;
        this.xPrev = null;
        this.yPrev = null;
    }

    updateTile(weight, wall) {
        this.weight = weight;
        this.wall = wall;
    }

    visitTile() {
        this.visited = true;
    }

    setPrevious(xPrev, yPrev) {
        this.xPrev = xPrev;
        this.yPrev = yPrev;
    }
}

class GridInfo {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.startPos = [0, 0];
        this.endPos = [width - 1, height - 1];
        this.grid = Array.from({ length: this.width }, () => Array.from({ length: this.height }, () => new Tile()));
    }


    getStart() {
        return this.startPos;
    }

    resetStart() {
        this.startPos = [0, 0];
    }

    updateStart(x, y) {
        this.startPos = [x, y];
    }


    getEnd() {
        return this.endPos;
    }

    resetEnd() {
        this.endPos = [width - 1, height - 1];
    }

    updateEnd(x, y) {
        this.endPos = [x, y];
    }


    getTile(x, y) {
        return this.grid[x][y];
    }

    resetTile(x, y) {
        this.grid[x][y].resetTile();
    }

    updateTile(x, y, weight, wall) {
        this.grid[x][y].updateTile(weight, wall);
    }

    visitTile(x, y) {
        this.grid[x][y].visitTile();
    }

    setPrevious(x, y, xPrev, yPrev) {
        this.grid[x][y].setPrevious(xPrev, yPrev);
    }


    getGrid() {
        return this.grid;
    }

    resetGrid() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.resetTile(i, j);
            }
        }
    }

    updateGrid(grid) {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.resetTile(i, j);
                this.updateTile(i, j, grid[i][j].weight, grid[i][j].wall);
            }
        }
    }


    resetGridInfo() {
        this.resetStart();
        this.resetEnd();
        this.resetGrid();
    }

    updateGridInfo(start, end, grid) {
        this.updateStart(start[0], start[1]);
        this.updateEnd(end[0], end[1]);
        this.updateGrid(grid);
    }
}