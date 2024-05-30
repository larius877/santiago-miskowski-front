import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  users: any[] = []; // Array de usuarios
  displayDialog: boolean = false; // Controla la visibilidad del diálogo
  selectedUser: any = {}; // Usuario seleccionado para agregar/editar

  constructor(private primengConfig: PrimeNGConfig, public dialogService: DialogService) {}

  ngOnInit() {
    // Inicializa PrimeNG
    this.primengConfig.ripple = true;

    // Puedes inicializar aquí tus datos de usuarios
    this.users = [
      { name: 'Usuario 1', email: 'usuario1@example.com' },
      { name: 'Usuario 2', email: 'usuario2@example.com' },
    ];
  }

  // Muestra el diálogo para agregar un nuevo usuario
  showDialogToAdd() {
    this.selectedUser = {};
    this.displayDialog = true;
  }

  // Muestra el diálogo para editar un usuario existente
  showDialogToEdit(user: any) {
    this.selectedUser = { ...user };
    this.displayDialog = true;
  }

  // Guarda el usuario (agregar o editar)
  saveUser() {
    if (!this.selectedUser.id) {
      // Si el usuario no tiene ID, es un nuevo usuario (agregar)
      this.users.push(this.selectedUser);
    } else {
      // Si el usuario tiene ID, es un usuario existente (editar)
      const index = this.users.findIndex(user => user.id === this.selectedUser.id);
      this.users[index] = { ...this.selectedUser };
    }
    this.hideDialog();
  }

  // Oculta el diálogo
  hideDialog() {
    this.displayDialog = false;
    this.selectedUser = {};
  }

  // Elimina un usuario
  deleteUser(user: any) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}