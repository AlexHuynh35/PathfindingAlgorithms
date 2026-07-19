class Pathfinding {
    constructor(width, height, heuristic) {
        this.startingGridInfo = new GridInfo(width, height);
        this.currentGridInfo = new GridInfo(width, height);
        this.heuristic = heuristic;
        this.pqueue = null;
        this.reachLast = false;
        this.foundPath = false;
        this.done = false;
        this.path = [];
    }

    getPathStart() {
        return this.startingGridInfo.getStart();
    }

    getPath() {
        return this.path;
    }

    getPathEnd() {
        return this.startingGridInfo.getEnd();
    }

    getStartingGrid() {
        return this.startingGridInfo.getGrid();
    }

    getCurrentGrid() {
        return this.currentGridInfo.getGrid();
    }

    resetCurrentGrid() {
        this.currentGridInfo.updateGridInfo(this.getPathStart(), this.getPathEnd(), this.getStartingGrid());
        this.pqueue = new MinPriorityQueue();
        this.reachLast = false;
        this.foundPath = false;
        this.done = false;
        this.path = [];
    }

    updateGrid(start, end, grid) {
        this.startingGridInfo.updateGridInfo(start, end, grid);
        this.currentGridInfo.updateGridInfo(start, end, grid);
    }

    getManhattan(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    getEuclidean(x1, y1, x2, y2) {
        return Math.hypot(x1 - x2, y1 - y2);
    }

    getHeuristic(x1, y1, x2, y2) {
        if (this.heuristic == 0) {
            return 0;
        } else if (this.heuristic == 1) {
            return this.getManhattan(x1, y1, x2, y2);
        } else {
            return this.getEuclidean(x1, y1, x2, y2);
        }
    }

    performFirstStep() {
        for (let i = 0; i < this.startingGridInfo.width; i++) {
            for (let j = 0; j < this.startingGridInfo.height; j++) {
                if (!this.startingGridInfo.getTile(i, j).getWall()) {
                    this.pqueue.enqueue(Infinity, this.getHeuristic(i, j, this.currentGridInfo.getEnd()[0], this.currentGridInfo.getEnd()[1]), i, j);
                }
            }
        }
        this.pqueue.updateWeight(0, this.startingGridInfo.startPos[0], this.startingGridInfo.startPos[1]);
    }

    performNextStep() {
        let tile = this.pqueue.dequeue();
        if (tile.g == Infinity) {
            this.foundPath = false;
            this.reachLast = true;
            return;
        }
        this.currentGridInfo.visitTile(tile.x, tile.y);
        if (tile.x == this.currentGridInfo.getEnd()[0] && tile.y == this.currentGridInfo.getEnd()[1]) {
            this.foundPath = true;
            this.reachLast = true;
            return;
        }
        if (tile.x < this.currentGridInfo.width - 1 && this.pqueue.updateWeight(tile.g + this.currentGridInfo.getTile(tile.x + 1, tile.y).getWeight(), tile.x + 1, tile.y)) {
            this.currentGridInfo.setPrevious(tile.x + 1, tile.y, tile.x, tile.y);
        }
        if (tile.x > 0 && this.pqueue.updateWeight(tile.g + this.currentGridInfo.getTile(tile.x - 1, tile.y).getWeight(), tile.x - 1, tile.y)) {
            this.currentGridInfo.setPrevious(tile.x - 1, tile.y, tile.x, tile.y);
        }
        if (tile.y < this.currentGridInfo.height - 1 && this.pqueue.updateWeight(tile.g + this.currentGridInfo.getTile(tile.x, tile.y + 1).getWeight(), tile.x, tile.y + 1)) {
            this.currentGridInfo.setPrevious(tile.x, tile.y + 1, tile.x, tile.y);
        }
        if (tile.y > 0 && this.pqueue.updateWeight(tile.g + this.currentGridInfo.getTile(tile.x, tile.y - 1).getWeight(), tile.x, tile.y - 1)) {
            this.currentGridInfo.setPrevious(tile.x, tile.y - 1, tile.x, tile.y);
        }
    }

    performLastStep() {
        if (this.foundPath) {
            let currentX = this.currentGridInfo.getEnd()[0];
            let currentY = this.currentGridInfo.getEnd()[1];
            this.path.push([currentX, currentY]);
            while (currentX != this.currentGridInfo.getStart()[0] || currentY != this.currentGridInfo.getStart()[1]) {
                let previous = this.currentGridInfo.getTile(currentX, currentY).getPrevious();
                currentX = previous[0];
                currentY = previous[1];
                this.path.push([currentX, currentY]);
            }
        }
        this.done = true;
    }
}
