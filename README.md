# regserve
A service that takes input data, performs regression analysis and returns fitting line function equation

It is a group of microservices implemented using google cloud functions that communicate to each other asynchrnously using google cloud pub/sub messaging platform. The client makes a rest call and recieves a url to check status and get result. 

* Uses Google NoSQL DataStore to store and query data
* Implemented using NodeJs
* Built in shell scripts for easy buckets clean up and functions deployment

It accepts a collection of point coordinates and returns a (least square fitting) trend line slope and y-intercept values.

## Design

![design](https://lh6.googleusercontent.com/DRk7SmkcLAo8Qa2M7oJGi8RJU0tktTF4W8gLUMqbc3ida_MQZZoUJAjIipTp_Kr3oL4rWh9QVBk3-1FJeyK9=w1280-h882)

## Cloud Functions
![functions](https://lh4.googleusercontent.com/00Mq6qi_UI0u9tmVSMdAWW2GZWjBuQJ3JED1fotkREUV89DVoOsBsG-SgXvWyOfFCL0JyxJuYRo3XvV21d0A=w1280-h882)

## Requests & Responses
![request1](https://lh5.googleusercontent.com/AJutiOZmM24Cw9Fpcx_kAqEYx2WOL8wKwt8Kt2dlQBp2h08EiHOJWNLmYBBTdXF1YeO0c2XA1afDgMBKgYuZ=w1280-h882-rw)
![response1](https://lh6.googleusercontent.com/fW8yjw48xt3rgP10B9rj-EsLxLRz_ie-osr1nTAvuSY7GcEuc5asDJQE2tuNgjzYDjovEGMahBgdY7iNSsvx=w1280-h882-rw)
![request2](https://lh3.googleusercontent.com/lhsK-7sknoP5LjKXqCIykb0xtBZor4eE7ZO0fMRg3Ci-acVFTpOaOhm8cl_F-VO8w0qpPgVKpxVVIWp4KP7c=w1280-h882)

## Execution Flow

![flow](https://lh5.googleusercontent.com/10vh-NlQhAnEhdQ7bWQeCuZNGLXE1KViXiKy8OTkSxMEdP4f8gLBICzZpGSaJ65Aw1TQxK5I1OR19Mi-U1Kg=w1280-h882)
