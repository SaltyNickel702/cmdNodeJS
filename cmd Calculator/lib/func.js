const sum = (...data) => {
	var s = 0;
	for (let i = 0; i < data.length; i++) {
		s+=data[i]
	}
	return s;
}
const mean = (...data) => sum(...data)/data.length;
const stdDev = (...data) => {
	var m = mean(...data);
	
	var s = 0;
	for (let i = 0; i < data.length; i++) {
		s+= Math.pow(data[i]-m,2);
	}
	
	return Math.sqrt(s/data.length);
}
const sampleStdDev = (...data) => {
	var m = mean(...data);
	
	var s = 0;
	for (let i = 0; i < data.length; i++) {
		s+= Math.pow(data[i]-m,2);
	}
	
	return Math.sqrt(s/(data.length - 1));
}


module.exports = {
	mathF: {
		sum,
		mean,
		stdDev,
		sampleStdDev
	}
}