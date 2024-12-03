const questions = [
    { question: "Цэнхэр, шар өнгөний дундаас ямар өнгө гардаг вэ?", answer: "НОГООН" },
    { question: "“Бачим” гэж ямар утгыг илэрхийлж байна вэ?", answer: "ЯАРАЛТАЙ" },
    { question: "Ямар амьтныг монгол бичигт “мэнэхэй” гэж бичдэг вэ?", answer: "МЭЛХИЙ" },
    { question: "Хүргэний хүүхэд?", answer: "ЗЭЭ" },
    { question: "Үнэгний зулзага?", answer: "ГАВАР" },
    { question: "Монголын хамгийн сүүлчийн хааны хатан хэн бэ?", answer: "ДОНДОГДУЛАМ" },
    { question: "МУ-ын төв цэг?", answer: "ӨВӨРХАНГАЙ АЙМАГ" },
    { question: "Цаглавар гэж юуг хэлдэг вэ?", answer: "ЦАГ ТООНЫ БИЧИГ" },
    { question: "Хүн амьтны дүрстэй хүүхдийн тоглоомын ерөнхий нэр?", answer: "ХҮХЭЛДЭЙ" },
    { question: "Маш нарийн зөөлөн ноос?", answer: "НООЛУУР" },
    { question: "Дэлхийн экваторын хот?", answer: "ХИТО" },
    { question: "МНТ-д гардаг улсын гоо ван?", answer: "МУХУЛАЙ" },
    { question: "Шавьжны нэртэй орд?", answer: "ХИЛЭНЦ" },
    { question: "Дэлхийн хамгийн жижиг хот улс?", answer: "ВАТИКАН" },
    { question: "МНТ-д гардаг Торголжин баяны гэргий?", answer: "МОНГОЛЖИНГУА" },
    { question: "Ван ханы хөвгүүний нэр?", answer: "СЭНГҮМ" },
    { question: "Чингис хааны бага хатны нэр?", answer: "ХУЛАН" },
    { question: "Монголын хамгийн өндөрт оршдог сум?", answer: "ДУУТ" },
    { question: "Ёлын ам аль аймагт байдаг вэ?", answer: "ӨМНӨГОВЬ" },
    { question: "Архангай аймгийн төв?", answer: "ЦЭЦЭРЛЭГ" },
    { question: "Шилийг юунаас гарган авдаг вэ?", answer: "ЭЛС" },
    { question: "Өмнөговь аймгийн төв?", answer: "ДАЛАНЗАДГАД" },
    { question: "Чингис хаан хамгийн сүүлд ямар улстай байлдсан бэ?", answer: "ТАНГУД" },
    { question: "Тэмээ усаа хаанаа нөөцөлдөг вэ?", answer: "БӨХ" },
    { question: "Тод бичгийг хэн зохиосон бэ?", answer: "НАМХАЙЖАМЦ" },
    { question: "Адууны цөсний уут нь хаанаа байдаг вэ?", answer: "УУТГҮЙ" },
    { question: "Бөхөнгийн эрийг юу гэж нэрлэдэг вэ?", answer: "ГИРЭЭ" },
    { question: "Гахайны үр төл?", answer: "ТОРОЙ" },
    { question: "Говьд цэцэглэж ургадаг бэлчээрийн ургамал?", answer: "ТААНА" },
    { question: "Да хүрээг 1911 оноос хойш юу гэж нэрлэх болсон бэ?", answer: "НИЙСЛЭЛ ХҮРЭЭ" },
    { question: "Дэлхийн хамгийн том элсэн цөл?", answer: "САХАР" },
    { question: "Дэлхийн хамгийн чийглэг улс?", answer: "ЭНЭТХЭГ" },
    { question: "Ямаагаараа дэлхийд тэргүүлдэг орон?", answer: "ХЯТАД" },
    { question: "Загас яагаад нүдээ аньдаггүй вэ?", answer: "АНЬСАГАГҮЙ" },
    { question: "Монголын хамгийн өндөр цэг?", answer: "ХҮЙТНИЙ ОРГИЛ" },
    { question: "Монголын зууны шилдэг роман?", answer: "ТУНГАЛАГ ТАМИР" }
];

let currentQuestion = randomQuestion();
let word = currentQuestion.answer;
let guessedLetters = [];
let lives = 5;

const wordContainer = document.getElementById('word-container');
const livesContainer = document.getElementById('lives');
const messageContainer = document.getElementById('message');
const restartButton = document.getElementById('restart');
const alphabetContainer = document.getElementById('alphabet-container');
const hangmanCanvas = document.getElementById('hangman-canvas');
const ctx = hangmanCanvas.getContext('2d');

function randomQuestion() {
    return questions[Math.floor(Math.random() * questions.length)];
}

function updateWordDisplay() {
    wordContainer.textContent = word.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');
}

function updateLives() {
    livesContainer.textContent = `Үлдсэн амь: ${lives}`;
}

function updateMessage(message) {
    messageContainer.textContent = message;
}

function drawHangman() {
    switch (lives) {
        case 4: 
            ctx.arc(100, 50, 20, 0, Math.PI * 2); 
            break;
        case 3: 
            ctx.moveTo(100, 70); 
            ctx.lineTo(100, 130); 
            break;
        case 2: 
            ctx.moveTo(100, 90); 
            ctx.lineTo(70, 120); 
            break;
        case 1: 
            ctx.moveTo(100, 90); 
            ctx.lineTo(130, 120); 
            break;
        case 0: 
            ctx.moveTo(100, 130); 
            ctx.lineTo(70, 160); 
            ctx.moveTo(100, 130); 
            ctx.lineTo(130, 160); 
            break;
    }
    ctx.stroke();
}

function handleKeyPress(letter) {
    if (lives <= 0) return;

    if (guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);
    const alphabetElements = document.querySelectorAll('.key');
    
    alphabetElements.forEach(element => {
        if (element.textContent === letter) {
            if (word.includes(letter)) {
                element.classList.add('correct'); 
            } else {
                element.classList.add('incorrect'); 
            }
        }
    });
    
    if (!word.includes(letter)) {
        lives--;
        if (lives >= 0) {
            drawHangman();
        }
    }
    updateWordDisplay();
    updateLives();

    if (lives === 0) {
        updateMessage("Таны амь дууссан! Тоглоом дууссан.");
        restartButton.classList.remove('hidden');
    } else if (!word.split('').some(letter => !guessedLetters.includes(letter))) {
        updateMessage("Танд амжилттай хариулсан!");
        restartButton.classList.remove('hidden');
    }
}


function initGame() {
    ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    guessedLetters = [];
    lives = 5;
    currentQuestion = randomQuestion();
    word = currentQuestion.answer;
    const questionContainer = document.getElementById('question');
    questionContainer.textContent = currentQuestion.question;
    updateWordDisplay();
    updateLives();
    updateMessage('');
    restartButton.classList.add('hidden');

    const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЫЭЮЯ'.split('');
    alphabetContainer.innerHTML = alphabet.map(letter => 
        `<div class="key" onclick="handleKeyPress('${letter}')">${letter}</div>`
    ).join('');
}

restartButton.addEventListener('click', initGame);
initGame();
