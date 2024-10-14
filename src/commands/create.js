import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { createProjectStructure } from '../utils/project.js';

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

async function createCommand() {
    console.log(logo);
    console.log(chalk.blue('------------------------------------------------\n'));

    const answers = await inquirer.prompt(questions);
    const projectDir = path.join(process.cwd(), answers.projectName);

    // Crear la ruta con el nombre asignado
    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
    }

    // Crear estructura del proyecto
    const spinner = ora(' Creando estructura del proyecto...').start();

    try {
        // Inicializar package.json
        spinner.text = chalk.yellow('  Inicializando package.json...');
        execSync(`pnpm init`, { cwd: projectDir, stdio: 'inherit' });

        // Crear la estructura según el tipo de proyecto
        await createProjectStructure(projectDir, answers.projectType);

        // Crear archivo .env y README.md
        console.log(chalk.yellow('  Creando archivos .env y README.md...'));
        fs.writeFileSync(path.join(projectDir, '.env'), ''); // Archivo .env vacío
        fs.writeFileSync(path.join(projectDir, 'README.md'), `# ${answers.projectName}\n\nProyecto generado por KemaGen CLI.`);
        console.log(chalk.green('  Archivos .env y README.md creados con éxito! \n\n'));

        // Finalizar el spinner
        spinner.succeed(`${chalk.yellow(` Proyecto ${chalk.bold(answers.projectName)} creado exitosamente.`)}`);
    } catch (error) {
        spinner.fail(chalk.red('Error al crear el proyecto.'));
        console.error(chalk.red(error.message));
    }

    console.log(chalk.blue('------------------------------------------------'));
}

export default createCommand;
