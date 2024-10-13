import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const logo = `

${chalk.bold.green("'##:::'##:'########:'##::::'##::::'###:::::'######:::'########:'##::: ##:::::'######::'##:::::::'####:")}
${chalk.bold.green(" ##::'##:: ##.....:: ###::'###:::'## ##:::'##... ##:: ##.....:: ###:: ##::::'##... ##: ##:::::::. ##::")}
${chalk.bold.green(" ##:'##::: ##::::::: ####'####::'##:. ##:: ##:::..::: ##::::::: ####: ##:::: ##:::..:: ##:::::::: ##::")}
${chalk.bold.green(" #####:::: ######::: ## ### ##:'##:::. ##: ##::'####: ######::: ## ## ##:::: ##::::::: ##:::::::: ##::")}
${chalk.bold.green(" ##. ##::: ##...:::: ##. #: ##: #########: ##::: ##:: ##...:::: ##. ####:::: ##::::::: ##:::::::: ##::")}
${chalk.bold.green(" ##:. ##:: ##::::::: ##:.:: ##: ##.... ##: ##::: ##:: ##::::::: ##:. ###:::: ##::: ##: ##:::::::: ##::")}
${chalk.bold.green(" ##::. ##: ########: ##:::: ##: ##:::: ##:. ######::: ########: ##::. ##::::. ######:: ########:'####:")}
${chalk.bold.green("..::::..::........::..:::::..::..:::::..:::......::::........::..::::..::::::......:::........::....::")}

${chalk.dim('  Creación rápida de proyectos Node.js')}
`;

const questions = [
  {
    type: 'list',
    name: 'projectType',
    message: ' ¿Qué tipo de proyecto quieres crear?',
    choices: [
      { name: 'API (Node.js)', value: 'api' },
      { name: 'Aplicación Monolítica (Node.js)', value: 'monolith' },
    ]
  },
  {
    type: 'input',
    name: 'projectName',
    message: ' ¿Cuál es el nombre del proyecto?',
    validate: (input) => {
      if (input.trim() === '') {
        return ' El nombre del proyecto no puede estar vacío.';
      }
      return true;
    },
  }
];

async function init() {
  console.log(logo);
  console.log(chalk.blue('------------------------------------------------\n'));

  const answers = await inquirer.prompt(questions);
  const projectDir = path.join(process.cwd(), answers.projectName);

  // Crear la ruta con el nombre asignado
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  // Crear estructura de acuerdo a la respuesta
  const spinner = ora(' Creando estructura del proyecto...').start();

  try {
    // Inicializar package.json
    spinner.text = chalk.yellow('  Inicializando package.json...');

    // creamos el package.json con pnpm
    execSync(`pnpm init`, { cwd: projectDir, stdio: 'inherit' }); 
  
    // Crear el directorio src
    const srcDir = path.join(projectDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
  
    // Crear la estructura según el tipo de proyecto
    if (answers.projectType === 'api') {
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
  
    // Crear archivo .env y README.md
    console.log(chalk.yellow('  Creando archivos .env y README.md...'));
    fs.writeFileSync(path.join(projectDir, '.env'), ''); // Archivo .env vacío
    fs.writeFileSync(path.join(projectDir, 'README.md'), `# ${answers.projectName}\n\nProyecto generado por KemaGen CLI.`);
    console.log(chalk.green('  Archivos .env y README.md creados con éxito! \n\n'));
  
    // Finalizar el spinner
    spinner.succeed(`${chalk.yellow(` Proyecto ${chalk.bold(answers.projectName)} creado exitosamente.`)}`)
  } catch (error) {
    spinner.fail(chalk.red('Error al crear el proyecto.'));
    console.error(chalk.red(error.message));
  }
  
  console.log(chalk.blue('------------------------------------------------'));
  
}

init();
