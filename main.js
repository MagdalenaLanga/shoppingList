let form1 = document.querySelector('.recipe-input');



//Tworzę constructor do kazdego ingridientu
function Ingridient(name, amount, unit) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
}

//input na nazwe przepisu
let recipeName = document.createElement('input');
recipeName.placeholder = 'Nazwa przepisu';
recipeName.className = "recipeName";
form1.appendChild(recipeName);

//przycisk do dodania input na kolejny skladnik
let addIngridients = document.createElement('button');
addIngridients.type = 'button';
addIngridients.textContent = 'Dodaj składnik';
addIngridients.addEventListener('click', listOfIngridients);
form1.appendChild(addIngridients);

//przycisk do dodania calego przepisu
let addRecipeList = document.createElement('button');
addRecipeList.type = 'button';
addRecipeList.textContent = 'Dodaj przepis do listy';
addRecipeList.addEventListener('click', printRecipe);
form1.appendChild(addRecipeList);
    
//dodawanie input dla kolejnych skladnikow
function listOfIngridients() {

    if (recipeName.value !== '') {
    let ingridient = document.createElement('div');
    ingridient.className = 'ingridient';
    form1.appendChild(ingridient);

    makeInput(ingridient, 'ingName', 'Nazwa składnika');
    makeInput(ingridient, 'ingAmount', 'Ilość');
    makeInput(ingridient, 'ingUnit', 'Jednostka');
    } else {
        alert('Wpisz nazwę przepisu')
    }
}

function makeInput(parent, className, placeholderName) {
    let result = document.createElement('input');
    result.className = className;
    result.placeholder = placeholderName;
    parent.appendChild(result);
}

//czyszczenie inputow
function clear(){
    let ingridient = document.querySelectorAll('.ingridient');
    recipeName.value = '';

    ingridient.forEach((element) => form1.removeChild(element))
}

//z listy skladnikow tworzy nowy obiekt ingridient i zwraca tablice obiektow
function getValue() {
    let ingridients = document.querySelectorAll('.ingridient');
    let result = [];

    for (ing of ingridients) {
        let ingName = ing.querySelector('.ingName');
        let ingAmount = ing.querySelector('.ingAmount');
        let ingUnit = ing.querySelector('.ingUnit');

        result.push(
            new Ingridient(ingName.value, ingAmount.value, ingUnit.value)
        );
    }

    return result;
}

//wyswietlanie skladnikow przepisu
function printRecipe() {
    //wyswietlanie nazwy przepisu
    let result = getValue();
    
    if (recipeName.value !== '' && result.length > 0) {
        let recipeHead = document.createElement('form');
        recipeHead.className = 'recipe-list';

        let recipeCheck = document.createElement('input');
        recipeCheck.type = "checkbox";
        recipeCheck.className = 'add-whole';

        let label = document.createElement('label');
        label.className = 'header';
        label.textContent = recipeName.value;

        document.body.appendChild(recipeHead);
        recipeHead.appendChild(recipeCheck);
        recipeHead.appendChild(label);

        //wyswietlanie kazdego skladnika w osobnym divie i dodawanie do niego checkboxa
        for (let i=0; i<result.length; i++) {
            if (result[i]!== '' && result[i].amount !== '' && result[i].unit !== ''){
                let list = document.createElement('div');
                // list.className = "add-ingr";
                recipeHead.appendChild(list);

                let checkBox = document.createElement('input');
                checkBox.type = "checkbox";
                checkBox.className = 'add-ingr';
                checkBox.addEventListener('change', makeShoppingList);
                checkBox.setAttribute('data-name', result[i].name);
                checkBox.setAttribute('data-amount', result[i].amount);
                checkBox.setAttribute('data-unit', result[i].unit);
                list.appendChild(checkBox);

                let label = document.createElement('label');
                label.textContent = result[i].name + ' ' + result[i].amount + ' ' + result[i].unit;
                list.appendChild(label);
            }
        } 
        clear();
    } else {
        alert('Dodaj składnik')
    }   
    shoppingList();
    let form2 = document.querySelector('.shopping');
    document.body.appendChild(form2);
}

//tworzenie listy zakupów
//Jezeli 'add-whole jest zaznaczone to zaznaczaja sie pozostale checkboxy
function shoppingList() {
    let items = document.querySelectorAll('.recipe-list');
    
    for (let i=0; i<items.length; i++) {
        let ingridientsToShopp = items[i]
        items[i][0].addEventListener('change' , () => {
        if (items[i][0].checked == true) {
            for (let j=0; j<ingridientsToShopp.length; j++) {
            ingridientsToShopp[j].checked = true;
            makeShoppingList();
            }
        } else { 
            for (let j=0; j<ingridientsToShopp.length; j++) {
            ingridientsToShopp[j].checked = false;}
            makeShoppingList();
            }
        })
    }
}

function makeShoppingList() {

    let form2 = document.querySelector('.shopping');
    let checked = document.querySelectorAll('.add-ingr');
    let header = document.querySelector('h1');
    header.classList.remove('hidden');

    let container;

    if (container !== null) {
        let containers = document.querySelectorAll(".container")
        for (i=0; i<containers.length; i++){
            form2.removeChild(containers[i])
        }
    }

    checked.forEach (
        (element) => { 
            if (element.checked === true) {
                container = document.createElement('div');
                container.classList = "container";
                let shoppItems = element.cloneNode(true);
                shoppItems.checked = false;

                let label = document.createElement('label');
                let name = shoppItems.getAttribute('data-name');
                let amount = shoppItems.getAttribute('data-amount');
                let unit = shoppItems.getAttribute('data-unit');
                label.textContent = name + ' ' + amount + ' ' + unit;
                
                form2.appendChild(container);
                container.appendChild(shoppItems);
                container.appendChild(label);
                console.log(shoppItems);
            }
        }
    )
}





