
var isgrid = false;
var numboxes = 32;
const brightness=.1;
var isMouseDown = false;
var isEraseDown = false;
var mode = 0;

init();
makeGrid();

function init(){
    document.querySelector('.btoggrid').addEventListener('click', togglegrid);
    document.querySelector('.sizebox').value = numboxes;
    document.querySelector('.bchangemode').addEventListener('click', changeMode);
    document.querySelector('.bclr').addEventListener('click', makeGrid);
    document.querySelector('.mainpanel').addEventListener("contextmenu", e => e.preventDefault());
    document.addEventListener('mouseup', function(event) {
        isMouseDown = false;
        isEraseDown = false;
    });
}

function makeGrid() {
    numboxes = document.querySelector('.sizebox').value;
    const containter = document.querySelector('#container');
    containter.innerHTML = ''; //clear out the container
    
    for (let i = 0; i < numboxes; i++) {
        //const boxrow = document.createElement('div');
        //boxrow.classList.add('boxrow');
        for (let j = 0; j < numboxes; j++) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.color = 255;
            box.addEventListener('mouseenter', handleModeAction);
            box.addEventListener('mousedown', handleMouseDownAction);
            if (isgrid) {
                box.style.border = '1px solid black'; 
              } else {
                box.style.border = 'none'; 
              }
            containter.appendChild(box);
        }
        //containter.appendChild(boxrow);
    }
}

function handleMouseDownAction(event) {
    if (!isMouseDown && !isEraseDown){
        if (event.button === 0) {
            isMouseDown = true;
        } else if (event.button === 2) {
            isEraseDown = true;
        }
        handleModeAction(event);
    }
    event.preventDefault();
}

function handleModeAction(event){
    if (mode == 1){
        mouseoverHandler(event);
    } else {
        shadingHandler(event);
    }
}

function togglegrid() { 
    var gridToggle = document.querySelector('.btoggrid');
    isgrid = !isgrid;
    if (isgrid){
        gridToggle.textContent = "Grid On"
    } else {
        gridToggle.textContent = "Grid Off"
    }
    document.querySelectorAll('.box').forEach(bx => {
        if (isgrid){
                bx.style.border = "1px solid black"; 
            } else {
                bx.style.border = 'none';
            } 
    });
}

function changeMode(){
    var colorpkr = document.querySelector('#bcolor');
    var btn = document.querySelector('.bchangemode');
    if (mode == 0) {
        mode = 1;
        colorpkr.style.display = 'block';
        btn.textContent = "Color Mode";
    } else {
        mode = 0;
        colorpkr.style.display = 'none';
        btn.textContent = "Shade Mode";
    }
}

function mouseoverHandler(event) {
    var c = document.querySelector('#bcolor').value;
     if(isEraseDown) {
        event.target.style.backgroundColor = "white";
    } else if (isMouseDown) {
        event.target.style.backgroundColor = c;
    }
}

function shadingHandler(event){
    if (isEraseDown){
       var mode = -1;
    } else if (isMouseDown) {
        var mode = 1;
    } else {return}
    cell = event.target;
    let colorPass = Math.round(brightness * mode* 255);
    cell.color = Math.max(Math.min(cell.color-colorPass,255),0);
    let color = `rgb(${cell.color},${cell.color},${cell.color})`
    cell.style.backgroundColor = color;
}

