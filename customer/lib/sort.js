function sort(arr, lo, hi) {

    if(lo >= hi) {
        return
    }

    let p = split(arr, lo, hi)
    
    sort(arr, lo, p - 1)
    sort(arr, p + 1, hi)


}

function split (arr, lo, hi) {
    let idx = lo - 1;
    let p = arr[hi].price;

    for(let i = lo; i < hi; i++) {
        if(arr[i].price <= arr[hi].price) {
            idx++
            let tmp = arr[i].price;
            arr[i].price = arr[idx.price];
            arr[idx].price = tmp;
        }
    }
    idx++;

    arr[hi].price = arr[idx].price;
    arr[idx].price = p;
    return idx;


}

export default function quickSort(array) {

    sort(array, 0, array.length - 1)
    return array;
}

