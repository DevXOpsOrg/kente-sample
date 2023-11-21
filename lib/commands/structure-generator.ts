import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';

export function registerStructureGeneratorCommand(program: Command) {
  program
    .command('create <folderName>')
    .description('Create a folder structure based on user input')
    .action((folderName: string) => {
      const folderPath = path.join(process.cwd(), folderName);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      // Create subdirectories and files
      const folders = ['src', 'src/commands'];
      const files = ['src/index.ts'];

      folders.forEach((folder) => {
        const folderDir = path.join(folderPath, folder);
        if (!fs.existsSync(folderDir)) {
          fs.mkdirSync(folderDir, { recursive: true });
        }
      });

      files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, '');
        }
      });

      console.log(`Folder structure created for "${folderName}"`);
    });
}
