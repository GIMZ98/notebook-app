# NoteBook App

This is a online notebook application where users can save their notes by providing title and content. First users must me registered with username and password. Before interact with notes users must be login with the same credentials(username and password) used for registration. After successful login, users can perform operations like create, view, update, delete on notes.

## Installation
```cmd
    git clone https://github.com/GIMZ98/notebook-app.git
    cd notebook-app
    npm install
```

## Add required variables to .env
```env
    MONGO_URL= Your mongoDB URI
```

## For run on local server with netlify
```cmd
npm install -g netlify-cli
netlify dev
```