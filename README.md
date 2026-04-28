# ✅ ListTask — Prueba Técnica de Gestión de Tareas

Aplicación de gestión de tareas construida con **Ionic 8** y **Angular 20**, enfocada en la organización mediante categorías dinámicas y el análisis de productividad.

---

## 🚀 Instalación y Desarrollo

### Requisitos previos
- Node.js v20.19.5 (LTS)
- Ionic CLI

### Configuración local
```bash
# 1. Instalar dependencias
npm install

# 2. Correr en el navegador
ionic serve
```

---

## 🛠️ Stack Tecnológico y Arquitectura

- **Framework:** Ionic 8 (Standalone compatible) + Angular 20.
- **Gestión de Estado:** Programación reactiva con RxJS y `BehaviorSubject`.
- **Persistencia:** Capa de abstracción sobre `@ionic/storage-angular`.
- **Arquitectura:** Separación estricta de responsabilidades (Servicios, Modelos y Componentes).
- **Rendimiento:** Optimización de renderizado mediante `ChangeDetectionStrategy.OnPush` y `trackBy`.

---

## 📱 Compilación Nativa (Android/iOS)

El proyecto utiliza **Capacitor** para el despliegue en dispositivos móviles.

```bash
# Agregar plataformas
ionic capacitor add android
ionic capacitor add ios

# Generar build
ionic capacitor build android
ionic capacitor build ios
```

---

## 🧠 Decisiones Técnicas

- **Carga Diferida (Lazy Loading):** Todas las rutas están modularizadas para minimizar el tiempo de carga inicial.
- **Integridad de Datos:** El sistema gestiona la eliminación de categorías limpiando automáticamente las referencias en las tareas existentes.
- **Feature Flagging:** Se ha implementado un servicio de configuración remota preparado para integración con Firebase Remote Config, permitiendo el control de funcionalidades en tiempo real.
- **Virtual Scrolling:** Preparado para manejar grandes volúmenes de datos sin degradación del rendimiento del DOM.
