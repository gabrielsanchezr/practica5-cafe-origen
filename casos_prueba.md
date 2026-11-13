# Casos de prueba — El carrito que miente

Usa estos casos para verificar tus correcciones. Anota qué obtuviste en cada uno.

| # | Pasos | Resultado esperado | Resultado que obtuviste |
|---|---|---|---|
| 1 | Agrega "Espresso" ($35) una vez, luego agrega "Latte de vainilla" ($48) una vez. | Total: $83 | |
| 2 | Con el carrito del caso 1, elimina "Espresso". | Total: $48 (¡debe actualizarse solo con eliminar, sin tocar nada más!) | |
| 3 | Agrega "Cold brew" ($52). Presiona "-" cinco veces seguidas sobre ese producto. | La cantidad **no** debe bajar de 1 (no debe llegar a 0 ni a negativos). | |
| 4 | Agrega cualquier producto. Escribe el código `DESCUENTO10` y presiona "Aplicar descuento" dos veces seguidas. | El total solo debe bajar un 10% **una vez**, no dos. | |
| 5 | Escribe un código incorrecto, por ejemplo `ABC123`, y presiona "Aplicar descuento". | Debe decir "Código no válido" y el total no debe cambiar. | |

