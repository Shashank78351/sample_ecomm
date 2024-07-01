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
                            docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD} linuxappvm.eastus.cloudapp.azure.com:5050
                            docker tag linuxappvm.eastus.cloudapp.azure.com:5050/root/e-comm-app/frontend:latest linuxappvm.eastus.cloudapp.azure.com:5050/root/e-comm-app/frontend:${env.BUILD_NUMBER} 
                            docker tag linuxappvm.eastus.cloudapp.azure.com:5050/root/e-comm-app/backend:latest linuxappvm.eastus.cloudapp.azure.com:5050/root/e-comm-app/backend:${env.BUILD_NUMBER}
                            docker push --all-tags linuxappvm.eastus.cloudapp.azure.com:5050/root/e-comm-app/backend
                            docker push --all-tags linuxappvm.eastus.cloudapp.azure.com:5050/root/e-comm-app/frontend
                        
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
                cd backend
                kubectl apply -f deployment.yaml
                kubectl apply -f service.yaml
                kubectl apply -f secret.yaml
                '''
            }
        }
    }
}
