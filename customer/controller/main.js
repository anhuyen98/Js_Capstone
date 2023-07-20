import { URL } from "../util/api.js";
import  renderContent from "../util/render.js";
import getElement from "../util/getElement.js";
import quickSort from "../lib/sort.js";

async function getData(url) {
    try {
        const data = await axios.get(url);
        renderContent(data.data)
        return data.data
    } catch (err) {
        console.log(err);
    }
}


const data = await getData(URL)


const productCategory = getElement(".categories")

productCategory.addEventListener("change", () => {
    let v = productCategory.value
    if(v === "2") {
        let arr = data.filter(e => e.type === "Samsung")
        renderContent(arr);
    } else if(v === "0") {
        renderContent(data);
    } else {
        let arr = data.filter(e => e.type === "iphone" || e.type === "Iphone")
        renderContent(arr);
    }
})

const sortPriceSelect = getElement(".sort")


sortPriceSelect.addEventListener("change", async () => {
    const data = await getData(URL)
    let v = sortPriceSelect.value
    if(v === "1") {
        let arr = quickSort(data) 
        arr.filter(e => e.type === "Samsung")
        arr.reverse()
        renderContent(arr)
    } else {
        let arr = quickSort(data)
        renderContent(arr)
    }
})
