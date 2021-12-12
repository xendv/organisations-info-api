let DBManager = require('../database-api/dbAPI');
let CSVReader = require('../readers/csv.reader');
const fs = require("fs");

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
const token = "КЛЮЧ";

//const inn = "6950161416";
//"use strict";
class OrganisationsInfoAPI{
    getOrgInfoFromInnFile(INNFILENAME){
        let inns = CSVReader.getINNFromFile(INNFILENAME)
        console.log(inns)
        inns.forEach(inn => fillOrgInfo(inn))
    }
    makeBackups(){
        let DBM = new DBManager();
        DBM.makeBackUps();
    }
}
module.exports = OrganisationsInfoAPI

function fillOrgInfo(inn) {
    var fullQuery = {
        "query": inn,
        "branch_type": "MAIN"
    }
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify(fullQuery)
    }
    makeXHRRequest(options, url);
}


function makeXHRRequest(options, url){
    var xhr = new XMLHttpRequest();
    xhr.open(options.method, url, true);
    // set all headers
    for (var item in options.headers){
        xhr.setRequestHeader(item, options.headers[item]);
    }

    xhr.send(options.body);
    xhr.onload = () => {
        // print JSON response
        if (xhr.status >= 200 && xhr.status < 300) {
            // parse JSON
            const response = JSON.parse(xhr.responseText);
            processResponse(response.suggestions[0])
        }
    };
}

function processResponse(response){
    // for debug, but reduced
    console.log("ИНН "+response.data.inn);
    console.log("VALUE "+response.value);
    /*
    console.log("Короткое имя "+response.data.name.short_with_opf);
    console.log("ОКАТО "+response.data.okato);
    console.log("Адрес "+address);
    console.log("Почтовый индекс "+address.substr(0, address.indexOf(',')));
    console.log("--------------------------");
     */

    const address = response.data.address.unrestricted_value;
    /*const logString = `ИНН: ${response.data.inn}\n` +
        `НАЗВАНИЕ: ${response.value}\n`+
        `КОРОТКОЕ ИМЯ: ${response.data.name.short_with_opf}\n`+
        `ОКАТО: ${response.data.okato}\n`+
        `КОД РЕГИОНА: ${response.data.okato.substr(0, 2)}\n`+
        `АДРЕС: ${address}\n`+
        `ПОЧТОВЫЙ ИНДЕКС: ${address.substr(0, address.indexOf(','))}\n`+
        `--------------------------\n`;
    var fs = require("fs");
    fs.appendFile('./resources/log.txt', logString, function (err) {
        if (err) throw err;
        //console.log('Saved!');
    });*/

    let DBM = new DBManager();
    DBM.addOrgInfo(response.data);
}


