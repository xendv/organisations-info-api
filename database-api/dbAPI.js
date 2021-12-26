const { exec } = require('child_process');
const { Client } = require('pg');

const DBCONNOPTIONS = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'opk_db',
    password: '',
    port: 5432,
}

class DBManager{

    client = new Client(DBCONNOPTIONS);

    constructor(){
        this.connectToDB();
    }

    connectToDB(){
        this.client.connect();
    }

    addOrgInfo(orgInfo){
        // check info to build query
        var inn = orgInfo.inn;
        var name = orgInfo.name.short_with_opf;
        var address = orgInfo.address.unrestricted_value;
        var okato = orgInfo.address.data.okato;
        var lat = orgInfo.address.data.geo_lat;
        var lon = orgInfo.address.data.geo_lon;
        var regionCode = null;
        if ( inn != null ) inn = `\'` + inn + `\'`;
        if ( name != null ) name = `\'` + name + `\'`;
        if ( address != null ) address = `\'` + address + `\'`;
        if ( lat != null ) lat = `\'` + lat + `\'`;
        if ( lon != null ) lon = `\'` + lon + `\'`;
        if ( okato != null ) {
            okato = `\'` + okato + `\'`;
            regionCode = `\'` + okato.substr(1, 2) + `\'`;
        }

        const ADD_QUERY = `INSERT INTO info (inn, name, region_code, address, okato, lat, lon) ` +
            `VALUES (${inn}, ${name}, ${regionCode}, ${address}, ${okato}, ${lat}, ${lon});`;
        this.client.query(ADD_QUERY,
            (err, res) => {
                if (err) {
                    console.error(err);
                }
            });
    }

    async getRegionsStatistics(name) {
        let where = "";
        if (name) where = `WHERE region_info.name = '${name}'`;
        let REGIONS_STATISTICS_QUERY = `SELECT region_info.*, COUNT(info.region_code) AS orgs_count ` +
            `FROM region_info ` +
            `LEFT JOIN info ON region_info.code = info.region_code ` +
            `${where} ` +
            `GROUP BY region_info.code ` +
            `ORDER BY code `;
        console.log(REGIONS_STATISTICS_QUERY);

        return await this.client.query(REGIONS_STATISTICS_QUERY)
            .then(res =>{
                console.log(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err);
            })
    }

    async getTotalCount() {
        let REGIONS_STATISTICS_QUERY = `SELECT COUNT(*) AS orgs_count FROM info`;
        console.log(REGIONS_STATISTICS_QUERY);

        return await this.client.query(REGIONS_STATISTICS_QUERY)
            .then(res =>{
                console.log(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err);
            })
    }

    async performQuery(query){
        this.client.query(query,
            (err, res) => {
                if (err) {
                    console.error(err);
                }
                return res.rows;
            });
    }

    makeBackUps(){
        const os = require("os");
        const tempDir = os.tmpdir();

        // save db backup
        const db = `pg_dump -U postgres -F c opk_db > backups/tmp/opk_db.backup`
        executeCommand(db)

        // save tables as sql
        const INFO = `pg_dump --host localhost --port 5432 --username postgres --format plain --verbose --file backups/tmp/info.sql --table public.info opk_db`
        const REGIONS = `pg_dump --host localhost --port 5432 --username postgres --format plain --verbose --file backups/tmp/region_info.sql --table public.region_info opk_db`

        executeCommand(INFO)
        executeCommand(REGIONS)
    }

    closeDBConn(){
        this.client.end();
    }

    truncateTable(table){
        const tables = [ 'info', 'region_info'];
        if (!(table in tables)){
            console.log("No such table in db");
            return;
        }
        this.client.query(`TRUNCATE TABLE ${table};`, (err, res) => {
            if (err) {
                console.error(err);
            }
        });
    }

}
module.exports = DBManager

const executeCommand = (cmd, successCallback, errorCallback) => {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            // console.log(`error: ${error.message}`);
            if (errorCallback) {
                errorCallback(error.message);
            }
            return;
        }
        if (stderr) {
            //console.log(`stderr: ${stderr}`);
            if (errorCallback) {
                errorCallback(stderr);
            }
            return;
        }
        //console.log(`stdout: ${stdout}`);
        if (successCallback) {
            successCallback(stdout);
        }
    });
};