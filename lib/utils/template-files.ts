import path from 'path';
import { GeneratorInput, GeneratorConfig } from '../models';
import { buildTemplate } from '../commands/template-handler';
import { cleanupProjectDir } from './directories';
import { copy } from 'fs-extra';
import { promises, readdirSync } from 'fs';
import { shouldCopyFile } from './files';
import packageJson from '../../package.json';

const { writeFile, mkdir, readFile } = promises;

export async function copyTemplateFiles(
  appTargetDirectory: string,
  { template: templateName }: GeneratorInput
): Promise<void> {
  try {
    await copy(path.join(process.cwd(), 'templates', templateName), path.join(appTargetDirectory), {
      filter: (file: string) => {
        return (
          file !== path.join(process.cwd(), 'templates', templateName, 'template-files/yarn.lock')
        );
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function writeTemplateFile(fileName: string, fileContent: string): Promise<void> {
  await mkdir(fileName.substring(0, fileName.lastIndexOf('/')), {
    recursive: true,
  }).then(() => writeFile(fileName, fileContent));
}

export async function getTemplateRecursively(directory: string): Promise<string[]> {
  console.log('getTemplateRecursively directory: ', directory);
  const dir = readdirSync(directory, { withFileTypes: true });
  const files = await Promise.all(
    dir.map((dirent) => {
      const res = path.resolve(directory, dirent.name);
      return dirent.isDirectory() ? getTemplateRecursively(res) : res;
    })
  );
  console.log('getTemplateRecursively files: ', files);
  return Array.prototype.concat(...files).filter((file) => {
    console.log('file: ', file);
    file.match('templates');
  });
}

export async function getTemplateFiles(appTargetDirectory: string): Promise<string[]> {
  console.log('getTemplateFiles appTargetDirectory: ', appTargetDirectory);
  const files = await getTemplateRecursively(appTargetDirectory);
  files.map((file: string) => file.replace(appTargetDirectory, ''));
  return files;
}

export async function readTemplateFile(templateFile: string): Promise<string> {
  return readFile(templateFile, 'utf-8');
}

export function safeAppName(name: string) {
  // Replaces '../../../foo/bar-foo' to 'bar-foo'
  return name.replace(/\S*\//, '');
}

export async function processTemplates(appTargetDirectory: string, input: GeneratorInput) {
  const { name } = input;
  const appName = safeAppName(name);

  const data: GeneratorConfig = {
    project: {
      name: appName,
    },
    runtime: {
      cli: packageJson.version,
      node: process.version,
      path: name,
    },
  };

  const templateFiles = await getTemplateFiles(appTargetDirectory);
  console.log('templateFiles: ', templateFiles);
  for (const templateFile of templateFiles) {
    // if (shouldCopyFile(templateFile, data.project.features, CONDITIONAL_INCLUDES)) {
    await buildTemplate(templateFile, data);
    // }
  }

  await cleanupProjectDir(templateFiles);
}
