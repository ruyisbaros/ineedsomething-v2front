cd /home/ec2-user/ineedsomething-v2front

sudo rm -rf .env

aws s3 sync s3://needsomething-env-files/frontend .

npm install
