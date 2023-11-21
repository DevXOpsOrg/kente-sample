export interface Project {
  author: string;
  releaseTrain: string;
  name: string;
  title: string;
  gitHubOrganization: string;
  nameCamelCase: string;
  version: string;
  features: Features;
  template: string;
  appId?: string;
  devBranchName: string;
  awsDomain: string;
}

export interface Features {
  semanticRelease: boolean;
  semanticReleaseBranch?: string;
  useRocketChatIntegration: boolean;
  useEnzyme: boolean;
  useOneGraph: boolean;
  useOneSightTracking: boolean;
  useNpm: boolean;
  useApiGateway: boolean;
  useLegacyTracking: boolean;
  useDependabot: boolean;
  registeredInAppStore?: boolean;
}
