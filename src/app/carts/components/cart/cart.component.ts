import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private service:CartsService){}
  cartProducts:any[]=[]
  total:any=0
  success:boolean=false
  ngOnInit(): void{
    this.getCartProducts()
  }

  getCartProducts(){
    if("cart" in localStorage){//pushing in existing cart
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotal()
  }

  addAmount(index:number){
    this.cartProducts[index].quantity++
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  minsAmount(index:number){
    this.cartProducts[index].quantity--
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  detectChange(){
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    this.getCartTotal()
  }

  getCartTotal(){
    this.total=0
    for(let i in this.cartProducts){
      this.total+=this.cartProducts[i].item.price * this.cartProducts[i].quantity;
    }
  }

  deleteProduct(index:number){
    this.cartProducts.splice(index,1)//from: index, no. of deletes: 1
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    this.getCartTotal()
  }

  clearCart(){
    this.cartProducts=[]
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    this.getCartTotal()
  }
  addCart(){
    let products=this.cartProducts.map(item=>{
      return {productId: item.item.id, quantity: item.quantity}
    })
    let Model={
      userId: 5,
      date: new Date(),
      products: products
    }
    this.service.createNewCart(Model).subscribe(res=>{
      this.success=true

      this.cartProducts=[]
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
      this.getCartTotal()
    })

  }
}
