import { Command } from 'commander';
import { createProject } from './commands';
import { createInput } from './utils/create-input';

export function main() {
  const commands = new Command();
  commands
    .option('-mf, --microfrontend', 'Generate scaffold code for microfrontend')
    .option('-ms, --microservices', 'Generate scaffold code for microservices')
    .option('-sm, --semantic-release', 'Feature: Semantic Release')
    .option('-bot, --dependabot', 'Feature: Generate YAML files to enable Dependabot')
    .option('-si, --skip-install', 'Option: Skip installing node dependencies')
    .option('-sra, --skip-register-app', 'Option: Skip registering the app on AppStore')
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
