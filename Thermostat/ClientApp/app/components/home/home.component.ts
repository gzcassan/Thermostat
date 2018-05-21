import { Component } from '@angular/core';
import { Globals } from '../../globals';
import { Weather } from '../../weather';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    constructor(public globals: Globals) {
    }
    public selectSource(selected: number) {
        this.globals.selectedTempSource = selected;
    }
    public tempMinusClick() {
        this.globals.tempSetpoint -= 0.5;
    }

    public tempPlusClick() {
        this.globals.tempSetpoint += 0.5;
    }

    public controlModeClick(mode: number) {
        this.globals.controlMode = mode;
    }

    public fanModeClick(mode: number) {
        this.globals.fanMode = mode;
    }
}
