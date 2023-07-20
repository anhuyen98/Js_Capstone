import getAPI from '../model/getAPI.js'
import postAPI from '../model/postAPI.js'
import putAPI from '../model/put-patchAPI.js'
import deleteAPI from '../model/deleteAPI.js'
import renderUI from '../views/render.js'
import Product from '../services/product.js'
import checkedString from "../utils/validator.js";

// Đặt biến
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

// Lấy list thông tin sp từ data
function getListProduct() {
    let promise = getAPI()
    promise
        .then(result => {
            console.info('Thành công')

            // In ra giao diện
            renderUI(result.data)
        })
        .catch(err => {
            console.error(err);
        })
}

// Thêm dữ liệu vào data
function postProduct(data) {
    let promise = postAPI(data)
    promise
        .then(() => {
            console.info('Thành công')
            getListProduct()
        })
        .catch(err => {
            console.error(err);
        })
}

// Xóa dữ liệu trên data từ id đã chọn
function deleteProduct(id) {
    let promise = deleteAPI(id)
    promise
        .then(() => {
            console.info('Thành công')
            getListProduct()
        })
        .catch(err => {
            console.error(err);
        })
}

// Khi load trang, lấy dữ liệu data và renderTable
getListProduct()

// Hàm lấy thông tin sản phẩm
function getInformationProduct() {

    // Dom tới các input và select user nhập
    const listInput = $$('form#formProduct input, form#formProduct select')

    // Gọi object chứa giá trị nhập
    let itemProduct = {};

    // Lặp qua từng name trong input và select được chọn để lấy value
    listInput.forEach(element => {
        const { name, value } = element
        itemProduct[name] = value;
    });

    // Lấy dữ liệu đã được nhận vào object itemProduct
    const { id, name, desc, img, price, screen, backCamera, frontCamera, type } = itemProduct;

    // Tạo 1 itemProduct thông qua lớp Product từ các dữ liệu lấy được ở trên
    let product = new Product(id, name, desc, img, price, screen, backCamera, frontCamera, type);

    // Check thông tin
    let isValid = true

    isValid &= checkedString(product.name, 1, undefined, 'span#spanName', 'Trường này không được bỏ trống')
    isValid &= checkedString(product.desc, 1, undefined, 'span#spanDescription', 'Trường này không được bỏ trống')
    isValid &= checkedString(product.img, 1, undefined, 'span#spanImg', 'Trường này không được bỏ trống')
    isValid &= checkedString(product.price, 1, undefined, 'span#spanPrice', 'Trường này không được bỏ trống')
    isValid &= checkedString(product.screen, 1, undefined, 'span#spanScreen', 'Trường này không được bỏ trống')
    isValid &= checkedString(product.backCamera, 1, undefined, 'span#spanBackCamera', 'Trường này không được bỏ trống')
    isValid &= checkedString(product.frontCamera, 1, undefined, 'span#spanFrontCamera', 'Trường này không được bỏ trống')

    // let isFormValid = Validator({
    //     form: 'form#formProduct',
    //     errSelect: '.form-messErr',
    //     rule: [
    //         Validator.isRequired('input#name'),
    //         Validator.isRequired('input#price'),
    //         Validator.isRequired('input#screen'),
    //         Validator.isRequired('input#backCamera'),
    //         Validator.isRequired('input#frontCamera'),
    //         Validator.isRequired('input#img'),
    //         Validator.isRequired('input#desc'),
    //     ],
    //     btn: '#btnSubmit'
    // })

    return isValid ? product : undefined;
}

// Xử lý khi click vào button UploadProduct
$('#btnUpload').onclick = () => {

    // Hiện nút Submit
    $('#btnSubmit').style.display = 'block';

    // Ẩn nút Update
    $('#btnUpdate').style.display = 'none'
}

// Xử lý khi click vào button SubmitProduct
$('#btnSubmit').onclick = () => {

    // Lấy thông tin
    let item = getInformationProduct()

    if (item) {
        let itemData = {
            ...item,
            type: item.typeBrand()
        }

        const toastTrigger = document.getElementById('btnSubmit')
        const toastExample = document.getElementById('toast')
        if (toastTrigger) {
            toastTrigger.addEventListener('click', () => {
                const toast = new bootstrap.Toast(toastExample)
                toast.show()
            })
        }
        // Gọi hàm Upload dữ liệu vào data
        postProduct(itemData);
    }
}


// Xử lý khi click vào button UpdateProduct
$('#btnUpdate').onclick = () => {

    // Lấy dữ liệu
    const data = getInformationProduct();

    // Swap dữ liệu
    const dataProduct = {
        ...data,
        type: data.typeBrand()
    }

    // Tìm id thông qua thuộc tính data-id
    const idUpdate = $('#btnUpdate').getAttribute('data-id')

    // Gọi hàm chỉnh sửa và đưa dữ liệu lên data
    let promise = putAPI(idUpdate, dataProduct)
    promise
        .then(() => {
            console.info('Thành công')
            getListProduct()

            // Xóa thuộc tính data-id
            $('#btnUpdate').removeAttribute('data-id')
        })
        .catch(() => {
            console.error('Thất bại');
        })
}

