cd ./regvalidationservice

for /F "tokens=*" %%p IN ('gsutil ls gs://regserve3') DO call gsutil rm %%p
gcloud beta functions deploy validate --stage-bucket regserve3 --trigger-topic regserve-validate

cd ..
