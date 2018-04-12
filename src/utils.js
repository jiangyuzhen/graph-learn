'use strict';
const fs = require('fs')
const path = require('path')

// 内部函数, 用于判断对象类型
function _getClass(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

function isString(obj) {
    return _getClass(obj).toLowerCase() === 'string';
}

function isArray(obj) {
    return _getClass(obj).toLowerCase() === 'array';
}

function tirm(string) {
    if (!isString(string)) {
        throw new Error('不是一个字符串');
    }
    return string.replace(/\s/g, "");
}

function testInput(regex, str) {
    if (!isString(str)) {
        throw new Error('不是一个字符串');
    }
    return regex.test(str);
}

function readFile(filePath){
    filePath = path.resolve(filePath);
    if(!fs.existsSync(filePath)){
        throw new Error(`${filePath} no exist!`);
    }
    return fs.readFileSync(filePath).toString();
}

/**
 * @desc 格式化输入
 * @param {string} data 
 */
function formatData(data) {
    if(!data || !isString(data)){
        throw new Error('请输入正确的格式');
    }
    const regex = /^[a-zA-Z]{2}[0-9]$/;
    const list = tirm(data).split(',');
    let nodes = [];
    let edges = [];
    list && list.forEach( element => {
        if(!testInput(regex, element)){
            throw new Error(`输入的数据中，${element} 格式不对，请检查！`);
        };
        for(let i = 0; i < element.length; i++){
            if(nodes.indexOf(element[i]) === -1 && testInput(/^[a-zA-Z]$/, element[i])){
                nodes.push(element[i])
            };
        }
    });
    nodes = nodes.sort()
    return {list, nodes};   
}


module.exports = { isString, isArray, tirm, testInput, formatData, readFile };