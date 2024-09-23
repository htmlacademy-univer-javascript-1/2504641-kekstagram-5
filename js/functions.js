function checkLength(str,number) {
  if (str.length > number){
    return false;
  }
  return true;
}

function checkIfPalindrom(str) {
  if (str.split('').reverse().join('').toLowerCase()==str.toLowerCase()){
    return true;
  }
  return false;
}

// Cтрока короче 20 символов
console.log(checkLength('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(checkLength('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(checkLength('проверяемая строка', 10)); // false

// Строка является палиндромом
console.log(checkIfPalindrom('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(checkIfPalindrom('ДовОд')); // true
// Это не палиндром
console.log(checkIfPalindrom('Кекс'));// false
