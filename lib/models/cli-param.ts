export interface CliParams {
  author?: string;
  title?: string;
  semanticRelease?: boolean;
  semanticReleaseBranch?: string;
  skipInstall?: boolean;
  skipRegisterApp?: boolean;
  appStoreToken?: string;
  devBranchName?: string;
  apiGateway?: boolean;
  dependabot?: boolean;
  dryRun?: boolean;
  targetDirectory?: string;
}
