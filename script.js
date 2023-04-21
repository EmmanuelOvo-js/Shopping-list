const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemFilter = document.getElementById('filter')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const formBtn = itemForm.querySelector('button')
let isEditMode = false


//Event listener functions
displayItems = () => {
    const itemsFromStorage = getItemsFromStorage() //loading items from this array
    itemsFromStorage.forEach((item) => addItemToDOM(item))

    // Call Reset function
    resetUI()
}

onAddItemSubmit = e => {
    e.preventDefault()

    // Valdate Input
    const newItem = itemInput.value
    if (newItem === '') {
        alert('Please add an item')
        return
    }

    //check for edit mode. It is basically replacing the value in the localstorage
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode')

        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove()
        isEditMode = false
    }

    //Create item DOM element
    addItemToDOM(newItem)

    // Add item to local storage
    addItemToStorage(newItem)

    // Call Reset function
    resetUI()

    /* This will enter an emty string when you click 
    add Item btn so that it does not show your tpyed value after submitting */
    itemInput.value = ''

}

addItemToDOM = item => {
    //Create List Item
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(item))

    const button = createButton('remove-item btn-link text-red')
    //add to Created List Item
    li.appendChild(button)

    //append to the list item
    itemList.appendChild(li)
}


createButton = classes => {
    const button = document.createElement('button')
    button.className = classes
    const icon = createIcon('fa-solid fa-xmark')
    // append
    button.appendChild(icon)
    return button
}

createIcon = classes => {
    const icon = document.createElement('i')
    icon.className = classes
    return icon
}

//Add to local Storage
addItemToStorage = (item) => {
    //check to see if there are items in local Storage
    const itemsFromStorage = getItemsFromStorage()

    //Add new item to array
    itemsFromStorage.push(item)

    //Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
};

getItemsFromStorage = () => {
    //"items" is the Key in LocalStorage
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemsFromStorage
}

onClickItem = e => {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
    } else {
        setItemToEdit(e.target)
    }
}

setItemToEdit = item => {
    isEditMode = true

    itemList
        .querySelectorAll('li')
        .forEach((i) => i.classList.remove('edit-mode'))

    item.classList.add('edit-mode')

    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
    formBtn.style.backgroundColor = '#228B22'

    //Puts the initail value in the input field
    itemInput.value = item.textContent
}

removeItem = item => {
    if (confirm('Are you sure?')) {
        // Remove item from DOM
        item.remove()

        // Remove item from storage
        removeItemFromStorage(item.textContent)
    }
}

removeItemFromStorage = item => {
    let itemsFromStorage = getItemsFromStorage()
    //Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item)

    //Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

clearItems = () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }

    // clear from localStorage
    localStorage.removeItem('items')

    // Call Reset function
    resetUI()

}

//Search field
filterItems = (e) => {
    const list = itemList.querySelectorAll('li')
    const text = e.target.value.toLowerCase()

    list.forEach((list) => {
        //get text in li element
        const listName = list.innerText.toLowerCase()

        //compare if list index matches the input text value
        if (listName.indexOf(text) != -1) {
            list.style.display = 'flex'
        } else {
            list.style.display = 'none'
        }
    })
}

//Reset Ui if list === 0
resetUI = () => {
    // itemInput.value = ''

    const list = itemList.querySelectorAll('li') //querySelectorAll puts it in an array
    //check condition
    if (list.length === 0) {
        clearBtn.style.display = 'none'
        itemFilter.style.display = 'none'
    } else {
        clearBtn.style.display = 'block'
        itemFilter.style.display = 'block'
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    formBtn.style.backgroundColor = '#333'

    isEditMode = false
}


//Event Listener
itemForm.addEventListener('submit', onAddItemSubmit)
itemList.addEventListener('click', onClickItem)
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayItems)

// Call Function
resetUI()