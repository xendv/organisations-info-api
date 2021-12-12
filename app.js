let OrganisationsInfoAPI = require('./api/organisations.info.API');

const INNFILENAME = "./resources/inn/one_inn.csv"
//const INNFILENAME = "./resources/inn/tmp.csv"
//const INNFILENAME = "./resources/inn/inn-no-dublicates-reduced.csv"
//const INNFILENAME = "./resources/inn/inn-reduced.csv"
//const INNFILENAME = "./resources/inn/inn.csv"

let OrgAPI = new OrganisationsInfoAPI()
// works when separated
OrgAPI.getOrgInfoFromInnFile(INNFILENAME)
OrgAPI.makeBackups()