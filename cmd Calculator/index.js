const { mathF } = require('./lib/func');
const prompt  = require('prompt-sync')()

function input (msg,exc = inp => {}) {
	if (msg) console.log(msg);
	var inp = prompt('> ')
	exc(inp);
	console.log('')
}

const FUNC = {};
function addFunc (name,exc = (args) => {},dataType = String, description) {
	if (typeof name == 'string') {name = [name]};
	name.forEach(v => {FUNC[v] = {exc,dataType,group:name[0],description};})
}


addFunc('exit',() => {running = false}, String);
addFunc('help',() => {
	console.log('List of Functions:')
	var f = {};
	for (var key in FUNC) {
		var v = FUNC[key];
		f[v.group] ||= [];
		f[v.group].push(key);
	}
	for (var key in f) {
		var text = '  ' + f[key].join(', ');
		var des = FUNC[key].description;
		if (des) {
			text = `${text}\n    ${des}`
		}
		console.log(text);
	}
})
addFunc('store',(args) => {
	var func = FUNC[args[0]];
	if (!func) {
		variables[args[0]] = args[1] ? Number(args[1]) : variables.ans;
	} else {
		console.error('Functions cannot be overwritten');
	}
}, String)
addFunc('recall',(args) => {return args[0]},String)

addFunc('add', (args) => {return args[0] + args[1]}, Number);
addFunc(['subtract','sub'], (args) => {return args[0] - args[1]}, Number);
addFunc(['multiply','mult'], (args) => {return args[0] * args[1]}, Number);
addFunc(['divide','div'], (args) => {return args[0] / args[1]}, Number);

addFunc(['exponent','power','exp'], (args) => {return Math.pow(args[0],args[1])},Number);
addFunc('sqrt', (args) => {return Math.sqrt(args[0])},Number);
addFunc('nthRoot', (args) => {return Math.pow(args[0],1/args[1])},Number);

addFunc('mean', (args) => {return mathF.mean(...args)}, Number);

addFunc('stdDev', (args) => {return mathF.stdDev(...args)}, Number);
addFunc('variance', (args) => {return Math.pow(mathF.stdDev(...args),2)},Number);
// addFunc('zScore', (args) => {return (args[0]-args[1])/args[2]},Number);

addFunc('sampleStdDev', (args) => {return mathF.sampleStdDev(...args)}, Number);
addFunc('sampleVariance', (args) => {return Math.pow(mathF.sampleStdDev(...args),2)},Number);



var running = true;
const variables = {
	ans: undefined,
}
while (running) {
	input('',(inp) => {
		//Parser
		var args = inp.split(/[(,)]/g);
		if (!args[args.length-1]) args.pop();
		var funcName = args.shift();//.toLowerCase()
		if (args[0]) args[0].split(',');
		
		var func = FUNC[funcName];
		if (!func) {console.error(`${funcName} is not a recognized command`); return;};
		args.forEach((v,i) => {
			args[i] = variables[v] ?? func.dataType(v);
		})
		try {
			var val = func.exc(args);
			if (val) {
				console.log(val);
				variables.ans = val;
			}
		} catch (err) {
			console.error(err);
		}
	})
}