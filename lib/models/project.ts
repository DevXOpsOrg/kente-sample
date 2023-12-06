export interface Project {
  name: string;
  title: string;
  nameCamelCase: string;
  version: string;
  features: Features;
  template: string;
  appId?: string;
}

export interface Features {
  semanticRelease: boolean;
  semanticReleaseBranch?: string;
  dependabot: boolean;
  registeredInAppStore?: boolean;
}
