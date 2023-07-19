import Cart from "../model/client/Cart.js";
import CartItem from "../model/client/CartItem.js";
import getElement from "./getElement.js";
import {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage
} from "./storage.js";

const cart = new Cart();


function getData() {
    const data = getLocalStorage("cart")
    if (data) {
        cart.listItems = data
    }
}
getData()
let list = cart.listItems


function renderCart(arr) {

    let cartIcon = getElement(".cart-number");
    cartIcon.innerHTML = list.length;


    let content = "";
    arr.map((e) => {
        content += `
            <tr class="row${e.id}">
            <td> <img src=${e.img} style="width: 50px; max-heigth: 100"></td>
            <td> ${e.name}</td>
            <td class="buttons"> 
                    <button class="minus${e.id}" onclick="minus(${e.id})"><i class="fa-solid fa-minus"></i></button>

                    <span class="quantity${e.id}"> ${e.quantity} </span>

                    <button class="plus${e.id}" onclick="plus(${e.id})"><i class="fa-solid fa-plus"></i></button>
            </td>
            <td> <span class="total-price${e.id}"> ${e.totalPrice()}</span> </td>
            <td class="wide-col"><span class="small-font remove remove${e.id}" onclick="removeProduct(${e.id})"> Bo san pham </span></td>
            </tr>
            `
    })
    const checkoutPrice = arr.reduce(
        (acc, curr) => {
            return acc + curr.totalPrice()
        }, 0
    )
    getElement("#cart-body").innerHTML = content
    getElement(".total-cart").innerHTML = checkoutPrice
}

renderCart(list);




/*@param ID
    * => void
    * mutate list of items*/
const getItem = (ID) => {

    const name = getElement(`.name${ID}`).innerHTML;
    const price = getElement(`.price${ID}`).getAttribute('data-name');
    const img = getElement(`.card-img-top${ID}`).src;
    const item = new CartItem(ID, name, price, 0, img);


    //prop slot de set up dieu kien de dang hon vi can push ele dau tien vao mang 
    //roi moi xet dk co ton tai hay chua
    if (list.length === 0) {
        list.push(item);
        cart.slot++;
    }
    cart.slot++
    if (cart.slot > 1) {
        const existed = list.find((e) => e.id === ID);
        if (existed) {
            existed.quantity++;
        } else {
            item.quantity++
            list.push(item);
        }
    }
    setLocalStorage("cart", list)

};

window.plus = (name) => {

    let el = list.find(e => e.id === name)

    if (el) {
        el.quantity++
        getElement(`.quantity${name}`).innerHTML = el.quantity
        renderCart(list)
    }

    setLocalStorage("cart", list)
}

window.minus = (name) => {

    const idx = list.findIndex(e => e.id === name)
    let el = list.find(e => e.id === name)

    if (el) {
        el.quantity--
        getElement(`.quantity${name}`).innerHTML = el.quantity

        renderCart(list)
    }

    if (el.quantity === 0) {
        list.splice(idx, 1)
        renderCart(list)
    }
    setLocalStorage("cart", list)
}

window.removeProduct = (id) => {

    const idx = list.findIndex(e => e.id === id)

    list.splice(idx, 1)
    renderCart(list)
    setLocalStorage("cart", list)
}

window.addToCart = (ID) => {
    getItem(ID);


    setLocalStorage("cart", list)
    renderCart(list)

};

const checkoutBtn = getElement(".checkout-button ")
checkoutBtn.onclick = () => {

    list = []
    renderCart(list)
    removeLocalStorage("cart")

    alert(`Dat hang thanh cong.`)

}

export default function renderProduct(arr) {
    let content = "";
    arr.map((e) => {
        content += ` 
                <div class="col" style="max-width: 450px">
                <div class="card">
                <img src=${e.img} class="card-img-top card-img-top${e.id
            }" alt="..." />
                <div class="card-body">
                <div class="card-body-top">
                <div class="card-title"> <span class="name${e.id}" >${e.name
            } </span>
                <span class="badge bg-secondary">${e.type === "Samsung" ? "Samsung" : "iPhone"
            }</span>
                </div>
                </div>

                <div class="card-body-middle">
                <h5 class="card-text">
            <span class="price${e.id}" data-name=${e.price}> 
          $${e.price}
          </span>

          </h5>
                <div class="description">
                ${e.desc}
                </div>
                <div class="product-info grey"> 
                <h4 class="small-font"> Thong so camera </h4>
                Camera sau: ${e.backCamera}
      Camera truoc: ${e.frontCamera}
                </div>
                </div>
                <button type="button" class="push-button btn btn-primary add_button" 
       onclick="
        addToCart(${e.id});
       ">
                Add to cart
                </button>
                </div>
                </div>
                </div>`;
    });
    document.querySelector(".row").innerHTML = content;
}
