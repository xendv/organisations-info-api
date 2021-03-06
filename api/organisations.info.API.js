let DBManager = require('../database-api/dbAPI');
let CSVReader = require('../readers/csv.reader');

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
const token = "КЛЮЧ";

let DBM = new DBManager();
let counter = 0;
let inns;
let timerID;

class OrganisationsInfoAPI{

    getInnsFromFile(INNFILENAME){
        let inns = CSVReader.getINNFromFile(INNFILENAME);
        console.log("--------------------------\n" +
            "\tINNs from file:\n" + inns +
            "\n--------------------------\n");
        return inns;
    }

    getOrgInfoFromInnFile(INNFILENAME){
        inns = this.getInnsFromFile(INNFILENAME)
        timerID = setInterval(fillOrgInfo, 200);
    }

    getOneOrgInfoFromAPI(inn){
        let info = getOrgInfo(inn);
    }

    makeBackups(){
        DBM.makeBackUps();
    }

    getRegionsStatistics(){
        DBM.getRegionsStatistics(rows => {
            console.log(rows);
        });
    }

    async getRegionInfo(name){
        return await DBM.getRegionsStatistics(name)
    }

    async getTotalCount(){
        return await DBM.getTotalCount()
    }
}
module.exports = OrganisationsInfoAPI

function getOrgInfo(inn){
    return makeXHRRequest(makeQueryOptionsToAPI(inn), url, 'getOrgInfo');
}

function fillOrgInfo() {
    if (counter === inns.length-1) clearInterval(timerID);
    else makeXHRRequest(makeQueryOptionsToAPI(inns[counter]), url, 'addToDB');
}

function makeQueryOptionsToAPI(inn){
    var fullQuery = {
        "query": inn,
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
    return options;
}


async function makeXHRRequest(options, url, onResult) {
    var xhr = new XMLHttpRequest();
    xhr.open(options.method, url, true);
    // set all headers
    for (var item in options.headers) {
        xhr.setRequestHeader(item, options.headers[item]);
    }

    xhr.send(options.body);

    counter++;

    xhr.onload = () => {
        // print JSON response
        if (xhr.status >= 200 && xhr.status < 300) {
            // parse JSON
            const response = JSON.parse(xhr.responseText);
            return processResponse(response.suggestions[0], onResult)
        }
    };
}

function processResponse(response, onResult){
    // for debug, but reduced
    console.log("ИНН "+response.data.inn);
    console.log("VALUE "+response.value);

    switch (onResult) {
        case 'getOrgInfo':
            logOrgInfoToFile(response)
            console.log(`\nResponse:\n` + response)
            console.log(`\nResponse.data:\n` + response.data)
            return response;
        case 'addToDB':
            //logOrgInfoToFile(response)
            DBM.addOrgInfo(response.data);
            break
        default:
            console.log("Incorrect action")
            break
    }
}

function logOrgInfoToFile(response){
    const logString = `${new Date()}--------------------------\n` +
        `ИНН: ${response.data.inn}\n` +
        `НАЗВАНИЕ (VALUE): ${response.value}\n`+
        `ПОЛНОЕ ИМЯ: ${response.data.name.full_with_opf}\n`+
        `КОРОТКОЕ ИМЯ: ${response.data.name.short_with_opf}\n`+
        `ОКАТО (data.okato): ${response.data.okato}\n`+
        `ОКАТО (data.address.data.okato): ${response.data.address.data.okato}\n`+
        `GEO_LAT (data.address.data.geo_lat): ${response.data.address.data.geo_lat}\n`+
        `GEO_LON (data.address.data.geo_lon): ${response.data.address.data.geo_lon}\n`+
        `АДРЕС: ${response.data.address.unrestricted_value}\n`+
        `--------------------------\n`;
    var fs = require("fs");
    fs.appendFile('./backups/tmp/log.txt', logString, function (err) {
        if (err) throw err;
        console.log('Saved to log!');
    });
    console.log(logString);
}
