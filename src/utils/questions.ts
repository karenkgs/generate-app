import { Question } from 'inquirer';
import * as choices from './choices';

export const PROJECT_CHOICE_NAME = 'project-choice';
export const PROJECT_NAME_NAME = 'project-name';

export const QUESTIONS: Question[] = [
    {
        name: PROJECT_CHOICE_NAME,
        type: 'list',
        message: 'What template project would you like to generate?',
        choices: choices.CHOICES,
    },
    {
        name: PROJECT_NAME_NAME,
        type: 'input',
        message: 'What is the project name?',
        validate: (input: string) => {
            return (/^([A-Za-z\-\_\d])+$/.test(input)) ? true : 'Project name may only include letters, numbers, underscores and hashes.';
        }
    }
];