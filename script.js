
const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let mode = 'player'; // Режим гри: "player" (Гравець проти Гравця) або "bot" (Гравець проти Бота)

// Комбінації для перемоги
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальні
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальні
  [0, 4, 8], [2, 4, 6]             // Діагональні
];

// Вибір режиму гри
function setMode(selectedMode) {
  mode = selectedMode;
  resetGame();
  messageElement.textContent = mode === 'player' ? 'Гравець проти Гравця' : 'Гравець проти Бота';
}

// Обробка кліку на клітинку
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (gameBoard[index] !== '' || !gameActive) {
    return;
  }

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    messageElement.textContent = `Переміг ${currentPlayer}!`;
    gameActive = false;
    return;
  }

  if (gameBoard.every(cell => cell !== '')) {
    messageElement.textContent = 'Нічия!';
    gameActive = false;
    return;
  }

  if (mode === 'player') {
    // Зміна гравця у режимі "Гравець проти Гравця"
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageElement.textContent = `Хід гравця: ${currentPlayer}`;
  } else if (mode === 'bot') {
    // Бот грає за "O" у режимі "Гравець проти Бота"
    currentPlayer = 'O';
    setTimeout(botMove, 500); // Бот робить хід через невелику затримку
  }
}

// Хід бота
function botMove() {
  // Перевірка, чи гра активна і не завершена
  if (!gameActive) return;

  // Знаходимо доступні клітинки
  const availableMoves = gameBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);

  // Випадковий хід бота
  const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  gameBoard[randomIndex] = currentPlayer;
  cells[randomIndex].textContent = currentPlayer;

  if (checkWin()) {
    messageElement.textContent = `Переміг ${currentPlayer}!`;
    gameActive = false;
    return;
  }

  if (gameBoard.every(cell => cell !== '')) {
    messageElement.textContent = 'Нічия!';
    gameActive = false;
    return;
  }

  // Повернення ходу гравцеві "X"
  currentPlayer = 'X';
  messageElement.textContent = `Хід гравця: ${currentPlayer}`;
}

// Перевірка на перемогу
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => gameBoard[index] === currentPlayer);
  });
}

// Скидання гри
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  messageElement.textContent = `Хід гравця: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = '');
}

// Додавання подій кліку до клітинок
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
