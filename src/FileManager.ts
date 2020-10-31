import * as fs from 'fs';
import * as path from 'path';
import * as sources from './utils/sources';

export default class FileManager {
    public static createDirectoryContent(templatePath: string, projectName: string, projectChoice: string): (Error | boolean) {
        const USER_CURRENT_DIRECTORY = process.cwd();
        const source = sources.gitHTTPSSources.get(projectChoice);
        if (source !== null && source !== undefined) {
            try {
                const filesToCreate = fs.readdirSync(templatePath);
                filesToCreate.forEach(file => {
                    const originFilePath: string = path.join(templatePath, file);
                    const currentFileStats = fs.statSync(originFilePath);

                    if (currentFileStats.isFile()) {
                        const contents = fs.readFileSync(originFilePath, 'utf8');
                        const writePath: string = path.join(USER_CURRENT_DIRECTORY, projectName, file);

                        let result = contents;
                        const isDynamicTemplate: boolean = source.isDynamicTemplate;

                        if (isDynamicTemplate) {
                            result = contents.replace(new RegExp(projectChoice, 'g'), projectName);
                        }

                        fs.writeFileSync(writePath, result, 'utf8');
                    } else if (currentFileStats.isDirectory()) {
                        fs.mkdirSync(path.join(USER_CURRENT_DIRECTORY, projectName, file));
                        // recursive call
                        this.createDirectoryContent(path.join(templatePath, file), path.join(projectName, file), projectChoice);
                    }
                });
            }
            catch (error) {
                return new Error(`Could not get files from template '${templatePath}'`);
            }
            return true;
        }

        return new Error(`Could not find template '${projectChoice}'`);
    }

    public static removeDirectoryWithContent(pathName: string) {
        try {
            if (fs.existsSync(pathName)) {
                fs.readdirSync(pathName).map((file) => {
                    const currentPath: string = path.join(pathName, file);
                    if (fs.lstatSync(currentPath).isDirectory()) {
                        this.removeDirectoryWithContent(currentPath);
                    } else { // delete file
                        fs.unlinkSync(currentPath);
                    }
                });
                fs.rmdirSync(pathName);
            }
        } catch (error) {
            throw new Error(`Could not delete dir '${pathName}' \n${error}`);
        }
    }
}