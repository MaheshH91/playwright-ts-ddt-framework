import fs from 'fs';
import path from 'path';
import os from 'os';
import { ENV } from '../config/env.config';

export default async function globalSetup() {
    const resultsDir = path.resolve(process.cwd(), 'allure-results');

    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
    }

    // 1. Environment Properties
    const envData = [
        `URL=${ENV.BASE_URL}`,
        `Headless=${process.env.HEADLESS ?? ENV.HEADLESS}`,
        `OS=${os.type()} ${os.release()} (${os.arch()})`,
        `NodeVersion=${process.version}`,
        `PlaywrightWorkers=${process.env.CI ? '2' : 'Default'}`,
        `ExplicitWait=${ENV.EXPLICIT_WAIT}s`,
        `PageLoadTimeout=${ENV.PAGE_LOAD_TIMEOUT}s`,
    ].join('\n');

    fs.writeFileSync(path.join(resultsDir, 'environment.properties'), envData);

    // 2. Executor Details (Local / GitHub Actions / Jenkins)
    const isCI = !!process.env.CI;
    const isGitHub = !!process.env.GITHUB_ACTIONS;

    const executorData = {
        name: isGitHub ? 'GitHub Actions' : isCI ? 'Jenkins' : 'Local Machine',
        type: isGitHub ? 'github' : isCI ? 'jenkins' : 'local',
        reportName: 'TutorialsNinja Playwright Automation Report',
        url: process.env.BUILD_URL || process.env.GITHUB_SERVER_URL || '',
        buildUrl: process.env.BUILD_URL || `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
        buildName: process.env.BUILD_NUMBER || process.env.GITHUB_RUN_NUMBER || 'Local-Run',
        buildOrder: process.env.BUILD_NUMBER || process.env.GITHUB_RUN_NUMBER || 1,
    };

    fs.writeFileSync(
        path.join(resultsDir, 'executor.json'),
        JSON.stringify(executorData, null, 2)
    );

    // 3. Copy Categories file
    const categoriesSource = path.resolve(process.cwd(), 'data', 'categories.json');
    if (fs.existsSync(categoriesSource)) {
        fs.copyFileSync(categoriesSource, path.join(resultsDir, 'categories.json'));
    }
}
