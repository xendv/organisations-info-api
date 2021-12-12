class CsvReader{
    static getINNFromFile(filename) {
        var fs = require("fs");
        return fs.readFileSync(filename)
            .toString() // convert Buffer to string
            .split('\n') // split string to lines
            .map(e => e.trim()) // remove white spaces for each line
            //.map(e => e.split(',').map(e => e.trim()));
    }
}
module.exports = CsvReader
