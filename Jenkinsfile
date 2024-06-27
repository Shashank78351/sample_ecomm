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
                    docker build -t linuxappvm.eastus.cloudapp.azure.com:5050/root/e-comm-app/backend:latest .
                    '''
                }
                sh '''
                cd e-Commerce-main
                docker build -t linuxappvm.eastus.cloudapp.azure.com:5050/root/e-comm-app/frontend:latest .
                '''
            }
        }

        stage('Publish')
        {
            steps{
                script {
                    withCredentials([usernamePassword(credentialsId: 'gitlab', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh """
                            docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}
                            docker push linuxappvm.eastus.cloudapp.azure.com:5050/root/e-comm-app/backend:latest
                            docker push linuxappvm.eastus.cloudapp.azure.com:5050/root/e-comm-app/frontend:latest
                        
                        """
                    }
                }
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
