import { IPgConnectionParams, ITransactionsCredentials } from '../types/types'
import dotenv from 'dotenv';


dotenv.config()
export const apiUrl: string = 'https://api.openrouteservice.org/v2/directions/foot-walking/geojson';
//@ts-ignore
export const apiKey: string = process.env.ORS_API_KEY

export const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
  'Authorization': apiKey
}



