const fs = require('fs');
const path = require('path');

// Chemin vers le dossier contenant les fichiers JSON
const directoryPath = path.join(__dirname, 'json'); // Remplacez 'votre_dossier' par le nom réel du dossier

// Fonction pour lire et mettre à jour chaque fichier JSON
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Impossible de lire le dossier:', err);
  }

  // Parcourir tous les fichiers du dossier
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    // Vérifiez si le fichier est un fichier JSON
    if (path.extname(file) === '.json') {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Erreur lors de la lecture du fichier:', file, err);
          return;
        }

        try {
          // Parser les données JSON
          const jsonData = JSON.parse(data);

          // Vérifiez si la propriété `data` existe et est un tableau
          if (jsonData.data && Array.isArray(jsonData.data)) {
            // Gardez seulement les trois premiers éléments de `data`
            jsonData.data = jsonData.data.slice(0, 2);
          }

          // Écrire les données mises à jour dans le même fichier
          fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
              console.error('Erreur lors de l\'écriture du fichier:', file, err);
              return;
            }
            console.log(`Fichier ${file} mis à jour avec succès.`);
          });
        } catch (parseErr) {
          console.error('Erreur lors du parsing du fichier JSON:', file, parseErr);
        }
      });
    }
  });
});
