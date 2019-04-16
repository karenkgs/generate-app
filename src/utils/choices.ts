import { ChoiceType } from 'inquirer';
import * as sources from './sources';

const templateNames: Array<string> = Array.from(sources.gitSSHSources.keys());
export const CHOICES: ChoiceType[] = templateNames.map((templateName: string, index: number) => {
    return {
        name: `${index + 1} - ${templateName}`,
        value: templateName,
    };
});