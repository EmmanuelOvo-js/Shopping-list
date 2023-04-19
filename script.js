const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemFilter = document.getElementById('filter')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')


//Event listener function
addItem = e => {
    e.preventDefault()

    // Valdate Input
    const newItem = itemInput.value
    if (newItem === '') {
        alert('Please add an item')
        return
    }

    //Create List Item
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(newItem))

    const button = createButton('remove-item btn-link text-red')
    //add to Created List Item
    li.appendChild(button)

    //append to the list item
    itemList.appendChild(li)

    // Call Reset function
    resetUI()

    /* This will enter an emty string when you click 
    add Item btn so that it does not show your tpyed value after submitting */
    itemInput.value = ''

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

removeItem = e => {
    if (e.target.parentElement.classList.contains('remove-item')) {
        e.target.parentElement.parentElement.remove();
    }
}

clearItems = () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
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
    const list = itemList.querySelectorAll('li') //querySelectorAll puts it in an array
    //check condition
    if (list.length === 0) {
        clearBtn.style.display = 'none'
        itemFilter.style.display = 'none'
    } else {
        clearBtn.style.display = 'block'
        itemFilter.style.display = 'block'
    }
}


//Event Listener
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('input', filterItems)

// Call Function
resetUI()