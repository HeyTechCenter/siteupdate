# Déploiement de heytech.top sur le VPS

Guide pour installer et mettre à jour le site HeyTech Center sur le VPS Ubuntu (IP `69.10.46.36`).

Architecture :

```
Visiteur ──HTTPS──> Nginx (80/443)
                      ├── /      → Next.js  (127.0.0.1:3000)  frontend/
                      └── /api/  → Express  (127.0.0.1:5000)  backend/ → MongoDB Atlas + Gmail
```

Les applications n'écoutent qu'en local : seul Nginx est exposé sur Internet.

Prérequis : les enregistrements DNS `A @` et `A www` de heytech.top pointent vers `69.10.46.36`.
Vérification : `dig +short heytech.top` et `dig +short www.heytech.top` renvoient tous deux cette IP.

---

## 0. Avant toute chose : sécuriser MongoDB

L'ancien fichier `backend/.env`, avec l'URI MongoDB Atlas complète (identifiant et mot de passe), a été versionné dans Git.

1. Dans MongoDB Atlas → **Database Access** : changer le mot de passe de l'utilisateur (ou créer un nouvel utilisateur et supprimer l'ancien).
2. Dans **Network Access** : n'autoriser que l'IP du VPS `69.10.46.36` (supprimer `0.0.0.0/0` s'il existe).
3. Purger le fichier de l'historique Git (voir la fin de ce document).

---

## 1. Installer Node.js LTS, PM2, Nginx et Git

Connexion au serveur avec un utilisateur non root qui a les droits sudo (ici `deploy`, à adapter) :

```bash
ssh deploy@69.10.46.36
```

Mise à jour du système et outils de base :

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx ufw
```

Node.js 24 (LTS) via NodeSource :

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # v24.x
npm -v
```

PM2 (gestionnaire de processus) :

```bash
sudo npm install -g pm2
```

Pare-feu : n'ouvrir que SSH, HTTP et HTTPS :

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## 2. Récupérer le code et configurer les variables d'environnement

```bash
sudo mkdir -p /var/www
sudo chown "$USER":"$USER" /var/www
cd /var/www
git clone https://github.com/HeyTechCenter/heytech_Center.com.git heytech
cd heytech
```

### Backend : `backend/.env`

```bash
cp backend/.env.example backend/.env
nano backend/.env
chmod 600 backend/.env
```

Valeurs à renseigner :

| Variable      | Valeur en production                                          |
| ------------- | ------------------------------------------------------------- |
| `PORT`        | `5000`                                                        |
| `MONGO_URI`   | URI Atlas avec le **nouveau** mot de passe                    |
| `EMAIL_USER`  | Adresse Gmail qui envoie et reçoit les messages du formulaire |
| `EMAIL_PASS`  | Mot de passe d'application Gmail (validation en 2 étapes requise) |
| `CORS_ORIGIN` | `https://heytech.top,https://www.heytech.top`                 |

### Frontend

En production, **aucun fichier `.env` n'est nécessaire** : `NEXT_PUBLIC_API_URL` reste vide, et le formulaire appelle `/api/contact` sur le même domaine, que Nginx redirige vers le backend.

> Ne copiez pas `frontend/.env.example` en production : il contient `http://localhost:5000`, qui ne fonctionnerait pas chez les visiteurs.
> Les variables `NEXT_PUBLIC_*` sont figées au moment du `npm run build`.

---

## 3. Build et lancement avec PM2

```bash
cd /var/www/heytech

# Backend : dépendances de production uniquement
cd backend && npm ci --omit=dev && cd ..

# Frontend : installation puis build de production
cd frontend && npm ci && npm run build && cd ..

# Lancement des deux applications (voir ecosystem.config.cjs)
pm2 start ecosystem.config.cjs
pm2 status
```

> Si `npm run build` échoue avec « JavaScript heap out of memory » (VPS avec peu de RAM),
> utiliser le build webpack, plus économe : `npm run build:webpack`.
> Ajouter aussi un fichier d'échange (swap) de 2 Go si le serveur a moins de 2 Go de RAM :
> `sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile`
> puis `echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab`.

Vérification locale sur le serveur :

```bash
curl -I http://127.0.0.1:3000          # HTTP/1.1 200 OK
curl http://127.0.0.1:5000/            # {"message":"HeyTech API is running ✅", ...}
```

### Redémarrage automatique au boot

```bash
pm2 startup systemd
# PM2 affiche une commande « sudo env PATH=... pm2 startup systemd -u deploy --hp /home/deploy » :
# la copier-coller et l'exécuter.
pm2 save
```

Commandes utiles :

```bash
pm2 logs                    # journaux en direct
pm2 logs heytech-backend    # journaux du backend uniquement
pm2 restart heytech-backend
pm2 monit
```

---

## 4. Configuration Nginx

Créer `/etc/nginx/sites-available/heytech.top` :

```bash
sudo nano /etc/nginx/sites-available/heytech.top
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name heytech.top www.heytech.top;

    # Le formulaire de contact n'envoie que du texte
    client_max_body_size 100k;

    # API Express : /api/... → 127.0.0.1:5000/api/...
    location /api/ {
        proxy_pass         http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        # Indispensable pour que le rate limit voie la vraie IP du visiteur
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }

    # Site Next.js
    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   Upgrade           $http_upgrade;
        proxy_set_header   Connection        "upgrade";
    }
}
```

Activer le site, désactiver le site par défaut et recharger :

```bash
sudo ln -s /etc/nginx/sites-available/heytech.top /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

Test : http://heytech.top doit afficher le site.

---

## 5. HTTPS avec Certbot (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d heytech.top -d www.heytech.top --redirect
```

- Certbot ajoute les blocs `listen 443 ssl` dans la config Nginx.
- L'option `--redirect` ajoute la redirection **HTTP → HTTPS** (code 301).
- Le renouvellement automatique est installé (timer systemd). Pour le tester :

```bash
sudo certbot renew --dry-run
systemctl list-timers | grep certbot
```

Vérifications finales :

```bash
curl -I http://heytech.top             # 301 → https://heytech.top/
curl -I https://www.heytech.top        # 200
curl https://heytech.top/robots.txt
curl https://heytech.top/sitemap.xml
```

Puis envoyer un vrai message via le formulaire de contact et vérifier sa réception par email.

---

## 6. Procédure de mise à jour

À chaque nouvelle version poussée sur la branche `main` :

```bash
cd /var/www/heytech
git pull origin main

# Backend (seulement si backend/package*.json a changé, sinon facultatif)
cd backend && npm ci --omit=dev && cd ..

# Frontend : toujours rebuilder
cd frontend && npm ci && npm run build && cd ..

# Rechargement sans coupure
pm2 reload ecosystem.config.cjs
pm2 status
```

Si le build échoue, le site en ligne continue de tourner sur l'ancienne version tant que `pm2 reload` n'a pas été lancé. Corriger, puis relancer le build.

Retour à la version précédente en cas de problème :

```bash
git log --oneline -5
git checkout <commit_précédent>
cd frontend && npm ci && npm run build && cd ..
pm2 reload ecosystem.config.cjs
```

---

## Annexe : purger `backend/.env` de l'historique Git

> À faire **après** avoir changé le mot de passe MongoDB (étape 0) : la purge n'annule pas une fuite déjà survenue.
> Cette opération réécrit tout l'historique : tous les membres de l'équipe devront recloner le repo.

```bash
pip install git-filter-repo

# Partir d'un clone miroir neuf
git clone --mirror https://github.com/HeyTechCenter/heytech_Center.com.git
cd heytech_Center.com.git

# Supprimer backend/.env de tous les commits
# (on peut aussi retirer les anciens node_modules pour alléger le repo)
git filter-repo --invert-paths --path backend/.env --path node_modules/ --path backend/node_modules/

# filter-repo retire le remote par sécurité : le rajouter
git remote add origin https://github.com/HeyTechCenter/heytech_Center.com.git

# Pousser l'historique réécrit (force) : branches et tags
git push --force --all origin
git push --force --tags origin
```

Ensuite, sur GitHub : demander au support la purge des caches des anciens commits si le repo est ou a été public, et vérifier qu'aucun fork ne contient encore l'ancien fichier.
