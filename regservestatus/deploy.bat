
gsutil ls gs://regserve5 > list.txt
for /F "tokens=*" %%p IN (list.txt) DO gsutil rm %%p
del list.txt


gcloud beta functions deploy regServeStatus --stage-bucket regserve5 --trigger-http