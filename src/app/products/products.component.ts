import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ProductInterface} from "../interface/product.interface";
import {DataService} from "../data.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
    @ViewChild('productsEl', { static: false, read: ElementRef }) productsSection!: ElementRef;
    @Input() orderForm!: ElementRef;
    products: ProductInterface[] = [
    { title: 'Макарун с малиной', price: '1 шт. 1,70 руб.', image: '../../assets/images/1.png' },
    { title: 'Макарун с манго', price: '1 шт. 1,70 руб.', image: '../../assets/images/2.png' },
    { title: 'Пирог с ванилью', price: '1 шт. 1,70 руб.', image: '../../assets/images/3.png' },
    { title: 'Пирог с фисташками', price: '1 шт. 1,70 руб.', image: '../../assets/images/4.png' }
  ];

    constructor(private dataService: DataService) {} // Внедряем сервис

    public scrollToProducts(): void {
        if (this.productsSection) {
            this.productsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    orderProduct(product: ProductInterface): void {
        this.dataService.setSelectedProduct(product.title.toUpperCase());
        if (this.orderForm) {
            this.orderForm.nativeElement.scrollIntoView({behavior: 'smooth'});
        }
    }
}
