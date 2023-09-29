
//Información capturada desde HTML hacía JavaScript

const formDetalle = document.getElementById("formDetalle"); //Capturamos el formulario
const formCabecera = document.getElementById("formCabecera"); //Capturamos el cabecera de la factura

//Con la información descripción producto, cantidad y precio unitario CREAREMOS UN OBJETO
const descripcionProducto = document.getElementById("descripcionProducto"); //Capturamos la descripción del producto 
const cantidadProducto = document.getElementById("cantidadProducto"); //Capturamos la cantidad del producto
const precioU = document.getElementById("precioU"); //Capturamos el precio del producto

const estructuraTabla = document.getElementById("estructuraTabla"); //Capturamos la tabla de visualización de los productos 
const guardarProducto = document.getElementById("guardarProducto"); //Capturamos el evento del boton agregar producto 
const nombreCliente = document.getElementById("nombreCliente"); //Capturamos el nombre del cliente
const direccionCliente = document.getElementById("direccionCliente"); //Capturamos el nombre del cliente
const telefonocliente = document.getElementById("telefonoCliente"); //Capturamos el numero de telefono del cliente 
const fecha = document.getElementById("fecha"); //Capturamos la fecha


let ArrayDetalle = []; //Creamos un arreglo temporal que iniciara vacio.

/*
  Función agregar producto
  Aqui dibujamos, diseñamos u ordenamos los detalles del producto en la tabla.
  Aquí asignamos los detalles de los producto de fila en fila a la estructura tabla diseñada en HTML.
  Los detalles agregados son: descripción, cantidad, precio unitario y precio sub total.
  Tambien se agrega el boton eliminar ubicado en la ultima columna por cada producto agregado.
*/

