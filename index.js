const colors = require('colors');
const EOL = require('os').EOL;
const readline = require('readline-sync');
const Graph = require('./src/graph.class.js');
const utils = require('./src/utils');
const defaultInput = utils.readFile('./operation/graph.data.text');
const problem = utils.readFile('./operation/problem.list.text');

console.log(colors.cyan(`${problem}${EOL}`));

console.log(colors.red(`For the test input, the towns are named using the first few letters of the alphabet from A to D.  A route between two towns (A to B) with a distance of 5 is represented as AB5${EOL}`));
const GraphData = readline.question('the test input(default: ${defaultInput}): ', { defaultInput: defaultInput || '' });
console.log(colors.yellow(`Graph：${GraphData}`));

let data = utils.formatData(GraphData)
const myGraph = new Graph(data.list, data.nodes);

console.log(`${EOL}Expected Output:`);

// 1.The distance of the route A-B-C.
let result1 = myGraph.getSpecifiedPatDistance('A-B-C');
console.log(colors.green(`Output #1: ${result1.status ? result1.depth : result1.msg}`));

// 2.The distance of the route A-D.
let result2 = myGraph.getSpecifiedPatDistance('A-D');
console.log(colors.green(`Output #2: ${result2.status ? result2.depth : result2.msg}`));

// 3、The distance of the route A-D-C.
let result3 = myGraph.getSpecifiedPatDistance('A-D');
console.log(colors.green(`Output #3: ${result3.status ? result3.depth : result3.msg}`));

// 4、The distance of the route A-E-B-C-D.
let result4 = myGraph.getSpecifiedPatDistance('A-E-B-C-D');
console.log(colors.green(`Output #4: ${result4.status ? result4.depth : result4.msg}`));

// 5、The distance of the route A-E-D.
let result5 = myGraph.getSpecifiedPatDistance('A-E-D');
console.log(colors.green(`Output #5: ${result5.status ? result5.depth : result5.msg}`));

// 6、The number of trips starting at C and ending at C with a maximum of 3 stops.  In the sample data below, there are two such trips: C-D-C (2 stops). and C-E-B-C (3 stops).
let resultList6 = myGraph.destination('C', 'C', false);
let result6 = resultList6.filter(item => {
    return item.path.split('-').length <= 4;
})
console.log(colors.green(`Output #6: ${result6.length}`));

// 7、The number of trips starting at A and ending at C with exactly 4 stops.  In the sample data below, there are three such trips: A to C (via B,C,D); A to C (via D,C,D); and A to C (via D,E,B).
let resultList7 = myGraph.destination('A', 'C', false);
let result7 = resultList7.filter(item => {
    return item.path.split('-').length === 5;
})
console.log(colors.green(`Output #7: ${result7.length}`));

// 8、The length of the shortest route (in terms of distance to travel) from A to C.
let resultList8 = myGraph.destination('A', 'C', false);
let min8 = Infinity;
for (let i = 0; i < resultList8.length; i++) {
    if (resultList8[i].depth < min8) {
        min8 = resultList8[i].depth;
    }
}
console.log(colors.green(`Output #8: ${min8}`));

// 9、The length of the shortest route (in terms of distance to travel) from B to B.
let resultList9 = myGraph.destination('B', 'B', false);
let min9 = Infinity;
for (let i = 0; i < resultList9.length; i++) {
    if (resultList9[i].depth < min9) {
        min9 = resultList9[i].depth;
    }
}
console.log(colors.green(`Output #9: ${min9}`));

// 10、The number of different routes from C to C with a distance of less than 30.  In the sample data, the trips are: CDC, CEBC, CEBCDC, CDCEBC, CDEBC, CEBCEBC, CEBCEBCEBC.
let resultList10 = myGraph.destination('C', 'C', false);
let result10 = resultList10.filter(item => {
    return item.depth < 30;
})
console.log(colors.green(`Output #10: ${result10.length}`));