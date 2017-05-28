
gsutil ls gs://regserve > list.txt
for /F "tokens=*" %%p IN (list.txt) DO gsutil rm %%p
del list.txt


gcloud beta functions deploy regServe --stage-bucket regserve --trigger-http