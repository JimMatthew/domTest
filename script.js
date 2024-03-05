

function makeGrid() {

    const a = document.querySelector('.header');

    a.addEventListener('mouseover', event => {
        
    });

    const containter = document.querySelector('#container');
    const boxrow = document.createElement('div');
    boxrow.classList.add('boxrow');
    
    for (let i = 0; i < 64; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.addEventListener('mouseover', (e) => {
            box.target.style.backgroundColor = "red";
            console.log("hovered");
        });
        boxrow.appendChild(box.cloneNode(true));
    }
    containter.appendChild(boxrow.cloneNode(true));
    for (let j = 0; j < 64; j++) {
        containter.appendChild(boxrow.cloneNode(true));
    }

}

makeGrid();