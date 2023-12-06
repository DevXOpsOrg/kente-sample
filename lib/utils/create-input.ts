import { CliParams, GeneratorInput } from '../models';

export function createInput(projectName: string, options: CliParams): GeneratorInput {

  const mfTemplate = options.microfrontend ? "fa-template": "";
  const msTemplate = options.microservices ? "ms-template": "";
  return {
    name: projectName,
    title: options.title || '',
    targetDirectory: options.targetDirectory || './',
    template: mfTemplate || msTemplate,
    skipInstall: options.skipInstall || false,
    skipRegisterApp: options.skipRegisterApp || false,
    apiGateway: options.apiGateway || false,
    dependabot: options.dependabot || false,
    semanticRelease: options.semanticRelease || false,
    semanticReleaseBranch: options.semanticReleaseBranch || 'release',
    author: options.author || "MTN-Kente",
    appStoreToken: options.appStoreToken || "", 
    devBranchName: options.devBranchName || "main",
    dryRun: options.dryRun || false,
    microfrontend: options.microfrontend || false,
    microservices: options.microservices || false,
  };
}
