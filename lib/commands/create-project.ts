import { GeneratorInput } from '../models';
import { createProjectDir, getFullAppDirectory } from '../utils/directories';
import { copyTemplateFiles, processTemplates } from '../utils/file-templating';

export async function createProject(input: GeneratorInput) {
  
  const { targetDirectory, name } = input;
  
  const appDirectory = getFullAppDirectory(targetDirectory || './', name || 'kente-feature-app');

  createProjectDir(appDirectory);

  await copyTemplateFiles(appDirectory, input);

  await processTemplates(input);

  return;
}
