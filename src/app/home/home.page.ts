import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDate: string;

  constructor() {
    const date = new Date();

    //this.currentDate = date.toLocaleDateString()
    //Fecha abajo de bienvenido
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = new Intl.DateTimeFormat('es-ES',options).format(date);
  }

}
