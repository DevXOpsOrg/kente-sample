import { Features } from '../models';

export const CONDITIONAL_INCLUDES: Map<RegExp, (features: Features) => boolean> = new Map([
  [/\/dependabot-pr.yml/, (features) => features.dependabot],
  [/\/dependabot.yml/, (features) => features.dependabot],
  [/\/.releaserc.json/, (features) => features.semanticRelease],
]);
