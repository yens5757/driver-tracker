import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { WeightPipe } from '../weight.pipe';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [DatePipe, FormsModule, RouterLink, WeightPipe],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.css'
})
export class TranslateComponent {
  packageDb: any[] = [];
  response: string = '';
  selectedLanguage: string = 'en';  // Default language
  availableLanguages: string[] = ['en', 'fr', 'es', 'de', 'zh'];  // Example languages

  socket: any;
  constructor(private db: DatabaseService, private router: Router) {
    this.socket = io();
    this.socket.on('translationResult', (data: any) => {
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

  askPackage(translate: string) {
    let lang = this.selectedLanguage
    console.log(lang);
    this.socket.emit('translate', translate, lang );
  }
}
