import {Command} from 'commander';
import chalk from 'chalk';

export function generateProject() {
    const commands = new Command();
    commands
        .option('--api-gateway', 'Feature: API Gateway')
        .option('--dependabot', 'Feature: Dependabot')
        .option('--skip-install', 'Option: Skip packages installation')
        .option('--skip-register-app', 'Option: Skip AppStore Registration')
        .option('--dry-run', 'Running without writing files. For testing only.')
        .action((projectName: string, options: any) => {
            if (options.dryRun) {
                chalk.gray(JSON.stringify(''));
                return;
            }
        });

    return commands;
}


generateProject().parseAsync(process.argv).then(r => console.log(r));
