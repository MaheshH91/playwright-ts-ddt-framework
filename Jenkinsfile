pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Configured under Manage Jenkins > Tools
    }

    parameters {
        choice(
            name: 'PROJECT',
            choices: ['all', 'chromium', 'firefox', 'edge'],
            description: 'Select target browser/project to execute'
        )
        choice(
            name: 'TAG',
            choices: ['all', '@smoke', '@regression'],
            description: 'Select test tag filter'
        )
        booleanParam(
            name: 'HEADLESS',
            defaultValue: true,
            description: 'Run tests in headless mode'
        )
        string(
            name: 'WORKERS',
            defaultValue: '2',
            description: 'Number of parallel workers'
        )
    }

    options {
        timeout(time: 45, unit: 'MINUTES')
        ansiColor('xterm')
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'
        HEADLESS = "${params.HEADLESS}"
        APP_URL = 'https://tutorialsninja.com/demo/'
    }

    stages {
        stage('Checkout Code') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    npm ci
                    npx playwright install --with-deps
                '''
            }
        }

        stage('Execute Playwright Tests') {
            steps {
                script {
                    def projectArg = params.PROJECT == 'all' ? '' : "--project=${params.PROJECT}"
                    def grepArg = params.TAG == 'all' ? '' : "--grep ${params.TAG}"
                    def workersArg = "--workers=${params.WORKERS}"

                    // Continue pipeline execution even if tests fail so reports are always generated
                    catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                        bat """
                            set URL=${APP_URL}
                            npx playwright test ${projectArg} ${grepArg} ${workersArg}
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            // 1. Generate & Publish Allure Report
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])

            // 2. Publish Standard Playwright HTML Report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])

            // 3. Archive Artifacts
            archiveArtifacts artifacts: 'test-results/**, playwright-report/**', allowEmptyArchive: true
        }
    }
}
