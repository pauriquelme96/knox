export function createElement(tag, attributes = {}, ...children) {
  const element = document.createElement(tag);

  // Asignar atributos y propiedades
  for (const [key, value] of Object.entries(attributes)) {
    if (value == null) continue;

    if (key === "className") {
      element.className = value;
    } else if (key === "htmlFor") {
      element.htmlFor = value;
    } else if (key === "style" && typeof value === "object") {
      Object.assign(element.style, value);
    } else if (key.startsWith("on") && typeof value === "function") {
      element.addEventListener(key.substring(2).toLowerCase(), value);
    } else if (typeof value === "boolean") {
      if (value) element.setAttribute(key, "");
    } else if (key in element) {
      element[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  }

  // Añadir hijos
  /*const flatten = (arr) =>
    arr.reduce(
      (acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val),
      []
    );

  flatten(children).forEach((child) => {
    if (child == null || typeof child === "boolean") return;
    element.appendChild(
      child instanceof Node ? child : document.createTextNode(child)
    );
  });*/

  return element;
}
