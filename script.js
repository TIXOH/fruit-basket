//class Engine {
//    constructor(power = 100, capasity = 1.6, hasTurbo = false) {
//        this.power = power;
//        this.capasity = capasity;
//        this.hasTurbo = hasTurbo;
//    }
//}
//
//class Car {
//    constructor(model = 'default-model', weight = 1500, engine) {
//        this.model = model;
//        this.weight = weight;
//        this._engine = engine;
//    }
//    hasTurboEngine() {
//        return this._engine.hasTurbo ? true : false;
//    }
//}
//
//var enginNoTurbo1 = new Engine();
//var enginNoTurbo2 = new Engine(140, 1.8, false);
//var engingTurbo1 = new Engine(280, 2.5, true);
//var engingTurbo2 = new Engine(200, 2.0, true);
//
//var carAstra = new Car('Astra', 1800, enginNoTurbo1);
//var carVectra = new Car('Vectra', 2000, enginNoTurbo2);
//var carGalantVR4 = new Car('Veer', 1800, engingTurbo1);
//var carEvo = new Car('Evo', 1600, engingTurbo2);

class Fruits {
    constructor(name) {
        this.name = name;
        this.isDirty = true;
        this.isRotten = false;
        this.getRottened();
        this.rottenCallback;
    }
    getRottened() {
        setTimeout(() => {
            this.rottenCallback();
            this.isRotten = true;
        }, 5000);
    }
}

class Apple extends Fruits {
    constructor(name = 'default-apple-name', isWinter = false) {
        super();
        this.name = name;
        this.isWinter = isWinter;
    }
}

class Orange extends Fruits {
    constructor(name = 'default-orange-name', country = 'defaulte-orange') {
        super();
        this.name = name;
        this.counrty = country;
    }
}

class Pear extends Fruits {
    constructor(name = 'default-pear-name', type = 'default-type') {
        super();
        this.name = name;
        this.type = type;
    }
}

class Basket {
    constructor() {
        this._appleArray = [];
        this._orangeArray = [];
        this._pearArray = [];
        this.winterApplesCount = 0;
    }
    addProduct(item) {
        item.rottenCallback = this.fruitRotten.bind(this);
        switch (item.constructor.name) {
            case 'Orange':
                this._orangeArray.push(item);
                console.log('Orange ' + item.isDirty);
                break;
            case 'Apple':
                this._appleArray.push(item);
                console.log('Apple ' + item.isDirty);
                break;
            case 'Pear':
                this._pearArray.push(item);
                console.log('Pear ' + item.isDirty);
                break;
            default:
                console.log('Fuckoff');
        }
    }
    fruitRotten() {
        console.log('Фрукт стух в корзине');
    }
    getAllApples() {
        return this._appleArray;
    }
    getAllOranges() {
        return this._orangeArray;
    }
    getAllPears() {
        return this._pearArray;
    }
    clear() {
        this._appleArray = this._orangeArray = this._pearArray = [];
    }
    washAllItems() {
        for (let fruit of this._appleArray) {
            fruit.isDirty = false;
        }
        for (let fruit of this._orangeArray) {
            fruit.isDirty = false;
        }
        for (let fruit of this._pearArray) {
            fruit.isDirty = false;
        }
    }
}

class BasketView {
    constructor(basket) {
        this.array = ['Apple', 'Orange', 'Pear'];
        this.select = null;
        this.creatButton = null;
        this.nameInput = null;
        this.appleCheckbox = null;
        this.countryInput = null;
        this.pearTypeInput = null;
        this.addedProduct = null;
        this.basket = basket;
        this.render();
    }
    render() {
        this.select = document.createElement('select');
        for (let arr of this.array) {
            this.select.options[this.select.options.length] = new Option(arr, arr);
        }
        this.creatButton = document.createElement('button');
        this.creatButton.innerHTML = 'Create';
        this.creatButton.addEventListener('click', ()=>{
            this.addProductToBasket();
        });
        this.nameInput = document.createElement('input');
        this.nameInput.placeholder = 'Name';
        this.propertyBlock = document.createElement('div');
        this.container = document.querySelector('body');
        this.container.appendChild(this.select);
        this.container.appendChild(this.nameInput);
        this.container.appendChild(this.creatButton);
        this.container.appendChild(this.propertyBlock);
        this.select.addEventListener('change', () => {
            this.addProperty();
        });
    }
    addProperty() {
        this.removePropertys();
        switch (this.select.options[this.select.selectedIndex].value) {
            case 'Apple':
                this.appleCheckbox = document.createElement('input');
                this.appleCheckbox.type = 'checkbox';
                this.propertyBlock.appendChild(this.appleCheckbox);
                break;
            case 'Orange':
                this.countryInput = document.createElement('input');
                this.countryInput.placeholder = 'Country';
                this.propertyBlock.appendChild(this.countryInput);
                break;
            case 'Pear':
                this.pearTypeInput = document.createElement('input');
                this.pearTypeInput.placeholder = 'Type';
                this.propertyBlock.appendChild(this.pearTypeInput);
                break;
        }
    }
    removePropertys() {
        while (this.propertyBlock.firstChild) {
            this.propertyBlock.removeChild(this.propertyBlock.firstChild);
        }
    }
    addProductToBasket() {
        switch (this.select.options[this.select.selectedIndex].value) {
            case 'Apple':
                this.adddedProduct = new Apple(this.nameInput.value, this.appleCheckbox.checked);
                this.basket.addProduct(this.adddedProduct);
                break;
            case 'Orange':
                this.adddedProduct = new Orange(this.nameInput.value, this.countryInput.value);
                this.basket.addProduct(this.adddedProduct);
                break;
            case 'Pear':
                this.adddedProduct = new Pear(this.nameInput.value, this.pearTypeInput.value);
                this.basket.addProduct(this.adddedProduct);
                break;
        }
        this.showBasket();
    }
    showBasket() {
        console.log(this.basket.getAllApples());
        console.log(this.basket.getAllOranges());
        console.log(this.basket.getAllPears());
    }
}





var b1 = new Basket();
var bv = new BasketView(b1);