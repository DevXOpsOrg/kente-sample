export interface CommandInputs {
  name?: string;
  title?: string;
  targetDirectory?: string;
  template?: string;
  skipInstall?: boolean;
  skipRegisterApp?: boolean;
  useApiGateway?: boolean;
  useDependabot?: boolean;
}

type Required<T> = {
  [P in keyof T]-?: T[P];
};

export type GeneratorInput = Required<CommandInputs>;