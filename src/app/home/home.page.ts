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
  myTask: string;
  addTask: boolean;
  tasks = [];


  constructor(public afDB: AngularFireDatabase) {
    const date = new Date();
    //this.currentDate = date.toLocaleDateString()
    //Fecha abajo de bienvenido
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = new Intl.DateTimeFormat('es-ES',options).format(date);
    this.getTasks()

  }

  //Funcion para añadir tareas a Firebase
  addTaskToFirebase() {
    this.afDB.list('Task/').push({
      text: this.myTask,
      date: new Date().toISOString().substring(0, 10),
      checked: false
    });
    this.showForm();
    console.log('agregado con exito');
  }
  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
  }
  // getTasks() {
  //   this.afDB.list('Task/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
  //     // this.tasks = [];
  //     actions.forEach(action => {
  //       console.log('Tarea: ' + action.payload.exportVal().text());
  //       // this.tasks.push({
  //         // key: action.key,
  //         // text: action.payload.exportVal().text,
  //         // hour: action.payload.exportVal().date.substring(11, 16),
  //         // checked: action.payload.exportVal().checked
  //   //     });
  //    });
  //   });
  // }

  //Funcion para obtener la lista de tareas
  getTasks() {

    this.afDB.list('Task/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      console.log(actions)
      actions.forEach(action => {

        console.log('Tarea: ' + action.payload.exportVal().text)

      })
    })
  }
}
