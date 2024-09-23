function checkLength(str,number) {
  if (str.length > number){
    return false;
  }
  return true;
}

function checkIfPalindrom(str) {
  if (str.split('').reverse().join('').toLowerCase() === str.toLowerCase()){
    return true;
  }
  return false;
}

// Cтрока короче 20 символов
checkLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkLength('проверяемая строка', 10); // false

// Строка является палиндромом
checkIfPalindrom('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkIfPalindrom('ДовОд'); // true
// Это не палиндром
checkIfPalindrom('Кекс');// false
