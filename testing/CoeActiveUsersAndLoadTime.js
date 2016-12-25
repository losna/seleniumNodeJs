/*
* Record Active Sessions on servers courses, crss, c1, c2, c3, c4 and c5 and Load time for COE CE, NOnCE Generated and NonCE Standalone
*/

"use strict";

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();
var server = "c1";

function findCourseWrapper() {
	return browser.findElements(webdriver.By.id('main')).then(function(result) {
		return result[0];
	});
}

function recordLoadTime() {
	console.log("Course Load Time: ", Date.now()-timerStart);
}

function openC3SessionTrackingLocation() {
	browser.get('http://' + server + '.learninglibrary.com/lmsdeploy/course/what/0');
	browser.wait(findActiveSessionsNumber, 15000)
		.then(recordActiveSessions);
}

function findActiveSessionsNumber() {
	return browser.findElements(webdriver.By.tagName('body')).then(function(result) {
		return result[0];
	});
}

function recordActiveSessions() {
	browser.findElement(webdriver.By.tagName('body')).getText().then(function(bodyText) {
		if(server == "courses"){
			console.log(bodyText.split('\n')[9]);
		}else{
    		console.log(bodyText.split('\n')[10]);
		}
	});
}

function handleFailure(err) {
	console.error('Something went wrong\n', err.stack, '\n');
	closeBrowser();
}

function closeBrowser() {
	browser.quit();
}

browser.get('http://' + server + '.learninglibrary.com/LMSDeploy/Course/GetCourse/NARCodeofEthicsV2__451816/1446/d9852d73c2364df6a892cd7b464b5e89/COENonCEV2Html/451816/274/0');
var timerStart = Date.now();
browser.wait(findCourseWrapper, 15000)
	.then(recordLoadTime)
	.then(openC3SessionTrackingLocation)
	.then(closeBrowser, handleFailure);

