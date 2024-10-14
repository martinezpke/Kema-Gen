import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { url } from 'inspector';

export const createProjectStructure = async (git, projectDir, projectType) => {
  const projectUrls = {
      api: "https://github.com/martinezpke/API-FILE-STRUCTURE.git",
      monolith: "https://github.com/martinezpke/APP-MONOLITICA-FILE-STRUCTURE.git",
      cli: "https://github.com/martinezpke/CLI-APP-FILE-STRUCTURE.git"
  };

  const repoUrl = projectUrls[projectType];

  if (!repoUrl) {
      console.error(chalk.red(" Tipo de proyecto no válido."));
      return;
  }

  try {
      await git.clone(repoUrl, projectDir);
      console.log(chalk.green('  Proyecto creado exitosamente en: ' + projectDir));
  } catch (error) {
      spinner.fail(chalk.red(' Error al clonar el proyecto.'));
      console.error(chalk.red(error.message)); // Mensaje de error
  }
};