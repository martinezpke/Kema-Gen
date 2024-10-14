import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { url } from 'inspector';

export const createProjectStructure = (git, answers) => {
  const repoUrl = "";
  if (answers.projectType === "api" ) {
    repoUrl = "https://github.com/martinezpke/API-FILE-STRUCTURE.git"
  } else if (answers.projectType === "monolith") {
    repoUrl = "https://github.com/martinezpke/APP-MONOLITICA-FILE-STRUCTURE.git"
  } else if (answers.projectType === "cli") {
    repoUrl = "https://github.com/martinezpke/CLI-APP-FILE-STRUCTURE.git"
  }
};


