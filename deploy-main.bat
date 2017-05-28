cd regservemain

for /F "tokens=*" %%p IN ('gsutil ls gs://regserve') DO call gsutil rm %%p

gcloud beta functions deploy regServe --stage-bucket regserve --trigger-http

cd ..