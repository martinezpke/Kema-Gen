import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import simpleGit from 'simple-git';
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
            { name: 'Aplicación CLI (Node.js)', value: 'cli' }
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
    if (fs.existsSync(projectDir)) {
        console.log(chalk.red('El directorio ya existe. Elige otro nombre.'));
        return;
    }
    const git = simpleGit();

    // Crear estructura del proyecto
    const spinner = ora('Clonando el repositorio...\n\n').start();

    try {

        // Crear la estructura según el tipo de proyecto
        await createProjectStructure(git, projectDir, answers.projectType);

        // Crear archivo .env y README.md
        console.log(chalk.yellow('  Creando archivos README.md...'));
        fs.writeFileSync(path.join(projectDir, 'README.md'), `# ${answers.projectName}\n\nProyecto generado por KemaGen CLI.`);
        console.log(chalk.green('  Archivos README.md creados con éxito! \n\n\n'));

        // Finalizar el spinner
        spinner.succeed(`${chalk.yellow(` Proyecto ${chalk.bold(answers.projectName)} creado exitosamente.`)}`);
    } catch (error) {
        spinner.fail(chalk.red('Error al crear el proyecto.'));
        console.error(chalk.red(error.message));
    } finally {
        spinner.stop();
    }

    console.log(chalk.blue('------------------------------------------------'));
}

export default createCommand;
