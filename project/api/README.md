# zivRepo
this project ...
if you want to use my project you need to:
1. insatll docker, you can do it from DockerHub 
2. install Node.js, NPM ,and Express on your server 

to get values on the metrics you sould do it like that :
curl --GET yourServer:8000/randomint //to gereate an int number for the metrics.
curl --GET yourServer:8000/randomfloat //to gereate a float number for the metrics.
curl --GET yourServer:8000/metrics // you can see all total 4 metrics.

documentation :
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/ -dockerizing node.js project
