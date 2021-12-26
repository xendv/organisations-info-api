/**
 * OPK orgs RERST API
 * Api for getting organisations info from map frontend
 * @author Ksenia 'xendv' Dvoynina
 * @author Alex 'MasterYus' Yusifov
 * 
 * 2021
 */

let OrganisationsInfoAPI = require('./api/organisations.info.API');

const INNFILENAME = "./resources/inn/inn-final.csv"

const inn = "3443073324";

let OrgAPI = new OrganisationsInfoAPI()
// !!! works when separated
//OrgAPI.getInnsFromFile(INNFILENAME)

// get and save
//OrgAPI.getOrgInfoFromInnFile(INNFILENAME)

// make backups (postgres)
//OrgAPI.makeBackups()

//simply get one org, for debug, no saving
//OrgAPI.getOneOrgInfoFromAPI(inn)

//OrgAPI.getRegionsStatistics()

const express = require('express'),
  app = express()

const host = '127.0.0.1'
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let file = 'data.json'

if ((process.env.NODE_ENV = 'test')) file = 'data-test.json'

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/api/get_region_info',async (req, res) => {
    console.log(`got request ${JSON.stringify(req.body)}`);
        const region_data = await OrgAPI.getRegionInfo(req.body.reg_name);
        return res
          .status(200)
          .send({ data: region_data })
})

app.post('/api/get_total_count', async (req, res) => {
    //console.log(`got request ${JSON.stringify(req.body)}`);
    const data = await OrgAPI.getTotalCount();
    return res
        .status(200)
        .send({ data: data[0] })
})

app.get('/data/geojson', function(req, res){
  const file = `${__dirname}/public/russia.geojson`;
  res.download(file);
});

app.listen(port, host, () =>
  console.log(`OPK INFO API listens http://${host}:${port}`)
)