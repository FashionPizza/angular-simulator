export class Collection<T> {
  constructor(private items: T[] = []) {}
  
  // 1. получить все элементы
  getAll(): T[] {
    return this.items;
  }

  // 2. получить элемент по индексу
  getItem(index: number): T | undefined {
    return this.items[index];
  }

  // 3. очистить коллекцию
  clear(): void {
    this.items = [];
  }

  // 4. удалить элемент
  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  // 5. заменить элемент
  updateItem(index: number, newItem: T): void {
    this.items[index] = newItem;
  }
}
