var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape-all', function(req, res){

  //All the web scraping magic will happen here
  url = "http://comicastle.org/manga-list.html"
  
  request(url, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request
        if(!error){
            var comics = [];
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);
            $('span').each(function(i, elm){
                if( $(this).attr('data-toggle') == 'mangapop'){
                    var json = { title: "", link: ""};
                    var title = $(this).attr('data-original-title').toString();
                    var link = $(this).children().children().attr('href').toString();
                    json.title = title;
                    json.link = link;
                    comics.push(json);
                }
            });
            // Finally, we'll define the variables we're going to capture

        }

        fs.writeFile('output.json', JSON.stringify(comics, null, 4), function(err){
            console.log('File successfully written! - Check your project directory for the output.json file');
        })
        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!');
    });
})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;