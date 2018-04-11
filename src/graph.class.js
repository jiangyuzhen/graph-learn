'use strict';
const Stop = require('./stop.class');
const Untils = require('./untils');
const rightpad = require('rightpad');
const EOL = require('os').EOL;

module.exports = class Graph {
    constructor(v, nodes) {
        this.nodes = nodes;
        this.edges = this.initGraph(nodes); // 边集合
        this.maxWeight = 0; // 所有边的权重之和
        this.result = [];
        this.initEdges(v);
        // this.showGraph();
    }

    destination(from, to, one) {
        // from: 起始顶点 to: 结束点 one: 是否不能重复
        this.result = [];
        let fromStop = new Stop(from, null, this.edges[from]);

        let result = fromStop.avaliable(to);
        if (result !== false) {
            this.result.push(result);
        }
        this.reduce(fromStop, to, one);
        return this.result;
        process.exit(0);
    }

    reduce(stop, to, one) {
        // stop: 起始站 to: 结束点 one: 是否不能重复
        if (stop.node === to && one) {
            return;
        }
        if (stop.depth >= this.maxWeight) {
            return;
        }

        let from = stop.node;
        for (let k in this.edges[from]) {
            if (!this.edges[from][k]) {
                continue;
            }

            if (k === to && one) {
                continue;
            }

            let tmpStop = new Stop(k, stop, this.edges[k]);
            let result = tmpStop.avaliable(to);
            if (result !== false && result.depth <= this.maxWeight) {
                this.result.push(result);
            }
            this.reduce(tmpStop, to, one);
        }
    }

    initGraph(nodes) {
        // 初始化二维数组
        this.validationArray(nodes);
        let edges = [];
        nodes.forEach(item => {
            edges[item] = [];
            nodes.forEach(element => {
                if (item === element) {
                    edges[item][element] = 0;
                } else {
                    edges[item][element] = null;
                }
            });
        });
        return edges;
    }

    addEdge(v, w, value) {
        // 添加某一个边
        this.edges[v][w] = value;
    }

    initEdges(list) {
        // 
        this.validationArray(list);
        list && list.forEach(item => {
            this.maxWeight += Number(item[2]);
            this.addEdge(item[0], item[1], Number(item[2]));
        })
    }

    showGraph() {
        // 展示当前图的结构
        let nodes = this.nodes;
        let edges = this.edges;
        console.log('你输入的 graph 的结构如下:' )
        console.log(`备注：(null - 没有此路径; 0 - 自己到自己的距离)${EOL}`)
        nodes.forEach(item => {
            let str = rightpad(item, 8);
            nodes.forEach(element => {
                str += rightpad(edges[item][element], 8);
            })
            console.log(str);
        })
    }

    getSpecifiedPatDistance(path) {
        // 求指定路径(类似：A-B-C)的距离
        if (!path || !Untils.isString(path) || !Untils.testInput(/^([a-zA-Z]-)+[a-zA-Z]$/, path)) {
            throw new Error('请输入正确的格式');
        }

        path = Untils.tirm(path).split('-');

        let result = {
            status: true,
            msg: 'ok',
            depth: 0
        }

        for (let i = 1; i < path.length; i++) {
            let depth = this.edges[path[i - 1]][path[i]];
            if (!depth) {
                // 指定路线不存在
                result.status = false;
                result.msg = 'NO SUCH ROUTE';
                result.depth = null;
                break;
            }
            result.depth += depth;
        }

        return result;
    }

    validationArray(list) {
        if (!list || !Untils.isArray(list)) {
            throw new Error('不是一个数组');
        }
    }

}