function formatNumber(number) 
{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const agregarProducto = () => 
{
    estructuraTabla.innerHTML = ""; //Limpia la tabla y evita que se dupliquen los detalles del producto.

    let total = 0;// Inicializa el total en 0.

    // Variable para rastrear el índice de la fila que se está editando
    let indiceEdicion = null;

    ArrayDetalle.forEach((detalle,index)=>{

        let fila = document.createElement("tr"); //Creamos el elemento que es una fila, recordar la función del forEach 
        fila.innerHTML = `<td>${detalle.descripcion}</td>
                          <td>${detalle.subtotal.cantidad}</td>
                          <td>${"Q. "+formatNumber(detalle.subtotal.preciounitario)}</td>
                          <td>${"Q. "+formatNumber(detalle.subtotal.precioSubTotal.toFixed(2))}</td>`;

        let tdEliminar = document.createElement("td"); //Se crea la columna para contener al boton eliminar 
        let botonEliminar = document.createElement("button"); //Se crea el boton eliminar 
        botonEliminar.classList.add("btn", "btn-danger", "btn-eliminar"); //Se le agrega una clase o diseño 
        botonEliminar.innerText = "Eliminar"; //Texto del boton "Eliminar"

        let tdEditar = document.createElement("td"); //Se crea la columna para contener al boton eliminar 
        let botonEditar = document.createElement("button"); //Se crea el boton eliminar 
        botonEditar.classList.add("btn", "btn-warning"); //Se le agrega una clase o diseño 
        botonEditar.innerText = "Editar"; //Texto del boton "Eliminar"

        // Aplicar estilos de margen personalizado para separar los botones
        botonEditar.style.marginLeft = "5px";

        botonEliminar.addEventListener("click", () => 
        {
            // Eliminar el elemento del arreglo basado en el índice
            ArrayDetalle.splice(index, 1);

            // Actualizar la tabla
            agregarProducto();
        });

        botonEditar.addEventListener("click", () => 
        {
            descripcionProducto.value = detalle.descripcion;
            cantidadProducto.value = detalle.subtotal.cantidad;
            precioU.value = detalle.subtotal.preciounitario;
    
            botonEditar.style.display = "none";
            botonEliminar.style.display = "none";
            botonGuardar.style.display = "inline-block";
            botonCancelar.style.display = "inline-block";
    
            indiceEdicion = index;
        });
        
        let tdGuardar = document.createElement("td");
        let botonGuardar = document.createElement("button");
        botonGuardar.classList.add("btn", "btn-success","btn-guardar");
        botonGuardar.innerText = "Guardar";
        botonGuardar.style.display = "none";
        botonGuardar.style.marginTop = "24px"


        botonGuardar.addEventListener("click", () => 
        {
            // Actualiza los datos en la fila con los valores de los campos de entrada
            ArrayDetalle[indiceEdicion].descripcion = descripcionProducto.value;
            ArrayDetalle[indiceEdicion].subtotal.cantidad = cantidadProducto.value;
            ArrayDetalle[indiceEdicion].subtotal.preciounitario = precioU.value;
            ArrayDetalle[indiceEdicion].subtotal.precioSubTotal = cantidadProducto.value * precioU.value;
        
            // Limpia los campos de entrada
            formDetalle.reset();
            indiceEdicion = null; // Reinicia el índice de edición
        
            // Llama a la función para actualizar la tabla
            agregarProducto();
        });
        

        let tdCancelar = document.createElement("td");
        let botonCancelar = document.createElement("button");
        botonCancelar.classList.add("btn", "btn-danger");
        botonCancelar.innerText = "Cancelar";
        botonCancelar.style.display = "none";
        botonCancelar.style.marginLeft = "5px";
        botonCancelar.style.marginBottom = "25px";

        botonCancelar.addEventListener("click", () => 
        {
            botonEliminar.style.display = "inline-block";
            botonEditar.style.display = "inline-block";
            botonGuardar.style.display = "none";
            botonCancelar.style.display = "none";
    
            formDetalle.reset();
            indiceEdicion = null;
        });

        tdEliminar.appendChild(botonEliminar);//Para agregar el boton dentro del tdEliminar
        fila.appendChild(tdEliminar);
        estructuraTabla.appendChild(fila);//Agregamos toda la fila creada a la tabla con el "id-estructuraTabla" en HTML.
        
        tdEliminar.appendChild(botonEditar);
        fila.appendChild(tdEliminar);
        estructuraTabla.appendChild(fila);//Agregamos toda la fila creada a la tabla con el "id-estructuraTabla" en HTML.
        
        tdEliminar.appendChild(botonGuardar);
        fila.appendChild(tdEliminar);
        estructuraTabla.appendChild(fila);//Agregamos toda la fila creada a la tabla con el "id-estructuraTabla" en HTML.
  
        tdEliminar.appendChild(botonCancelar);
        fila.appendChild(tdEliminar);
        estructuraTabla.appendChild(fila);//Agregamos toda la fila creada a la tabla con el "id-estructuraTabla" en HTML.

        total += detalle.subtotal.precioSubTotal; // Suma el subtotal al total.
    });

    const totalElement = document.getElementById("total");
    totalElement.textContent = "Total: Q. " + formatNumber(total.toFixed(2));
};


//Aquí agregamos un nuevo detalle a la factura

formDetalle.onsubmit = (e) => 
{
    e.preventDefault(); // Para que no se actualice la página

//Calculamos el subtotal multiplicando la cantidad del producto por el precio unitario.
let subTotal = cantidadProducto.value* precioU.value;

// Creamos objeto detalle y sus propiedades descripción, cantidad, precio unitario y precio sub total.
const objDetalle = 
{
    descripcion: descripcionProducto.value,//Asignamos la descripción capturada desde html a la propiedad del objeto descripción 
    subtotal:{
        cantidad: cantidadProducto.value,//Asignamos la cantidad capturada desde html a la propiedad del objeto cantidad 
        preciounitario: precioU.value, //Asignamos el precio unitario capturado desde html a la propiedad del objeto preciounitario 
        precioSubTotal: subTotal//Asignamos el calculo de la variable subTotal a la propiedad del objeto precioSubTotal
    },     
};

//Limpiar los campos
formDetalle.reset();
console.log(objDetalle); //Imprimimos en consola el objeto detalle para ver la información que vamos agregando en el objeto creado. 
ArrayDetalle.push(objDetalle); //Con esto agregamos otro objeto creado con los detalles del producto.
agregarProducto();//Invocamos la funcion agregar producto
}

//Evento del boton guardar
//Esta información se puede almacenar en una Bse de Datos

guardarProducto.onclick=() => 
{
    //Crear objeto de la cabecera factura y sus propiedades nombre, dirección, telefono y fecha.
    let objFactura = 
    {
        cabeceraFactura:{
            nombre: nombreCliente.value,//Asignamos el nombre del cliente a la propiedad del objeto nombreCliente
            direccion: direccionCliente.value, //Asignamos la dirección del cliente a la propiedad del objeto direccionCliente 
            telefono: telefonocliente.value,//Asignamos el telefono del cliente a la propiedad del objeto telefonocliente 
            fecha: fecha.value,//Asignamos la fecha a la propiedad del objeto fecha
        },
        detalleFactura: ArrayDetalle,//Asignamos los detalles del producto a la cabecera de la factura.
    };

    //Limpiar los campos.
    formCabecera.reset();
    estructuraTabla.innerHTML = "";

    const totalElement = document.getElementById("total");
    totalElement.textContent = "";

    console.log(objFactura); //Imprimimos en consola el objeto Factura para ver la información del cliente agregado en el objeto creado.

};



//HECHO POR: EDGAR ZAHIR HERNANDEZ AGUILAR