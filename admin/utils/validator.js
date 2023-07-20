// // Validator
// function Validator(option) {
//     let isCheck = true
//     function validate(inputElement, rule) {
//         // Biến lưu mess lỗi
//         let messErr = rule.test(inputElement.value)
//         // Biến lưu span hiển thị mess lỗi
//         let errElement = inputElement.parentElement.querySelector(option.errSelect)
//         if (messErr) {
//             errElement.style.display = 'block' // Có lỗi
//             errElement.innerText = messErr;

//         } else {
//             errElement.style.display = 'none' // Không lỗi (undefined)
//             errElement.innerText = ''
//         }
//         return !messErr; // false (Không lỗi)
//     }

//     let formSelector = document.querySelector(option.form)
//     if (formSelector) {

//         option.rule.forEach((rule) => {
//             let inputElement = formSelector.querySelector(rule.selector)
    
//             if (inputElement) {
//                 // Xử lý trường hợp khi blur
//                 inputElement.onblur = function () {
//                     let isValid = validate(inputElement, rule) // Trả về không lỗi
//                     if (!isValid) {
//                         isCheck &= true
//                     } else {
//                         isCheck &= false
//                     }
//                 }
//                 // Xử lý sự kiện user input
//                 inputElement.oninput = function () {
//                     let errElement = inputElement.parentElement.querySelector(option.errSelect)
//                     errElement.style.display = 'none'
//                     errElement.innerText = ''
//                 }
//             }
//         })
//     }
//     return isCheck
// }




// Validator.isRequired = function (selector) {
//     return {
//         selector,
//         test: function (value) {
//             return value.trim() ? undefined : 'Vui lòng nhập trường này'
//         }
//     }
// }


// export default Validator

/** Hàm kiểm tra chuỗi (có rỗng/ có độ dài đúng yêu cầu) không?
 * @param {string} value Chuỗi cần kiểm tra
 * @param {number} minLength Độ dài tối thiểu 
 * @param {number} maxLength Độ dài tối đa
 * @param {any} selector Thẻ chứa lỗi cần hiển thị
 * @param {string} messErr Lỗi hiển thị UI
 */
function checkedString(value, minLength, maxLength, selector, messErr) {
    if (value.trim().length < minLength || value.trim().length > Number(maxLength)) {
        document.querySelector(selector).innerHTML = messErr;
        document.querySelector(selector).style.display = 'block';
        return false;
    } else {
        document.querySelector(selector).innerHTML = '';
        return true;
    }
};

export default checkedString