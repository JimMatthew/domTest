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
            
            boxrow.appendChild(box);
        }
        containter.appendChild(boxrow);
    }
}


function actions(){
    const a = document.querySelector('.bclr');
    a.addEventListener('click', clear);

    const box = document.querySelector('.box');
    

    document.addEventListener('mousedown', function(event) {
        if (event.button === 0) {
            document.addEventListener('mouseover', mouseoverHandler);
        }
    });

    document.addEventListener('mouseup', function(event) {
        document.removeEventListener('mouseover', mouseoverHandler);
    })
}

function mouseoverHandler(event) {
    if (event.target.classList.contains('box')) {
        event.target.style.backgroundColor = "#06AED5";
        
    }
}

function clear() {

    const box = document.querySelector('.box');
    console.log("clear");
    box.style.backgroundColor = "white"

}
var ismousedown = false;

makeGrid();
actions();