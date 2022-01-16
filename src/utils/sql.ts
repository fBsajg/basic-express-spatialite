// export const insLocations: string = "INSERT INTO locations (name, type, x, y) VALUES (?, ?, ?, ?);"
// export const insBranch: string = "INSERT INTO branch (name) VALUES (?);"
// export const insPos: string = "INSERT INTO positions (name, preis) VALUES(?, ?);"

export const selAllTbl: string = "SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'spatial%'  AND name NOT LIKE '%geom%'  AND name NOT LIKE '%sql%';"

export const selAllPoint: string = "SELECT id, name, measure, AsGeoJSON(geom) AS geom FROM demopoint;";
export const selAllLines: string = "SELECT id, name, measure, AsGeoJSON(geom) AS geom FROM demoline;";
export const selAllPolys: string = "SELECT id, name, measure, AsGeoJSON(geom) AS geom FROM demopoly;";

