pipeline {
    agent any
 
    tools {
        nodejs 'NodeJS'
    }
 
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
 
        stage('Build & Test') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
                bat 'npx playwright test'
            }
        }
    }
 
    post {
        always {
            junit 'test-results/results.xml'

            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            
            publishHTML(target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: true
            ])
        }
    }
}
 