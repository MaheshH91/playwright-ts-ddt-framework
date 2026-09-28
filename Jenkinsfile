pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Must match the name configured in Jenkins under Global Tool Configuration
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
        URL = 'https://tutorialsninja.com/demo/'
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
                // Installs packages and Playwright browser binaries
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

                    // Execute Playwright command on Windows runner
                    bat """
                        npx playwright test ${projectArg} ${grepArg} ${workersArg}
                    """
                }
            }
        }
    }

    post {
        always {
            // 1. Publish Playwright HTML Report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])

            // 2. Archive test artifacts (traces, failure screenshots, videos)
            archiveArtifacts artifacts: 'test-results/**, playwright-report/**', allowEmptyArchive: true
        }
        failure {
            echo "Build failed. Check test-results/ traces and Playwright Test Report for details."
        }
    }
}
