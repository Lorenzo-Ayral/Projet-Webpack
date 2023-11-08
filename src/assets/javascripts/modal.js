const body = document.querySelector('body');
let calc;
let modal;

const createCalc = () => {
    calc = document.createElement('div');
    calc.classList.add('calc');
}

const createModal = (question) => {
    modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `<p>${question}</p>`;

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('btn', 'btn-secondary');
    cancelBtn.innerText = 'Annuler';

    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('btn', 'btn-primary');
    confirmBtn.innerText = 'Confirmer';

    modal.append(cancelBtn, confirmBtn);
}

export function openModal(question) {
    createCalc();
    createModal(question);
    calc.append(modal);
    body.append(calc);
}
