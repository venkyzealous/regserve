gsutil ls gs://regserve2 > list.txt
for /F "tokens=*" %%p IN (list.txt) DO gsutil rm %%p
del list.txt


gcloud beta functions deploy startEngine --stage-bucket regserve2 --trigger-topic regserve-request