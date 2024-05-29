console.log('aaaaaaaaaa');
document.addEventListener("DOMContentLoaded", function() {
    var radios = document.querySelectorAll('input[type="radio"]');
    // Ajout d'un gestionnaire d'événements à chaque radio
    radios.forEach(function(radio) {
        radio.addEventListener("change", function() {
            var categorie = this.value; // Récupérer la valeur du radio sélectionné
            console.log("Catégorie sélectionnée :", categorie);

            var produits = document.querySelectorAll('.produit'); // Sélectionner tous les produits
            produits.forEach(function(produit) {
                var produitCategorie = produit.getAttribute("categorie");
                console.log(produitCategorie+'  '+ categorie)
                //console.log("Catégorie du produit :", produitCategorie); // Vérifier la valeur de l'attribut categorie
                if (categorie === "tous" || produitCategorie === categorie) {
                    produit.style.display = "block"; // Afficher les produits correspondants
                } else {
                    produit.style.display = "none"; // Cacher les produits qui ne correspondent pas à la catégorie
                }
            });
        });
    });
});
