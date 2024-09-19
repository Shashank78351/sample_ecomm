@Library('my-shared-library') _  // This imports the shared library

pipeline {
    agent any
    // environment {
    //     FLYWAY_URL = 'jdbc:mysql://172.174.141.97:32005/ecommerce'
    //     FLYWAY_USER = 'root'
    //     FLYWAY_PASSWORD = 'admin#123'
    //     FLYWAY_LOCATIONS = 'filesystem:sql/migrations'
    // }
    tools {
        flyway 'flyway'
    }

    stages {
        stage('Checkout') {
            steps {
                checkoutCode('main', 'Github', 'https://github.com/Shashank78351/sample_ecomm.git')
            }
        }

        stage('Docker build backend') {
            when { changeset "backend/**" }
            steps {
                buildDockerBackend('backend', 'latest')
            }
        }

        stage('Docker build frontend') {
            when { changeset "e-Commerce-main/**" }
            steps {
                buildDockerFrontend('e-Commerce-main', 'latest')
            }
        }

        stage('Publish') {
            steps {
                publishDockerImages(
                    'linuxappvm.eastus.cloudapp.azure.com:5050/root/e-comm-app/backend:latest',
                    'linuxappvm.eastus.cloudapp.azure.com:5050/root/e-comm-app/frontend:latest'
                )
            }
        }

        // stage('Database migration') {
        //     steps {
        //         databaseMigration(FLYWAY_URL, FLYWAY_USER, FLYWAY_PASSWORD, FLYWAY_LOCATIONS)
        //     }
        // }
    }
}