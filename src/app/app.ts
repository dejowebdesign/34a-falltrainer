import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './shared/components/app-header.component';
import { BackToTopComponent } from './shared/components/back-to-top.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, BackToTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
