const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Today, the complete CI/CD workflow was successfully set up and verified. Developers are pushing their application code to Repository 1, which triggers a Jenkins pipeline. Jenkins builds a Docker image from the latest code and pushes it to Docker Hub with an appropriate tag. It then updates the values.yaml file in the Helm chart repository with the new image tag and commits the changes. This Helm repository is being watched by ArgoCD, which automatically detects the updates and syncs the deployment to the Kubernetes cluster. As a result, a fully automated and reliable CI/CD pipeline is now in place, enabling seamless code deployment from development to production.');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});