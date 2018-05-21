import { Component, Input } from '@angular/core';
import { CurrentWeather } from '../../weather';

@Component({
    selector: 'weather-component',
    templateUrl: './weather.component.html'
})

export class WeatherComponent {
    public _weather: CurrentWeather;

    @Input('weather')
    set weather(value: CurrentWeather) {
        this._weather = value;
        this.icon = this.getIcon();
    }

    public icon: string;

    public temperature(): number {
        if (this._weather == null)
            return 0;
        return Math.round((this._weather.main.temp_max + this._weather.main.temp_min) / 2 - 273.15);
    }

    public getIcon(): string {
        if (this._weather == null)
            return ("typcn typcn-warning");

        switch (this._weather.weather[0].icon.substring(0, 2)) {
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
                return ("typcn typcn-weather-waves");
        }

        return ("typcn typcn-warning");
    }
}
