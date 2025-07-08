export class LocalStorageClient<T extends { _id?: string }> {
  private LOCAL_STORAGE_KEY: string;

  constructor(LOCAL_STORAGE_KEY: string) {
    this.LOCAL_STORAGE_KEY = LOCAL_STORAGE_KEY;
  }

  private readData(): T[] {
    const storedTransactions = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  }

  private saveData(items: T[]) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(items));
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  list(): T[] {
    return this.readData();
  }

  create(item: T): T {
    item = {
      ...item,
      _id: (item as any)._id || this.generateUniqueId(),
    };

    const items = this.readData();
    items.push(item);
    this.saveData(items);

    return item;
  }

  remove(_id: string) {
    let items = this.readData();

    items = items.filter((item) => item._id !== _id);

    this.saveData(items);
  }

  update(_id: string, updatedItem: T): T {
    const items = this.readData();
    const index = items.findIndex((transaction) => transaction._id === _id);

    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem };
      this.saveData(items);
    }

    return updatedItem;
  }
}
