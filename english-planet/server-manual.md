### login as ubuntu
all command below should be run as sudo

### clone repo
```
cd /home/ubuntu/Applications
git clone https://github.com/lehuy299/ThesisProject.git
```

### pull latest
```
cd /home/ubuntu/Applications/ThesisProject
git pull origin main
```

### install needed node_modules, init and seed db
```
cd /home/ubuntu/Applications/ThesisProject/english-planet/server
npm run install-all
npm run init-db-staging
npm run seed-staging
```

### build front-end
```
cd /home/ubuntu/Applications/ThesisProject/english-planet/client
npm run build-app-staging
```

### start server using pm2
```
sudo pm2 start /home/ubuntu/Applications/ThesisProject/english-planet/server/src/start-server-staging.js --node-args="--expose-gc" -- staging --name "english-planet"
sudo pm2 save
```