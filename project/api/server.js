const express = require('express');
const app = express();

const client = require('prom-client'); //alows me to use prom-client Objects

const register = client.register; //default register
const Counter =client.Counter; // counter metric-type 
const Gauge = client.Gauge; //  gauge metric-type 

const cInt = new Counter({

    name: 'simple_int_counter',
    help: 'inc by random an integer number',
    labelNames:['count', 'int']
});

const gInt = new Gauge({
	name: 'simple_int_gauge',
	help: 'random an integer number',
	labelNames: ['gauge', 'int']
});

const cFloat = new Counter({

    name: 'simple_float_counter',
    help: 'inc by random an float number',
    labelNames:['count', 'float']
    
});

const gFloat = new Gauge({
	name: 'simple_float_gauge',
	help: 'random a float number',
	labelNames: ['gauge', 'float']
});

gFloat.set(0);
gInt.set(0);
cFloat.inc(0);
cInt.inc(0);

var port = process.env.PORT || 8000;
var myrouter = express.Router();

//generates floating-point between low - high
function randomFloat(low, high) {
   return Math.random() * (high - low) + low
}
//generates random integer between low - high
 function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
}

app.use('/',myrouter);

myrouter.route('/randomFloat')
.get(function(req,res){

    var number = randomFloat(0,10)
    gFloat.set(number);
    cFloat.inc(number);
    res.json({
        "1":cFloat,
        "2":gFloat
    });
})

myrouter.route('/randomInt')
.get(function(req,res){

    var number = randomInt(0,1000)
    gInt.set(number);
    cInt.inc(number);
    res.json({
        "1":cInt,
        "2":gInt
    });
})

app.get('/metrics', (req, res) => {
	res.set('Content-Type', register.contentType);
	res.end(register.metrics());
});

app.listen(port,function(){
    console.log("my app is running on port " + port)
})