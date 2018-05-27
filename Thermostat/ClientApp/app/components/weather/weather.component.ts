import { Component } from '@angular/core';
import { Weather } from '../../weather';
import { CurrentWeather } from '../../weather';
import { Globals } from '../../globals';
import { timer } from "rxjs/observable/timer";
import { Observable } from 'rxjs';

@Component({
    selector: 'weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
    private timer = Observable.timer(0, 60000);

    constructor(public weather: Weather) {
        this.timer.subscribe(t => {
            this.weather.getCurrentWeather();
        });
    }

    public getDescription(): string {
        return this.toProperCase(this.weather.currentWeather.weather[0].description);
    }

    public toProperCase(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }


    public getTemperature(): number {
        if (this.weather == null)
            return 0;
        if (this.weather.currentWeather == null)
            return 0;
        return Math.round((this.weather.currentWeather.main.temp_max + this.weather.currentWeather.main.temp_min) / 2 - 273.15);
    }

    public getIcon(): string {
        if (this.weather == null)
            return ("typcn typcn-warning");
        if (this.weather.currentWeather == null)
            return ("typcn typcn-warning");

        switch (this.weather.currentWeather.weather[0].icon.substring(0, 2)) {
            case "01":
                return ("typcn typcn-weather-sunny");
            case "02":
                return ("typcn typcn-weather-partly-sunny");
            case "03":
            case "04":
                return ("typcn typcn-weather-cloudy");
            case "09":
                return ("typcn typcn-weather-downpour");
            case "09":
                return ("typcn typcn-weather-shower");
            case "11":
                return ("typcn typcn-weather-stormy");
            case "13":
                return ("typcn typcn-weather-snow");
            case "50":
                return ("typcn typcn-waves");
        }

        return ("typcn typcn-warning");
    }
}
