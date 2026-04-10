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

gatsby develop -H 0.0.0.0


http://localhost:8000

http://localhost:8000/___graphql


# Des liens
https://www.gatsbyjs.com/

https://github.com/ThierryTouin/personal-site

https://www.netlify.com/

https://thierrytouin.fr/


# Domain

## Check domain
dig www.thierrytouin.fr +short
dig thierrytouin.fr +short
dig @8.8.8.8 thierrytouin.fr +short
dig @8.8.8.8 www.thierrytouin.fr +short


## Conf ovh => github

thierrytouin.fr. IN A 185.199.108.153
thierrytouin.fr. IN A 185.199.109.153
thierrytouin.fr. IN A 185.199.110.153
thierrytouin.fr. IN A 185.199.111.153
www.thierrytouin.fr. IN CNAME thierrytouin.github.io.

