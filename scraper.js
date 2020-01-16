const puppeteer = require('puppeteer');
const $ = require('cheerio');
const ObjectsToCsv = require('objects-to-csv');
const url = 'https://www.nectarsleep.com/faq';

let intentList = [{category: 'Category Path', 
				   question: 'Intent Name', 
				   variant: 'Visitor Questions',
				   answer: 'Response'}];

let questions = [];
let answers = [];
let newArray = [];

puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(function(html) {
    $('.togglesWrap_Zsi > article > p', html).each(function() {
      questions.push($(this).text());
      });
    $('.togglesWrap_Zsi > article > div > div', html).each(function() {
      answers.push($(this).text());
      });
    })
  	.then(function() {
  		for (var x = 0; x < questions.length; x++) {
	   	let thing = {
	   		question: questions[x],
	   		answer: answers[x]
	   	}
	   	newArray.push(thing);
	 }
	 intentList.push(...newArray);
	 console.log(intentList);
	 let csv = new ObjectsToCsv(intentList);
     csv.toDisk('./intent_list.csv');
  	})
  


