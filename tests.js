// Импорт основных функций
const { serialize, deserialize } = require('./main');
const { 
  compressionRatio, 
  generateRandomArray, 
  isPrime 
} = require('./utils');

// Тест 1: Простые числа (короткий массив)
function testPrimeNumbers() {
  // Берем первые несколько простых чисел в диапазоне от 1 до 300
  const primes = [];
  for (let i = 2; i <= 300; i++) {
    if (isPrime(i)) {
      primes.push(i);
      if (primes.length >= 10) break; // Берем первые 10 простых чисел
    }
  }
  
  const serialized = serialize(primes);
  const deserialized = deserialize(serialized);
  const ratio = compressionRatio(primes, serialized);
  
  console.log("Тест: Простые числа (короткий массив)");
  console.log("Исходный массив:", primes);
  console.log("Сериализованная строка:", serialized);
  console.log("Размер исходного массива (JSON):", JSON.stringify(primes).length, "байт");
  console.log("Размер сериализованной строки:", serialized.length, "байт");
  console.log("Коэффициент сжатия:", ratio + "%");
  console.log("Проверка равенства:", JSON.stringify(primes) === JSON.stringify(deserialized));
  console.log("-----------------------------------");
}

// Тест 2: Случайный массив из 50 чисел
function testRandom50() {
  const numbers = generateRandomArray(50);
  const serialized = serialize(numbers);
  const deserialized = deserialize(serialized);
  const ratio = compressionRatio(numbers, serialized);
  
  console.log("Тест: Случайный массив из 50 чисел");
  console.log("Размер исходного массива (JSON):", JSON.stringify(numbers).length, "байт");
  console.log("Размер сериализованной строки:", serialized.length, "байт");
  console.log("Коэффициент сжатия:", ratio + "%");
  console.log("Проверка равенства:", JSON.stringify(numbers) === JSON.stringify(deserialized));
  console.log("-----------------------------------");
}

// Тест 3: Случайный массив из 100 чисел
function testRandom100() {
  const numbers = generateRandomArray(100);
  const serialized = serialize(numbers);
  const deserialized = deserialize(serialized);
  const ratio = compressionRatio(numbers, serialized);
  
  console.log("Тест: Случайный массив из 100 чисел");
  console.log("Размер исходного массива (JSON):", JSON.stringify(numbers).length, "байт");
  console.log("Размер сериализованной строки:", serialized.length, "байт");
  console.log("Коэффициент сжатия:", ratio + "%");
  console.log("Проверка равенства:", JSON.stringify(numbers) === JSON.stringify(deserialized));
  console.log("-----------------------------------");
}

// Тест 4: Случайный массив из 500 чисел
function testRandom500() {
  const numbers = generateRandomArray(500);
  const serialized = serialize(numbers);
  const deserialized = deserialize(serialized);
  const ratio = compressionRatio(numbers, serialized);
  
  console.log("Тест: Случайный массив из 500 чисел");
  console.log("Размер исходного массива (JSON):", JSON.stringify(numbers).length, "байт");
  console.log("Размер сериализованной строки:", serialized.length, "байт");
  console.log("Коэффициент сжатия:", ratio + "%");
  console.log("Проверка равенства:", JSON.stringify(numbers) === JSON.stringify(deserialized));
  console.log("-----------------------------------");
}

// Тест 5: Случайный массив из 1000 чисел
function testRandom1000() {
  const numbers = generateRandomArray(1000);
  const serialized = serialize(numbers);
  const deserialized = deserialize(serialized);
  const ratio = compressionRatio(numbers, serialized);
  
  console.log("Тест: Случайный массив из 1000 чисел");
  console.log("Размер исходного массива (JSON):", JSON.stringify(numbers).length, "байт");
  console.log("Размер сериализованной строки:", serialized.length, "байт");
  console.log("Коэффициент сжатия:", ratio + "%");
  console.log("Проверка равенства:", JSON.stringify(numbers) === JSON.stringify(deserialized));
  console.log("-----------------------------------");
}

// Тест 6: Все числа из 1 знака (1-9)
function testSingleDigit() {
  const numbers = generateRandomArray(100, 1, 9);
  const serialized = serialize(numbers);
  const deserialized = deserialize(serialized);
  const ratio = compressionRatio(numbers, serialized);
  
  console.log("Тест: Все числа из 1 знака (1-9)");
  console.log("Размер исходного массива (JSON):", JSON.stringify(numbers).length, "байт");
  console.log("Размер сериализованной строки:", serialized.length, "байт");
  console.log("Коэффициент сжатия:", ratio + "%");
  console.log("Проверка равенства:", JSON.stringify(numbers) === JSON.stringify(deserialized));
  console.log("-----------------------------------");
}

// Тест 7: Все числа из 2 знаков (10-99)
function testDoubleDigit() {
  const numbers = generateRandomArray(100, 10, 99);
  const serialized = serialize(numbers);
  const deserialized = deserialize(serialized);
  const ratio = compressionRatio(numbers, serialized);
  
  console.log("Тест: Все числа из 2 знаков (10-99)");
  console.log("Размер исходного массива (JSON):", JSON.stringify(numbers).length, "байт");
  console.log("Размер сериализованной строки:", serialized.length, "байт");
  console.log("Коэффициент сжатия:", ratio + "%");
  console.log("Проверка равенства:", JSON.stringify(numbers) === JSON.stringify(deserialized));
  console.log("-----------------------------------");
}

// Тест 8: Все числа из 3 знаков (100-300)
function testTripleDigit() {
  const numbers = generateRandomArray(100, 100, 300);
  const serialized = serialize(numbers);
  const deserialized = deserialize(serialized);
  const ratio = compressionRatio(numbers, serialized);
  
  console.log("Тест: Все числа из 3 знаков (100-300)");
  console.log("Размер исходного массива (JSON):", JSON.stringify(numbers).length, "байт");
  console.log("Размер сериализованной строки:", serialized.length, "байт");
  console.log("Коэффициент сжатия:", ratio + "%");
  console.log("Проверка равенства:", JSON.stringify(numbers) === JSON.stringify(deserialized));
  console.log("-----------------------------------");
}

// Тест 9: Каждого числа по 3 (всего 900 чисел)
function testEachNumberThreeTimes() {
  const numbers = [];
  for (let i = 1; i <= 300; i++) {
    numbers.push(i, i, i); // Добавляем каждое число по 3 раза
  }
  const serialized = serialize(numbers);
  const deserialized = deserialize(serialized);
  const ratio = compressionRatio(numbers, serialized);
  
  console.log("Тест: Каждого числа по 3 (всего 900 чисел)");
  console.log("Размер исходного массива (JSON):", JSON.stringify(numbers).length, "байт");
  console.log("Размер сериализованной строки:", serialized.length, "байт");
  console.log("Коэффициент сжатия:", ratio + "%");
  console.log("Проверка равенства:", JSON.stringify(numbers) === JSON.stringify(deserialized));
  console.log("-----------------------------------");
}

// Запуск всех тестов
function runAllTests() {
  testPrimeNumbers();
  testRandom50();
  testRandom100();
  testRandom500();
  testRandom1000();
  testSingleDigit();
  testDoubleDigit();
  testTripleDigit();
  testEachNumberThreeTimes();
}

// Запускаем все тесты
runAllTests();

module.exports = {
  runAllTests,
  testPrimeNumbers,
  testRandom50,
  testRandom100,
  testRandom500,
  testRandom1000,
  testSingleDigit,
  testDoubleDigit,
  testTripleDigit,
  testEachNumberThreeTimes
};
