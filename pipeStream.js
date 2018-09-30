var request = require("request");
var s = request("http://www.pluralsight.com");
var fs = require('fs');

s.pipe(fs.createWriteStream("abc.html"));