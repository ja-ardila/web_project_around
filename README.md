# Around The U.S.

## Descripción

Around The U.S. es una aplicación web interactiva conectada a una API REST que muestra una galería de lugares. Permite consultar y editar el perfil, actualizar el avatar, crear tarjetas, marcar lugares con “Me gusta”, eliminar tarjetas propias y abrir una vista ampliada de las imágenes.

El proyecto fue desarrollado con TypeScript y programación orientada a objetos. La información se guarda en el servidor, por lo que los cambios se mantienen después de recargar la página.

## Funcionalidades

- Obtención del perfil desde la API.
- Obtención y renderizado de las tarjetas almacenadas en el servidor.
- Carga paralela del perfil y las tarjetas mediante `Promise.all()`.
- Edición persistente del nombre y la descripción del perfil.
- Actualización de la foto de perfil mediante una URL.
- Superposición de un icono de edición al pasar sobre el avatar.
- Creación persistente de nuevas tarjetas.
- Adición y eliminación de “Me gusta” mediante la API.
- Representación visual del estado `isLiked` recibido del servidor.
- Eliminación de tarjetas después de confirmar la acción en un popup.
- Visualización de la papelera únicamente en las tarjetas del usuario actual.
- Visualización ampliada de las imágenes.
- Cierre de ventanas emergentes mediante el botón de cierre.
- Cierre de ventanas emergentes al hacer clic sobre el fondo.
- Cierre de ventanas emergentes al presionar la tecla `Esc`.
- Validación de formularios.
- Visualización de mensajes de error.
- Activación y desactivación automática de los botones de envío.
- Restablecimiento de los formularios y de su estado de validación.
- Estado de carga `Guardando...` durante las solicitudes de los formularios.
- Prevención de envíos y solicitudes duplicadas.
- Manejo de errores de red y respuestas HTTP no exitosas.

## Programación orientada a objetos

La aplicación utiliza clases para separar y encapsular sus diferentes responsabilidades:

- `Api`: centraliza todas las solicitudes HTTP y sus tipos de respuesta.
- `Card`: crea una tarjeta y configura sus eventos.
- `Section`: renderiza una colección de elementos dentro de un contenedor.
- `FormValidator`: administra la validación de un formulario.
- `Popup`: contiene el comportamiento común de las ventanas emergentes.
- `PopupWithImage`: administra la ventana emergente de visualización de imágenes.
- `PopupWithForm`: administra las ventanas emergentes que contienen formularios.
- `PopupWithConfirmation`: administra la confirmación antes de eliminar una tarjeta.
- `UserInfo`: consulta y actualiza la información del perfil.

Las clases `PopupWithImage`, `PopupWithForm` y `PopupWithConfirmation` heredan el comportamiento general de la clase `Popup`.

La comunicación entre los componentes se realiza mediante funciones callback, reduciendo el acoplamiento entre las clases.

## Integración con la API

La aplicación consume la API de Around The U.S. mediante `fetch`. Todas las solicitudes se encuentran encapsuladas en la clase `Api`, que recibe la URL base y los encabezados comunes en su constructor.

La clase dispone de métodos para:

- Obtener la información del usuario.
- Obtener las tarjetas iniciales.
- Actualizar el nombre y la descripción del perfil.
- Actualizar el avatar.
- Crear una tarjeta.
- Añadir o eliminar un “Me gusta”.
- Eliminar una tarjeta.

El método privado `request<T>()` contiene la lógica común para realizar solicitudes, validar `res.ok`, procesar la respuesta y devolver datos tipados.

Los principales tipos utilizados son:

- `UserData`: información completa del usuario recibida desde el servidor.
- `EditProfileFormData`: datos enviados al editar el perfil.
- `AvatarFormData`: enlace enviado al actualizar el avatar.
- `CardData`: información completa de una tarjeta.
- `NewCardFormData`: nombre y enlace enviados al crear una tarjeta.

### Carga inicial

El perfil y las tarjetas se solicitan simultáneamente para reducir el tiempo de carga:

```ts
const [userData, initialCards] = await Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
]);
```

La página espera la resolución de ambas solicitudes. Después asigna el ID del usuario y renderiza las tarjetas, lo que permite determinar cuáles pertenecen al usuario actual antes de mostrar los botones de eliminación.

### Persistencia y seguridad de las acciones

- Los cambios del perfil y el avatar se aplican en pantalla usando la respuesta del servidor.
- Las tarjetas nuevas se insertan utilizando el objeto completo devuelto por la API.
- El estado del corazón se actualiza únicamente después de recibir el nuevo valor `isLiked`.
- Una tarjeta se elimina del DOM solamente después de una respuesta exitosa del servidor.
- La papelera se oculta cuando la propiedad `owner` no coincide con el ID del usuario actual.

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

### Formulario de actualización del avatar

- El enlace a la nueva imagen es obligatorio.
- El valor debe tener un formato de URL válido.

Durante el envío de los formularios de perfil, avatar y nueva tarjeta, `PopupWithForm` cambia temporalmente el texto del botón a `Guardando...` y evita envíos duplicados.

## Tecnologías y técnicas utilizadas

- HTML5
- CSS3
- TypeScript
- API REST
- Fetch API
- Promesas, `async`/`await` y `Promise.all()`
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
│   │   ├── Api.ts
│   │   ├── Card.ts
│   │   ├── FormValidator.ts
│   │   ├── Popup.ts
│   │   ├── PopupWithConfirmation.ts
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

### `Api`

Se encarga de:

- Guardar la URL base y los encabezados comunes.
- Ejecutar todas las solicitudes HTTP.
- Comprobar que las respuestas sean exitosas.
- Convertir las respuestas del servidor a tipos TypeScript.
- Exponer métodos específicos para usuarios, tarjetas, likes y eliminación.

### `Card`

Se encarga de:

- Crear el elemento de una tarjeta a partir de un template.
- Asignar el título y la imagen.
- Reflejar y actualizar el estado del botón de “Me gusta”.
- Solicitar confirmación antes de eliminar una tarjeta.
- Ocultar la papelera de las tarjetas pertenecientes a otros usuarios.
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
- Esperar la finalización de callbacks asíncronos.
- Mostrar el estado `Guardando...`.
- Evitar envíos duplicados.
- Reiniciar el formulario al cerrar el popup.

### `PopupWithConfirmation`

Hereda de `Popup` y se encarga de:

- Mostrar una confirmación antes de eliminar una tarjeta.
- Ejecutar la acción asociada únicamente al pulsar “Sí”.
- Esperar la respuesta de eliminación antes de cerrar el popup.

### `UserInfo`

Se encarga de:

- Obtener el nombre y la descripción actual del usuario.
- Actualizar el nombre, la descripción y el avatar en la página.

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
4. Sirve la carpeta `public` mediante un servidor local, por ejemplo Live Server.
5. Abre la URL local generada en el navegador.

## Enlace al proyecto

GitHub Pages:

https://ja-ardila.github.io/web_project_around/public/

## Autor

Juan Andrés Ardila
