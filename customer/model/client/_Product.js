class Product {
    
  constructor(name, price, screen, backCamera, fontCamera, img, desc, type) {
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.fontCamera = fontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
  }
    getInfo() {
        console.log(this.name)
    }
}
export default Product;
