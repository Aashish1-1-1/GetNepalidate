const axios = require('axios');
const { JSDOM } = require('jsdom');
const fs = require('fs')

const url = "https://hamropatro.com/date/today";
const date = new Date();
const day = date.getDate()

const path = './store.json'

fs.readFile(path, 'utf8', (err, file) => {

  if (err) {
    console.error('Error while reading the file:', err)
  return
  }
  try {
    const data = JSON.parse(file)
    const pastdate=data[0].English;
    if(day - pastdate!= 0){ 
        axios.get(url)
                .then(response => {
                    const fetchedHTMLContent = response.data;
        
                    const dom = new JSDOM(fetchedHTMLContent);
        
                    const document = dom.window.document;
        
                    const extractedHeading = document.querySelector('.nep');
                    const newjson=[
                        {
                          "English":day,
                          "Nepali":extractedHeading.innerHTML
                        }
                      ]
                    fs.writeFile(path,JSON.stringify(newjson),function (err){
                        if(err){
                          return console.log(err)
                    }
                     })
                    console.log(extractedHeading.innerHTML)
                })
                .catch(err => {
                    console.log('Failed to fetch the page:', err);
                });
    }
    else{
      console.log(data[0].Nepali);
    }
  } catch (err) {
    console.error('Error while parsing JSON data:', err)
  }
})


