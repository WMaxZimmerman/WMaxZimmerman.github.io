cd infra/cdk

npm install -g aws-cdk
pip install -r requirements.txt

cdk bootstrap
cdk deploy --ci
