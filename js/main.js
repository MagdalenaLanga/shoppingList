//module NewElement
class NewElement {
    constructor(tag, parent){
        this.tag = tag;
        this.parent = parent;
    }

    newInput(className, placeholder) {
        this.parent.insertAdjacentHTML("beforeEnd", `<${this.tag} class=${className} placeholder=${placeholder}>`)
    }

    newButton(btnText, callback) {
        let button = this.newBasic()
        button.type = "button";
        button.textContent = btnText;
        button.addEventListener('click', callback);
    }

    newBasic() {
        let element = document.createElement(this.tag);
        this.parent.appendChild(element);
        return element;
    }
}

//module Input Values
class InputValues {
    constructor(name, ingridientName, amount, unit) {
        this.name = name;
        this.ingridientName = ingridientName;
        this.amount = amount;
        this.unit = unit;
    }
};


const tabs = document.querySelectorAll(".tab");
tabs.forEach(tab => {
    tab.addEventListener("click", event => {
        document.querySelector(".active")?.classList.remove('active');
        event.currentTarget.classList.add("active");

        let data = event.currentTarget.dataset.show
        let forms = document.querySelectorAll("form");
        forms.forEach(form => {form.classList.add("hidden")});
        let visible = document.querySelector(`.${data}`)
        visible.classList.remove("hidden")
    })
})


/////////////////////////////////////////////
//Add recipe

//Adds event listeners to add ingridient and add recipe buttons
const recipe = () => {
const addIngBtn = document.querySelector("#add-ingridient-btn");
addIngBtn.addEventListener("click", addIngBtnOnClick);

//add whole reipe btn
const addRecipeBtn = document.querySelector("#add-recipe-btn");
addRecipeBtn.addEventListener("click", printRecipe);
};

const addIngBtnOnClick = () => {

    //checks if the name has been entered and makes divs to append inputs to
    const recipeName = document.querySelector(".recipe-name")
    const ingInputs = document.querySelector(".ing-inputs")
    let ingridient;

    if (recipeName.value !== '') {
        ingInputs.insertAdjacentHTML("beforeEnd", `<div class="ingridient"></div>`);
        let ingridients = document.querySelectorAll(".ingridient");
        ingridient = ingridients[ingridients.length-1];

    } else {
        alert('Wpisz nazwę przepisu')
    }

    makeInputsForIngs(ingridient);
}

const makeInputsForIngs = (ingridient) => {
    const ingName = new NewElement("input", ingridient).newInput("ingName", "Nazwa składnika");
    const ingAmount = new NewElement("input", ingridient).newInput("ingAmount", "Ilość");
    const ingInputs = document.querySelector(".ing-inputs")

    const select = new NewElement("select", ingridient).newBasic();
    const units = ["kg", "dkg", "g", "l", "ml", "szczypta"]
    units.forEach(unit => {
        select.insertAdjacentHTML("beforeEnd", `<option value=${unit}>${unit}</option>`)
    })

    const removeBtn = new NewElement("button", ingridient).newButton("-", () => {
        ingInputs.removeChild(ingridient);
    });
}

const printRecipe = () => {
    addCheckboxes();
    clear();
}

const addCheckboxes = () => {
    const allIngridients = collectValues();
    const recipesList = document.querySelector(".recipes-list");
    recipesList.insertAdjacentHTML("beforeend", `<div class="container"><div>+</div><div class="name">${allIngridients[0].name}</div><div class="whole hidden"></div></div>`);
    let whole = document.querySelector("div:last-child.container > div.whole");

    allIngridients.forEach(ing => {
        if ((ing.ingridientName && ing.amount && ing.unit) !== "") {
            whole.insertAdjacentHTML("beforeEnd",
                `<div class="item">
                    <input type="checkbox">
                    <span>${ing.ingridientName} ${ing.amount} ${ing.unit}</span>
                </div>`
            )
        } else {
            alert("Wpisz składnik")
        }
    })
    hideIngridients();
}

// clear inputs after clicking on 'add whole recipe'
const clear = () => {
    let ingridients = document.querySelector(".ing-inputs");
    ingridients.textContent = "";

    document.querySelector(".recipe-name").value="";
}

//colecting input values
const collectValues = () => {
    const allIngridients = [];
    let recipeName = document.querySelector(".recipe-name");
    let inputs = document.querySelectorAll(".ingridient");
    const inputsChildren = [];

    for (i=0; i<inputs.length; i++) {
        let child = inputs[i].children;
        inputsChildren.push(child);
    }

    for (i=0; i<inputsChildren.length; i++) {
        if (recipeName.value && inputsChildren[i][0].value && inputsChildren[i][1].value && inputsChildren[i][0].value) {
        let ingridient = new InputValues(recipeName.value, inputsChildren[i][0].value, inputsChildren[i][1].value, inputsChildren[i][2].value);
        allIngridients.push(ingridient);
        }
    }

    return allIngridients;
}

const hideIngridients = () => {
const element = document.querySelector("div:last-child.container > .name");
console.log(element);
    element.addEventListener("click", event => {
        let ing = event.currentTarget.nextSibling;
        ing.classList.toggle("hidden");
    })
}

///////////////
//preparing shopping list
recipe();





