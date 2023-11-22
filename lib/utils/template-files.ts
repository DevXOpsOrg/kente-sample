import path from 'path';
import { GeneratorInput } from '../models';
import { copy } from 'fs-extra';
import { promises, readdirSync } from 'fs';
const packageJson = require('../package.json.handlebars');

const { writeFile, mkdir, readFile } = promises;

export async function copyTemplateFiles(
  appTargetDirectory: string,
  { template: templateName }: GeneratorInput
): Promise<void> {
  try {
    await copy(path.join(process.cwd(), 'templates', templateName), path.join(appTargetDirectory), {
      filter: (file: string) => {
        return (
          file !== path.join(process.cwd(), 'templates', templateName, 'template-files/yarn.lock')
        );
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function writeTemplateFile(fileName: string, fileContent: string): Promise<void> {
  await mkdir(fileName.substring(0, fileName.lastIndexOf('/')), {
    recursive: true,
  }).then(() => writeFile(fileName, fileContent));
}

export async function getTemplateRecursively(directory: string): Promise<string[]> {
  const dir = readdirSync(directory, { withFileTypes: true });
  const files = await Promise.all(
    dir.map((dirent) => {
      const res = path.resolve(directory, dirent.name);
      return dirent.isDirectory() ? getTemplateRecursively(res) : res;
    })
  );
  return Array.prototype.concat(...files).filter((file) => file.match('templates'));
}

export async function getTemplateFiles(appTargetDirectory: string): Promise<string[]> {
  const files = await getTemplateRecursively(appTargetDirectory);
  files.map((file: string) => file.replace(appTargetDirectory, ''));
  return files;
}

export async function readTemplateFile(templateFile: string): Promise<string> {
  return readFile(templateFile, 'utf-8');
}

// export async function processTemplates(
//     appTargetDirectory: string,
//     {
//         name,
//         title,
//         gitHubOrganization,
//         author,
//         releaseTrain,
//         semanticRelease,
//         semanticReleaseBranch,
//         useRocketChatIntegration,
//         template,
//         packageManager,
//         devBranchName,
//         testingLibrary,
//         useOneGraph,
//         useOneSightTracking,
//         useApiGateway,
//         useLegacyTracking,
//         useDependabot,
//         awsDomain,
//     }: Create
// ) {
//     const appName = safeAppName(name);
//
//     const data: GeneratorConfig = {
//         project: {
//             author,
//             title,
//             releaseTrain,
//             name: appName,
//             gitHubOrganization,
//             nameCamelCase: toCamelCase(appName),
//             version: '0.1.0',
//             features: {
//                 semanticRelease,
//                 semanticReleaseBranch,
//                 useApiGateway,
//                 useEnzyme: testingLibrary === TestingLibrary.ENZYME,
//                 useRocketChatIntegration,
//                 useOneGraph,
//                 useOneSightTracking,
//                 useNpm: packageManager === PackageManager.NPM,
//                 useLegacyTracking,
//                 useDependabot,
//             },
//             template,
//             packageManager,
//             devBranchName,
//             awsDomain,
//         },
//         runtime: {
//             cli: packageJson.version,
//             node: process.version,
//             path: name,
//         },
//     };
//
//     const templateFiles = await getTemplateFiles(appTargetDirectory);
//
//     for (const templateFile of templateFiles) {
//         if (shouldCopyFile(templateFile, data.project.features, CONDITIONAL_INCLUDES)) {
//             await buildTemplate(templateFile, data);
//         }
//     }
//
//     await cleanupProjectDir(templateFiles);
// }
