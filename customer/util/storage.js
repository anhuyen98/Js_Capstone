import CartItem from "../model/client/CartItem.js";

export function setLocalStorage(key, item) {
    localStorage.setItem(key, JSON.stringify(item))
}

export function getLocalStorage(key) {

    const d = JSON.parse(localStorage.getItem(key))
    const data = [];

    if(d) {

        for (let i = 0; i < d.length; i++) {
            const el = d[i]
            data.push(new CartItem(el.id, el.name, el.price,el.quantity, el.img));
        }
    }


    return data;
}

export function removeLocalStorage(key) {
    localStorage.removeItem(key)
} 
