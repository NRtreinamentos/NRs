let peopleData = {}; // Será preenchido dinamicamente a partir dos arquivos específicos

function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

function loadSectorScript() {
    const sector = document.getElementById('sector').value;
    const scriptId = 'sector-script';
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
        existingScript.remove();
    }

    if (sector) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `${sector}.js`;
        script.onload = () => {
            console.log(`${sector}.js carregado`);
            updateTrainingNumbers();
        };
        document.body.appendChild(script);
    }
}

const list = document.querySelectorAll('.list');
function activeLink() {
    list.forEach((item) =>
        item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) =>
    item.addEventListener('click', activeLink));

function updateTrainingNumbers() {
    const sector = document.getElementById('sector').value;
    const trainingNumberSelect = document.getElementById('training-number');

    trainingNumberSelect.innerHTML = '<option value="">Selecione...</option>';

    if (sector && peopleData[sector]) {
        const trainingNumbers = Object.keys(peopleData[sector]);
        trainingNumbers.forEach(number => {
            const option = document.createElement('option');
            option.value = number;
            option.textContent = number;
            trainingNumberSelect.appendChild(option);
        });
    } else {
        trainingNumberSelect.innerHTML = '<option value="">Selecione um setor primeiro...</option>';
    }
}

function homeOn() {
    const home = document.getElementById('tela-bar');
    const contador = document.getElementById('painel-bar');
    const treinamento = document.getElementById('training-container');

    treinamento.style.display = 'none';
    contador.style.display = 'none';
    home.style.display = 'block';
}

function contadorOn() {
    startAnimation();
    const home = document.getElementById('tela-bar');
    const contador = document.getElementById('painel-bar');
    const treinamento = document.getElementById('training-container');

    treinamento.style.display = 'none';
    contador.style.display = 'block';
    home.style.display = 'none';
}

function treinamentoOn() {
    const home = document.getElementById('tela-bar');
    const contador = document.getElementById('painel-bar');
    const treinamento = document.getElementById('training-container');

    treinamento.style.display = 'block';
    contador.style.display = 'none';
    home.style.display = 'none';
}

function showTraining() {
    const sector = document.getElementById('sector').value;
    const trainingNumber = document.getElementById('training-number').value;
    const inputContainer = document.getElementById('input-container');
    const trainingList = document.getElementById('training-list');
    const personName = document.getElementById('person-name');
    const personname = document.getElementById('username');
    const menuNave = document.getElementById('nave-bar');
    const home = document.getElementById('tela-bar');

    if (peopleData[sector] && peopleData[sector][trainingNumber]) {
        const person = peopleData[sector][trainingNumber];
        trainingList.innerHTML = '';
        personName.textContent = `${person.name}`;
        personname.textContent = `${person.name}`;

        person.trainings.forEach(training => {
            const validityDate = new Date(training.validity);
            const currentDate = new Date();
            const timeDiff = validityDate - currentDate;
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            let rowClass = '';

            if (daysDiff > 180) {
                rowClass = 'white';
            } else if (daysDiff > 0) {
                rowClass = 'yellow';
            } else {
                rowClass = 'red';
            }

            const row = `<tr class="${rowClass}">
                <td>${training.name}</td>
                <td>${formatDate(training.validity)}</td>
            </tr>`;
            trainingList.insertAdjacentHTML('beforeend', row);
        });

        inputContainer.style.display = 'none';
        menuNave.style.display = 'block';
        home.style.display = 'block';

    } else {
        alert('Número de matrícula inválido ou setor não selecionado!');
    }
}


// Função para destacar o botão ativo
function setActive(button) {
    // Remove a classe 'active' de todos os botões
    const buttons = document.querySelectorAll('.nav-item');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Adiciona a classe 'active' ao botão clicado
    button.classList.add('active');
}

// Define o primeiro botão como ativo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const firstButton = document.querySelector('.nav-bar .nav-item');
    if (firstButton) {
        firstButton.classList.add('active');
    }
});

function goBack() {
    location.reload(); // Recarrega a página
}

