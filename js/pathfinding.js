class Pathfinding {
    constructor(width, height) {
        this.startingGridInfo = new GridInfo(width, height);
        this.currentGridInfo = new GridInfo(width, height);
    }

    getPathStart() {
        return this.startingGridInfo.getStart();
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
    }

    updateGrid(start, end, grid) {
        this.startingGridInfo.updateGridInfo(start, end, grid);
        this.currentGridInfo.updateGridInfo(start, end, grid);
    }

    performFirstStep() { }

    performNextStep() { }

    performLastStep() { }
}

class Dijkstras extends Pathfinding {
    constructor(width, height) {
        super(width, height);
        this.pqueue = null;
        this.foundPath = false;
        this.done = false;
        this.path = [];
    }

    resetCurrentGrid() {
        super.resetCurrentGrid();
        this.pqueue = new PriorityQueue(true);
        this.foundPath = false;
        this.done = false;
        this.path = [];
    }

    performFirstStep() {
        for (let i = 0; i < this.startingGridInfo.width; i++) {
            for (let j = 0; j < this.startingGridInfo.height; j++) {
                if (!this.startingGridInfo.getTile(i, j).getWall()) {
                    this.pqueue.enqueue(Infinity, i, j);
                }
            }
        }
        this.pqueue.updateWeight(0, this.startingGridInfo.startPos[0], this.startingGridInfo.startPos[1]);
    }

    performNextStep() {
        let tile = this.pqueue.dequeue();
        if (tile.w === Infinity) {
            this.foundPath = false;
            this.done = true;
            return;
        }
        this.currentGridInfo.visitTile(tile.x, tile.y);
        if (tile.x === this.currentGridInfo.getEnd()[0] && tile.y === this.currentGridInfo.getEnd()[1]) {
            this.foundPath = true;
            this.done = true;
            return;
        }
        if (tile.x < this.currentGridInfo.width - 1 && this.pqueue.updateWeight(tile.w + this.currentGridInfo.getTile(tile.x + 1, tile.y).getWeight(), tile.x + 1, tile.y)) {
            this.currentGridInfo.setPrevious(tile.x + 1, tile.y, tile.x, tile.y);
        }
        if (tile.x > 0 && this.pqueue.updateWeight(tile.w + this.currentGridInfo.getTile(tile.x - 1, tile.y).getWeight(), tile.x - 1, tile.y)) {
            this.currentGridInfo.setPrevious(tile.x - 1, tile.y, tile.x, tile.y);
        }
        if (tile.y < this.currentGridInfo.height - 1 && this.pqueue.updateWeight(tile.w + this.currentGridInfo.getTile(tile.x, tile.y + 1).getWeight(), tile.x, tile.y + 1)) {
            this.currentGridInfo.setPrevious(tile.x, tile.y + 1, tile.x, tile.y);
        }
        if (tile.y > 0 && this.pqueue.updateWeight(tile.w + this.currentGridInfo.getTile(tile.x, tile.y - 1).getWeight(), tile.x, tile.y - 1)) {
            this.currentGridInfo.setPrevious(tile.x, tile.y - 1, tile.x, tile.y);
        }
    }

    performLastStep() {
        let currentX = this.currentGridInfo.getEnd()[0];
        let currentY = this.currentGridInfo.getEnd()[1];
        this.path.push([currentX, currentY]);
        while (currentX != this.currentGridInfo.getStart()[0] || currentY != this.currentGridInfo.getStart()[1]) {
            var previous = this.currentGridInfo.getTile(currentX, currentY).getPrevious();
            currentX = previous[0];
            currentY = previous[1];
            this.path.push([currentX, currentY]);
        }
    }

    getPath() {
        return this.path;
    }
}

class Astar extends Pathfinding {
    constructor(width, height) {
        super(width, height);
    }

    performFirstStep() { }

    performNextStep() { }

    performLastStep() { }
}