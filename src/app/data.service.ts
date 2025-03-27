import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedProductSource = new BehaviorSubject<string>('');
  selectedProduct$ = this.selectedProductSource.asObservable();

  setSelectedProduct(product: string) {
    this.selectedProductSource.next(product);
  }
}
