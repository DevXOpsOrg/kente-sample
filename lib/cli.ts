import { Command } from 'commander';
import { createProject } from './commands';
import { createInput } from './utils/create-input';
import { error } from './utils/chalk';
import { CliParams } from "./models/cli-param";

export function main() {
  const commands = new Command();
  commands
    .option('-mf, --microfrontend', 'Generate scaffold code for microfrontend')
    .option('-ms, --microservices', 'Generate scaffold code for microservices')
    .option('-sm, --semantic-release', 'Feature: Semantic Release')
    .option('-bot, --dependabot', 'Feature: Generate YAML files to enable Dependabot')
    .option('-si, --skip-install', 'Option: Skip installing node dependencies')
    .option('-sra, --skip-register-app', 'Option: Skip registering the app on AppStore')
    .option('-dry, --dry-run', 'Run through provided options without writing out results.')
    .arguments('[project-directory]')
    .usage(`'[project-directory]' [options]`)
    .action((projectName: string, options: CliParams) => {
      const input = createInput(projectName, options);

      //check if template selected
      validateOptions(input);

      //Print out input
      processDryRun(input);

      // Create projects based on the chosen template
      createProject(input);
    });

  return commands;
}

function validateOptions(input: CliParams) {

  const {microfrontend  ,microservices } = input;

  if (!(microfrontend || microservices)) {
    console.error(
      error(
        'Error: You must select at least one of the options (--microfrontend or --microservices)'
      )
    );
    process.exit(1);
  }
}

function processDryRun(input: CliParams) {
  const { dryRun } = input
  if (dryRun) {
    console.log(JSON.stringify(input));
  }
}

if (!process.env.JEST_WORKER_ID) {
  main().parseAsync(process.argv);
}
