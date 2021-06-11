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
    console.log('se manda a llamar el constructor');
    this.getTasks();

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

  //Funcion para obtener la lista de tareas
  getTasks() {
    this.afDB.list('Task/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
        actions.forEach(action => {
        console.log('Se mando a traer datos de la BD: ', action.payload.exportVal().text);
        this.tasks.push({
          key: action.key,
          text: action.payload.exportVal().text,
          date: action.payload.exportVal().date,
          checked: action.payload.exportVal().checked,
        })
      })
    })
  }
  //Funcion para eliminar tareas con sliding
  deleteTask(task: any) {
    this.afDB.list('Task/').remove(task.key);
    console.log('Se elimino ' + task.text);
  }

//Funcion para cambiar de checked en la BD
  changeCheckState(task: any) {
    console.log('checked: ' + task.checked);
    this.afDB.object('Task/' + task.key + '/checked/').set(task.checked);
  }
}
