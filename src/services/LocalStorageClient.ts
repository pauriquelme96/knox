import { ApiClient } from "src/providers/ApiClient/ApiClient";

export class LocalStorageClient implements ApiClient {
  /**
   * Determina si una URL representa una colección o un recurso individual
   * @param url URL a analizar
   * @returns Si es una colección, un objeto con el nombre de la colección y posible ID
   */
  private parseUrl(url: string): { collection: string; id?: string } {
    // Eliminar slash inicial y dividir por slashes
    const parts = url.replace(/^\//, "").split("/");

    if (parts.length === 1) {
      // Es una colección sin ID: /tasks
      return { collection: parts[0] };
    } else if (parts.length >= 2) {
      // Es un recurso individual: /tasks/1
      return { collection: parts[0], id: parts[1] };
    }

    return { collection: url };
  }

  /**
   * Genera un ID único para un nuevo elemento
   * @returns String con ID único
   */
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substring(2, 9);
  }

  /**
   * Simula una petición GET HTTP usando localStorage
   * @param url Clave en localStorage o ruta
   * @returns Datos almacenados en localStorage para la clave dada
   */
  get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const { collection, id } = this.parseUrl(url);

        // Recuperamos la colección
        const data = localStorage.getItem(collection);

        if (data === null) {
          // Simula un 404 si no existe
          reject(new Error(`No se encontraron datos en '${url}'`));
          return;
        }

        const parsedData = JSON.parse(data);

        // Si es un recurso individual con ID, buscamos ese elemento específico
        if (id && Array.isArray(parsedData)) {
          const item = parsedData.find(
            (item: any) => item.id === id || item.id?.toString() === id
          );

          if (!item) {
            reject(new Error(`No se encontró el recurso con ID '${id}'`));
            return;
          }

          resolve(item as T);
        } else {
          // Si no hay ID o los datos no son un array, devolvemos todo
          resolve(parsedData as T);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Simula una petición POST HTTP usando localStorage
   * @param url Clave en localStorage o ruta
   * @param data Datos a guardar
   * @returns Los datos guardados, incluyendo el ID generado
   */
  post<T>(url: string, data: any): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const { collection } = this.parseUrl(url);
        let existingData = localStorage.getItem(collection);

        // Si no hay ID en los datos, generamos uno
        const newItem = { ...data };
        if (!newItem.id) {
          newItem.id = this.generateId();
        }

        if (existingData === null) {
          // Si no existe la colección, la creamos con el primer elemento
          localStorage.setItem(collection, JSON.stringify([newItem]));
        } else {
          // Si ya existe, añadimos el elemento al array
          const items = JSON.parse(existingData);

          if (Array.isArray(items)) {
            // Si ya es un array, añadimos el elemento
            items.push(newItem);
            localStorage.setItem(collection, JSON.stringify(items));
          } else {
            // Si no es un array, lo convertimos en uno
            localStorage.setItem(collection, JSON.stringify([items, newItem]));
          }
        }

        resolve(newItem as T);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Simula una petición PUT HTTP usando localStorage
   * @param url Clave en localStorage o ruta
   * @param data Datos a actualizar
   * @returns Los datos actualizados
   */
  put<T>(url: string, data: any): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const { collection, id } = this.parseUrl(url);
        const existingData = localStorage.getItem(collection);

        // Si hay un ID en la URL, actualizamos ese elemento específico
        if (id) {
          if (existingData === null) {
            reject(new Error(`No se encontró la colección '${collection}'`));
            return;
          }

          const items = JSON.parse(existingData);

          if (Array.isArray(items)) {
            const index = items.findIndex(
              (item: any) => item.id === id || item.id?.toString() === id
            );

            if (index === -1) {
              // No se encuentra el elemento, lo añadimos con el ID especificado
              const newItem = { ...data, id };
              items.push(newItem);
              localStorage.setItem(collection, JSON.stringify(items));
              resolve(newItem as T);
              return;
            }

            // Se encontró el elemento, lo actualizamos
            const updatedItem = { ...items[index], ...data, id };
            items[index] = updatedItem;
            localStorage.setItem(collection, JSON.stringify(items));
            resolve(updatedItem as T);
            return;
          }

          // Si no es un array pero hay un ID, lo convertimos en array con el elemento actualizado
          const updatedItem = { ...data, id };
          localStorage.setItem(collection, JSON.stringify([updatedItem]));
          resolve(updatedItem as T);
        } else {
          // Si no hay ID, simplemente sobrescribimos la colección entera
          localStorage.setItem(collection, JSON.stringify(data));
          resolve(data as T);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Simula una petición DELETE HTTP usando localStorage
   * @param url Clave en localStorage o ruta
   * @returns Mensaje de confirmación
   */
  delete<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const { collection, id } = this.parseUrl(url);
        const existingData = localStorage.getItem(collection);

        if (existingData === null) {
          // Si no existe la colección, es una operación exitosa (DELETE es idempotente)
          const result = {
            success: true,
            message: `Recurso '${url}' eliminado`,
          } as unknown as T;
          resolve(result);
          return;
        }

        // Si hay un ID en la URL, eliminamos solo ese elemento
        if (id) {
          const items = JSON.parse(existingData);

          if (Array.isArray(items)) {
            const filteredItems = items.filter(
              (item: any) => item.id !== id && item.id?.toString() !== id
            );

            if (filteredItems.length === items.length) {
              // No se encontró el elemento, pero DELETE es idempotente
            }

            localStorage.setItem(collection, JSON.stringify(filteredItems));
          }
        } else {
          // Si no hay ID, eliminamos toda la colección
          localStorage.removeItem(collection);
        }

        const result = {
          success: true,
          message: `Recurso '${url}' eliminado`,
        } as unknown as T;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}
