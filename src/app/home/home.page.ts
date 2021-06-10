import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDate: string;
  //Cambiar por añadir tarea
  myTask: string;


  constructor(public afDB: AngularFireDatabase) {
    const date = new Date();

    //this.currentDate = date.toLocaleDateString()
    //Fecha abajo de bienvenido
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = new Intl.DateTimeFormat('es-ES',options).format(date);
  }

  //Funcion para añadir tareas a Firebase
  addTaskToFirebase() {
    //console.log('Prueba');
    this.afDB.list('Task/').push({
      text: this.myTask,
      //date: new Date().toString,
      checked: false
    });
  }
}
