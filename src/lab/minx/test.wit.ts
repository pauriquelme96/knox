import { signal } from "@preact/signals-core"
import { html } from "./core"

function div(...args: any[]) {
  const [attr, children] = args
  return html("div", attr, children)
}

function h1(...args: any[]) {
  const [attr, children] = args
  return html("h1", attr, children)
}

function img(...args: any[]) {
  const [attr] = args
  return html("img", attr)
}

declare const h2: any

export const testWit = () => {
  const text = signal("Hola Mundo!")
  const counter = signal(0)
  const color = signal("red")

  const container = (...children) => {
    const attr = {
      class: "bg-white rounded-sm min-w-lg p-16 flex flex-col justify-center items-center shadow-lg",
    }

    return div(attr, ...children)
  }

  const image = img({
    src: "https://picsum.photos/200/300",
    alt: "Random Image",
    style: { width: "200px", height: "300px" },
  })

  const header = h1(
    {
      style: {
        color: color.value,
        height: `${counter.value * 10}px`,
        border: `1px solid ${color.value}`,
      },
    },
    [text, " ", counter]
  )

  function Button() {
    return component<Props>([
      "Click me",
      {
        onClick: () => {
          alert("Button clicked!")
        }
      }
    ])
  }

  const h = div({ class: "bg-white rounded-sm min-w-lg p-16 flex flex-col justify-center items-center shadow-lg" }, [
    img({ src: "https://picsum.photos/200/300", alt: "Random Image", style: { width: "200px", height: "300px" } }),

    h2({ style: { color: "red", height: "0px", border: "1px solid red" } }, [
      text, " ", counter
    ]),
    
    h2({ style: { color: "red", height: "0px", border: "1px solid red" } })(
      text, " ", counter
    ),

    h2.style({ color: "red", height: "0px", border: "1px solid red" })(
      text, " ", counter
    ),
  ])

  /*
  <div class="bg-white rounded-sm min-w-lg p-16 flex flex-col justify-center items-center shadow-lg">
    <img src="https://picsum.photos/200/300" alt="Random Image" style="width: 200px; height: 300px;">
    <h1 style="color: red; height: 0px; border: 1px solid red;">
      Hola Mundo! 0
    </h1>
  </div>
  
  div.class("bg-white rounded-sm min-w-lg p-16 flex flex-col justify-center items-center shadow-lg")(
    img.src("https://picsum.photos/200/300").alt("Random Image").style({
      width: "200px",
      height: "300px",
    }),
    h1.style({
      color: color.value,
      height: `${counter.value * 10}px`,
      border: `1px solid ${color.value}`,
    })(text, " ", counter)
  )
  
  */

  /*
  return <div>
    <h1
      style={{
        color: color.value,
        height: `${counter.value * 10}px`,
        border: `1px solid ${color.value}`,
      }}
    >
      {text} {counter}
    </h1>  
  <div>
  
  */

  // RENDER
  const app = document.getElementById("app")
  if (!app) throw new Error("App element not found")

  app.replaceChildren()
  app.appendChild(h)

  const colors = ["red", "green", "blue", "orange", "purple"]
  return
  setInterval(() => {
    counter.value = counter.value + 1
    color.value = colors[counter.value % colors.length]
  }, 1000)
}
