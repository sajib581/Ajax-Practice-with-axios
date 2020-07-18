import axios from 'axios';

const BASE_URL = "http://localhost:3000/contacts"

window.onload = function() {
    let tbody = document.querySelector("#tbody")
    axios.get(BASE_URL)
        .then(res => {
            res.data.forEach(user => {
                showElement(user, tbody)
            });
        })
        .catch(e => {
            console.log(e);
        })
    let saveBtn = document.querySelector('#saveBtn')
    saveBtn.addEventListener('click', () => {
        createContact()
    })

}

function createContact() {
    let nameData = document.querySelector('#nameData');
    let phoneData = document.querySelector('#phoneData');
    let emailData = document.querySelector('#emailData');

    let dataObj = {
        name: nameData.value,
        phone: phoneData.value,
        email: emailData.value
    }
    axios.post(BASE_URL, dataObj)
        .then(res => {
            let tBody = document.querySelector('#tbody')
            showElement(res.data, tBody)

            nameData.value = ""
            phoneData.value = ""
            emailData.value = ""
        })
        .catch(e => {
            console.log(e);
        })
}

function showElement(user, parentsElement) {

    let TR = document.createElement("tr")

    let tdName = document.createElement("td")
    tdName.innerHTML = user.name ? user.name : "N/A"
    TR.appendChild(tdName)

    let tdPhone = document.createElement('td')
    tdPhone.innerHTML = user.phone ? user.phone : "N/A"
    TR.appendChild(tdPhone)

    let tdEmail = document.createElement('td')
    tdEmail.innerHTML = user.email ? user.email : "N/A"
    TR.appendChild(tdEmail)

    let tdButton = document.createElement('td')

    let editBtn = document.createElement('button')
    editBtn.className = "btn btn-warning"
    editBtn.innerHTML = "Edit"
    editBtn.addEventListener('click', () => {

        $('#updateContact').modal('toggle')

        let update_name = document.querySelector('#contact-name')
        let update_phone = document.querySelector('#contact-phone')
        let update_email = document.querySelector('#contact-email')

        let updateBtn = document.querySelector('#updateBtn')

        update_name.value = user.name;
        update_phone.value = user.phone ? user.phone : "";
        update_email.value = user.email ? user.email : "";

        updateBtn.addEventListener('click', () => {
            let updateContact = {
                name: update_name.value,
                phone: update_phone.value,
                email: update_email.value
            }
            axios.put(`${BASE_URL}/${user.id}`, updateContact)
                .then(res => {
                    tdName.innerHTML = res.data.name
                    tdPhone.innerHTML = res.data.phone
                    tdEmail.innerHTML = res.data.email

                    $('#updateContact').modal('hide')
                })
                .catch(e => {
                    console.log(e);
                })
        })

    })
    tdButton.appendChild(editBtn)

    let deleteBtn = document.createElement('button')
    deleteBtn.className = "btn btn-danger mx-1"
    deleteBtn.innerHTML = "Delete"
    deleteBtn.addEventListener('click', function() {
        axios.delete(`${BASE_URL}/${user.id}`)
            .then(res => {
                parentsElement.removeChild(TR);
            })
            .catch(e => {
                console.log(e);
            })
    })
    tdButton.appendChild(deleteBtn)
    TR.appendChild(tdButton)

    parentsElement.appendChild(TR)

}