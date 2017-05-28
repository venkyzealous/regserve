
gsutil ls gs://regserve4 > list.txt
for /F "tokens=*" %%p IN (list.txt) DO gsutil rm %%p
del list.txt

gcloud beta functions deploy process --stage-bucket regserve4 --trigger-topic regserve-process
