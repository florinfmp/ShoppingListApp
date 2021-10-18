// variables
const items = [];
const existingCategories = [];
const welcomeMessage = document.getElementById('welcomeMessage');
const addBtn = document.getElementById('addBtn');
const addItemBtn = document.getElementById('addItemBtn');
const inputField = document.getElementById('inputField');
const errorMessage = document.getElementById('errorMessage');
const filterElement = document.getElementById('filterElement');
const appliedFilter = document.getElementById('appliedFilter');
const clearFilter = document.getElementById('clearFilter');
const mainTable = document.getElementById('mainTable');
const tableHead = document.getElementById('tableHead');
const tableBody = document.getElementById('tableBody');
const sortNameAsc = document.getElementById('sortNameAsc');
const sortNameDes = document.getElementById('sortNameDes');
const clearSort = document.getElementById('clearSort');
// const sortCatAsc = document.getElementById('sortCatAsc');
// const sortCatDes = document.getElementById('sortCatDes');
let validity = false;
let globalID = 1;
let editID = -1;
let activeSort = 'noSort'; // asc, des
let activeFilter = ''; // drinks, bakery, meat, vegetables, fruits, sweets, spices, other
let indexActiveFilter = '';

// display the welcome message
if (items.length !== 0) {
    welcomeMessage.classList.add('displayOff');
};

// display the Shopping List
addBtn.addEventListener('click', () => {
    welcomeMessage.classList.add('displayOff');
});

// event listeners
addItemBtn.addEventListener('click', shoppingList);

sortNameAsc.addEventListener('click', () => {
    activeSort = 'asc';
    sortNameAsc.classList.add('borderActive');
    sortNameDes.classList.remove('borderActive');
    clearSort.classList.remove('borderActive');
    displayList(items, activeSort, activeFilter);
});

sortNameDes.addEventListener('click', () => {
    activeSort = 'des';
    sortNameAsc.classList.remove('borderActive');
    sortNameDes.classList.add('borderActive');
    clearSort.classList.remove('borderActive');
    displayList(items, activeSort, activeFilter);
});

clearSort.addEventListener('click', () => {
    activeSort = 'noFilter';
    sortNameDes.classList.remove('borderActive');
    sortNameAsc.classList.remove('borderActive');
    // clearSort.classList.add('borderActive');
    displayList(items, activeSort, activeFilter);
});

appliedFilter.addEventListener('change', () => {
    // get category from appliedFilter array
    activeFilter = appliedFilter.value;
    // get selected index from appliedFilter array
    // indexActiveFilter = appliedFilter.selectedIndex;

    displayList(items, activeSort, activeFilter);
});

clearFilter.addEventListener('click', () => {
    appliedFilter.selectedIndex = 0;
    activeFilter = "";
    displayList(items, activeSort, activeFilter)

})

// set category from array
    // document.querySelector(`#select-${elem.id}`).selectedIndex = elem.selIndexCategory;
// get category from appliedFilter array

// set category from appliedFilter array
// document.querySelector('#appliedFilter').selectedIndex = index;

// functions
function shoppingList() {
    validateInput();
    buildList();
    resetInputField();
    displayList(items, activeSort, activeFilter);
}

function validateInput() {
    if (inputField.value === '') {
        inputField.classList.add('formInputInvalid');
        errorMessage.classList.add('visibleOn');
        validity = false;
    } else {
        inputField.classList.remove('formInputInvalid');
        errorMessage.classList.remove('visibleOn');
        validity = true;
    };
};

function buildList() {
    if(validity) {
        if(editID === -1) {
            let newItemInList = {
                id: globalID,
                name: inputField.value,
                buyStatus: false,
                category: '',
                selIndexCategory: ''
            };
            globalID++;
            items.push(newItemInList);
        } else {
            let itemToEdit = getItemById(editID);
            itemToEdit.name = inputField.value;
            editID = -1;
        }
    }
}

function getItemById(id) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            return items[i];
        }
    }
};

function resetInputField() {
    inputField.value = '';
    inputField.focus();
};