function showFilterInput() {
    const filterInput = document.getElementById('training-filter');
    filterInput.style.display = 'inline';
    filterInput.focus();
}

function botaovoltarativo() {
    const btnInput = document.getElementById('voltar');
    btnInput.style.display = 'inline';
    btnInput.focus();
}

function ativavoltar() {
    const filterInput = document.getElementById('training-filter');
    const btnInput = document.getElementById('voltar');
    filterInput.style.display = 'none';
    btnInput.style.display = 'none';
}

function filterTrainings() {
    const filter = document.getElementById('training-filter').value.toLowerCase();
    const rows = document.querySelectorAll('#training-list tr');

    rows.forEach(row => {
        const trainingName = row.cells[0].textContent.toLowerCase();
        if (trainingName.includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

/**
 * Função para calcular o número de dias entre uma data e hoje.
 * @param {string} startDate - Data de início no formato "YYYY-MM-DD".
 * @returns {number} Número de dias entre a data de início e hoje.
 */
function calculateDaysSince(startDate) {
    const start = new Date(startDate);
    const today = new Date();
    const difference = today - start; // Diferença em milissegundos
    return Math.floor(difference / (1000 * 60 * 60 * 24)); // Converter para dias
}

let animationIntervals = []; // Array para armazenar os IDs dos intervalos ativos

/**
 * Função para calcular o número de dias entre uma data e hoje.
 * @param {string} startDate - Data de início no formato "YYYY-MM-DD".
 * @returns {number} Número de dias entre a data de início e hoje.
 */
function calculateDaysSince(startDate) {
    const start = new Date(startDate);
    const today = new Date();
    const difference = today - start; // Diferença em milissegundos
    return Math.floor(difference / (1000 * 60 * 60 * 24)); // Converter para dias
}

/**
 * Função para animar os números até o valor final.
 * @param {string} elementId - ID do elemento HTML onde o número será exibido.
 * @param {number} targetValue - Valor final que deve ser alcançado.
 * @param {function} [callback] - Função a ser chamada após a animação.
 */
function animateNumbers(elementId, targetValue, callback) {
    const element = document.getElementById(elementId);
    let currentValue = 0;

    const interval = setInterval(() => {
        currentValue += 1;
        element.textContent = currentValue.toString().padStart(3, '0');

        if (currentValue >= targetValue) {
            clearInterval(interval);
            if (callback) callback(); // Chama a função de callback após a animação
        }
    }, 5); // Velocidade da animação

    animationIntervals.push(interval); // Salva o ID do intervalo
}

/**
 * Função para cancelar todas as animações em andamento.
 */
function cancelAnimation() {
    while (animationIntervals.length > 0) {
        const interval = animationIntervals.pop(); // Remove o último ID de intervalo
        clearInterval(interval); // Cancela o intervalo correspondente
    }
}

/**
 * Função para resetar os números no display.
 */
function resetNumbers() {
    document.getElementById("dias").textContent = "000";
    document.getElementById("diasRecorde").textContent = "000";
}

/**
 * Função para iniciar a sequência de animações.
 */
function startAnimation() {
    cancelAnimation(); // Cancela qualquer animação em andamento
    resetNumbers(); // Reseta os números antes de iniciar a animação

    // Primeiro, anima os dias sem acidentes
    animateNumbers("dias", daysSince, () => {
        // Depois que terminar, anima o recorde
        animateNumbers("diasRecorde", recordDays);
    });
}

// Data de início do período sem acidentes (formato YYYY-MM-DD)
const startDate = "2024-10-16"; // Alterar conforme necessário

// Número do recorde de dias (alterar conforme necessário)
const recordDays = 2272;

// Calcula os dias desde a data inicial
const daysSince = calculateDaysSince(startDate);

// Inicia a animação automaticamente ao carregar a página
window.onload = () => {
    resetNumbers(); // Garante que os números comecem como "000"
    setTimeout(startAnimation, 100); // Aguarda um pequeno tempo para evitar "bagunça" na renderização
};

