import { GeneratorInput } from '../models';
import { createProjectDir, getFullAppDirectory } from '../utils/directories';
import {copyTemplateFiles, processTemplates} from "../utils/file-templating";

export async function createProject(input: GeneratorInput) {
  // TODO Rajesh
  // add code to create folder
  // add code to copy templates
  // copy templates folder ---> templates / mf-template / ms-template
  const { targetDirectory, name } = input;

  const appDirectory = getFullAppDirectory(targetDirectory || './', name || 'kente-feature-app');

  createProjectDir(appDirectory);

  await copyTemplateFiles(appDirectory, input);


  await processTemplates(targetDirectory, input);

  return;
}
