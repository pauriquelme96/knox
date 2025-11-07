import { effect, Signal } from "@preact/signals-core";

/*
children: (Raw Value | Signal | Function)[]
*/
export function html(tag: string, ...children: any[]): HTMLElement;
export function html(tag: string, attr: any, ...children: any[]): HTMLElement;
export function html(tag: string, attr: any, children: any[]) {
  if (attr instanceof Array) {
    children = attr;
    attr = null;
  }

  const el = document.createElement(tag);

  if (attr) {
    for (const [key, value] of Object.entries(attr)) {
      if (value == null) continue;

      if (value instanceof Signal || value instanceof Function) {
        effect(() => {
          const val = value instanceof Signal ? value.value : value();
          setAttr(el, key, val);
        });
      } else {
        setAttr(el, key, value);
      }
    }
  }

  children.forEach((child) => {
    if (child instanceof Signal || child instanceof Function) {
      let oldNode: any;
      effect(() => {
        const value = child instanceof Signal ? child.value : child();
        const newNode = buildElement(value);

        if (oldNode) {
          el.replaceChild(newNode, oldNode);
        } else {
          el.appendChild(newNode);
        }

        oldNode = newNode;
      });
    } else {
      const value = buildElement(child);
      el.appendChild(value);
    }
  });

  return el;
}

export function buildElement(data: any): any {
  if (data instanceof Node) return data;
  else return document.createTextNode(data);
}

export function setAttr(el: HTMLElement, key: string, value: any) {
  if (key === "className") {
    el.className = value as string;
  } else if (key.startsWith("on") && typeof value === "function") {
    el.addEventListener(
      key.substring(2).toLowerCase(),
      value as EventListenerOrEventListenerObject
    );
  } else if (typeof value === "boolean") {
    if (value) el.setAttribute(key, "");
  } else if (key in el) {
    el[key] = value;
  } else {
    el.setAttribute(key, value as string);
  }
}
