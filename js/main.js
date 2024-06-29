var siteNameInput = document.getElementById('bookmarkName');
var bookURL = document.getElementById('bookmarkURL');
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.getElementById("alert");

var sitesContainer = [];


if (localStorage.getItem("sitesContainer") != null) {
    sitesContainer = JSON.parse(localStorage.getItem("sitesContainer"));

    displaySite();
}


function AddSite() {
    if (validationbookName() == true && validationbookURL() == true) {
        var site = {
            bookmarkName: siteNameInput.value,
            url: bookURL.value,
        }
        sitesContainer.push(site);
        localStorage.setItem("sitesContainer", JSON.stringify(sitesContainer));
        displaySite();
        clearForm();
    }
}


function displaySite() {
    var cartona = ``;
    for (let i = 1; i < sitesContainer.length; i++) {
        cartona += `
            <tr class="text-center">
                <td>${i}</td>                   
                <td>${sitesContainer[i].bookmarkName}</td>                 
                <td><a class="btn btn-visit bg-success text-white" href="${sitesContainer[i].url}" target="_blank><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                <td><button onclick="deleteSite(${i})" class="btn btn-outline-danger btn-sm w-50 my-2"> Delete <i class="fas fa-trash-alt"></i></button></td>     
            </tr>`
    }

    document.getElementById("tableBody").innerHTML = cartona;
}

function clearForm() {
    siteNameInput.value = null;
    bookURL.value = null;
}

function deleteSite(deletedIndex) {
    sitesContainer.splice(deletedIndex, 1);
    displaySite();
    localStorage.setItem('sites', JSON.stringify(sitesContainer));
    console.log(sitesContainer);
}


// validation

function validationbookName() {
    var nameregex = /^[A-Z][a-z]{3,20}[0-9]*$/;

    if (nameregex.test(siteNameInput.value) == true) {
        document.getElementById("alert").classList.replace("d-block", "d-none");

        return true;
    }

    document.getElementById("alert").classList.replace("d-none", "d-block");
    return false;
}

function validationbookURL() {
    var URLregex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

    if (URLregex.test(bookURL.value) == true) {
        document.getElementById("alert").classList.replace("d-block", "d-none");

        return true;
    }

    document.getElementById("alert").classList.replace("d-none", "d-block");
    return false;
}


function bookURL() {
    if (URLregex.test(bookURL.value)) {
        open(bookURL.value);
    }
}

function closeModal() {
    boxModal.classList.add("d-none");
}

closeBtn.addEventListener("click", closeModal);
