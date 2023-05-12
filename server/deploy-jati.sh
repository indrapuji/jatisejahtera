tar czf jati-api.tar.gz src
scp jati-api.tar.gz ubuntu@159.65.1.92:./app
rm jati-api.tar.gz

ssh ubuntu@159.65.1.92 <<'ENDSSH'
  cd app
  tar xf jati-api.tar.gz
  rm jati-api.tar.gz
  exit
ENDSSH