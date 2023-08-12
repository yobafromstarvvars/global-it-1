const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", searchSubmitted);

let itemRow = document.getElementsByClassName("article-row")[0];

// Fill the itemRow with elements
fetchElements('');

function fetchElements(searchString) {
    //// Fetch the string from a database

    fetch("http://127.0.0.1:3000?term=" + encodeURIComponent(searchString))
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            console.log("Request was not successful");
        }
    })
    .then(data => {
        updateList(data);
    })
    .catch(error => console.log("Error"));
}


function addCardToList(name, phone, email) {
    //// Add one card to the list with given information

    let itemCard = document.createElement("div");
    let itemCardContents = `
        <div class="col">
            <article class="article-body" data-bs-toggle="modal" data-bs-target="#infoModal">
                <h2 class="article-title">${name}</h2>
                <div class="vstack gap-2">
                    <div class="d-flex align-items-center">
                        <img class="img-fluid me-2" src="./assets/img/Frame 4806.svg" alt="Phone">
                        <p class="article-text m-0">${phone}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <img class="img-fluid me-2" src="./assets/img/Frame 4807.svg" alt="Email">
                        <p class="article-text m-0">${email}</p>
                    </div>
                </div>
            </article>
        </div>`;
    itemCard.innerHTML = itemCardContents;
    itemRow.append(itemCard);
    itemCard.addEventListener("click", openModal);
}


function searchSubmitted(event) {
    //// Retrieve a search string from an input and fetch results

    event.preventDefault();
    // Get input element
    let searchInput = event.target[0];
    fetchElements(searchInput.value);
}


function updateList(data) {
    //// Remove all items from the list and Add fetched items

    // Remove all items
    let itemRow = document.getElementsByClassName("article-row")[0];
    while (itemRow.hasChildNodes()) {
        itemRow.removeChild(itemRow.firstChild);
    } 
    // Add items from 'data' - fetched items
    for (let index = 0; index < data.length; index++) {
        let item = data[index];
        addCardToList(item.name, item.phone, item.email);
    }
}


function openModal(event) {
    //// Fetch data of the clicked card & insert it into modal

    let card = event.currentTarget;
    let articleTitle = card.getElementsByClassName("article-title")[0];
    // Modal info
    let modal = document.getElementById("infoModal");
    let modalTitle = modal.getElementsByClassName("modal-title")[0];
    let modalPhone = modal.getElementsByClassName("modal-phone")[0];
    let modalEmail = modal.getElementsByClassName("modal-email")[0];
    let modalPosition = modal.getElementsByClassName("modal-position")[0];
    let modalDepartment = modal.getElementsByClassName("modal-department")[0];
    let modalHireDate = modal.getElementsByClassName("modal-hire-date")[0];
    let modalAdditionalInfo = modal.getElementsByClassName("modal-additional-info")[0];
    // Fetch card data
    fetch("http://127.0.0.1:3000?term=" + encodeURIComponent(articleTitle.innerText))
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            console.log("Request was not successful");
        }
    })
    .then(data => {
        modalTitle.innerText = data[0].name;
        modalPhone.innerText = data[0].phone;
        modalEmail.innerText = data[0].email;
        modalPosition.innerText = data[0].position_name;
        modalDepartment.innerText = data[0].department;
        modalHireDate.innerText = data[0].hire_date;
        // If fetched data doesn't have 'additional_info' field
        if (data[0].additional_info === undefined) {
            modalAdditionalInfo.innerText = "Дополнительная информация отсутствует.";
            return
        }
        modalAdditionalInfo.innerText = data[0].additional_info;
    })
    .catch(error => console.log("Error"));
}