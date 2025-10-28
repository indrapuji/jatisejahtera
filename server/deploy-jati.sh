tar czf jati-api.tar.gz src
scp jati-api.tar.gz ubuntu@206.189.145.169:./app
rm jati-api.tar.gz

ssh ubuntu@206.189.145.169 <<'ENDSSH'
  cd app
  tar xf jati-api.tar.gz
  rm jati-api.tar.gz
  exit
ENDSSH