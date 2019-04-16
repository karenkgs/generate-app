#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as inquirer from 'inquirer';
import { isError } from 'util';
import * as questions from './utils/questions';
import SourceDownloader from './SourceDownloader';
import FileManager from './FileManager';

const USER_CURRENT_DIRECTORY: string = process.cwd();
const TEMPLATES_TEMPORARY_DIRECTORY = 'temp_templates';

inquirer.prompt(questions.QUESTIONS)
    .then(answers => {
        // based on the answers, here we can ask more questions
        const projectChoice = answers[questions.PROJECT_CHOICE_NAME];
        const projectName: string = answers[questions.PROJECT_NAME_NAME];
        const templatePath: string = path.join(USER_CURRENT_DIRECTORY, TEMPLATES_TEMPORARY_DIRECTORY);
        const directoryToCreate: string = path.join(USER_CURRENT_DIRECTORY, projectName);

        try {
            fs.mkdirSync(directoryToCreate);
            console.log(`Successfully created directory '${directoryToCreate}'`);
            console.log(`Creating content for the template...`);
        } catch (error) {
            throw new Error(`Could not create dir '${directoryToCreate}'`);
        }

        const sourceDownloader: SourceDownloader = new SourceDownloader();
        sourceDownloader.download(projectChoice, TEMPLATES_TEMPORARY_DIRECTORY).then(() => {
            console.log('Project cloned in a temporary folder...');
            console.log('Creating and renaming files...');

            const isTemplateCreated: (Error | boolean) = FileManager.createDirectoryContent(templatePath, projectName, projectChoice);
            if (isError(isTemplateCreated)) {
                throw isTemplateCreated;
            }

            console.log('Deleting cloned project...');
            const isSourceDeleted = FileManager.removeDirectoryWithContent(templatePath);
            if (isError(isSourceDeleted)) {
                throw isSourceDeleted;
            }

            console.log('Cloned project deleted.');

            console.log('Deleting .git folder...');
            const isGitDirDeleted = FileManager.removeDirectoryWithContent(`${USER_CURRENT_DIRECTORY}/${projectName}/.git`);
            if (isError(isGitDirDeleted)) {
                throw isGitDirDeleted;
            }

            console.log('.git folder deleted.');

            // Should git init

            console.log(`Everything went well, you can go to the project folder '${USER_CURRENT_DIRECTORY}/${projectName}'`);

        }).catch((reason) => {
            console.log(`Could not generate project - ${reason}`);
        });
    });
