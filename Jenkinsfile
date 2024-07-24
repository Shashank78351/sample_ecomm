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
        
        stage('Docker build backend')
        {
            when { changeset "backend/**"} //Will execute your steps if any file change inside the component_a directory
        steps {
                dir("backend"){
                    sh '''
                    docker build -t linuxappvm.eastus.cloudapp.azure.com:5050/root/e-comm-app/backend:latest .
                    '''
                }
        }
        }
        stage('Docker build e-commerce-main') 
        {
            when { changeset "e-Commerce-main/**"} //Will execute your steps if any file change inside the component_a directory
        steps {
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
                sh """
                export KUBECONFIG="/var/lib/jenkins/kubeconfig"
                BUILD_NUMBER=${env.BUILD_NUMBER}
                cd backend/kube-backend
                sed -i "s/imagetag/$BUILD_NUMBER/g" deployment.yml
                kubectl apply -f deployment.yml
                kubectl apply -f service.yml
                
                cd ../../e-Commerce-main/kube-frontend
                sed -i "s/imagetag/$BUILD_NUMBER/g" deployment.yml
                kubectl apply -f deployment.yml 
                kubectl apply -f service.yml
                """
            }
        }
    }
}
