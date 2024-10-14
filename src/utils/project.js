import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export const createProjectStructure = (projectDir, projectType) => {
  const srcDir = path.join(projectDir, 'src');
  fs.mkdirSync(srcDir, { recursive: true });

  if (projectType === 'api') {
    console.log(chalk.blue('  Creando estructura para la API...'));
    fs.mkdirSync(path.join(srcDir, 'controllers'), { recursive: true });
    fs.mkdirSync(path.join(srcDir, 'models'), { recursive: true });
    fs.mkdirSync(path.join(srcDir, 'routes'), { recursive: true });
    fs.mkdirSync(path.join(srcDir, 'middlewares'), { recursive: true });
    fs.writeFileSync(path.join(srcDir, 'index.js'), '// Código inicial para la API');
    console.log(chalk.green('  Estructura para la API creada con éxito!'));
  } else {
    console.log(chalk.blue('  Creando estructura para la Aplicación Monolítica...'));
    fs.mkdirSync(path.join(srcDir, 'components'), { recursive: true });
    fs.mkdirSync(path.join(srcDir, 'routes'), { recursive: true });
    fs.mkdirSync(path.join(srcDir, 'services'), { recursive: true });
    fs.writeFileSync(path.join(srcDir, 'app.js'), '// Código inicial para la aplicación monolítica');
    console.log(chalk.green('  Estructura para la Aplicación Monolítica creada con éxito!'));
  }
};
