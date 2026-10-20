// Configuration PM2 — lancement du site HeyTech Center en production
// Utilisation (depuis la racine du repo) : pm2 start ecosystem.config.cjs
// Les deux applications n'écoutent qu'en local : Nginx est la seule porte d'entrée.

module.exports = {
  apps: [
    {
      name:   'heytech-frontend',
      cwd:    './frontend',
      script: 'node_modules/next/dist/bin/next',
      args:   'start -p 3000 -H 127.0.0.1',
      env: {
        NODE_ENV: 'production',
      },
      max_memory_restart: '500M',
    },
    {
      name:   'heytech-backend',
      cwd:    './backend',
      script: 'server.js',
      // PORT, MONGO_URI, EMAIL_* et CORS_ORIGIN sont lus dans backend/.env
      env: {
        NODE_ENV: 'production',
        HOST:     '127.0.0.1',
      },
      max_memory_restart: '300M',
    },
  ],
};
