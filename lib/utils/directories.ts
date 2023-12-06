import { join } from 'path';
import { mkdirSync, promises } from 'fs';
const { rm, access } = promises;

export async function cleanupProjectDir(templateFiles: string[]): Promise<void> {
  const uniqueDirs = [...new Set(templateFiles.map((file) => file.replace(/(^.*\/template-files)\/.+$/, '$1')))];

  await Promise.all(
    uniqueDirs.map(async (directory) => {
      try {
        const stats = await promises.stat(directory);

        if (stats.isDirectory()) {
          const handlebarFileExists = templateFiles.some((file) => file.startsWith(directory) && file.endsWith('.handlebars'));

          if (!handlebarFileExists) {
            await promises.rmdir(directory, { recursive: true });;
          }
        }
      } catch (error) {
        throw error;
      }
    })
  );
}

export async function testProjectDirExists(projectName: string): Promise<boolean> {
  try {
    await access(projectName);
    return true;
  } catch (error) {
    return false;
  }
}

export function getFullAppDirectory(targetDir: string, projectName: string) {
  return join(targetDir, projectName);
}

export function createProjectDir(appDirectory: string) {
  mkdirSync(appDirectory, { recursive: true });
}

