const { exec } = require('child_process');
const DBCONNOPTIONS = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'opk_db',
    password: '',
    port: 5432,
}
const { Client } = require('pg');

//"use strict";
class DBManager{

    client = new Client(DBCONNOPTIONS);

    constructor(){
        this.connectToDB();
    }

    connectToDB(){
        this.client.connect();
    }

    addOrgInfo(orgInfo){
        //this.connectToDB();
        var inn = orgInfo.inn;
        var name = orgInfo.name.short_with_opf;
        var address = orgInfo.address.unrestricted_value;
        //var mail_code = address.substr(0, address.indexOf(','));
        var okato = orgInfo.okato;
        var regionCode = null;
        if ( inn != null ) inn = `\'` + inn + `\'`;
        if ( name != null ) name = `\'` + name + `\'`;
        if ( address != null ) address = `\'` + address + `\'`;
        if ( okato != null ) {
            okato = `\'` + okato + `\'`;
            regionCode = `\'` + okato.substr(1, 2) + `\'`;
        }
        const ADD_QUERY = `INSERT INTO info (inn, name, region_code, address, okato) ` +
            `VALUES (${inn}, ${name}, ${regionCode}, ${address}, ${okato});`;

        //const ADD_QUERY = `INSERT INTO info (inn, name, region_code, address, okato) ` +
        //`VALUES ('${orgInfo.inn}', '${orgInfo.name.short_with_opf}', '${regionCode}', '${address}', '${okato}');`;
        this.client.query(ADD_QUERY,
            (err, res) => {
                if (err) {
                    console.error(err);
                }
            });
    }

    // not ready
    addOrgCoordInfo(inn, lat, lon){
        const ADD_COORD_QUERY = `UPDATE info SET lat=${lat}, lon=${lon}) ` +
        `WHERE inn='${inn}');`;
        this.client.query(ADD_COORD_QUERY,
            (err, res) => {
                if (err) {
                    console.error(err);
                }
            });
    }

    makeBackUps(){
        // save info in csv
        const os = require("os");
        const tempDir = os.tmpdir();

        // save db backup
        const db = `pg_dump -U postgres -F c opk_db > backups/tmp/opk_db_dump.backup`
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

    dropTable(){
        client.query(`TRUNCATE TABLE info;`, (err, res) => {
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