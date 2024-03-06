function makeGrid() {
    nsize = document.querySelector('.sizebox').value;
    const containter = document.querySelector('#container');
    containter.innerHTML = ''; //clear out the container
    const boxrow = document.createElement('div');
    boxrow.classList.add('boxrow');

    for (let i = 0; i < nsize; i++) {
        const boxrow = document.createElement('div');
        boxrow.classList.add('boxrow');
        for (let j = 0; j < nsize; j++) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.color = 255;
            box.addEventListener('mouseenter', handleModeAction);
            document.addEventListener('mousedown', handleMouseDownAction);
            if (isgrid) {
                box.style.border = '1px solid black'; 
              } else {
                box.style.border = 'none'; 
              }
            boxrow.appendChild(box);
        }
        containter.appendChild(boxrow);
    }
}

function handleMouseDownAction(event) {
    if (!ismousedown && !iscleardown){
        if (event.button === 0) {
            ismousedown = true;
        } else if (event.button === 2) {
            iscleardown = true;
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

function init(){
    var tb = document.querySelector('.btoggrid');
    tb.addEventListener('click', togglegrid);

    var sb = document.querySelector('.sizebox');
    sb.value = nsize;
    const bcm = document.querySelector('.bchangemode');
    bcm.addEventListener('click', changeMode);

    const a = document.querySelector('.bclr');
    a.addEventListener('click', makeGrid);

    const cont = document.querySelector('#container');
    cont.addEventListener("contextmenu", e => e.preventDefault());
    
    document.addEventListener('mouseup', function(event) {
        ismousedown = false;
        iscleardown = false;
    });
}

function togglegrid() { 
    var b = document.querySelector('.btoggrid');
    isgrid = !isgrid;
    if (isgrid){
        b.textContent = "Grid On"
    } else {
        b.textContent = "Grid Off"
    }
    var box = document.querySelectorAll('.box');
    box.forEach(bx => {
        if (isgrid){
            bx.style.border = "1px solid black"; 
            } else {
            bx.style.border = 'none';
            } 
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
     if(iscleardown && event.target.classList.contains('box')) {
        event.target.style.backgroundColor = "white";
    } else if (ismousedown && event.target.classList.contains('box')) {
        event.target.style.backgroundColor = "#06AED5";
    }
}

function shadingHandler(event){
    if (iscleardown){
       var mode = -1;
    } else if (ismousedown) {
        var mode = 1;
    } else {return}
    cell = event.target;
    let colorPass = Math.round(brightness * mode* 255);
    cell.color = Math.max(Math.min(cell.color-colorPass,255),0);
    let color = `rgb(${cell.color},${cell.color},${cell.color})`
    cell.style.backgroundColor = color;
}

var isgrid = false;
var nsize = 32;
const brightness=.1;
var ismousedown = false;
var iscleardown = false;
var mode = 0;
init();
makeGrid();
