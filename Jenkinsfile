pipeline {
    agent any

    stages {
        stage('Checkout') 
        {
            steps
            {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'gitlab', url: 'https://linuxappvm.eastus.cloudapp.azure.com/root/e-comm-app.git']])
            }
        }
        
        stage('Docker build') 
        {
            steps
            {
                sh '''
                docker build -t e-comm-app .
                '''
            }
        }
        
        stage('Deploy') 
        {
            steps
            {
                sh '''
                
                '''
            }
        }
    }
}
