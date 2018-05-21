import { Component, Renderer2 } from '@angular/core';
import { Globals } from '../../globals';
import { Weather } from '../../weather';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css',],
    providers: [Globals, Weather]
})
export class AppComponent {
    constructor(private renderer: Renderer2) {
        this.renderer.setStyle(document.body, 'overflow-x', 'hidden');
        //this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
    }
}
