import { join, resolve } from 'path';
import { GeneratorConfig, GeneratorInput } from '../models';
import { copy } from 'fs-extra';
import { promises, readdirSync, rename } from 'fs';
import { safeAppName, toCamelCase } from './casing';
import { shouldCopyFile } from './files';
import { CONDITIONAL_INCLUDES } from './conditionals';
import { buildTemplate } from '../commands/template-handler';
import { cleanupProjectDir} from "../utils/directories";
const packageJson = require('../../package.json');

const { writeFile, mkdir, readFile } = promises;

export async function copyTemplateFiles(
  appTargetDirectory: string,
  { template: templateName }: GeneratorInput
): Promise<void> {
  try {
    await copy(join(process.cwd(), 'templates', templateName), join(appTargetDirectory), {
      filter: (file: string) => {
        return file !== join(process.cwd(), 'templates', templateName, 'template-files/yarn.lock');
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function writeTemplateFile(fileName: string, fileContent: string): Promise<void> {
  if (process.platform === 'win32') {
    fileName = fileName.replace(/\\/g, '/');
  }
  await mkdir(fileName.substring(0, fileName.lastIndexOf('/')), {
    recursive: true,
  }).then(() => writeFile(fileName, fileContent));
}

export async function getTemplateRecursively(directory: string): Promise<string[]> {
  const dir = readdirSync(directory, { withFileTypes: true });
  const files = await Promise.all(
    dir.map((dirent) => {
      const res = resolve(directory, dirent.name);
      return dirent.isDirectory() ? getTemplateRecursively(res) : res;
    })
  );
  return Array.prototype.concat(...files).filter((file) => file.match('templates'));
}

export async function getTemplateFiles(appTargetDirectory: string): Promise<string[]> {
  const files = await getTemplateRecursively(appTargetDirectory);
  files.map((file: string) => file.replace(appTargetDirectory, ''));
  return files;
}

export async function readTemplateFile(templateFile: string): Promise<string> {
  return readFile(templateFile, 'utf-8');
}

export async function processTemplates(input: GeneratorInput) {
  const { name, title, template, semanticReleaseBranch, semanticRelease, dependabot } = input;
  const appTargetDirectory = `./templates/${template}`
  const appName = safeAppName(name);

  const data: GeneratorConfig = {
    project: {
      title,
      name: appName,
      nameCamelCase: toCamelCase(appName),
      version: '0.1.0',
      features: {
        semanticRelease,
        semanticReleaseBranch,
        dependabot,
      },
      template,
    },
    runtime: {
      cli: packageJson.version,
      node: process.version,
      path: name,
    },
  };

  const templateFiles = await getTemplateFiles(appTargetDirectory);

  for (const templateFile of templateFiles) {
    if (shouldCopyFile(templateFile, data.project.features, CONDITIONAL_INCLUDES)) {
      await buildTemplate(templateFile, data);
    }
  }

  await cleanupProjectDir(templateFiles);
}
