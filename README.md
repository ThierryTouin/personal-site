# Installation et développement 

## Avec Docker

```shell
./run.sh site-start        # Démarre le site (http://localhost:8000)
./run.sh site-stop         # Stoppe les containers
./run.sh site-logs         # Logs du site
./run.sh builder-start     # Démarre l'environnement de dev
./run.sh builder-shell     # Shell dans le builder
./run.sh builder-stop      # Stoppe le builder
./run.sh clean-all         # Supprime tout (images + volumes)
```

## En local (Node.js 22)

```shell
rm -rf node_modules package-lock.json
npm install
gatsby develop
```

http://localhost:8000

http://localhost:8000/___graphql


# Des liens
https://www.gatsbyjs.com/

https://github.com/ThierryTouin/personal-site

https://www.netlify.com/

https://thierrytouin.fr/