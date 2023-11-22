import handlebars from 'handlebars';
import { GeneratorConfig } from '../models';
import { readTemplateFile, writeTemplateFile } from '../utils/template-files';

export async function buildTemplate(templateFile: string, data: GeneratorConfig): Promise<void> {
  let templateFileContent = await readTemplateFile(templateFile);

  if (templateFile.includes('.handlebars')) {
    templateFileContent = await renderTemplate(templateFileContent, data);
  }

  const finalFileName = templateFile.replace('template-files/', '').replace('.handlebars', '');

  await writeTemplateFile(finalFileName, templateFileContent);
}

export async function renderTemplate(content: string, data: GeneratorConfig) {
  const compiled = handlebars.compile(content);
  return compiled(data);
}
