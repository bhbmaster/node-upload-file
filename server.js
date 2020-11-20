const http = require('http')
const formidable = require('formidable')
const fs = require('fs')
const hostname = "localhost"
const port = 50123

const data = fs.readFile("index.html", 'utf8', (err, data) => {
    if (err) { 
        console.error("error reading: ", err)
        return
    }
    //console.log(dt)

    const server = http.createServer((req,res) => {
        console.log("request",req.method)
        if ( req.url == "/fileupload" && req.method == "POST") {
            //console.log("we uploading!")
            const form = new formidable.IncomingForm()
            form.parse(req, (err, fields, files) => {
                if (files.filePath == undefined){
                    console.log("File not provided")
                    return
                }
                var oldpath = files.filePath.path;
                var newpath = "uploaded.file"
                console.log(`File uploaded to ${oldpath}`)
                console.log(`Moving to ${newpath}`)
                fs.rename(oldpath,newpath, (err)=>{if (err) {console.log("Move failed");}
                console.log("Move Successful - file upload complete")
                res.write(`File uploaded to ${oldpath} --> ${newpath}`)
                res.end()
                })
            })
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(data)
    })

    //return data
    server.listen(port, hostname, () => console.log(`Server running on http://${hostname}:${port}/`))

})



