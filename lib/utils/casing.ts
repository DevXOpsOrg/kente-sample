export function toCamelCase(string: string): string {
  return string.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Parse the name string to ensure the name is safe for package.json
 * @param name
 */
export function safeAppName(name: string) {
  // Replaces '../../../foo/bar-foo' to 'bar-foo'
  return name?.replace(/\S*\//, '');
}
