// 3. Создать функцию, которая принимает 2 числа и возвращает их сумму. 
// Полностью типизировать параметры, значение, возвращаемое функцией.

// 4. Создать переменную status, которая может быть только: "loading", "success", "error".

// 5. Создать переменную textFormat, которая может быть только: 'uppercase', 'lowercase', 'capitalize'".

// 6. Создать интерфейс, который описывает юзера. Поля на ваш выбор. Одно поле должно быть опциональным.

// 7. Создать интерфейс, который расширяется интерфейсом User с задания №6 и имеет свои дополнительные поля

// 8. Создать функцию, которая принимает строку и вариант,  
// как именно форматировать строку (задание №5) и на основе этого возвращает форматированную строку.

// 9. Создать функцию, которая принимает строку и символ, возвращает строку без переданного символа.
// (есть специальные методы для этого, гуглим)

// 10. Создать массив объектов на основе интерфейса с задания №6. 
// Отфильтровать его по одному из параметров

/* =========================
   1. Интерфейсы
========================= */
interface IUser {
  name: string;
  age: number;
  email?: string;
};

interface IAdmin extends IUser {
  country: string;
  city: string;
};

/* =========================
   2. Переменные
========================= */
const status: "loading" | "success" | "error" = "loading";

const textFormat: "uppercase" | "lowercase" | "capitalize" = "uppercase";

const customers: IUser[] = [
  { name: "Stas", age: 17 },
  { name: "Serega", age: 18 },
  { name: "Obeme", age: 50 },
];

const adultCustomers = customers.filter(customer => customer.age >= 18);

/* =========================
   3. Функции
========================= */
// сумма
export function sum(a: number, b: number): number {
  return a + b;
};

// форматирование текста
export function formatText(
  text: string,
  format: "uppercase" | "lowercase" | "capitalize"
): string {
  if (format === "uppercase") {
    return text.toUpperCase();
  }

  if (format === "lowercase") {
    return text.toLowerCase();
  }

  if (format === "capitalize") {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  return text;
};

// возвращение строки без переданного символа
export function removeChar(text: string, symbol: string): string {
  return text.replaceAll(symbol, "");
};