import { Features } from '../models';

export const CONDITIONAL_INCLUDES: Map<RegExp, (features: Features) => boolean> = new Map([
  [/\/dependabot-pr.yml/, (features) => features.useDependabot],
  [/\/dependabot.yml/, (features) => features.useDependabot],
  [/\/.releaserc.json/, (features) => features.semanticRelease],
]);
