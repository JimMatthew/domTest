function makeGrid() {

    const containter = document.querySelector('#container');
    const boxrow = document.createElement('div');
    boxrow.classList.add('boxrow');

    for (let i = 0; i < 64; i++) {
        const boxrow = document.createElement('div');
        boxrow.classList.add('boxrow');
        for (let j = 0; j < 64; j++) {

            const box = document.createElement('div');
            box.classList.add('box');
            box.color =255;
            box.addEventListener('mouseenter', mouseoverHandler);
            box.addEventListener('mouseenter', changeBackground);
            boxrow.appendChild(box);
        }
        containter.appendChild(boxrow);
    }
}


function actions(){

    const a = document.querySelector('.bclr');
    a.addEventListener('click', clear);

    const cont = document.querySelector('#container');
    //cont.onmouseover = mouseHandler;
    cont.addEventListener("contextmenu", e => e.preventDefault());
    //container.onmouseover = mouseoverHandler;
    //container.onmouseenter = mouseoverHandler;
    
   // box.addEventListener('mouseenter', mouseoverHandler);
    //document.addEventListener('mouseover', mouseoverHandler);

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

function mouseHandler(event) {
    event.target.style.backgroundColor = "#06AED5";
}


function mouseoverHandler(event) {
    if (ismousedown && event.target.classList.contains('box')) {
        
        event.target.style.backgroundColor = "#06AED5";
    } else if(iscleardown&& event.target.classList.contains('box')) {
        event.target.style.backgroundColor = "white";
    }
}

function colorItem(item){
    var c = item.style.backgroundColor;
    var n = darkenColor(c);
    item.style.backgroundColor = n;
    item.style.backgroundColor = "#06AED5";
}

function changeBackground(event){
    cell = event.target;
    //additive coloring
    let colorPass = Math.round(brightness * 255);
    //clamp color channel value to [0,255]
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

function clear() {

    const box = document.querySelector('.box');
    console.log("clear");
    box.style.backgroundColor = "white"

}

const brightness=.1;
//Limit brightness parameter to [0,1]
var ismousedown = false;
var iscleardown = false;
brightness.eraseEnable = 1;
makeGrid();
actions();