const scrapeLinks = require("./index");
const http = require("node:http");

const server = http.createServer(async (req, res) => {
    res.writeHead(200, { "Content-type": "text/html"});
    
    let html = "<h1>AEC MCA Results</h1>";
    scrapeLinks()
        .then(data => {        
            data.forEach((e) => {
                html += `<p style="font: Arial"><a href="${e.link}">${e.name}</a></p>`;
            });
        })
        .finally(() => res.end(html))
})

server.listen(3000, () => {
    console.log("Server running on port 3000");
})