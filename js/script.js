// Datos del catálogo
const productos = [
  { nombre: "Pastel de chocolate", precio: 25.0, categoria: "Pasteles" },
  { nombre: "Pastel de tres leches", precio: 22.5, categoria: "Pasteles" },
  { nombre: "Pastel red velvet", precio: 30.0, categoria: "Pasteles" },
  { nombre: "Pastel de zanahoria", precio: 24.5, categoria: "Pasteles" },
  { nombre: "Cheesecake de frutos rojos", precio: 28.75, categoria: "Cheesecakes" },
  { nombre: "Cheesecake clásico", precio: 26.0, categoria: "Cheesecakes" },
  { nombre: "Cupcake de vainilla", precio: 3.5, categoria: "Cupcakes" },
  { nombre: "Cupcake de chocolate", precio: 3.75, categoria: "Cupcakes" },
  { nombre: "Caja de 6 cupcakes", precio: 18.0, categoria: "Cupcakes" },
  { nombre: "Tiramisú", precio: 8.5, categoria: "Postres" },
  { nombre: "Flan napolitano", precio: 5.0, categoria: "Postres" },
  { nombre: "Brownie", precio: 4.25, categoria: "Postres" }
];

let categoriaActual = "todas";
const cuerpoTabla = document.getElementById("table-body");
const notaVacia = document.getElementById("empty-note");
const campoPrecio = document.getElementById("tope-precio");
const botonesTab = document.querySelectorAll(".tab-btn");
const botonPrecio = document.getElementById("btn-precio");

// Eventos de las pestañas de categoría
botonesTab.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const cat = boton.getAttribute("data-cat");
    marcarPestana(boton);
    filtrarCategoria(cat);
  });
});

// Evento del botón de precio
botonPrecio.addEventListener("click", function () {
  filtrarPrecio();
});

// Arranque: mostrar todo el catálogo
mostrarLista(productos);

// Marcar la pestaña activa
function marcarPestana(activo) {
  botonesTab.forEach(function (boton) {
    boton.classList.remove("selected");
  });
  activo.classList.add("selected");
}

// Filtrar por categoría con filter()
function filtrarCategoria(categoria) {
  categoriaActual = categoria;
  mostrarLista(obtenerFiltrados());
}

// Filtrar por precio máximo con filter()
function filtrarPrecio() {
  const texto = campoPrecio.value.trim();

  if (texto === "" || isNaN(Number(texto)) || Number(texto) < 0) {
    alert("Ingresa un precio máximo válido, por favor.");
    return;
  }

  mostrarLista(obtenerFiltrados());
}

// Combinar categoría y precio
function obtenerFiltrados() {
  let lista = productos;

  if (categoriaActual !== "todas") {
    lista = lista.filter(function (item) {
      return item.categoria === categoriaActual;
    });
  }

  const texto = campoPrecio.value.trim();

  if (texto !== "") {
    const tope = Number(texto);

    if (!isNaN(tope) && tope >= 0) {
      lista = lista.filter(function (item) {
        return item.precio <= tope;
      });
    }
  }

  return lista;
}

// Dibujar filas de la tabla con map()
function mostrarLista(lista) {
  if (lista.length === 0) {
    cuerpoTabla.innerHTML = "";
    notaVacia.hidden = false;
    notaVacia.textContent = "No hay productos que coincidan con tu búsqueda.";
    return;
  }

  notaVacia.hidden = true;
  notaVacia.textContent = "";

  const filas = lista.map(function (item) {
    return (
      "<tr>" +
        '<td class="cell-name">' + item.nombre + "</td>" +
        '<td class="cell-category">' + item.categoria + "</td>" +
        '<td class="cell-price">$' + item.precio.toFixed(2) + "</td>" +
      "</tr>"
    );
  });

  cuerpoTabla.innerHTML = filas.join("");
}
