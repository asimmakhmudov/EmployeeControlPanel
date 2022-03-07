// Data Path
const dataPath = "./data/db.json"
const url = "http://localhost:8000/employees";
// All data display here
const details = document.querySelector('.details')

// input value. Enter employee data
const Person = document.querySelector('.Person')
const nam = document.querySelector('#name')
const surname = document.querySelector('#surname')
const age = document.querySelector('#age')
const salary = document.querySelector('#salary')
const sex = document.querySelector('#sex')
const addBtn = document.querySelector('.addBTN');

// Fetching data path
fetch(dataPath).then(function (res) {
    return res.json()
}).then(function (data) {
    displayData(data.employees)
}).catch(function () {
    return console.log("error")
})

// Dislay data function
function displayData(data) {
    data.map(person => {
        details.innerHTML += `
            <tr>
                <th scope="row" class="personid">${person.id}</th>
                <td>${person.name}</td>
                <td>${person.surname}</td>
                <td>${person.age}</td>
                <td>${person.salary}$</td>
                <td>${person.sex}</td>
                <td class="del">
                    <button class="btnFordelete bg-danger" type="button" value="delete" onclick=deleteEmployee(${person.id})>&#x78</button>
                </td>
            </tr>
        `
    })
}

// posting new data to port 8000
function pushDatatoJson() {
    const data = {
        // id: randomId(), 
        name: nam.value,
        surname: surname.value,
        age: age.value,
        salary: salary.value,
        sex: sex.value
    }
    if(nam.value == '' || surname.value == '' || age.value == '' || salary.value == ''){
        return alert("please fill all gaps");
    }
    else{
        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            console.log('added');
        }).catch(err => {
            console.log(err);
        });
    }
}

// Delete data function
function deleteEmployee(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    }).then(() => {
        console.log("deleted");
    }).catch(err => {
        console.log(err);
    });
}

// Evemt listener for buttons
addBtn.addEventListener('click', function (e) {
    e.preventDefault()
    pushDatatoJson()
})