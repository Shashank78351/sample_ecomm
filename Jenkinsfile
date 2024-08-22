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

        stage('updating manifest') {

            steps {
                withCredentials([gitUsernamePassword(credentialsId: 'Gitlab', gitToolName: 'Default')]) {
                    sh """
                       
                        git config user.name "root"
                        BUILD_NUMBER=${env.BUILD_NUMBER}
                        sed -i "s+frontend/imagetag.*+frontend/imagetag:${BUILD_NUMBER}+g" deployment.yml 
                        cat deployment.yml
                        git add .
                        git status
                        git commit -m "update deployment image to version ${BUILD_NUMBER}"
                        git push https://glpat-rJj7s2J_wpFnKWxW5sMt@gitlab.com/root/e-comm-app HEAD:main

                    """
                }
            }

    }
}
