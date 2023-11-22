import { PackageJson } from './package-json';

export interface ModifyData extends PackageJson {
  project?: any;
  appStore?: any;
}
