# ListTask - Proyecto de Gestión de Tareas

Este proyecto ha sido desarrollado como solución a la prueba técnica de Accenture. La aplicación permite gestionar tareas diarias con persistencia local y organización por categorías.

### Decisiones Técnicas

**Capacitor en lugar de Cordova**
Se ha implementado Capacitor por ser el estándar actual de Ionic, ofreciendo un mejor rendimiento nativo y una estructura de proyecto más moderna y fácil de mantener.

**Estado Reactivo con RxJS**
La lógica de datos se basa en el uso de Observables y BehaviorSubjects. Esto asegura que la interfaz de usuario se mantenga sincronizada con el almacenamiento local (Ionic Storage) de forma eficiente y sin bloqueos.

### Optimización y Rendimiento

- **Estrategia OnPush:** Implementada para reducir los ciclos de detección de cambios de Angular, mejorando la respuesta de la UI.
- **Lazy Loading:** Todas las rutas de la aplicación se cargan bajo demanda para optimizar el tiempo de inicio.
- **Limpieza de Referencias:** Se incluyó lógica para evitar inconsistencias de datos al eliminar categorías, reasignando las tareas automáticamente.

### Entrega

- **APK:** Disponible en la sección de Releases del repositorio.
- **Ejecución Local:**
  ```bash
  npm install
  npx cap sync
  npx cap open android
  ```

---
Dudas o aclaraciones sobre la arquitectura: contactar directamente.
