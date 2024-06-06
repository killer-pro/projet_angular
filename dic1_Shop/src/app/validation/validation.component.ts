import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header2Component } from '../header2/header2.component';

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [RouterLink,Header2Component],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.css'
})
export class ValidationComponent {

}
