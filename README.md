# nexibrain.com

Site vitrine de **NexiBrain Technologies** — studio d'applications mobiles propulsées par l'IA.
Site 100 % statique (HTML/CSS + un JS minimal), sans framework ni build : ce qui est dans le dépôt est ce qui est servi.

## Structure

```
├── index.html                       # Accueil (studio + vitrine des apps)
├── goalvision/                      # Page dédiée GoalVision (pronostics foot IA)
├── aura/                            # Page dédiée Aura (affirmations positives)
├── terms-of-service/                # Pages légales — URLs conservées de l'ancien
├── privacy-policy/                  #   site WordPress (enregistrées dans les
│   ├── goalpredict/                 #   consoles App Store / Play Store)
│   ├── africanproverbs/
│   ├── dailymotivationboost/
│   └── eurotofranccfa/
├── privacy-policy-gdpr/
├── 404.html                         # Page d'erreur (gérée par GitHub Pages)
├── assets/
│   ├── css/  base.css, legal.css    # Socle partagé + style pages légales
│   ├── js/   site.js                # Menu mobile + animations d'apparition
│   └── img/                         # Images optimisées (icônes, screenshots, OG)
├── CNAME                            # Domaine custom pour GitHub Pages
├── robots.txt / sitemap.xml
```

Chaque page définit sa palette en surchargeant les variables CSS de `assets/css/base.css`
(GoalVision : sombre / vert néon — Aura : papier chaud / or & violet — légal : neutre clair).

## Ajouter une nouvelle app

1. Optimiser les visuels (≤ 100 Ko par screenshot, largeur 540 px) dans `assets/img/<app>/`.
2. Dupliquer `aura/index.html` ou `goalvision/index.html`, adapter palette, textes et liens stores.
3. Ajouter une rangée `.app-row` dans `index.html` (section `#apps`), un lien dans les footers,
   et l'URL dans `sitemap.xml`.

## Prévisualiser en local

Les chemins sont relatifs : un simple serveur local suffit.

```powershell
cd Nexibrain
python -m http.server 8080
# puis http://localhost:8080
```

## Déployer sur GitHub Pages

1. Créer le dépôt GitHub, pousser `main`.
2. **Settings → Pages** : Source « Deploy from a branch », branche `main`, dossier `/ (root)`.
3. Le fichier `CNAME` (déjà présent) déclare `nexibrain.com` ; dans **Settings → Pages → Custom domain**,
   vérifier que `nexibrain.com` apparaît et cocher **Enforce HTTPS** (dès que le certificat est émis).

### DNS (Namecheap → Cloudflare)

Le domaine est chez Namecheap avec les serveurs DNS de Cloudflare : la zone se gère dans Cloudflare.

| Type  | Nom | Valeur |
|-------|-----|--------|
| A     | `@` | `185.199.108.153` |
| A     | `@` | `185.199.109.153` |
| A     | `@` | `185.199.110.153` |
| A     | `@` | `185.199.111.153` |
| CNAME | `www` | `<votre-user>.github.io` |

- Supprimer les anciens enregistrements pointant vers l'hébergement WordPress.
- Pendant la validation du certificat GitHub, passer les enregistrements en « DNS only »
  (nuage gris) ; le proxy Cloudflare (nuage orange) peut être réactivé ensuite.
- Dans Cloudflare, SSL/TLS en mode **Full (strict)** une fois « Enforce HTTPS » actif côté GitHub.

### Campagnes publicitaires (Meta, TikTok…)

Faire pointer les publicités directement sur les pages apps :

- GoalVision : `https://nexibrain.com/goalvision/`
- Aura : `https://nexibrain.com/aura/`

Les paramètres UTM (`?utm_source=tiktok&utm_campaign=...`) peuvent être ajoutés librement,
les pages étant statiques ils n'affectent rien.
