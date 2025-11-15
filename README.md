# 🛍️ API de Productos y Carritos

Esta API permite gestionar productos y carritos de compra.  
Desarrollada con **Node.js**, **Express** y **MongoDB** siguiendo una arquitectura en capas:  
**Routes → Controller → Service → DAO → Model**

---

## 🛒 Endpoints de Productos (`/api/products`)

| Método | Ruta      | Descripción                                          |
| ------- | ---------- | ---------------------------------------------------- |
| GET     | `/`        | Obtener todos los productos                         |
| GET     | `/:pid`    | Obtener un producto por su ID                       |
| POST    | `/`        | Crear un nuevo producto (el ID se autogenera)       |
| PUT     | `/:pid`    | Actualizar los campos de un producto (excepto el ID)|
| DELETE  | `/:pid`    | Eliminar un producto por su ID                      |

---

### 🧾 Ejemplos

#### ➕ Crear un producto

**POST** `http://localhost:8080/api/products`

**Body (JSON):**
```json
{
  "title": "Remera Azul",
  "description": "Remera de algodón 100% color azul marino",
  "price": 3500,
  "category": "Ropa",
  "stock": 20,
  "thumbnail": "https://example.com/remera-azul.jpg"
}
```

**Respuesta:**
```json
{
  "status": "success",
  "payload": {
    "_id": "671f14c8e123...",
    "title": "Remera Azul",
    "description": "Remera de algodón 100% color azul marino",
    "price": 3500,
    "category": "Ropa",
    "stock": 20,
    "thumbnail": "https://example.com/remera-azul.jpg"
  }
}
```

---

#### 📦 Obtener todos los productos

**GET** `http://localhost:8080/api/products`

---

#### 🔍 Obtener un producto por ID

**GET** `http://localhost:8080/api/products/671f14c8e123...`

---

#### ✏️ Actualizar un producto

**PUT** `http://localhost:8080/api/products/671f14c8e123...`

**Body (JSON):**
```json
{
  "price": 3900,
  "stock": 15
}
```

---

#### 🗑️ Eliminar un producto

**DELETE** `http://localhost:8080/api/products/671f14c8e123...`

---

## 🧺 Endpoints de Carritos (`/api/carts`)

| Método | Ruta | Descripción |
| ------- | ---- | ------------ |
| POST | `/` | Crear un nuevo carrito |
| GET | `/:cid` | Obtener todos los productos del carrito (con detalles) |
| POST | `/:cid/product/:pid` | Agregar un producto al carrito |
| DELETE | `/:cid/products/:pid` | Eliminar un producto específico del carrito |
| PUT | `/:cid/products/:pid` | Actualizar la cantidad de un producto |
| PUT | `/:cid` | Reemplazar el contenido completo del carrito |
| DELETE | `/:cid` | Vaciar completamente un carrito |

---

### 🧾 Ejemplos

#### 🆕 Crear carrito vacío

**POST** `http://localhost:8080/api/carts`

**Body:** *(no requiere)*

**Respuesta:**
```json
{
  "status": "success",
  "payload": {
    "_id": "671f14b25cc...",
    "products": []
  }
}
```

---

#### ➕ Agregar producto al carrito

**POST** `http://localhost:8080/api/carts/:cid/product/:pid`

**Ejemplo:**
```
http://localhost:8080/api/carts/671f14b25cc.../product/671f14c8e123...
```

**Body (JSON):**
```json
{
  "quantity": 2
}
```

Si no se envía el body, se agrega **1 unidad** por defecto.

---

#### 🔍 Obtener carrito por ID

**GET** `http://localhost:8080/api/carts/:cid`

**Respuesta:**
```json
{
  "status": "success",
  "payload": {
    "_id": "671f14b25cc...",
    "products": [
      {
        "product": {
          "_id": "671f14c8e123...",
          "title": "Remera Azul",
          "price": 3500,
          "category": "Ropa"
        },
        "quantity": 2
      }
    ]
  }
}
```

*(Usa `populate` para mostrar los detalles del producto.)*

---

#### ✏️ Actualizar cantidad de un producto

**PUT** `http://localhost:8080/api/carts/:cid/products/:pid`

**Body (JSON):**
```json
{
  "quantity": 5
}
```

---

#### ❌ Eliminar un producto del carrito

**DELETE** `http://localhost:8080/api/carts/:cid/products/:pid`

---

#### 🔄 Reemplazar todo el contenido del carrito

**PUT** `http://localhost:8080/api/carts/:cid`

**Body (JSON):**
```json
{
  "products": [
    { "product": "671f14c8e123...", "quantity": 1 },
    { "product": "671f14d7a456...", "quantity": 3 }
  ]
}
```

✅ Esto borra los productos anteriores y deja solo los enviados.

---

#### 🧹 Vaciar carrito completo

**DELETE** `http://localhost:8080/api/carts/:cid`

**Respuesta:**
```json
{
  "status": "success",
  "payload": {
    "_id": "671f14b25cc...",
    "products": []
  }
}
```

---

## ⚙️ Detalles técnicos

- Base URL: `http://localhost:8080/api`
- Todos los endpoints devuelven JSON
- Asegurate de incluir en tu servidor:
  ```js
  app.use(express.json());
  ```
  para poder usar `req.body` correctamente.
- `req.params` se usa para IDs en la URL (`:pid`, `:cid`)
- `req.body` se usa para enviar datos en el cuerpo de las peticiones (`POST`, `PUT`)

---

## 📘 Ejemplo de flujo completo

1. Crear producto (`POST /api/products`)
2. Crear carrito (`POST /api/carts`)
3. Agregar ese producto al carrito (`POST /api/carts/:cid/product/:pid`)
4. Consultar el carrito (`GET /api/carts/:cid`)
5. Actualizar cantidad (`PUT /api/carts/:cid/products/:pid`)
6. Vaciar carrito (`DELETE /api/carts/:cid`)

---

## 🧩 Tecnologías

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **Arquitectura por capas**
  - Rutas → Controladores → Servicios → DAO → Modelos

---

© 2025 - API desarrollada por *Nahuel Mendarte*
