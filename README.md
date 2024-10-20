Groupe 13 :
Mambou Ryan et
Traore Moussa

Documentation de l'API - Création de CV.

Contexte.

Cette API permet aux utilisateurs de s'inscrire, de créer et de gérer leurs CV, et de générer un PDF de leur CV.

Elle est construite avec Node.js, Express et MongoDB.

Technologies Utilisées :

Node.js : environnement d'exécution JavaScript.

Express : framework pour construire des applications web.

MongoDB : base de données NoSQL.

Mongoose : bibliothèque ODM pour MongoDB.

JWT (JSON Web Tokens) : pour l'authentification.

PDFKit : pour générer des fichiers PDF.

Installation.

Prérequis.

Node.js installé sur votre machine.

MongoDB installé localement ou un compte MongoDB Atlas.

Étapes d'installation.

Clonez le dépôt :

bash.

Copier le code :

git clone <url_du_depot>.

cd <nom_du_dossier>.

Installez les dépendances :

bash.

Copier le code.

npm install.

Créez un fichier .env à la racine du projet et ajoutez les variables
d'environnement :

plaintext.

Copier le code.

MONGO_URI=<votre_uri_mongodb>.

JWT_SECRET=<votre_clé_secrète>.

Lancez le serveur :

bash.

Copier le code.

npm start.

Routes de l'API.

Authentification.

POST /api/auth/register.

Description : Inscription d'un nouvel utilisateur.

Body :

json.

Copier le code.

{
"firstname": "Prénom",
"lastname": "Nom",
"email": "email@example.com",
"password": "motdepasse"
}.

POST /api/auth/login.

Description : Connexion d'un utilisateur existant.

Body :

json.

Copier le code.

{
"email": "email@example.com",
"password": "motdepasse"
}.

Réponse :

json.

Copier le code.

{
"token": "<votre_token_jwt>"
}.

Utilisateurs.

GET /api/users.

Description : Récupérer les informations de l'utilisateur authentifié.

Headers :

plaintext.

Copier le code.

Authorization: Bearer <votre_token_jwt>.

PUT /api/users/update.

Description : Mettre à jour le profil de l'utilisateur.

Headers :

plaintext.

Copier le code.

Authorization: Bearer <votre_token_jwt>.

Body :

json.

Copier le code.

{
"firstname": "Nouveau Prénom",
"lastname": "Nouveau Nom",
"email": "nouveau_email@example.com"
}.

CV.

POST /api/cv.

Description : Créer un nouveau CV.

Headers :

plaintext.

Copier le code.

Authorization: Bearer <votre_token_jwt>.

Body :

json.

Copier le code.

{
"title": "Titre du CV",
"description": "Description",
"education": [
{
"degree": "Diplôme",
"institution": "Institution",
"year": "Année"
}
],
"experience": [
{
"position": "Poste",
"company": "Entreprise",
"duration": "Durée"
}
]
}.

GET /api/cv/generate-pdf.

Description : Générer un PDF du CV de l'utilisateur authentifié.

Headers :

plaintext.

Copier le code.

Authorization: Bearer <votre_token_jwt>
