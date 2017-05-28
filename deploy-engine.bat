
cd ./regserveengine

for /F "tokens=*" %%p IN ('gsutil ls gs://regserve2') DO call gsutil rm %%p

gcloud beta functions deploy startEngine --stage-bucket regserve2 --trigger-topic regserve-request

cd..


