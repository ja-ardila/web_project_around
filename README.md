# Around The U.S.

## Descripción

Around The U.S. es una aplicación web interactiva que muestra una galería de lugares. Permite editar la información del perfil, agregar nuevas tarjetas, marcar lugares con “Me gusta”, eliminar tarjetas y abrir una vista ampliada de las imágenes.

El proyecto fue desarrollado con TypeScript y programación orientada a objetos, separando las distintas responsabilidades de la aplicación en clases independientes.

## Funcionalidades

- Renderizado de seis tarjetas iniciales.
- Edición del nombre y la descripción del perfil.
- Creación de nuevas tarjetas mediante un formulario.
- Inserción de nuevas tarjetas en la galería.
- Botón de “Me gusta” en cada tarjeta.
- Eliminación de tarjetas.
- Visualización ampliada de las imágenes.
- Cierre de ventanas emergentes mediante el botón de cierre.
- Cierre de ventanas emergentes al hacer clic sobre el fondo.
- Cierre de ventanas emergentes al presionar la tecla `Esc`.
- Validación de formularios.
- Visualización de mensajes de error.
- Activación y desactivación automática de los botones de envío.
- Restablecimiento de los formularios y de su estado de validación.

## Programación orientada a objetos

La aplicación utiliza clases para separar y encapsular sus diferentes responsabilidades:

- `Card`: crea una tarjeta y configura sus eventos.
- `Section`: renderiza una colección de elementos dentro de un contenedor.
- `FormValidator`: administra la validación de un formulario.
- `Popup`: contiene el comportamiento común de las ventanas emergentes.
- `PopupWithImage`: administra la ventana emergente de visualización de imágenes.
- `PopupWithForm`: administra las ventanas emergentes que contienen formularios.
- `UserInfo`: consulta y actualiza la información del perfil.

Las clases `PopupWithImage` y `PopupWithForm` heredan el comportamiento general de la clase `Popup`.

La comunicación entre los componentes se realiza mediante funciones callback, reduciendo el acoplamiento entre las clases.

## Validación de formularios

La validación se implementa mediante la clase `FormValidator`, los atributos nativos de validación de HTML y la API `ValidityState`.

Para cada formulario se crea una instancia independiente de `FormValidator`.

La validación permite:

- Mostrar mensajes de error debajo de los campos inválidos.
- Aplicar estilos de error a los campos.
- Desactivar el botón de envío cuando al menos un campo es inválido.
- Activar el botón cuando todos los campos son válidos.
- Restablecer los errores visuales al abrir nuevamente un formulario.

### Formulario de edición del perfil

- El nombre es obligatorio.
- El nombre debe contener entre 2 y 40 caracteres.
- La descripción es obligatoria.
- La descripción debe contener entre 2 y 200 caracteres.

### Formulario de nueva tarjeta

- El título es obligatorio.
- El título debe contener entre 2 y 30 caracteres.
- El enlace a la imagen es obligatorio.
- El enlace debe tener un formato de URL válido.

## Tecnologías y técnicas utilizadas

- HTML5
- CSS3
- TypeScript
- Programación orientada a objetos
- Clases e interfaces
- Herencia
- Encapsulamiento
- Genéricos de TypeScript
- Módulos ES
- Manipulación del DOM
- Eventos del navegador
- Funciones callback
- Validación de formularios
- Templates HTML
- Metodología BEM
- Git
- GitHub Pages

## Estructura principal del proyecto

```text
.
├── public/
│   ├── blocks/
│   ├── components/
│   ├── images/
│   ├── pages/
│   ├── utils/
│   ├── vendor/
│   ├── index.html
│   └── index.js
├── src/
│   ├── components/
│   │   ├── Card.ts
│   │   ├── FormValidator.ts
│   │   ├── Popup.ts
│   │   ├── PopupWithForm.ts
│   │   ├── PopupWithImage.ts
│   │   ├── Section.ts
│   │   └── UserInfo.ts
│   ├── utils/
│   │   └── constants.ts
│   └── index.ts
├── README.md
└── tsconfig.json
```

## Clases principales

### `Card`

Se encarga de:

- Crear el elemento de una tarjeta a partir de un template.
- Asignar el título y la imagen.
- Controlar el botón de “Me gusta”.
- Eliminar la tarjeta.
- Ejecutar un callback al hacer clic en la imagen.

### `Section`

Se encarga de:

- Recibir una lista de datos.
- Ejecutar una función `renderer` para cada elemento.
- Insertar los elementos generados dentro de un contenedor.

### `FormValidator`

Se encarga de:

- Validar los campos de un formulario.
- Mostrar y ocultar mensajes de error.
- Cambiar el estado del botón de envío.
- Activar los controladores de validación.
- Restablecer el estado visual del formulario.

### `Popup`

Es la clase base para las ventanas emergentes.

Se encarga de:

- Abrir un popup.
- Cerrar un popup.
- Cerrar el popup al presionar `Esc`.
- Cerrar el popup al hacer clic sobre el fondo.
- Configurar el botón de cierre.

### `PopupWithImage`

Hereda de `Popup` y se encarga de:

- Mostrar una imagen ampliada.
- Asignar el atributo `src`.
- Asignar el atributo `alt`.
- Mostrar la leyenda correspondiente.

### `PopupWithForm`

Hereda de `Popup` y se encarga de:

- Obtener los valores de los campos del formulario.
- Ejecutar un callback al enviar el formulario.
- Reiniciar el formulario al cerrar el popup.

### `UserInfo`

Se encarga de:

- Obtener el nombre y la descripción actual del usuario.
- Actualizar la información del perfil en la página.

## Compilación

Para compilar los archivos TypeScript, ejecuta:

```bash
tsc
```

Los archivos JavaScript generados se almacenan en la carpeta `public`.


## Uso

1. Clona el repositorio.
2. Abre el proyecto en tu editor de código.
3. Compila los archivos TypeScript.
4. Abre `public/index.html` en el navegador o utiliza una extensión como Live Server.

## Enlace al proyecto

GitHub Pages:

https://ja-ardila.github.io/web_project_around_es/public/

## Autor

Juan Andrés Ardila
