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

    performNextStep() { }
}

class Dijkstras extends Pathfinding {
    constructor(width, height) {
        super(width, height);
    }

    performNextStep() { }
}

class Astar extends Pathfinding {
    constructor(width, height) {
        super(width, height);
    }

    performNextStep() { }
}