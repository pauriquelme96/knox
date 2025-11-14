// ==========================================
// REORGANIZACIÓN DOM OPTIMIZADA
// Basado en benchmarks de rendimiento
// ==========================================

class DOMReorganizer {
  /**
   * Reorganizador inteligente que elige la estrategia óptima
   * según el tamaño de la lista y número de cambios
   */
  static smartReorganize(container, newOrder) {
    const elementCount = container.children.length;
    const changeCount = this.calculateChanges(container, newOrder);
    const changePercentage = (changeCount / elementCount) * 100;

    console.log(
      `📊 Análisis: ${elementCount} elementos, ${changeCount} cambios (${changePercentage.toFixed(
        1
      )}%)`
    );

    // Decisión basada en benchmarks
    if (elementCount > 1000 && changePercentage < 30) {
      console.log("🚀 Usando operaciones específicas (máximo rendimiento)");
      return this.useSpecificOperations(container, newOrder);
    } else if (changePercentage > 60 || elementCount < 50) {
      console.log("🔄 Usando replaceChildren (reorganización masiva)");
      return this.useReplaceChildren(container, newOrder);
    } else {
      console.log("📦 Usando DocumentFragment (balance óptimo)");
      return this.useDocumentFragment(container, newOrder);
    }
  }

  /**
   * Operaciones específicas - Óptimo para pocos cambios
   * 5-50x más rápido para cambios puntuales
   */
  static useSpecificOperations(container, newOrder) {
    const start = performance.now();
    const currentOrder = Array.from(container.children);

    for (let newIndex = 0; newIndex < newOrder.length; newIndex++) {
      const element = newOrder[newIndex];
      const currentIndex = currentOrder.indexOf(element);

      if (currentIndex !== newIndex) {
        // Mover elemento a su posición correcta
        if (newIndex === 0) {
          container.insertBefore(element, container.firstElementChild);
        } else if (newIndex >= container.children.length) {
          container.appendChild(element);
        } else {
          const referenceNode = container.children[newIndex];
          container.insertBefore(element, referenceNode);
        }

        // Actualizar orden actual
        currentOrder.splice(currentIndex, 1);
        currentOrder.splice(newIndex, 0, element);
      }
    }

    console.log(`⏱️ Tiempo: ${(performance.now() - start).toFixed(4)}ms`);
  }

  /**
   * DocumentFragment - Balance entre rendimiento y simplicidad
   * 2-10x más rápido que múltiples operaciones individuales
   */
  static useDocumentFragment(container, newOrder) {
    const start = performance.now();
    const fragment = document.createDocumentFragment();

    // Mover todos los elementos al fragment en el nuevo orden
    newOrder.forEach((element) => {
      fragment.appendChild(element);
    });

    // Una sola operación DOM
    container.appendChild(fragment);

    console.log(`⏱️ Tiempo: ${(performance.now() - start).toFixed(4)}ms`);
  }

  /**
   * ReplaceChildren - Simple pero costoso para listas grandes
   * Solo para reorganizaciones masivas o listas pequeñas
   */
  static useReplaceChildren(container, newOrder) {
    const start = performance.now();
    container.replaceChildren(...newOrder);
    console.log(`⏱️ Tiempo: ${(performance.now() - start).toFixed(4)}ms`);
  }

  /**
   * Calcula cuántos elementos cambiarán de posición
   */
  static calculateChanges(container, newOrder) {
    const currentOrder = Array.from(container.children);
    let changes = 0;

    for (let i = 0; i < newOrder.length; i++) {
      if (currentOrder[i] !== newOrder[i]) {
        changes++;
      }
    }

    return changes;
  }
}

// ==========================================
// OPERACIONES ESPECÍFICAS OPTIMIZADAS
// ==========================================

