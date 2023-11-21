import { Runtime } from './runtime';
import { Project } from './project';

export interface GeneratorConfig {
  project: Project;
  runtime: Runtime;
}
