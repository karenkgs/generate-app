import { spawn } from 'child_process';
import * as sources from './utils/sources';

export default class SourceDownloader {

    private gitClone(url: string, directoryToCloneTo?: string): Promise<any> {
        return new Promise(function (resolve, reject) {
            console.log(`Cloning from ${url}...`);
            const args: string[] = [];
            args.push('clone', url);
            if (directoryToCloneTo) {
                args.push(directoryToCloneTo);
            }
            const process = spawn('git', args);
            process.on('error', function (err) {
                reject(err);
            });
            process.on('exit', function (code) {
                if (code === 0) {
                    resolve(code);
                } else {
                    reject(code);
                }
            });
        });
    }

    public download(sourceName: string, directoryToCloneTo?: string): Promise<any> {
        const source = sources.gitHTTPSSources.get(sourceName);
        if (source === null || source === undefined) {
            return new Promise((reject) =>
                reject('Source not found')
            );
        }

        return this.gitClone(source.url, directoryToCloneTo);
    }
}