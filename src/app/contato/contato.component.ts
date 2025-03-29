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
import { response } from 'express';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatCardModule,
    MatPaginatorModule
  ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
  contatos: Contato [] = [];
  colunas = ['foto', 'id', 'nome', 'email', 'favorito'];
  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions : number[] = [10];

  constructor(
    private service: ContatoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}
  

  ngOnInit(): void {

    this.montarFormulario();
    this.listarContatos(this.pagina, this.tamanho);

  }

  montarFormulario(){
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    })
  }

  listarContatos(pagina: number = 0, tamanho: number = 10): void {
    this.service.list(pagina, tamanho).subscribe(response => {
      this.contatos = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    });
  }
  

  favoritar(contato: Contato){
    this.service.favourite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    })
  }

  submit() {
    const formValues = this.formulario.value;
  
    console.log('Valores enviados:', formValues);
  
    if (!formValues.email || !formValues.nome) {
      this.snackbar.open('Nome e Email são obrigatórios!', 'Erro!', { duration: 2000 });
      return;
    }
  
    const contato: Contato = new Contato(formValues.nome, formValues.email);
  
    this.service.save(contato).subscribe({
      next: resposta => {
        console.log('Contato salvo:', resposta);
        this.listarContatos();
        this.snackbar.open('Contato adicionado com sucesso!', 'Sucesso!', { duration: 2000 });
        this.formulario.reset();
      },
      error: erro => {
        console.error('Erro ao salvar:', erro);
        this.snackbar.open('Erro ao adicionar contato!', 'Erro!', { duration: 2000 });
      }
    });
  }
  
  

  uploadFoto(event: Event, contato: Contato): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    
    if (files) {
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      
      this.service.upload(contato, formData).subscribe(response => {
        this.listarContatos(this.pagina, this.tamanho);
      });
    }
  }
  
  visualizarContato(contato: Contato){
    this.dialog.open(ContatoDetalheComponent), {
      width: '400px',
      height: '450px',
      data: contato
    }
  }

  paginar(event: PageEvent){
    this.pagina = event.pageIndex;
    this.listarContatos(this.pagina, this.tamanho);
  }

}
