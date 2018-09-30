var EventEmitter = require("events").EventEmitter;
var e = new EventEmitter();

e.on("start", function (error, result) {
    e.emit("done",null, result);
});

e.on("done", function (error, result) {
    console.log(`Result: ${result}`);
});

e.emit("start", null, 5)