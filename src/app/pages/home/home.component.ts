import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { CartService } from './../../services/cart.service';

const ROWS_HEIGHT: { [id:number]: number } = { 1: 400, 3: 335, 4: 350};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  category: string | undefined;
  cols: number = 4;
  rowHeight = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  sort: string = 'desc';
  count: string = '12';
  productSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.productSubscription = this.storeService.getAllProducts(this.count, this.sort)
    .subscribe((_products)=> {
      this.products = _products;
    })
  }

  onColumnsCountChange(colsNumber: number): void{
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
    console.log(`Entrou no onColumns - Cols = ${this.cols}`);
    console.log(`Entrou no onColumns - RowHeight = ${this.rowHeight}`);
  }

  onShowCategory(newCategory: string): void{
    this.category = newCategory;
  }

  onAddToCart(product: Product): void{
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }

  ngOnDestroy(): void {
    if(this.productSubscription){
      this.productSubscription.unsubscribe();
    }
  }

}
