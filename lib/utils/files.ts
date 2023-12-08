import { Features, ModifyData } from '../models';
import { readFileSync, writeFileSync } from 'fs';

export const shouldCopyFile = (
  templatePath: string,
  features: Features,
  conditionalIncludes: Map<RegExp, (features: Features) => boolean>
): boolean => {
  const matched: ((features: Features) => boolean)[] = [];

  conditionalIncludes.forEach((value, key) => {
    if (templatePath.match(key)) {
      matched.push(value);
    }
  });
  if (matched.length > 1) {
    throw Error(
      "Multiple RegEx match the file path. This shouldn't happen, please create an issue on GitHub."
    );
  }
  if (matched.length === 0) {
    return true;
  }
  return matched[0](features);
};

function modifyJsonFile(filePath: string, modifier: (jsonFile: ModifyData) => void): void {
  const projectJsonFile = JSON.parse(readFileSync(filePath).toString());
  modifier(projectJsonFile);
  writeFileSync(filePath, JSON.stringify(projectJsonFile, null, 2));
}
