cd ./regservestatus

for /F "tokens=*" %%p IN ('gsutil ls gs://regserve5') DO call gsutil rm %%p

gcloud beta functions deploy regServeStatus --stage-bucket regserve5 --trigger-http


cd ..
