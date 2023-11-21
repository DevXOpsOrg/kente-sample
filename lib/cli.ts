import { Command } from 'commander';
import { registerStructureGeneratorCommand } from './commands/structure-generator';

const program = new Command();

// Register commands
registerStructureGeneratorCommand(program);

program.parse(process.argv);