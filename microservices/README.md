# Microservices

### 1 create Docker image and push to AWS
1 Log in AWS 
<br>
`aws ecr get-login-password --region REGION | docker login --username AWS --password-stdin AWSID.dkr.ecr.REGION.amazonaws.com`
<br> 
change REGION & AWSID to ur own
<br>
2 build Docker image
<br>
`docker image build -t imgNAME .`
<br>
change imgNAME to ur own
3 change tag name
<br>
`docker tag imgNAME AWSID.dkr.ecr.REGION.amazonaws.com/REPOSITORIESNAME:imgNAME`
<br>
4 push to AWS ECR
<br>
`docker push AWSID.dkr.ecr.REGION.amazonaws.com/REPOSITORIESNAME:imgNAME`
