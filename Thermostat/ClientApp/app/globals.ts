import { Injectable } from "@angular/core";
import { CurrentWeather } from '../app/weather';

@Injectable()
export class Globals {
    public readonly controlModeOff: number = 0;
    public readonly controlModeHeating: number = 1;
    public readonly controlModeCooling: number = 2;
    public readonly controlModeSchedule: number = 3;

    public selectedTempSource: number = 0;
    public tempSetpoint: number = 19.5;
    public controlMode: number = 0;
    public fanMode: number = 0;

    public currentWeather: CurrentWeather;
}
