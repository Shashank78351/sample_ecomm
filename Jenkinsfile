pipeline {
    agent any
    environment {
        FLYWAY_URL = 'jdbc:mysql://172.174.141.97:32005/ecommerce'
        FLYWAY_USER = 'root'
        FLYWAY_PASSWORD = 'admin#123'
        FLYWAY_LOCATIONS = 'filesystem:sql/migrations'  // Path to your migration files
    }
    tools{
      flyway 'flyway'
    }

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

        // stage('updating manifest') {

        //    steps
        //     {
        //      withCredentials([gitUsernamePassword(credentialsId: 'Gitlab', gitToolName: 'Default')]) {
        //         sh """
        //         BUILD_NUMBER=${env.BUILD_NUMBER}
        //         cd backend/kube-backend
        //         sed -i "s/imagetag/$BUILD_NUMBER/g" deployment.yml
        //         cd ../../e-Commerce-main/kube-frontend
        //         sed -i "s/imagetag/$BUILD_NUMBER/g" deployment.yml
        //         git checkout main
        //         git add ../../backend/kube-backend/deployment.yml ../../e-Commerce-main/kube-frontend/deployment.yml
        //         git status
        //         git commit -m "update deployment image to version ${BUILD_NUMBER}"
        //         git push https://root:glpat-Dq2ZoMtMBm78gTVr14fz@linuxappvm.eastus.cloudapp.azure.com/root/e-comm-app.git HEAD:main

        //         """

        //         }
        //     }
        // }
        stage('database migration'){
            steps{
             sh """
             flyway -url=$FLYWAY_URL -user=$FLYWAY_USER -password=$FLYWAY_PASSWORD -locations=$FLYWAY_LOCATIONS repair
             flyway -url=$FLYWAY_URL -user=$FLYWAY_USER -password=$FLYWAY_PASSWORD -locations=$FLYWAY_LOCATIONS migrate
             """

            }
        }
    }
}
