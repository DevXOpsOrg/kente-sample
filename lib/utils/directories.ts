import path from 'path';
import { mkdirSync, promises } from 'fs';
const { rm, access } = promises;

export async function cleanupProjectDir(templateFiles: string[]): Promise<void> {
  const templateDirs = templateFiles.map((file) =>
    file.replace(/(^.*\/template-files)\/.+$/, '$1')
  );

  await Promise.all(
    [...new Set(templateDirs)].map((directory) =>
      rm(path.join(directory), {
        recursive: true,
      })
    )
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
  return path.join(targetDir, projectName);
}

export function createProjectDir(appDirectory: string) {
  mkdirSync(appDirectory, { recursive: true });
}
