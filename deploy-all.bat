for /F "tokens=*" %%p IN ('gsutil ls gs://regserve') DO call gsutil rm %%p
for /F "tokens=*" %%p IN ('gsutil ls gs://regserve2') DO call gsutil rm %%p
for /F "tokens=*" %%p IN ('gsutil ls gs://regserve3') DO call gsutil rm %%p
for /F "tokens=*" %%p IN ('gsutil ls gs://regserve4') DO call gsutil rm %%p
for /F "tokens=*" %%p IN ('gsutil ls gs://regserve5') DO call gsutil rm %%p


cd regservemain
gcloud beta functions deploy regServe --stage-bucket regserve --trigger-http

cd ../regserveengine
gcloud beta functions deploy startEngine --stage-bucket regserve2 --trigger-topic regserve-request

cd ../regservevalidationservice
gcloud beta functions deploy validate --stage-bucket regserve3 --trigger-topic regserve-validate

cd ../regserveprocessingengine
gcloud beta functions deploy process --stage-bucket regserve4 --trigger-topic regserve-process

cd ../regservestatus
gcloud beta functions deploy regServeStatus --stage-bucket regserve5 --trigger-http

cd ..
