import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

@Injectable()
export class Weather {
    constructor(private http: Http) {
    }
    
    public currentWeather: CurrentWeather;
  
    public getCurrentWeather() {
        this.http.get('http://api.openweathermap.org/data/2.5/weather?id=5911592&appid=4e50c33971fd1d543c2148a2ffc74031').subscribe(result => {
            var w: CurrentWeather = result.json() as CurrentWeather;
            w.lastUpdate = new Date();
            this.currentWeather = w;
        }, error => console.error(error));
    }
}

export class CurrentWeather {
    coord: CoordItem;
    weather: WeatherItem[];
    base: string;
    main: MainItem;
    visibility: number;
    wind: WindItem;
    clouds: CloudsItem;
    dt: number;
    sys: SysItem;
    id: number;
    name: string;
    cod: number;
    lastUpdate: Date;
}

export class CoordItem {
    lon: number;
    lat: number;
}

export class WeatherItem {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export class MainItem {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

export class WindItem {
    speed: number;
}

export class CloudsItem {
    all: number;
}

export class SysItem {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}