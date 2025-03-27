import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from "./data.service";
import {InputElementsInterface} from "./interface/input-elements.interface";
import {ContactInfoInterface} from "./interface/contact-info.interface";
import {ProductsComponent} from "./products/products.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChild('orderForm', { static: false, read: ElementRef }) ordersEl!: ElementRef;
  @ViewChild(ProductsComponent) productsComponent!: ProductsComponent; // Получаем доступ к ProductsComponent

  title = 'macaroonAngular';
  selectedProduct: string = '';
  isOpenMenu: boolean = false;

  constructor(private dataService: DataService) {
  } // Внедряем сервис

  ngOnInit() {
    this.dataService.selectedProduct$.subscribe(product => {
      this.selectedProduct = product;
    });
  }

  //Объект для инпутов
  public formInputValues: InputElementsInterface = {
    productTitle: '',
    clientName: '',
    clientPhone: '',
    check: false
  }

  //Скролл
  public scrollTo(elementRef: ElementRef | null): void {
    if (elementRef) {
      elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this.isOpenMenu = false;
    } else if (this.productsComponent) { // Проверяем, существует ли productsComponent
      // Вызовите метод scrollToProducts дочернего компонента
      this.productsComponent.scrollToProducts();
      this.isOpenMenu = false;
    }
  }

  //Валидация формы заказа
  public isSubmitted: boolean = false;

  public orderDone(): void {
    this.isSubmitted = true;
    if (!this.formInputValues.productTitle) {
      return;
    }
    if (!this.formInputValues.clientName) {
      return;
    }
    if (!this.formInputValues.clientPhone) {
      return;
    }
    alert('Спасибо за заказ');
    this.isSubmitted = false;

    this.formInputValues = {
      productTitle: '',
      clientName: '',
      clientPhone: '',
      check: false
    }
  }
  //Переменная для отображения подарка
  public showPresent: boolean = false;

  //Объект для телефона и ссылок
  public contactInfo: ContactInfoInterface = {
    phone: '+375 (29) 368-98-68',
    hrefLink: 'https://instagram.com/',
    hrefPone: 'tel:+375293689868'
  }

  public changeMenu(): void {
    this.isOpenMenu = !this.isOpenMenu;
  }

}
