import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { Contato } from './contato';
import { ContatoService } from '../contato.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-contato',
  imports: [
    MatToolbar,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
  contatos: Contato [] = [];
  colunas = ['id', 'nome', 'email', 'favorito'];

  constructor(
    private service: ContatoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}
  

  ngOnInit(): void {

    this.montarFormulario();
    this.listarContatos();

  }

  montarFormulario(){
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    })
  }

  listarContatos(){
    this.service.list().subscribe(response => {
      this.contatos = response;
    })
  }

  favoritar(contato: Contato){
    this.service.favourite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    })
  }

  submit(){

    const formValues = this.formulario.value;

    const contato : Contato = new Contato(formValues.nome, formValues.email);
  
    this.service.save(contato).subscribe(resposta => {
      this.contatos.push(resposta);
        let lista: Contato[] = [...this.contatos, resposta];
        this.contatos = lista;
    });

  }
  

}
