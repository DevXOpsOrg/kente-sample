export interface CliParams {
  name?: string;
  title?: string;
  targetDirectory?: string;
  template?: string;
  skipInstall?: boolean;
  skipRegisterApp?: boolean;
  useApiGateway?: boolean;
  useDependabot?: boolean;
  semanticRelease?: boolean;
  semanticReleaseBranch?: string;
}

type Required<T> = {
  [P in keyof T]-?: T[P];
};

export type GeneratorInput = Required<CliParams>;
