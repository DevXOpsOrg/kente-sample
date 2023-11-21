import { Command } from 'commander';
import { GeneratorInput } from './models/inputs';
import { createInput } from './utils';
import {createProject} from "./commands";

export function main() {
  const commands = new Command();
  commands
    .option('-n, --name', 'Name of the project')
    .option('-mf, --microfrontend', 'Generate scaffold code for microfrontend')
    .option('-ms, --microservices', 'Generate scaffold code for microservices')
    .option('--api-gateway', 'Feature: Generate code to enable API Gateway')
    .option('--dependabot', 'Feature: Generate YAML files to enable Dependabot')
    .option('--skip-install', 'Option: Skip installing node dependencies')
    .option('--skip-register-app', 'Option: Skip registering the app on AppStore')
    .option('--dry-run', 'Run through provided options without writing out results.')
    .arguments('[project-directory]')
    .usage(`'[project-directory]' [options]`)
    .action((projectName: string, options: any) => {
      const input = createInput(projectName, options);

      if (options.dryRun) {
        console.log(JSON.stringify(input));
        return;
      }

      createProject(input);
    });

  return commands;
}

if (!process.env.JEST_WORKER_ID) {
  main().parseAsync(process.argv);
}
