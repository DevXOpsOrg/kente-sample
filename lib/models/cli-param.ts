export interface CliParams {
  name?: string,
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
  template?: string;
  targetDirectory?: string;
  microfrontend?: boolean,
  microservices?: boolean,
}

type Required<T> = {
  [P in keyof T]-?: T[P];
};

export type GeneratorInput = Required<CliParams>;
