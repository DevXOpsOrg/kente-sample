import { CliParams, GeneratorInput } from '../models';

export function createInput(projectName: string, options: CliParams): GeneratorInput {
  return {
    name: projectName,
    title: options.title || '',
    targetDirectory: options.targetDirectory || './',
    template: 'cfa-template',
    skipInstall: options.skipInstall || false,
    skipRegisterApp: options.skipRegisterApp || false,
    useApiGateway: options.apiGateway || false,
    useDependabot: options.dependabot || false,
  };
}
