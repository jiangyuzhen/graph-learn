'use strict';

module.exports = class Stop {
    constructor(node, prev, next) {
        this.node = node;
        this.prev = prev;

        this.next = next || [];

        this.path = `${(prev && prev.path ? prev.path + '-' : '')}${node}`;
        this.depth = (prev) ? prev.depth + prev.next[node] : 0;
    }

    avaliable(node) {
        if (this.next[node]) {
            return {
                path: `${this.path}-${node}`,
                depth: this.depth + this.next[node]
            };
        }
        return false;
    }
}