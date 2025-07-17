import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  footerYear: any;
  constructor() { }

  ngOnInit(): void {
    this.footerYear = new Date().getFullYear();
  }
}
