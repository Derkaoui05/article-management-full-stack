# ArticleHub - Gestion d'Articles

ArticleHub est une application web moderne de gestion d'articles, construite avec React, TypeScript et Spring Boot. Elle offre une interface utilisateur intuitive pour gérer votre inventaire d'articles avec facilité.


## 🌟 Fonctionnalités

### Interface Utilisateur

- **Page d'accueil moderne**

  - Section héro avec appel à l'action
  - Affichage en grille des articles en vedette
  - Navigation responsive
  - Footer informatif

- **Gestion des Articles**
  - Liste des articles avec recherche et tri
  - Création d'articles
  - Modification d'articles existants
  - Suppression d'articles avec confirmation
  - Affichage des prix en format MAD
  - Interface responsive et moderne

### Caractéristiques Techniques

- Interface utilisateur moderne avec Tailwind CSS
- Composants UI réutilisables
- Validation des formulaires avec Zod
- Gestion d'état avec React Hooks
- Routing avec React Router
- API RESTful avec Spring Boot
- TypeScript pour un développement plus sûr

## 🚀 Démarrage Rapide

### Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn
- Java 17 ou supérieur
- Maven

### Installation Frontend

1. Clonez le repository :

```bash
git clone https://github.com/Derkaoui05/article-management-full-stack.git
cd article-management-full-stack/client
```

2. Installez les dépendances :

```bash
npm install
# ou
yarn install
```

3. Lancez le serveur de développement :

```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible à l'adresse `http://localhost:5173`

### Installation Backend

1. Naviguez vers le dossier session3 :

```bash
cd ../session3
```

2. Installez les dépendances Maven :

```bash
mvn install
```

3. Lancez l'application Spring Boot :

```bash
mvn spring-boot:run
```

Le serveur backend sera accessible à l'adresse `http://localhost:8080`

## 🛠️ Structure du Projet

```
article-hub/
├── client/
│   ├── src/
│   │   ├── components/     # Composants UI réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── services/      # Services API
│   │   └── types/         # Types TypeScript
│   └── public/            # Assets statiques
└── session3/
    ├── src/
    │   ├── main/
    │   │   ├── java/      # Code source Java
    │   │   └── resources/ # Configuration
    │   └── test/          # Tests
    └── pom.xml            # Dépendances Maven
```

## 📦 Dépendances Principales

### Frontend

- React 19
- TypeScript
- Tailwind CSS
- React-router-dom
- Zod
- Lucide Icons
- Shadcn/ui

### Backend

- Spring Boot
- Spring Data JPA
- Spring Web
- Hibernate (ORM)
- MySQL Connector
- Lombok
- Maven

## 🔧 Configuration

### Variables d'Environnement Frontend

Créez un fichier `.env` à la racine du projet frontend :

```env
VITE_API_URL=http://localhost:8080
```

### Configuration Backend

Le fichier `application.properties` contient les configurations du serveur et de la base de données MySQL :

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/articledb
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true
```

## 📝 API Endpoints

### Articles

- `GET /articles/all` - Récupérer tous les articles
- `GET /articles/{code}` - Récupérer un article par son code
- `POST /articles/create` - Créer un nouvel article
- `PUT /articles/update/{code}` - Mettre à jour un article
- `DELETE /articles/delete/{code}` - Supprimer un article

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- Votre Nom - Développeur Principal

## 🙏 Remerciements

- [Shadcn/ui](https://ui.shadcn.com/) pour les composants UI
- [Lucide Icons](https://lucide.dev/) pour les icônes
- [Tailwind CSS](https://tailwindcss.com/) pour le styling
- [Spring Boot](https://spring.io/projects/spring-boot) pour le backend
