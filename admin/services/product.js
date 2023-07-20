class Product {
    constructor (_id = '', _name, _desc, _img, _price, _screen, _backCamera, _frontCamera, _type) {
        this.id = _id, 
        this.name = _name, 
        this.desc = _desc, 
        this.img = _img, 
        this.price = _price, 
        this.screen = _screen, 
        this.backCamera = _backCamera, 
        this.frontCamera = _frontCamera, 
        this.type = _type 
    }
    typeBrand() {
        return this.type === '1' ? 'Samsung' : 'Iphone';
    }
}

export default Product