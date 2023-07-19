export default class CartItem {
    constructor(id, name, price,quantity, img) {
        this.id = id,
        this.name = name,
        this.price = price
        this.quantity = quantity 
        this.img = img;
    }

    totalPrice() {
        return Number(this.quantity) * Number(this.price)
    }
  
}



