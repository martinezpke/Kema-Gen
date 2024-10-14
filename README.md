# KemaGen CLI v1.0.3

**KemaGen** es una herramienta de línea de comandos diseñada para facilitar la creación de proyectos Node.js de manera rápida y sencilla. Permite a los desarrolladores inicializar proyectos tanto de tipo API como de aplicación monolítica con una estructura predefinida.

## Tabla de Contenidos
- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
- [Comandos Disponibles](#comandos-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
  - [Mejoras y Contribuciones](#Mejoras-yContribuciones)
- [Ejemplos](#ejemplos)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Características
- 🚀 **Creación rápida de estructuras de proyectos** para Node.js.
- 🔌 **Soporte para proyectos de tipo API** y aplicaciones monolíticas.
- 🛠️ **Interfaz interactiva** y fácil de usar que guía al usuario en la configuración.

## Instalación
Para instalar KemaGen, asegúrate de tener [Node.js](https://nodejs.org/) y [pnpm](https://pnpm.js.org/) instalados en tu máquina. Luego, ejecuta el siguiente comando:

```bash
npm install -g kema-gen-cli
# o
pnpm install -g kema-gen-cli
```

## Uso
Una vez instalado, puedes usar KemaGen desde la línea de comandos. Simplemente escribe:

```bash
kemagen [comando]
```

## Comandos Disponibles
- **create**: Crea un nuevo proyecto.
  - **Descripción**: Este comando te permite generar un nuevo proyecto Node.js con una estructura básica.
  
- **help**: Muestra ayuda sobre cómo usar KemaGen y sus comandos disponibles.
  - **Descripción**: Proporciona información sobre los comandos y su uso.

## Estructura del Proyecto

KemaGen genera la estructura de tu proyecto al clonar un repositorio público específico según el tipo de proyecto que elijas. Esto permite acelerar la configuración inicial y seguir las mejores prácticas para cada tipo de aplicación.

Los repositorios utilizados por KemaGen son los siguientes:

- **API (Node.js)**: [Repositorio API](https://github.com/martinezpke/API-FILE-STRUCTURE)
    - Este repositorio contiene una estructura básica para desarrollar APIs con Node.js. Incluye rutas, controladores y configuraciones iniciales.
  
- **Aplicación Monolítica (Node.js)**: [Repositorio Monolítico](https://github.com/martinezpke/APP-MONOLITICA-FILE-STRUCTURE)
    - En este repositorio encontrarás una estructura diseñada para aplicaciones monolíticas con Node.js, ideal para proyectos de mediana escala.

- **Aplicación CLI (Node.js)**: [Repositorio CLI](https://github.com/martinezpke/CLI-APP-FILE-STRUCTURE)
    - Aquí se encuentra una plantilla inicial para desarrollar aplicaciones CLI con Node.js, con comandos básicos y configuración predefinida.

### Mejoras y Contribuciones

Los repositorios utilizados para generar estas estructuras están en constante evolución, y las contribuciones de la comunidad son bienvenidas. Si tienes sugerencias o mejoras para cualquiera de las estructuras de proyectos, puedes hacer lo siguiente:

1. Realiza un fork del repositorio correspondiente.
2. Implementa las mejoras o sugerencias.
3. Envía un pull request explicando los cambios realizados.

Contribuir a estos repositorios no solo ayudará a otros desarrolladores a iniciar proyectos más rápido, sino que también mejorará las herramientas y patrones que KemaGen utiliza para crear aplicaciones.

Encuentra los repositorios y contribuye aquí:
- [Repositorio API](https://github.com/martinezpke/API-FILE-STRUCTURE)
- [Repositorio Monolítico](https://github.com/martinezpke/APP-MONOLITICA-FILE-STRUCTURE)
- [Repositorio CLI](https://github.com/martinezpke/CLI-APP-FILE-STRUCTURE)

## Contribuciones
Las contribuciones son bienvenidas. Si deseas colaborar, por favor abre un **issue** o envía un **pull request** en el repositorio.

## Licencia
Este proyecto está licenciado bajo la [MIT License](LICENSE).
