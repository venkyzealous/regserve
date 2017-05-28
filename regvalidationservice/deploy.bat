
gsutil ls gs://regserve3 > list.txt
for /F "tokens=*" %%p IN (list.txt) DO gsutil rm %%p
del list.txt


gcloud beta functions deploy validate --stage-bucket regserve3 --trigger-topic regserve-validate
