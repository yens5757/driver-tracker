import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invalid-data',
  standalone: true,
  imports: [],
  templateUrl: './invalid-data.component.html',
  styleUrl: './invalid-data.component.css'
})
export class InvalidDataComponent {
  errorMessage: string = '';
  errorMessages: string[] = [];
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    const rawErrorMessage = this.route.snapshot.paramMap.get('errorMessage') || 'Unknown error occurred.';
    this.errorMessages = decodeURIComponent(rawErrorMessage).split(',');
    console.log('Split error messages:', this.errorMessages);
  }
}