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
            box.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = "#06AED5";
                console.log("hovered");
            });
            boxrow.appendChild(box);
        }
        containter.appendChild(boxrow);
    }
}

function actions(){
    const a = document.querySelector('.bclr');
    a.addEventListener('click', clear);
}

function clear() {

    const containter = document.querySelector('#container');
    

}
makeGrid();