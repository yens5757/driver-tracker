import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { WeightPipe } from '../weight.pipe';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-gemini-ai',
  standalone: true,
  imports: [DatePipe, FormsModule, RouterLink, WeightPipe],
  templateUrl: './gemini-ai.component.html',
  styleUrl: './gemini-ai.component.css'
})
export class GeminiAiComponent {
  packageDb: any[] = [];
  response: string = '';

  socket: any;
  constructor(private db: DatabaseService, private router: Router) {
    this.socket = io();
    this.socket.on('ass3aianswer', (data: any) => {
      this.response = data;
      console.log(data);
    });
  }

  ngOnInit() {
    this.loadPackages();
  }

  loadPackages() {
    this.db.getPackages().subscribe((data: any) => {
      this.packageDb = data;
    });
  }

  askPackage(destination: string) {
    console.log(destination);
    this.socket.emit('ass3ai', destination);
  }
}
