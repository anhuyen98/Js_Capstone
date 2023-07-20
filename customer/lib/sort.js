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
    let p = arr[hi];

    for(let i = lo; i < hi; i++) {
        if(Number(arr[i].price) <= Number(arr[hi].price)) {
            idx++
            let tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }
    idx++;

    arr[hi] = arr[idx];
    arr[idx] = p;
    return idx;


}

export default function quickSort(array) {

    sort(array, 0, array.length - 1)
    console.log(array)
    return array;
}

