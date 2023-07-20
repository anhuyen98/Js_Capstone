function renderUI(arr) {
    let htmlContent = '';
    arr.forEach(element => {
        htmlContent += `
        <tr>
            <th scope="row">${element.id}</th> 
            <td>${element.name}</td>
            <td>
                <img src=${element.img} style="width:100px; height:100px">
            </td>
            <td>${element.desc}</td>
            <td class="text-center" style="font-size: 20px"><span
                class="badge text-bg-warning rounded-pill">${element.price} $</span></td>
            <td>
                <button onclick="editItem(${element.id})" data-bs-toggle="modal"
                data-bs-target="#exampleModal" type="button" class="btn btn-success">Edit</button>
                <button onclick="deleteItem(${element.id})" type="button" class="btn btn-danger">Delete</button>
            </td>
        </tr>
        `
    });
    document.getElementById('tbody').innerHTML = htmlContent;
}

export default renderUI