const { toBase64Url, fromBase64Url } = require("./utils");

/**
 * Сериализует массив целых чисел в компактную ASCII строку
 * @param {number[]} numbers - массив целых чисел от 1 до 300
 * @return {string} - сериализованная строка
 */
function serialize(numbers) {
  if (!numbers || numbers.length === 0) return '';
  
  // Шаг 1: Анализируем данные для выбора оптимальной стратегии сжатия
  const frequency = new Map();
  for (const num of numbers) {
    frequency.set(num, (frequency.get(num) || 0) + 1);
  }
  
  // Шаг 2: Кодируем последовательности чисел
  const chunks = [];
  let i = 0;
  
  while (i < numbers.length) {
    const num = numbers[i];
    let count = 1;
    
    // Считаем количество повторений
    while (i + count < numbers.length && numbers[i + count] === num) {
      count++;
    }
    
    // Кодируем число и количество повторений
    if (count === 1) {
      // Для одиночных чисел используем простое кодирование
      if (num < 128) {
        chunks.push(num);
      } else {
        // Для чисел >= 128 используем два байта
        chunks.push(128 | (num >> 8));
        chunks.push(num & 0xFF);
      }
    } else {
      // Для повторяющихся чисел используем специальное кодирование
      if (num < 64 && count < 64) {
        // Для маленьких чисел и небольшого количества повторений используем один байт
        chunks.push(192 | (num & 0x3F)); // 11xxxxxx - первые два бита указывают на тип кодирования
        chunks.push(count);
      } else {
        // Для больших чисел или большого количества повторений используем несколько байтов
        chunks.push(254); // Специальный маркер
        
        // Кодируем число
        if (num < 256) {
          chunks.push(1); // Один байт
          chunks.push(num);
        } else {
          chunks.push(2); // Два байта
          chunks.push(num >> 8);
          chunks.push(num & 0xFF);
        }
        
        // Кодируем количество повторений
        if (count < 256) {
          chunks.push(1); // Один байт
          chunks.push(count);
        } else {
          chunks.push(2); // Два байта
          chunks.push(count >> 8);
          chunks.push(count & 0xFF);
        }
      }
    }
    
    i += count;
  }
  
  // Шаг 3: Преобразуем массив байтов в строку ASCII
  // Используем base64url кодирование, которое безопасно для URL
  return toBase64Url(new Uint8Array(chunks));
}

/**
 * Десериализует строку обратно в массив целых чисел
 * @param {string} str - сериализованная строка
 * @return {number[]} - массив целых чисел
 */
function deserialize(str) {
  if (!str) return [];
  
  // Декодируем из base64url
  const bytes = fromBase64Url(str);
  
  // Восстанавливаем последовательности
  const result = [];
  let i = 0;
  
  while (i < bytes.length) {
    const byte = bytes[i++];
    
    if (byte < 128) {
      // Простое число (0xxxxxxx)
      result.push(byte);
    } else if (byte < 192) {
      // Двухбайтовое число (10xxxxxx)
      if (i < bytes.length) {
        const highBits = (byte & 0x3F) << 8;
        const lowBits = bytes[i++];
        result.push(highBits | lowBits);
      }
    } else if (byte < 254) {
      // Повторяющееся маленькое число (11xxxxxx)
      if (i < bytes.length) {
        const num = byte & 0x3F;
        const count = bytes[i++];
        for (let j = 0; j < count; j++) {
          result.push(num);
        }
      }
    } else if (byte === 254) {
      // Специальный маркер для произвольных повторений
      if (i + 3 < bytes.length) {
        // Читаем число
        const numSize = bytes[i++];
        let num = 0;
        for (let j = 0; j < numSize; j++) {
          num = (num << 8) | bytes[i++];
        }
        
        // Читаем количество повторений
        const countSize = bytes[i++];
        let count = 0;
        for (let j = 0; j < countSize; j++) {
          count = (count << 8) | bytes[i++];
        }
        
        // Добавляем повторения
        for (let j = 0; j < count; j++) {
          result.push(num);
        }
      }
    }
  }
  
  return result;
}

// Экспорт функций
module.exports = {
  serialize,
  deserialize
};
