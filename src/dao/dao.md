Interactúa directamente con la base de datos (usa Mongoose).



🧩 DAO (Data Access Object)

Abstrae el acceso a datos.
Si mañana cambiás MongoDB por MySQL, solo tenés que cambiar esta capa.

Centraliza todas las consultas (find, update, delete...).

Hace que el resto del código no dependa de Mongoose directamente.


DAO: base de datos