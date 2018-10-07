# regserve
A service that takes input data, performs regression analysis and returns fitting line function equation

It is a group of microservices implemented using google cloud functions that communicate to each other asynchrnously using google cloud pub/sub messaging platform. The client makes a rest call and recieves a url to check status and get result. 

* Uses Google NoSQL DataStore to store and query data
* Implemented using NodeJs
* Built in shell scripts for easy buckets clean up and functions deployment

It accepts a collection of point coordinates and returns a (least square fitting) trend line slope and y-intercept values.

## Design

![design](https://drive.google.com/uc?id=1LXg5pgWB9jSBH3lRvz5JK5B4-7jLdwJm)

## Cloud Functions
![functions](https://drive.google.com/uc?id=1-4rRX9wSPCUvkSNrccpVmy24ObfDeulb)

## Requests & Responses
![request1](https://drive.google.com/uc?id=1xnRKsXEYzeGq2ppKcyOUIlJ2ui0ZF0--)
![response1](https://drive.google.com/uc?id=1r4-bVTm4VRRSoeWgTHutr-JX-o7QfvgW)
![request2](https://drive.google.com/uc?id=1lblm8un-vn3l7Yq5IgNBWvAep6BcaQGv)

## Execution Flow

![flow](https://drive.google.com/uc?id=1Tr6mcwu8FY09SqIUJeZ1MiD1hcYH2HC8)