// Xử lý khi click vào button Edit
window.editItem = (id) => {

    // Ẩn nút Submit
    $('#btnSubmit').style.display = 'none';

    // Hiện nút Update
    $('#btnUpdate').style.display = 'block';

    // Thêm thuộc tính data-id cho btnUpdate
    $('#btnUpdate').setAttribute('data-id', id)

    // Lấy dữ liệu từ data
    let valueItem = getAPI(id);
    valueItem
        .then((result) => {
            console.info('Thành công')

            // Dom tới input, select để đẩy dữ liệu lấy được data vào input & select trên UI
            const listInput = $$('form#formProduct input, form#formProduct #select')
            listInput.forEach((element) => {
                const { name } = element

                // Swap dữ liệu khi name = type
                if (name === 'type') {
                    return result.data[name] === 'Samsung' ? element.value = '1' : element.value = '2'
                } else {
                    element.value = result.data[name]
                }
            })
        })
        .catch(() => {
            console.error('Thất bại');
        })
}

// Xử lý khi click vào button Delete
window.deleteItem = (id) => {

    // Gọi hàm xóa
    deleteProduct(id);
}

// Xử lý renderUI khi user click brand muốn xem
window.myChooseType = () => {
    // Lấy type user select
    let chooseType = $('#selectType').value;

    if (chooseType === '0') {
        getListProduct()
    } else {
        // Swap dữ liệu
        chooseType === '1' ? chooseType = 'Samsung' : chooseType = 'Iphone';

        // Lấy dữ liệu từ data
        let promise = getAPI()
        promise

            // Thành công
            .then((result) => {
                console.info('Thành công');

                // Tạo mảng chứa các product có type được select
                let arrType = [];

                // Duyệt mảng tìm type select
                result.data.forEach((item) => {
                    if (chooseType === item.type) {

                        // Đưa các product phù hợp vào mảng đã tạo
                        arrType.push(item)
                    }
                })
                // Hiển thị UI theo select 
                renderUI(arrType)
            })

            // Thất bại
            .catch(() => {
                console.error('Thất bại');
            })
    }


}

// Sử dụng onchange() như trên hoặc event(change) để lấy giá trị khi select brand
// $('#selectType').addEventListener('change', (e) => {
//     console.log(e.target.value)
// })

// Sắp xếp
window.myChooseSort = () => {
    let chooseSort = $('#selectSort').value;
    console.log(chooseSort)
    // Lấy dữ liệu từ data
    let promise = getAPI()
    promise

        // Thành công
        .then((result) => {
            console.info('Thành công');
            let arrSort = [...result.data];

            if (chooseSort === '1') {
                arrSort.sort(function(a, b) {
                    return a.price - b.price 
                })
            } else {
                arrSort.sort(function(a, b) {
                    return b.price - a.price 
                })
            }
            console.log("arrSort: ", arrSort);
            renderUI(arrSort)
        })

        // Thất bại
        .catch(() => {
            console.error('Thất bại');
        })

}

// Search samsung/ iphone
$('#searchTool').addEventListener('keyup', () => {
    let valueSearch = $('#searchTool').value.toLowerCase();
    let arrSearch = [];
    let promise = getAPI()
    promise

        // Thành công
        .then((result) => {
            console.info('Thành công');
            let searchData = result.data;
            searchData.forEach(itemSearch => {
                let checkeData = itemSearch.name.toLowerCase()
                if (checkeData.indexOf(valueSearch) !== -1) {
                    arrSearch.push(itemSearch)
                }
            })
            renderUI(arrSearch);
        })

        // Thất bại
        .catch(() => {
            console.error('Thất bại');
        })

    // for (var i = 0; i < DSNV.arrStaffList.length; i++) {
    //     var checkedRank = DSNV.arrStaffList[i].rank(DSNV.arrStaffList[i].workingHours).toLowerCase();
        
    //     if (checkedRank.indexOf(valueSearch) !== -1) {
    //         arrSearch.push(DSNV.arrStaffList[i]);
    //     };
    // };

    
});

// Xử lý sự kiện khi close modal
const myModalEl = document.getElementById('exampleModal')
myModalEl.addEventListener('hidden.bs.modal', () => {
    let arrSpan = $$('form#formProduct span');
    let arrInput = $$('form#formProduct input')
    arrSpan.forEach(i => { 
        i.style.display = 'none';
    }) 
    arrInput.forEach(i => {
        i.value = '';
    }) 
})