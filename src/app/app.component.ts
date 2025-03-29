import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ContatoComponent } from "./contato/contato.component";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, ContatoComponent, MatToolbarModule, MatInputModule, ReactiveFormsModule, MatTabsModule, MatTableModule, MatIconModule, MatCardModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'agenda-app';
}
