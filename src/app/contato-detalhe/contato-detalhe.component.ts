import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contato } from '../contato/contato';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';



@Component({
  selector: 'app-contato-detalhe',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatIcon, MatCardContent, MatCardActions],
  templateUrl: './contato-detalhe.component.html',
  styleUrl: './contato-detalhe.component.css'
})
export class ContatoDetalheComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ContatoDetalheComponent>,
    @Inject(MAT_DIALOG_DATA) public contato: Contato 
  ){}

  ngOnInit(): void {

  }

  fechar(){
    this.dialogRef.close();
  }


}
