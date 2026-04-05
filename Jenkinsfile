pipeline {
    agent any

    environment {
        AZURE_STORAGE_ACCOUNT = 'librarydevops123'
    }

    stages {
        stage('Build') {
            steps {
                bat 'if exist dist rmdir /s /q dist'
                bat 'mkdir dist'
                bat 'copy *.html dist'
                bat 'copy *.json dist'
                bat 'copy *.css dist'
                bat 'copy *.js dist'
            }
        }

        stage('Deploy to Azure') {
            steps {
                withCredentials([string(credentialsId: 'azure-storage-key', variable: 'AZURE_STORAGE_KEY')]) {
                    bat 'where az'
                    bat 'az storage blob upload-batch --account-name %AZURE_STORAGE_ACCOUNT% --account-key %AZURE_STORAGE_KEY% -s dist -d $web --overwrite'
                }
            }
        }
    }
}