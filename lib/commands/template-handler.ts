import { compile } from 'handlebars';
import { GeneratorConfig } from '../models';
import { readTemplateFile, writeTemplateFile } from '../utils/file-templating';
import path from 'path';

export async function buildTemplate(templateFile: string, data: GeneratorConfig): Promise<void> {
  let templateFileContent = await readTemplateFile(templateFile);

  if (templateFile.includes('.handlebars')) {
    templateFileContent = await renderTemplate(templateFileContent, data);
  }

  if (process.platform === 'win32') {
    templateFile = templateFile.replace(/\\/g, '/');
  }
  const finalFileName = templateFile.replace(`templates/${data.project.template}/template-files/`, `${data.project.name}/`).replace('.handlebars', '');

  await writeTemplateFile(finalFileName, templateFileContent);
}

export async function renderTemplate(content: string, data: GeneratorConfig) {
  const compiled = compile(content);
  return compiled(data);
}

export async function moveTemplate(templateDirectory: string, templateFile: string): Promise<void> {
  if (templateFile.includes('.handlebars')) {
    const sourcePath = templateFile.replace('.handlebars', '');
    const destinationPath = path.join(templateDirectory, sourcePath.split('template-files')[1]);
  }
}
