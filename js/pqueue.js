class MinPriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(gWeight, hWeight, xPos, yPos) {
        this.queue.push(
            { g: gWeight, h: hWeight, x: xPos, y: yPos }
        );
        this.queue.sort((a, b) => {
            return ((b.g + b.h) - (a.g + a.h)) || (b.h - a.h);
        });
    }

    dequeue() {
        return this.queue.pop();
    }

    isEmpty() {
        return this.queue.length == 0;
    }

    emptyQueue() {
        this.queue = [];
    }

    updateWeight(gWeight, xPos, yPos) {
        let tile = this.queue.find(item => item.x == xPos && item.y == yPos);
        if (tile) {
            if (gWeight < tile.g) {
                tile.g = gWeight;
                this.queue.sort((a, b) => {
                    return ((b.g + b.h) - (a.g + a.h)) || (b.h - a.h);
                });
                return true;
            }
        }
        return false;
    }
}