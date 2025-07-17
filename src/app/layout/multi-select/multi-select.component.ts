import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css'
})
export class MultiSelectComponent {
  
  @Input() options: any;
  @Input() placeholder: string = 'Select options';
  @Input() label: string = '';
  @Input() selectedOptions: string[] = []; // Input for pre-selected options
  @Output() selectionChange = new EventEmitter<string[]>();

  isDropdownOpen = false;

  constructor(private elementRef: ElementRef) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedOptions']) {
      this.selectedOptions = [...(changes['selectedOptions'].currentValue || [])];
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string) {
    const index = this.selectedOptions.indexOf(option);
    if (index === -1) {
      this.selectedOptions.push(option);
    } else {
      this.selectedOptions.splice(index, 1); // Deselect if already selected
    }
    this.selectionChange.emit(this.selectedOptions);
  }

  removeOption(option: string) {
    const index = this.selectedOptions.indexOf(option);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
    }
    this.selectionChange.emit(this.selectedOptions);
  }

  isSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

}
