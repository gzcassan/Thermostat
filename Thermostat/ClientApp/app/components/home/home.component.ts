import { Component, Inject } from '@angular/core';
import { Globals } from '../../globals';
import { Weather } from '../../weather';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { RequestOptions } from '@angular/http/src/base_request_options';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {
    public readonly TempModeOff : number = 0;
    public readonly TempModeHeating : number = 1;
    public readonly TempModeCooling : number = 2;
    public readonly TempModeSchedule : number = 3;

    public tempMode: number = 0;

    private timer = Observable.timer(0, 5000);

    constructor(public globals: Globals, private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.temperatureSensors.push({ Temperature: 19.5, Description: 'Alice\'s bedroom' });
        this.temperatureSensors.push({ Temperature: 19.0, Description: 'Mike\'s bedroom' });
        this.temperatureSensors.push({ Temperature: 21.5, Description: 'Master bedroom' });
        this.temperatureSensors.push({ Temperature: 20.5, Description: 'Ground floor' });

        this.selectedTemperatureSensor = 1;

        this.timer.subscribe(t => {
            this.getControl();
        });
    }

    public control: Control;
    private getControl() {
        this.http.get(this.baseUrl + 'api/Thermostat/Control').subscribe(result => {
            this.control = result.json();
        }, error => console.error(error));
    }

    public temperatureSensors = new Array<TemperatureSensor>();
    public selectedTemperatureSensor: number;

    public selectSource(selected: number) {
        this.selectedTemperatureSensor = selected;
    }
    public tempMinusClick() {
        this.globals.tempSetpoint -= 0.5;
    }

    public tempPlusClick() {
        this.globals.tempSetpoint += 0.5;
    }

    public setTempMode(mode: number) {
        this.control.tempMode = mode;
        this.http.post(this.baseUrl + 'api/Thermostat/SetTempMode', { mode: mode }, {}).subscribe(result => {
            this.getControl();
        }, error => console.error(error));
    }

    public fanModeClick(mode: number) {
        this.globals.fanMode = mode;
    }
}

class TemperatureSensor {
    public Temperature: number;
    public Description: string;
}

class Control {
    public tempMode: number;
    public tempSetpoint: number;
    public tempSource: number;
    public fanMode: number;
}