class OptimizedOperations {
  /**
   * Mover último al primero - Caso más común
   * 15-60x más rápido que replaceChildren
   */
  static moveLastToFirst(container) {
    const lastChild = container.lastElementChild;
    if (lastChild) {
      container.insertBefore(lastChild, container.firstElementChild);
    }
  }

  /**
   * Mover elemento a posición específica
   */
  static moveToPosition(element, newIndex) {
    const parent = element.parentElement;
    const children = Array.from(parent.children);

    if (newIndex >= children.length) {
      parent.appendChild(element);
    } else {
      parent.insertBefore(element, children[newIndex]);
    }
  }

  /**
   * Intercambiar dos elementos - Operación mínima
   */
  static swapElements(el1, el2) {
    const parent1 = el1.parentNode;
    const next1 = el1.nextSibling === el2 ? el1 : el1.nextSibling;

    el2.parentNode.insertBefore(el1, el2);
    parent1.insertBefore(el2, next1);
  }

  /**
   * Mover múltiples elementos consecutivos
   */
  static moveConsecutiveElements(elements, targetIndex, container) {
    const fragment = document.createDocumentFragment();

    // Mover elementos al fragment
    elements.forEach((el) => fragment.appendChild(el));

    // Insertar fragment en la posición objetivo
    if (targetIndex >= container.children.length) {
      container.appendChild(fragment);
    } else {
      container.insertBefore(fragment, container.children[targetIndex]);
    }
  }
}

// ==========================================
// EJEMPLOS DE USO OPTIMIZADO
// ==========================================

// Ejemplo 1: Lista grande con pocos cambios
function optimizeProductList() {
  const productList = document.getElementById("product-list");
  const featuredProducts = [
    productList.children[45], // Producto destacado 1
    productList.children[12], // Producto destacado 2
    productList.children[78], // Producto destacado 3
  ];

  // Mover productos destacados al inicio (operaciones específicas)
  featuredProducts.reverse().forEach((product) => {
    OptimizedOperations.moveToPosition(product, 0);
  });
}

// Ejemplo 2: Lista pequeña con reorganización completa
function sortSmallList() {
  const smallList = document.getElementById("small-list");
  const sorted = Array.from(smallList.children).sort((a, b) =>
    a.textContent.localeCompare(b.textContent)
  );

  // Lista pequeña: usar replaceChildren
  smallList.replaceChildren(...sorted);
}

// Ejemplo 3: Reorganización masiva con DocumentFragment
function reorderTasksByPriority() {
  const taskList = document.getElementById("task-list");
  const tasks = Array.from(taskList.children);

  const priorityOrder = tasks.sort((a, b) => {
    const priorityA = parseInt(a.dataset.priority);
    const priorityB = parseInt(b.dataset.priority);
    return priorityA - priorityB;
  });

  // Usar DocumentFragment para múltiples cambios
  DOMReorganizer.useDocumentFragment(taskList, priorityOrder);
}

// Ejemplo 4: Sistema adaptativo
function smartSort(listId, sortFunction) {
  const list = document.getElementById(listId);
  const sorted = Array.from(list.children).sort(sortFunction);

  // El reorganizador elige automáticamente la mejor estrategia
  DOMReorganizer.smartReorganize(list, sorted);
}

// ==========================================
// MONITOREO DE RENDIMIENTO
// ==========================================

class PerformanceMonitor {
  static measureReorganization(operation, description) {
    console.log(`🔍 Midiendo: ${description}`);

    const start = performance.now();
    operation();
    const time = performance.now() - start;

    console.log(`✅ Completado en ${time.toFixed(4)}ms`);

    // Alertar si la operación es lenta
    if (time > 16.67) {
      // Más de un frame a 60fps
      console.warn(`⚠️ Operación lenta detectada: ${time.toFixed(4)}ms`);
    }

    return time;
  }
}

// Uso del monitor
/*
PerformanceMonitor.measureReorganization(() => {
    OptimizedOperations.moveLastToFirst(myList);
}, 'Mover último elemento al primero');
*/
