function makeGrid() {
    nsize = document.querySelector('.sizebox').value;

    const containter = document.querySelector('#container');
    containter.innerHTML = '';
    const boxrow = document.createElement('div');
    boxrow.classList.add('boxrow');

    for (let i = 0; i < nsize; i++) {
        const boxrow = document.createElement('div');
        boxrow.classList.add('boxrow');
        for (let j = 0; j < nsize; j++) {

            const box = document.createElement('div');
            box.classList.add('box');
            box.color =255;
            //box.addEventListener('mouseenter', mouseoverHandler);
            box.addEventListener('mouseenter', handleModeAction);
            boxrow.appendChild(box);
        }
        containter.appendChild(boxrow);
    }
}

function handleModeAction(event){
    if (mode == 1){
        mouseoverHandler(event);
    } else {
        changeBackground(event);
    }
}

function actions(){

    var sb = document.querySelector('.sizebox');
    sb.value = nsize;
    const bcm = document.querySelector('.bchangemode');
    bcm.addEventListener('click', changeMode);

    const a = document.querySelector('.bclr');
    a.addEventListener('click', makeGrid);

    const cont = document.querySelector('#container');
    cont.addEventListener("contextmenu", e => e.preventDefault());
    
    document.addEventListener('mousedown', function(event) {
        if (event.button === 0) {
            ismousedown = true;
        } else if (event.button === 2) {
            iscleardown = true;
        }
    });

    document.addEventListener('mouseup', function(event) {
        ismousedown = false;
        iscleardown = false;
    });
}

function changeMode(){
    if (mode == 0) {
        mode = 1;
    } else {
        mode = 0;
    }
    var lbl = document.querySelector('.cmodelbl');
    if (mode == 0) {
        lbl.textContent = "Current Mode: Shade";
    } else {
        lbl.textContent = "Current Mode: Color";
    }
}

function mouseoverHandler(event) {
     if(iscleardown&& event.target.classList.contains('box')) {
        event.target.style.backgroundColor = "white";
    } else if (event.target.classList.contains('box')) {
        event.target.style.backgroundColor = "#06AED5";
    }
}

function changeBackground(event){
    cell = event.target;
    let colorPass = Math.round(brightness * 255);
    cell.color = Math.max(Math.min(cell.color-colorPass,255),0);
    let color = `rgb(${cell.color},${cell.color},${cell.color})`
    cell.style.backgroundColor = color;
}

function clampValue(event){
    let element = event.target;
    let value = parseFloat(element.value);
    value = Math.max(parseFloat(element.min),Math.min(value,parseFloat(element.max)));
    if (value !== parseFloat(element.value)){
        element.value = value;
    }
}
var nsize = 32;
const brightness=.1;
var ismousedown = false;
var iscleardown = false;
var mode = 0;
actions();
makeGrid();
