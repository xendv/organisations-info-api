let OrganisationsInfoAPI = require('./api/organisations.info.API');

const INNFILENAME = "./resources/inn/one_inn.csv"
//const INNFILENAME = "./resources/inn/tmp.csv"

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

OrgAPI.getRegionsStatistics()