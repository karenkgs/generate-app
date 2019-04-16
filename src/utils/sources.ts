export const gitSSHSources: Map<string, {
    name: string,
    url: string,
    isDynamicTemplate: boolean,
}> = new Map([
    ['ts-template', { name: 'ts-template-repo-library', url: 'git@github.com:karenkgs/ts-template.git', isDynamicTemplate: true }]
]);