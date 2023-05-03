const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Créer la fenêtre du navigateur.
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Charger l'application ReactJS.
  mainWindow.loadURL('http://localhost:3000');

  // Ouvre les DevTools.
  mainWindow.webContents.openDevTools();

  // Émettre lorsque la fenêtre est fermée.
  mainWindow.on('closed', function () {
    // Détruit la référence de la fenêtre.
    mainWindow = null;
  });
}

// Cette méthode sera appelée lors de l'initialisation de l'application Electron.
// Elle initialise l'application et crée la fenêtre de l'application.
app.on('ready', createWindow);

// Quitter l'application lorsque toutes les fenêtres sont fermées.
app.on('window-all-closed', function () {
  // Pour les applications et les barres d'outils sur macOS, il est courant pour l'application
  // et leur barre de menus de rester actives jusqu'à ce que l'utilisateur quitte explicitement
  // avec Cmd + Q.
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // Sur macOS, il est courant de recréer une fenêtre dans l'application
  // lorsque l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres ouvertes.
  if (mainWindow === null) createWindow();
});

