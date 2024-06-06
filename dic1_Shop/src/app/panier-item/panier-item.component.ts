import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-panier-item',
  standalone: true,
  templateUrl: './panier-item.component.html',
  styleUrls: ['./panier-item.component.css']
})
export class PanierItemComponent {
  @Input() item: any;
  @Output() quantityChange = new EventEmitter();
  @Output() delete = new EventEmitter<number>();

  increaseQuantity() {
    this.item.nombre++;
    this.quantityChange.emit();
  }

  decreaseQuantity() {
    if (this.item.nombre > 1) {
      this.item.nombre--;
      this.quantityChange.emit();
    }
  }

  onDelete() {
    this.delete.emit(this.item.article.id);
  }
}
