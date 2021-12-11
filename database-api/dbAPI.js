const DBCONNOPTIONS = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'opk_db',
    password: '',
    port: 5432,
}
const { Client } = require('pg');

"use strict";
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
                    return;
                }
            });
    }

    addOrgCoordInfo(inn, lat, lon){
        const ADD_COORD_QUERY = `UPDATE info SET lat=${lat}, lon=${lon}) ` +
        `WHERE inn=${inn});`;
        this.client.query(ADD_COORD_QUERY,
            (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
    }

    makeBackUp(){
        this.client.query(`\copy (Select * From info) To '/tmp/info.csv' With CSV`,
            (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        this.client.query(`\copy (Select * From region_info) To '/tmp/info.csv' With CSV`,
            (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
    }

    closeDBConn(){
        this.client.end();
    }

    dropTable(){
        client.query(`TRUNCATE TABLE info;`, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    }
}

module.exports = DBManager
