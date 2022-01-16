import { selAllLines, selAllPoint, selAllPolys, selAllTbl } from './utils/sql';
import {  ResultConverter } from './utils/utils';
const sqlite = require('spatialite');
const DBSOURCE = 'demo.sqlite';

let db = new sqlite.Database(DBSOURCE, (err: any) => {
    console.log(`Connected to ${DBSOURCE}.`)
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }
})

export const getPoints = (request: any, response: any) => {
    let query = selAllPoint;
    db.spatialite(function (err: any) {
        db.all(query, function (err: any, row: any) {
            let rc = new ResultConverter(row, "demopoint")
            response.json(rc.geojson)
        });
    });
}

export const getLines = (request: any, response: any) => {
    let query = selAllLines;
    db.spatialite(function (err: any) {
        db.all(query, function (err: any, row: any) {
            let rc = new ResultConverter(row, "demoline")
            response.json(rc.geojson)
        });
    });
}

export const getPolys = (request: any, response: any) => {
    let query = selAllPolys;
    db.spatialite(function (err: any) {
        db.all(query, function (err: any, row: any) {
            let rc = new ResultConverter(row, "demopoly")
            response.json(rc.geojson)
        });
    });
}



// export const insertLocation = (request: any, response: any) => {
//     let name = request.body.location;
//     let type =  request.body.branchType;
//     let x = request.body.x;
//     let y = request.body.y;

//     console.log(name, type, x, y)

//     let insert = insLocations;
//     db.run(insert, [name, type, x, y],
//         (err: any) => {
//             if (err) {
//                 console.log({ "error": err })
//             } else {
//                 response.json({ "result": "Insert successful." });
//             }
//         });
// }

export const getTables = (request: any, response: any) => {
    let query = selAllTbl;
    db.spatialite(function (err: any) {
        db.all(query, function (err: any, row: any) {
            response.json(row)
        });
    });
}





