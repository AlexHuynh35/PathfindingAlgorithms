class PriorityQueue {
    constructor(popSmallestFirst) {
        this.queue = [];
        this.popSmallestFirst = popSmallestFirst;
    }

    enqueue(weight, xPos, yPos) {
        this.queue.push(
            { w: weight, x: xPos, y: yPos }
        );
        if (this.popSmallestFirst) {
            this.queue.sort((a, b) => b.w - a.w);
        } else {
            this.queue.sort((a, b) => a.w - b.w);
        }
    }

    dequeue() {
        return this.queue.pop();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    emptyQueue() {
        this.queue = [];
    }

    updateWeight(weight, xPos, yPos) {
        let tile = this.queue.find(item => item.x === xPos && item.y === yPos);
        if (tile) {
            if (this.popSmallestFirst) {
                if (weight < tile.w) {
                    tile.w = weight;
                    this.queue.sort((a, b) => b.w - a.w);
                    return true;
                }
            } else {
                if (weight > tile.w) {
                    tile.w = weight;
                    this.queue.sort((a, b) => a.w - b.w);
                    return true;
                }
            }
        }
        return false;
    }
}