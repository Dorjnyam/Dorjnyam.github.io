// task 1
function sumPalindrome() {
    const num = document.getElementById('number1').value;
    // const sum = num.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    let sum = 0;
    for (let i of num.split('')) {
        sum += parseInt(i,10);
        console.log(sum, "  ---- ",i);
    }
    const isPalindrome = sum.toString() === sum.toString().split('').reverse().join('');
    document.getElementById('result').textContent = isPalindrome
        ? `Даалгавар 1: Тийм, цифрүүдийн нийлбэр (${sum}) палиндром байна.`
        : `Даалгавар 1: Үгүй, цифрүүдийн нийлбэр (${sum}) палиндром биш байна.`;
}

// task 2
function calculateChase() {
    const distance = document.getElementById('distance').value;
    const wolfSpeed = 25;
    const rabbitSpeed = 18;
    const time = distance / (wolfSpeed - rabbitSpeed); 
    const minutes = Math.floor(time * 60);
    const seconds = Math.round((time * 3600) % 60);
    document.getElementById('result').textContent = 
        `Даалгавар 2: Чоно туулайг ${minutes} минут ${seconds} секундын дараа гүйцэх болно.`;
}

// task 3
function findFlatDetails() {
    const flatNumber = document.getElementById('flatNumber').value;
    const apartmentsPerFloor = 4;
    const floorsPerEntrance = 9;
    const apartmentsPerEntrance = apartmentsPerFloor * floorsPerEntrance;

    const entrance = Math.ceil(flatNumber / apartmentsPerEntrance);
    const floor = Math.ceil((flatNumber % apartmentsPerEntrance || apartmentsPerEntrance) / apartmentsPerFloor);
    const door = (flatNumber - 1) % apartmentsPerFloor + 1;

    document.getElementById('result').textContent = 
        `Даалгавар 3: Орц: ${entrance}, Давхар: ${floor}, Хаалга: ${door}.`;
}

// task 4
function findGCD() {
    const numbers = document.getElementById('array').value.split(',').map(Number);

    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const lcm = numbers.reduce((acc, num) => (acc * num) / gcd(acc, num), 1);

    document.getElementById('result').textContent = 
        `Даалгавар 4: Хамгийн бага ерөнхий хуваагдагч нь ${lcm}.`;
}

// task 5
function morningCalculation() {
    const num = document.getElementById('number2').value;
    const square = Math.pow(num, 2);
    document.getElementById('result').textContent = 
        `Даалгавар 5 (Өглөө): ${num}-ийн квадрат нь ${square}.`;
}

function eveningCalculation() {
    const num = document.getElementById('number2').value;
    const root = Math.sqrt(num);
    document.getElementById('result').textContent = 
        `Даалгавар 5 (Орой): ${num}-ийн язгуур нь ${root}.`;
}
