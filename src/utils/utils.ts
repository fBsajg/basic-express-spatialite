import { headers } from '../config/config';
import fetch from 'node-fetch';
import { IGeoJsonObject, } from '../types/types';

export async function postData(url: string, data: any) {
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });
    return await response.json();
}

export function getKeys(listWithObjects: any) {
    let keys: string[] = []
    for (let i of listWithObjects) {
        let k = Object.keys(i)
        for (let j of k) {
            if (!keys.includes(j)) {
                keys.push(j)
            }
        }
    }
    return keys
}

export function createGeoJson(data: any): IGeoJsonObject {
    let geojson: IGeoJsonObject = {
        "name": "locations",
        "type": "FeatureCollection",
        "features": []
    };
    let propsKeys = getKeys(data);

    for (let i: number = 0; i < data.length; i++) {
        let props = {}
        for (let j of propsKeys) {
            //@ts-ignore
            props[j] = data[i].j
        }
        //@ts-ignore
        geojson.features.push({
            //@ts-ignore
            "type": "Feature",
            //@ts-ignore
            "geometry": data[i].geom,
            //@ts-ignore
            "properties": props
        })
    }
    return geojson;
}

export class OrderedRoute {
    route: number[][];
    start: number[];
    end: number[];
    waypoints: number[][];
    sorted: number[];
    optimized: number[][];
    constructor(route: number[][]) {
        this.route = route
        this.start = this.route[0]
        this.end = this.route[this.route.length - 1]
        this.waypoints = this.route.slice(1, this.route.length - 1)
        this.sorted = this.order()
        this.optimized = this.getOptimizedRoute()
    }

    public getDistanceFromLatLonInKm(firstCoords: number[], lastCoords: number[]) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(firstCoords[0] - lastCoords[0]);  // deg2rad below
        var dLon = this.deg2rad(firstCoords[1] - lastCoords[1]);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(firstCoords[0])) * Math.cos(this.deg2rad(lastCoords[0])) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    private deg2rad(deg: number) {
        return deg * (Math.PI / 180)
    }

    private order() {
        let sorted: number[][] = [];
        let matrix: any[][] = [];
        this.waypoints.forEach((elm, index) => {
            let distance: number = this.getDistanceFromLatLonInKm(this.start, elm);
            matrix.push([distance, elm])
            sorted = matrix.sort(this.sortCoords);

        })
        let routeOrder: number[] = [];
        sorted.forEach((elm) => routeOrder.push(elm[1]))
        return routeOrder;
    }

    private sortCoords(a: number[], b: number[]) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    private getOptimizedRoute() {
        let optimized = [this.start]
        //@ts-ignore
        this.sorted.forEach(elm => optimized.push(elm))
        optimized.push(this.end)
        return optimized
    }
}

export class ResultConverter {
    row: Object[]
    keys: string[]
    geojson: Object
    constructor(row: Object[], tablename: string) {
        this.row = row;
        this.keys = this.getUniqueKeys();
        this.geojson = {
            type: "FeatureCollection",
            name: tablename,
            features: this.createFeatures()
        }
    }

    private getGeometry(singleRow: any) {
        let geom: Object = JSON.parse(singleRow.geom)
        return geom
    }

    private getProps(singleRow: any) {
        const arr = this.keys;
        const noGeomArr = arr.filter(e => e !== 'geom')
        //@ts-ignore
        const res = noGeomArr.reduce((acc, curr) => ( acc[curr] = singleRow[curr], acc), { });
        return res
    }

    private createFeatures() {
        let features = []

        for (let i of this.row) {
            let feature = {
                type: "Feature",
                properties: this.getProps(i),
                geometry: this.getGeometry(i)
            }
            features.push(feature)
        }

        return features
    }

    private getUniqueKeys() {
        let keys: string[] = [];
        for (let i of this.row) {
            let k = Object.keys(i);
            for (let j of k) {
                if (!keys.includes(j)) {
                    keys.push(j)
                }
            }
        }
        return keys
    }


}

