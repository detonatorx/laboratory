/**
 * Преобразует массив байтов в строку base64url
 * @param {Uint8Array} bytes - массив байтов
 * @return {string} - строка в формате base64url
 */
function toBase64Url(bytes) {
  // Преобразуем массив байтов в строку base64
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  
  // Кодируем в base64
  const base64 = btoa(binary);
  
  // Преобразуем в base64url (заменяем '+' на '-', '/' на '_' и удаляем '=')
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Преобразует строку base64url в массив байтов
 * @param {string} str - строка в формате base64url
 * @return {Uint8Array} - массив байтов
 */
function fromBase64Url(str) {
  // Преобразуем из base64url в base64
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  
  // Добавляем отсутствующие символы '='
  while (base64.length % 4) {
    base64 += '=';
  }
  
  // Декодируем из base64
  const binary = atob(base64);
  
  // Преобразуем в массив байтов
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  
  return bytes;
}

/**
 * Вычисляет коэффициент сжатия
 * @param {number[]} original - исходный массив
 * @param {string} compressed - сжатая строка
 * @return {number} - коэффициент сжатия (в процентах)
 */
function compressionRatio(original, compressed) {
  // Размер исходных данных в JSON формате
  const originalSize = JSON.stringify(original).length;
  
  // Размер сжатых данных
  const compressedSize = compressed.length;
  
  // Коэффициент сжатия
  return ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
}

/**
 * Функция для генерации случайного массива чисел
 * @param {number} size - размер массива
 * @param {number} min - минимальное значение (по умолчанию 1)
 * @param {number} max - максимальное значение (по умолчанию 300)
 * @return {number[]} - случайный массив чисел
 */
function generateRandomArray(size, min = 1, max = 300) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

/**
 * Функция для проверки, является ли число простым
 * @param {number} num - проверяемое число
 * @return {boolean} - true, если число простое
 */
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
}

// Экспорт функций
module.exports = {
  toBase64Url,
  fromBase64Url,
  compressionRatio,
  generateRandomArray,
  isPrime
};
