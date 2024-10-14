#!/usr/bin/env node
import { program } from 'commander';
import createCommand from '../src/commands/create.js';
import helpCommand from '../src/commands/help.js';

program
  .command('create')
  .description('Crea un nuevo proyecto')
  .action(createCommand);

program
  .command('help')
  .description('Muestra ayuda')
  .action(helpCommand);

program.parse(process.argv);
