'use strict';
const Stop = require('./stop.class');
const utils = require('./utils');

module.exports = class Graph {
    constructor(v, nodes) {
        this.nodes = nodes;
        // 边集合
        this.edges = this.initGraph(nodes); 
        // 所有边的权重之和
        this.maxWeight = 0; 
        this.result = [];
        this.initEdges(v);
    }

    /**
     * @desc 寻找路径
     * @param {string} from 起始顶点 t
     * @param {string} to 结束点
     * @param {boolean} one 是否不能重复
     */
    destination(from, to, one = false) {
        if(!utils.isString(from)){
            throw new Error('from not a string!');
        }

        if(!utils.isString(to)){
            throw new Error('to not a string!');
        }

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

    /**
     * @desc 递归遍历所有的可能的路径
     * @param {object} stop 起始站对象
     * @param {string} to 结束点
     * @param {boolean} one 是否不能重复 
     */
    reduce(stop, to, one) {
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

     /**
      * @desc 初始化二维数组
      * @param {array} nodes 顶点集合
      */
    initGraph(nodes) {
        if (!nodes || !utils.isArray(nodes)) {
            throw new Error('不是一个数组');
        }
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

     /**
      * @desc 添加某一个边
      * @param {string} v 起点
      * @param {string} w 终点
      * @param {number} value 权值
      */
    addEdge(v, w, value) {
        this.edges[v][w] = value;
    }

    /**
     * @desc 给 graph 加权重
     * @param {array} list 类似【'AB5', 'CE4'】这种格式的图数据
     */
    initEdges(list) {
        if (!list || !utils.isArray(list)) {
            throw new Error('不是一个数组');
        }
        list && list.forEach(item => {
            this.maxWeight += Number(item[2]);
            this.addEdge(item[0], item[1], Number(item[2]));
        })
    }

    /**
     * @desc 求指定路径(类似：A-B-C)的距离
     * @param {string} path 路径
     */
    getSpecifiedPatDistance(path) {
        if (!path || !utils.isString(path) || !utils.testInput(/^([a-zA-Z]-)+[a-zA-Z]$/, path)) {
            throw new Error('请输入正确的格式');
        }

        path = utils.tirm(path).split('-');

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

}