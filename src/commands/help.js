import chalk from 'chalk';

function helpCommand() {
  console.log(chalk.blue('------------------------------------------------'));
  console.log(chalk.bold.green(`KemaGen CLI - Ayuda`));
  console.log(chalk.yellow(`
  Comandos disponibles:

    create     Crea un nuevo proyecto. Te permite elegir entre una API o una aplicación monolítica.

    help       Muestra la ayuda y los comandos disponibles.

  Uso:
    kemagen <comando>

  Ejemplos:
    kemagen create        - Crea un nuevo proyecto con estructura predeterminada.
    kemagen help          - Muestra la ayuda.
  `));
  console.log(chalk.blue('------------------------------------------------'));
}

export default helpCommand;
