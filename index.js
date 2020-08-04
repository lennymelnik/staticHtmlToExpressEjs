var express = require('express');
var session = require('express-session');
var connect = require('connect');
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var nodeRequest = require('request')
var uniqid = require('uniqid')
var unzip = require('unzip')
var busboy = require('connect-busboy');


app = express()



app.use(busboy());

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));

});
const { exec } = require('child_process');

app.route('/upload')
    .post(function (req, res, next) {

        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            thisId = uniqid()
         

            fs.mkdirSync("files/"+thisId);
            fs.mkdirSync("files/"+thisId+"/extracted");
        
            filePath = __dirname + '/files/' +thisId +"/" + filename  
            fstream = fs.createWriteStream(filePath);
            fs.createReadStream(filePath).pipe(unzip.Extract({ path: __dirname + '/files/' +thisId +"/extracted" }));


            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
                res.redirect('back');           //where to go next
            });
        });
    });


app.get('/bruh', function (req, res) {
    
    app.use('/', express.static(path.join(__dirname +'/files/'+ req.query.id + '/extracted/')))

    res.sendFile(path.join(__dirname +'/files/'+ req.query.id + '/extracted/index.html'))
    
})
    
app.listen(8080)