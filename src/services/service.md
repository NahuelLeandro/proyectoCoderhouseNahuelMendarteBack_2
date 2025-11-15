Contiene la lógica de negocio pura (validaciones, reglas, etc.). No sabe nada del HTTP ni Express.


🧠 Service

Aísla la lógica de negocio: validaciones, reglas, cálculos.

El controlador no debería saber cómo se valida o se guarda, solo qué hacer.

Permite reutilizar lógica entre controladores.



Service: lógica del negocio