document.addEventListener('DOMContentLoaded', () => {

 
    // Récupération des éléments du HTML
  
    const galerie = document.getElementById('galerie');
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popup-img');
    const close = document.getElementById('close');
    const preview = document.getElementById('preview');
    const form = document.getElementById('formulaire');

 
    // Fonction pour afficher la galerie
   
    function genererGalerie() {
        galerie.innerHTML = '';
        comics.forEach(comic => {
            const div = document.createElement('div');
            div.classList.add('img');
            div.innerHTML = `
                <img src="${comic.imageSmall}" alt="${comic.titre}">
                <h3>${comic.titre}</h3>
                <p>${comic.description}</p>
                <small>Crédit: <a href="${comic.source}" target="_blank">${comic.credit}</a></small>
            `;
            galerie.appendChild(div);

            // Popup au clic sur l'image
            div.querySelector('img').addEventListener('click', () => {
                popupImg.src = comic.imageLarge;
                popup.classList.add('popup-visible');
            });
        });
    }

   
    // Fermer popup

    close.addEventListener('click', () => popup.classList.remove('popup-visible'));
    popup.addEventListener('click', (e) => {
        if(e.target === popup) popup.classList.remove('popup-visible');
    });

    
    // Formulaire contributif
   
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const titre = document.getElementById('titre').value;
        const description = document.getElementById('description').value;
        const url = document.getElementById('url').value;

        const nouveauComic = {
            titre,
            description,
            imageSmall: url,
            imageLarge: url,
            credit: "Contributeur",
            source: url
        };

        // Prévisualisation
        preview.innerHTML = `
            <div style="background:#fff;padding:10px;border-radius:8px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,0.2);">
                <h3 style="color:#d32f2f">${titre}</h3>
                <p>${description}</p>
                <img src="${url}" style="width:100%;border-radius:5px;margin-bottom:10px;">
                <button id="addBtn" style="padding:6px 12px;background:#d32f2f;color:white;border:none;border-radius:5px;cursor:pointer;transition:background 0.3s;">Ajouter</button>
                <button id="cancelBtn" style="padding:6px 12px;background:#555;color:white;border:none;border-radius:5px;cursor:pointer;margin-left:5px;transition:background 0.3s;">Annuler</button>
            </div>
        `;

        
        document.getElementById('addBtn').addEventListener('mouseover', e => e.target.style.background = "#b71c1c");
        document.getElementById('addBtn').addEventListener('mouseout', e => e.target.style.background = "#d32f2f");

        document.getElementById('cancelBtn').addEventListener('mouseover', e => e.target.style.background = "#333");
        document.getElementById('cancelBtn').addEventListener('mouseout', e => e.target.style.background = "#555");

        
        document.getElementById('addBtn').addEventListener('click', () => {
            comics.push(nouveauComic);
            genererGalerie();
            preview.innerHTML = '';
            form.reset();
        });

        // Annuler au clic
        document.getElementById('cancelBtn').addEventListener('click', () => preview.innerHTML = '');
    });

    
    genererGalerie();
});
