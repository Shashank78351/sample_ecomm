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
                dir("backend"){
                    sh '''
                    docker build -t backend .
                    '''
                }
                sh '''
                cd e-Commerce-main
                docker build -t frontend .
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
