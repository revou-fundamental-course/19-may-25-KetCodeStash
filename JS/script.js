//element
const inputElem = document.getElementById('input');
const outputElem = document.getElementById('output');
const formulaElem = document.getElementById('formula');
const unitInputElem = document.getElementById('unit-input')
const unitOutputElem = document.getElementById('unit-output')

const textColorEffect = document.getElementsByClassName('text-color-effect');
const borderColorEffect = document.getElementsByClassName('border-color-effect'); 
//varibles
let unitInputLastIndex = unitInputElem.selectedIndex
let unitOutputLastIndex = unitOutputElem.selectedIndex
let hexCode = [6,7,8,9,10]

//process functions

//unvalid input
function wrongInput(){
    // inputElem.style.outline = '1px groove red'
    outputElem.value = ''
    formulaElem.value = 'Error: Invalid input'
    formulaElem.style.fontFamily = "'Courier New', Courier, monospace"
    formulaElem.style.color = 'red'
}

//result generation
function calculateConvertion(from, to, value){
    if(from == '°C' && to == '°F'){
        return (value*9/5)+32
    }else if(from == '°F' && to == '°C'){
        return (value-32)*5/9
    }else if(from == to) {
        return value
    }
}
function generateFormula(from, to, value, result){
    if(from == '°C' && to == '°F'){
        return `(${value}°C × 9/5) + 32 = ${result}°F;`
    }else if(from == '°F' && to == '°C'){
        return `(${value}°F - 32) × 5/9 = ${result}°C`
        changeColor(value);
    }else if(from == to) {
        return result
    }
}
function generateResult(){
    const value = parseInt(inputElem.value);
    const result = calculateConvertion(
        unitInputElem.value,
        unitOutputElem.value,
        value    
    );
    const formula =  generateFormula(
        unitInputElem.value,
        unitOutputElem.value,
        value,
        result
    );
    outputElem.value = result;
    formulaElem.value = formula;
    formulaElem.style.color = 'white';
    formulaElem.style.fontFamily = 'cursive'
}

//after unit changed
function swapValue(){
    const temp = outputElem.value;
    outputElem.value = inputElem.value;
    inputElem.value = temp;
}


//event function
function updateCalculator(){
    if(String(parseInt(inputElem.value)) == 'NaN'){
        wrongInput();
    }else{
        generateResult();
    }
}
function swapPlace(e){
    if(e.target == unitInputElem){
        if(unitInputElem.selectedIndex == unitOutputElem.selectedIndex){
            unitOutputElem.selectedIndex = unitInputLastIndex;
            swapValue();
        }
    }else if(e.target == unitOutputElem){
        if(unitInputElem.selectedIndex == unitOutputElem.selectedIndex){
            unitInputElem.selectedIndex = unitOutputLastIndex;
            swapValue();
        }
    }
    unitInputLastIndex = unitInputElem.selectedIndex;
    unitOutputLastIndex = unitOutputElem.selectedIndex;
    updateCalculator();
}
function onReset(){
    inputElem.value = '';
    outputElem.value = '';
    formulaElem.value = '';
    unitInputElem.selectedIndex = 0;
    unitOutputElem.selectedIndex = 1;

}


//runtime
// window.addEventListener('load', updateCalculator)
inputElem.addEventListener('click', updateCalculator);
inputElem.addEventListener('keyup', updateCalculator);
unitInputElem.addEventListener('change', swapPlace);
unitOutputElem.addEventListener('change', swapPlace);

unitOutputElem.selectedIndex = 1;