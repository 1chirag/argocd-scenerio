// pipeline {
//     agent any

//     environment {
//         IMAGE_NAME = 'jainchirag/nodeapi'
//         DOCKER_CREDENTIALS_ID = 'docker-hub-creds'  // Jenkins credentials ID for Docker Hub
//         IMAGE_TAG = "v${BUILD_NUMBER}"
//     }

//     stages {
//         stage('Clone Repository') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/1chirag/argocd-scenerio.git'
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
//             }
//         }

//         stage('Login to Docker Hub & Push Image') {
//             steps {
//                 withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
//                     sh '''
//                         echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
//                         docker push $IMAGE_NAME:$IMAGE_TAG
//                     '''
//                 }
//             }
//         }

//         stage('Update Image Tag in Deployment File') {
//             steps {
//                 sh '''
//                     sed -i '' "s/{{TAG}}/$IMAGE_TAG/g" nodeapi-deployment.yaml
//                 '''
//             }
//         }

//         stage('Print Updated Deployment File') {
//             steps {
//                 sh 'cat nodeapi-deployment.yaml'
//             }
//         }

//         stage('Deploy to Kubernetes') {
//             steps {
//                 sh '''
//                     echo "Deploying Deployment and Service to Kubernetes..."
//                     kubectl apply -f nodeapi-deployment.yaml
//                     kubectl apply -f nodeapi-service.yaml
//                 '''
//             }
//         }
//     }
// }

pipeline {
    agent any

    environment {
        IMAGE_NAME = 'jainchirag/nodeapi'
        DOCKER_CREDENTIALS_ID = 'docker-hub-creds'  // Jenkins credentials ID
        IMAGE_TAG = "v${BUILD_NUMBER}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/1chirag/argocd-scenerio.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Login and Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_NAME:$IMAGE_TAG
                    '''
                }
            }
        }

        stage('Update Image Tag in K8s Deployment File') {
            steps {
                sh '''
                    sed -i '' "s/{{TAG}}/$IMAGE_TAG/g" k8s/nodeapi-deployment.yaml
                '''
            }
        }

        stage('Commit and Push Updated YAML to Git') {
            steps {
                sh '''
                    git config user.name "jenkins"
                    git config user.email "jenkins@localhost"
                    git add k8s/nodeapi-deployment.yaml
                    git commit -m "Update image to $IMAGE_TAG"
                    git push origin main
                '''
            }
        }

        stage('Print Updated Deployment File') {
            steps {
                sh 'cat k8s/nodeapi-deployment.yaml'
            }
        }
    }
}
