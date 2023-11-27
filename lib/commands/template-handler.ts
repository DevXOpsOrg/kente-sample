import {compile} from 'handlebars';
import { GeneratorConfig } from '../models';
import {readTemplateFile, writeTemplateFile} from "../utils/file-templating";

export async function buildTemplate(templateFile: string, data: GeneratorConfig): Promise<void> {
  let templateFileContent = await readTemplateFile(templateFile);

  if (templateFile.includes('.handlebars')) {
    templateFileContent = await renderTemplate(templateFileContent, data);
  }

  const finalFileName = templateFile.replace('template-files/', '').replace('.handlebars', '');

  await writeTemplateFile(finalFileName, templateFileContent);
}

export async function renderTemplate(content: string, data: GeneratorConfig) {
  const compiled = compile(content);
  return compiled(data);
}