function displayList(arrayForList, sortCriteria, filterCriteria) {
    // reset table
    tableBody.innerHTML = ''
    // show table head
    if (arrayForList.length !== 0) {
        filterElement.classList.add('visibleOn');
        mainTable.classList.add('visibleOn');
    } else {
        filterElement.classList.remove('visibleOn');
        mainTable.classList.remove('visibleOn');
    }
    // iterate the array to build rows

    switch (sortCriteria) {
        case 'asc':
            arrayForList.sort((a, b) => (a.name > b.name) ? 1 : -1);
            if (filterCriteria) {
                let filteredArrayForList = arrayForList.filter(elem => elem.category === filterCriteria);
                for (let i = 0; i < filteredArrayForList.length; i++) {
                    addRow(filteredArrayForList[i]);
                };
            } else {
                for (let i = 0; i < arrayForList.length; i++) {
                    addRow(arrayForList[i]);
                };
            };
            break;
        case 'des':
            arrayForList.sort((a, b) => (a.name < b.name) ? 1 : -1);
            if (filterCriteria) {
                let filteredArrayForList = arrayForList.filter(elem => elem.category === filterCriteria);
                for (let i = 0; i < filteredArrayForList.length; i++) {
                    addRow(filteredArrayForList[i]);
                };
            } else {
                for (let i = 0; i < arrayForList.length; i++) {
                    addRow(arrayForList[i]);
                };
            };
            break;

        default:
            arrayForList.sort((a, b) => (a.id > b.id) ? 1 : -1);
            if (filterCriteria) {
                let filteredArrayForList = arrayForList.filter(elem => elem.category === filterCriteria);
                for (let i = 0; i < filteredArrayForList.length; i++) {
                    addRow(filteredArrayForList[i]);
                };
            } else {
                for (let i = 0; i < arrayForList.length; i++) {
                    addRow(arrayForList[i]);
                };
            };
            break;
    }
}

function addRow(elem) {
    let checkCell = document.createElement('td');
    checkCell.innerHTML = `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id='box-${elem.id}' onclick="markEntry(${elem.id})">
            <label class="form-check-label" for="box-${elem.id}"></label>
        </div>
    `;

    let nameCell = document.createElement('td');
    nameCell.innerText = elem.name;
    if (elem.buyStatus == true) {
        nameCell.classList.add('markedText');
    } else {
        nameCell.classList.remove('markedText');
    }

    let categoryCell = document.createElement('td');
    categoryCell.innerHTML = `
        <div class='btn-toolbar'>
            <select id='select-${elem.id}' class='form-select form-select-sm' aria-label='.form-select-sm example' onchange="setCategory(${elem.id})">
                <option selected disabled value=''>Select</option>
                <option value='drinks'>Drinks</option>
                <option value='bakery'>Bakery</option>
                <option value='meat'>Meat</option>
                <option value='vegetables'>Vegetables</option>
                <option value='fruits'>Fruits</option>
                <option value='sweets'>Sweets</option>
                <option value='spices'>Spices</option>
                <option value='other'>Other</option>
            </select>
        </div>
    `;

    let renameCell = document.createElement('td');
    renameCell.innerHTML = `<button type='button' class='btn btn-outline-primary btn-sm m-0 px-2 renameBtnHeight' onClick='renameEntry(${elem.id})'>Rename</button>`;

    let closeCell = document.createElement('td');
    closeCell.innerHTML = `<button type='button' class='btn-close' aria-label='Close' onClick='removeEntry(${elem.id})'></button>`;


    var row = document.createElement('tr');
    row.style.height = '30px';
    row.classList.add('align-middle');
    row.appendChild(checkCell);
    row.appendChild(nameCell);
    row.appendChild(categoryCell);
    row.appendChild(renameCell);
    row.appendChild(closeCell);

    tableBody.appendChild(row);

    // set box checked/unchecked from array
    document.querySelector(`#box-${elem.id}`).checked = elem.buyStatus;

    // set category from array
    document.querySelector(`#select-${elem.id}`).selectedIndex = elem.selIndexCategory;
};

function renameEntry(entryId) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === entryId) {
            inputField.value = items[i].name;
            editID = items[i].id;
            break;
        }
    }
};

function removeEntry(entryId) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === entryId) {
            items.splice(i, 1);
            displayList(items, activeSort, activeFilter);
            break;
        }
    }
};

function markEntry(entryId) {
    let markStatus = document.getElementById(`box-${entryId}`).checked;
    console.log(markStatus);
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === entryId) {
            if(markStatus === true) {
                items[i].buyStatus = true;
            } else {
                items[i].buyStatus = false;
            };
            displayList(items, activeSort, activeFilter);
            break;
        };
    };

}

function setCategory(entryId) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === entryId) {
            // for value
            let selectedValue = document.querySelector(`#select-${entryId}`).value;
            items[i].category = selectedValue;
            // for index
            let selIndex = document.querySelector(`#select-${entryId}`).selectedIndex;
            items[i].selIndexCategory = selIndex;
            displayList(items, activeSort, activeFilter);
            break;
        };
    };
}


// window.addEventListener('load', (event) => {
//     console.log('page is fully loaded');
//     if (items.length !== 0) {
//         welcomeMessage.classList.add('visibleOff');
//     }
// });
