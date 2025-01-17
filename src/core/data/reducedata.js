const fs = require('fs');
const path = require('path');

// Chemin vers le dossier contenant les fichiers TSX
const directoryPath = path.join(__dirname, 'json'); // Remplacez 'votre_dossier' par le nom réel du dossier

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Impossible de lire le dossier:', err);
  }

  // Parcourir tous les fichiers du dossier
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    // Vérifiez si le fichier est un fichier TSX
    if (path.extname(file) === '.tsx') {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Erreur lors de la lecture du fichier:', file, err);
          return;
        }

        // Rechercher et réduire les tableaux exportés
        const updatedData = data.replace(
          /export\s+const\s+(\w+)\s*=\s*\[(\s*[^]*?)\]/g,
          (match, constName, arrayContent) => {
            // Parse le contenu du tableau pour extraire les objets
            try {
              const parsedArray = JSON.parse(`[${arrayContent}]`);
              const reducedArray = parsedArray.slice(0, 3);
              return `export const ${constName} = ${JSON.stringify(reducedArray, null, 2)};`;
            } catch (parseErr) {
              console.error(`Erreur de parsing du tableau dans ${file}:`, parseErr);
              return match; // Retourne le contenu d'origine en cas d'erreur
            }
          }
        );

        // Écrire les données mises à jour dans le fichier
        fs.writeFile(filePath, updatedData, (err) => {
          if (err) {
            console.error('Erreur lors de l\'écriture du fichier:', file, err);
            return;
          }
          console.log(`Fichier ${file} mis à jour avec succès.`);
        });
      });
    }
  });
});
