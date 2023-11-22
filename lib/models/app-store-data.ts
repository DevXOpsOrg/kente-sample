export interface AppStoreData {
  appId?: string;
  title?: string;
  shortDescription?: string;
  description?: string;
  team?: string;
  agileReleaseTrain?: string;
  supplier?: string;
  contactPerson?: {
    name?: string;
    chatUrl?: string;
  };
  clientSideBundleUrl?: string;
  demoUrl?: string;
  devChatUrl?: string;
  createTicketUrl?: string;
  documentationBundleUrl?: string;
  documentationUrl?: string;
  thumbnailUrl?: string;
  mediaItems?: string[];
  markets?: string[];
  categories?: string[];
  brands?: string[];
  contentManagementSystems?: string[];
  extra?: {
    featureHub?: {
      baseUrl?: string;
      clientSideBundleUrl?: string;
    };
  };
}
