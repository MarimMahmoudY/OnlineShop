import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {

  products:Product[]=[]
  categories:string[]=[]
  loading:boolean=true
  cartProducts:any[]=[]

  constructor(private service:ProductsService){}

  ngOnInit(): void{
    this.getProducts()
    this.getCategories()
  }

  getProducts(){
    this.loading=true
    this.service.getAllProuducts().subscribe((res:any)=>{
      this.products = res
      this.loading=false
    },
      error=>{
        this.loading=false
        alert("Error")
      }
    )
  }

  getCategories(){
    this.loading=true
    this.service.getAllCategories().subscribe((res:any)=>{
      this.categories = res
      this.loading=false
    },
      error=>{
        this.loading=false
        alert("Error")
      }
    )
  }

  filterCategory(event:any){
    let value = event.target.value;
    (value == "all") ? this.getProducts() : this.getProductCategory(value)
    // =
    // if(value=="all")
    // {
    //   this.getProducts()
    // }
    // else
    // {
    //   this.getProductCategory(value)
    // }
  }

  getProductCategory(keyword:string){
    this.loading=true
    this.service.getProductsByCategory(keyword).subscribe((res:any)=>{
      this.loading=false
      this.products=res
    })
  }

  addToCart(event:any){
    if("cart" in localStorage){//pushing in existing cart
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist =this.cartProducts.find(item => item.item.id == event.item.id)
      if(exist){
        alert("n")
      }
      else{
        this.cartProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
      }
    }
    else{//pushing in new cart
      this.cartProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    }
  }
}
