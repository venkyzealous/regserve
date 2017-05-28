cd ./regprocessingservice

for /F "tokens=*" %%p IN ('gsutil ls gs://regserve4') DO call gsutil rm %%p

gcloud beta functions deploy process --stage-bucket regserve4 --trigger-topic regserve-process

cd..

