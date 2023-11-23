import path from 'path';
import { appendFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { BehaviorSubject } from 'rxjs';
import { PackageJson } from '../models';
import { promisify } from 'util';
import { exec } from 'child_process';
import { success, warning } from '../utils/chalk';

function updateVersions(source: PackageJson, target: PackageJson, section: string): PackageJson {
  const sourceSection = source[section as keyof PackageJson];
  const targetSection = target[section as keyof PackageJson];
  Object.keys(targetSection).forEach((key: string) => {
    if (Object.keys(sourceSection).indexOf(key) > 1) {
      targetSection[key] = sourceSection[key];
    }
  });

  return target;
}

function updateDependencies(
  observer: BehaviorSubject<string | unknown>,
  appDirectory: string,
  isMsOrMf?: boolean
) {
  // The __dirname is improperly evaluated while running tests
  // due to jest.config that has the rootDir set as './src'
  const cfaRoot = process.env.NODE_ENV === 'test' ? path.resolve('./') : __dirname;
  const jsonFilePath = 'dependencies'; // TODO add condition for ms or mf

  // Check if maintenance/package.json.handlebars exists otherwise throw warning
  const maintenanceJson = path.join(cfaRoot, jsonFilePath, 'package.json.handlebars');

  if (!existsSync(maintenanceJson)) {
    observer.next(warning('Warning! Checking for latest package versions failed!'));
  } else {
    compareAndUpdatePackageJsonVersions(observer, appDirectory, maintenanceJson);
  }
}

function compareAndUpdatePackageJsonVersions(
  observer: BehaviorSubject<string | unknown>,
  appDirectory: string,
  maintenanceJson: string
) {
  try {
    // Read maintenance package.json.handlebars
    const rawMaintenanceData = readFileSync(maintenanceJson, 'utf8');
    const maintenanceJsonData = JSON.parse(rawMaintenanceData);

    // Read projects package.json.handlebars
    const rawPackageData = readFileSync(path.join(appDirectory, 'package.json.handlebars'), 'utf8');
    const packageJsonData = JSON.parse(rawPackageData);

    // Compare and update versions
    updateVersions(maintenanceJsonData, packageJsonData, 'dependencies');
    updateVersions(maintenanceJsonData, packageJsonData, 'devDependencies');

    // Write file
    writeFileSync(
      path.join(appDirectory, 'package.json.handlebars'),
      JSON.stringify(packageJsonData, null, 2)
    );

    // Append new line for linting purposes
    appendFileSync(path.join(appDirectory, 'package.json.handlebars'), '\n', 'utf-8');

    observer.next(success('Successfully updated packages to newest versions!'));
  } catch (error) {
    observer.next(warning('Warning! Check for latest package versions failed!'));
  }
}

export function installDependencies(appDirectory: string) {
  return promisify(exec)(`cd ${appDirectory} && npm install --ignore-scripts`);
}
