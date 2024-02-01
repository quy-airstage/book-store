import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Input() keySearch: string = '';
  @Output() Search: EventEmitter<string> = new EventEmitter<string>();
  onSearch() {
    this.Search.emit(this.keySearch);
  }
}
