// On initialise toutes les variables dont on aura besoin plus tard dans plusieurs fonctions
var sommes = {};
var StatPersoSelectionne1 = {};
var StatPersoSelectionne2 = {};
var StatPersoSelectionneGlobal = {};
let LePersoSéléctionné = "";
var PersonnageComparaison1 = "";
var PersonnageComparaison2 = "";
let nbChampions = 0;
var RoleSelectionne = "";
let TopLane = "FALSE";
let Jungle = "FALSE";
let MidLane = "FALSE";
let BotLane = "FALSE";
let Support = "FALSE";
let CategorieDeLaPage = "CHAMPIONS"
let TailleGraph = 0;
let TailleGraphique = 0;
let Personnage1Compteur = 0
let Personnage2Compteur = 0
let PersonnageEgalitéCompteur = 0

MoyenneStats()

// On calcule la moyenne des stat affichée dans la partie droite et on l'affiche
function MoyenneStats() {
    nbChampions = champions.length;
    champions.forEach(champion => {
        Object.entries(champion.stats).forEach(([stat, valeur]) => {
            if (sommes[stat]) {
                sommes[stat] += valeur
            }
            else {
                sommes[stat] = valeur;
            }
        })
    })
    Object.entries(sommes).forEach(([stat, valeur]) => {
        sommes[stat] = Math.round(valeur / nbChampions);
    })
    Object.entries(sommes).forEach(([stat, valeur]) => {
        DéfinitionStat.forEach(DefStat => {
            if (DefStat.Name == stat) {
                document.querySelector(".MoyenneDesStats").innerHTML += "<div>" + DefStat["Traduction"] + " : " + valeur + "</div>"
            }
        })
    })

    // On lance la fonction pour afficher combien il y a de champion
    CompterLesChampions();
}

// Une fonction très importante qui va mettre en page la partie centrale du site en version "champions"
function start() {
    let output = "";
    champions.forEach(champion => {
        // On met une vérification pour filtrer les champions si l'utilisateur le demande
        if ((champion["tags"].includes(RoleSelectionne) || RoleSelectionne == "") && (champion["name"].toLowerCase().includes(document.querySelector("#FiltrageNom").value.toLowerCase()))) {
            output += `
            <div class='personnage'>
                <img class='${champion["name"]}' src='${champion["icon"]}'></img>
                <div class='ChoixSelectionPersonnage'>
                    ${htmlStats(champion)}
                </div>
                <div class='ComparaisonStat'>
                    <div class='GraphiqueStat'>
                        ${DifferenceGraphique(champion)}
                    </div>
                </div>
            </div>`;
        }
    });

    // On illumine uniquement les logo des lanes sur lesquelles vont les perso séléctionné
    document.querySelector(".image").innerHTML = output;
    if (RoleSelectionne == "") {
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 100%;"
    }
    else if (RoleSelectionne == "Tank") {
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 25%;"
    }
    else if (RoleSelectionne == "Support") {
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 100%;"
    }
    else if (RoleSelectionne == "Mage") {
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 25%;"
    }
    else if (RoleSelectionne == "Assassin") {
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 25%;"
    }
    else if (RoleSelectionne == "Fighter") {
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 25%;"
    }
    else if (RoleSelectionne == "Marksman") {
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 25%;"
    }

    // On lance la suite de cette fonction qui devait être fait après que les div créées dans cette fonction soit créées
    ensuite();
};

start();

// On affiche le contenu de la "page" de tout les champions en version "champion" en leurs mettant les logo des lanes sur lesquels ils vont, leurs nom et titre mais pas le graphique
function htmlStats(champion) {
    TopLane = "FALSE";
    Jungle = "FALSE";
    MidLane = "FALSE";
    BotLane = "FALSE";
    Support = "FALSE";
    output = "";
    output = "<div class='InformationPersonnageSelectionne'><h2 class='NomPersonnageSelectionne'>" + champion.name + "</h2><div>" + champion.title + "</div><h3 class='ClassePersonnageSelectionne'>Role</h3><div class='RolePersonnageSelectionne'>";
    if (champion["tags"].includes("Tank") && TopLane == "FALSE") {
        output += "<div class='RoleGlobalPersonnageSelectionne'><img src='img/Top lane.png' alt='Logo de la top lane'></div>"
        TopLane = "TRUE"
    }
    if (champion["tags"].includes("Support")) {
        if (Support == "FALSE") {
            output += "<div class='RoleGlobalPersonnageSelectionne'><img src='img/Support.png' alt='Logo des supports'></div>"
            Support = "TRUE"
        }
    }
    if (champion["tags"].includes("Mage")) {
        if (MidLane == "FALSE") {
            output += "<div class='RoleGlobalPersonnageSelectionne'><img src='img/Mid lane.png' alt='Logo de la mid lane'></div>"
            MidLane = "TRUE"
        }
        if (BotLane == "FALSE") {
            output += "<div class='RoleGlobalPersonnageSelectionne'><img src='img/Bot lane.png' alt='Logo de la bot lane'></div>"
            BotLane = "TRUE"
        }
    }
    if (champion["tags"].includes("Assassin")) {
        if (Jungle == "FALSE") {
            output += "<div class='RoleGlobalPersonnageSelectionne'><img src='img/Jungle.png' alt='Logo de la jungle'></div>"
            Jungle = "TRUE"
        }
        if (MidLane == "FALSE") {
            output += "<div class='RoleGlobalPersonnageSelectionne'><img src='img/Mid lane.png' alt='Logo de la mid lane'></div>"
            MidLane = "TRUE"
        }
    }
    if (champion["tags"].includes("Fighter")) {
        if (TopLane == "FALSE") {
            output += "<div class='RoleGlobalPersonnageSelectionne'><img src='img/Top lane.png' alt='Logo de la top lane'></div>"
            TopLane = "TRUE"
        }
        if (Jungle == "FALSE") {
            output += "<div class='RoleGlobalPersonnageSelectionne'><img src='img/Jungle.png' alt='Logo de la jungle'></div>"
            Jungle = "TRUE"
        }
    }
    if (champion["tags"].includes("Marksman") && BotLane == "FALSE") {
        output += "<div class='RoleGlobalPersonnageSelectionne'><img src='img/Bot lane.png' alt='Logo de la bot lane'></div>"
        BotLane = "TRUE"
    }
    output += "</div><h3 class='ClassePersonnageSelectionne'>Catégorie</h3><div>"

    champion["tags"].forEach(Categories => {
        output += "<p>" + Categories + "</p>"
    });

    output += `</div></div><div class="LeHoverDuGraph"></div>`

    return output;
}

// On fait le graphique des champions dans la page en mode "champions"
function DifferenceGraphique(champion) {
    let output = "";
    let compteur = 0;
    output += "<div class='GraphiqueChampionAffichage'>    <svg width='1234' height='788' viewBox='0 0 1234 788' class='GraphDesPersoGlobal' fill='none' xmlns='http://www.w3.org/2000/svg'> <path d='M0 394L1234 394' stroke='#E3E300' stroke-width='5' />"
    Object.entries(champion.stats).forEach(([key, value]) => {
        valeur = sommes[key];

        DéfinitionStat.forEach(DefStat => {
            if (DefStat.Name == key) {

                // Pour chaque stat je regarde si elle est plus ou moins grande que la moyenne et j'adapte le graphique en fonction de ça
                // Les barres du svg sont calculé a partir des stats du perso comparé a la moyenne, si un perso a 150 points dans une stat où la moyenne est de 100, la barre de son svg sera positive et remplit a 50%
                if (Math.round(value - valeur) > 0) {
                    output += "<path d='M3 394V0' stroke='#006600' stroke-width='32' pathLength='100' class='" + key + "' style='stroke-dasharray:" + (Math.abs(value - valeur) * 100 / valeur) + " " + (100 - (Math.abs(value - valeur) * 100 / valeur)) + "; transform: translateX(" + (7.5 + 4.5 * compteur) + "%) translateY(-2px);'/>"
                    output += "<text class='TitreBarreGraphique' x='0' y='0' font-family='Montserrat' font-size='28px' style='transform: translateX(" + (7.5 + 4.5 * compteur) + "%) rotate(270deg) translateX(-384px);'>" + DefStat["Traduction"] + "</text>"
                }
                else if (Math.round(value - valeur) == 0) {
                    output += "<circle cx='0' cy='394' r='16' fill='#727400' class='" + key + "' style='stroke-dasharray:" + (Math.abs(value - valeur) * 100 / valeur) + " " + (100 - (Math.abs(value - valeur) * 100 / valeur)) + "; transform: translateX(" + (7.5 + 4.5 * compteur) + "%);'/>"
                    output += "<text class='TitreBarreGraphique' x='0' y='0' font-family='Montserrat' font-size='28px' style='transform: translateX(" + (7.5 + 4.5 * compteur) + "%) rotate(270deg) translateX(-384px);'>" + DefStat["Traduction"] + "</text>"
                }
                else if (Math.round(value - valeur) < 0) {
                    output += "<path d='M3 394V394 788' stroke='#660000' stroke-width='32' pathLength='100' class='" + key + "' style='stroke-dasharray:" + (Math.abs(value - valeur) * 100 / valeur) + " " + (100 - (Math.abs(value - valeur) * 100 / valeur)) + "; transform: translateX(" + (7.5 + 4.5 * compteur) + "%) translateY(2px);'/>"
                    output += "<text class='TitreBarreGraphique' x='0' y='0' font-family='Montserrat' font-size='28px' text-anchor='end' style='transform: translateX(" + (7.5 + 4.5 * compteur) + "%) rotate(270deg) translateX(-404px);'>" + DefStat["Traduction"] + "</text>"
                }

            }
        });
        // J'augmente le compte qui permet de faire que les barres se place bien sur le graphique et pas toutes au même endroit
        compteur++
    })
    output += "</svg></div>"
    return output;
}


function ensuite() {
    // je fait que pour tout les champions il y a une classe qui se lance quand on click dessus
    document.querySelectorAll(".personnage").forEach(e => {
        e.addEventListener('click', nom2)
    });
    // je lance une fonction qui en initialise plein d'autres
    ActualisationDeLaPage()
};

function nom2() {
    // on enlève la classe qui permet au contenu des personnage de s'afficher a celui qui l'avait et le redonne a celui sur lequel l'utilisteur vient de cliquer
    if (document.querySelector(".afficher") == this) {
        document.querySelector(".afficher")?.classList.remove("afficher");
    } else {
        document.querySelector(".afficher")?.classList.remove("afficher");
        this.classList.add("afficher");
    }
}

Categorie()

function Categorie() {
    // On compte combien il y a de personnage par catégorie
    let TableCategorie = []
    NombreTank = 0
    NombreFighter = 0
    NombreMage = 0
    NombreAssassin = 0
    NombreSupport = 0
    NombreMarksman = 0
    champions.forEach(perso => {
        Object.entries(perso["tags"]).forEach(h => {
            if (h[1] == "Tank") {
                NombreTank++
            }
            else if (h[1] == "Fighter") {
                NombreFighter++
            }
            else if (h[1] == "Mage") {
                NombreMage++
            }
            else if (h[1] == "Assassin") {
                NombreAssassin++
            }
            else if (h[1] == "Support") {
                NombreSupport++
            }
            else if (h[1] == "Marksman") {
                NombreMarksman++
            }
            TableCategorie.push(h)
        })
    })

    // On met dans les header les stats de combien de champions vont sur les lanes
    document.querySelector(".HeaderCategories").children[0].children[1].innerText = "Top lane : " + (NombreTank + NombreFighter) + "";
    document.querySelector(".HeaderCategories").children[1].children[1].innerText = "Jungle : " + (NombreFighter + NombreAssassin) + "";
    document.querySelector(".HeaderCategories").children[2].children[1].innerText = "Mid lane : " + (NombreMage + NombreAssassin) + "";
    document.querySelector(".HeaderCategories").children[3].children[1].innerText = "Bot lane : " + (NombreMage + NombreMarksman) + "";
    document.querySelector(".HeaderCategories").children[4].children[1].innerText = "Support : " + NombreSupport + "";

    document.querySelector(".HeaderCategories2").children[0].children[1].innerText = "Top lane : " + (NombreTank + NombreFighter) + "";
    document.querySelector(".HeaderCategories2").children[1].children[1].innerText = "Jungle : " + (NombreFighter + NombreAssassin) + "";
    document.querySelector(".HeaderCategories2").children[2].children[1].innerText = "Mid lane : " + (NombreMage + NombreAssassin) + "";
    document.querySelector(".HeaderCategories2").children[3].children[1].innerText = "Bot lane : " + (NombreMage + NombreMarksman) + "";
    document.querySelector(".HeaderCategories2").children[4].children[1].innerText = "Support : " + NombreSupport + "";

    // On fait les % de représentation de chaque catégorie
    let NombreCategorie = NombreTank + NombreFighter + NombreMage + NombreAssassin + NombreSupport + NombreMarksman

    let PourcentageTank = NombreTank / NombreCategorie * 100
    let PourcentageFighter = NombreFighter / NombreCategorie * 100
    let PourcentageMage = NombreMage / NombreCategorie * 100
    let PourcentageAssassin = NombreAssassin / NombreCategorie * 100
    let PourcentageSupport = NombreSupport / NombreCategorie * 100
    let PourcentageMarksman = NombreMarksman / NombreCategorie * 100

    // On affiche au graphique combien de champions sont de tel stat
    document.querySelector(".CompteurRoleGlobal").children[0].innerHTML = "<div class='RondRole'></div>Tank : " + NombreTank + ""
    document.querySelector(".CompteurRoleGlobal").children[1].innerHTML = "<div class='RondRole'></div>Support : " + NombreSupport + ""
    document.querySelector(".CompteurRoleGlobal").children[2].innerHTML = "<div class='RondRole'></div>Mage : " + NombreMage + ""
    document.querySelector(".CompteurRoleGlobal").children[3].innerHTML = "<div class='RondRole'></div>Assassin : " + NombreAssassin + ""
    document.querySelector(".CompteurRoleGlobal").children[4].innerHTML = "<div class='RondRole'></div>Fighter : " + NombreFighter + ""
    document.querySelector(".CompteurRoleGlobal").children[5].innerHTML = "<div class='RondRole'></div>Marksman : " + NombreMarksman + ""

    // On adapte le graphique en fonction des %
    document.querySelector(".Tarte").children[0].style = "transform: scale(" + PourcentageSupport + "%); --DelaiDeLaTransition: 0.1s;";
    document.querySelector(".Tarte").children[1].style = "transform: scale(" + PourcentageFighter + "%); --DelaiDeLaTransition: 0.4s;";
    document.querySelector(".Tarte").children[2].style = "transform: scale(" + PourcentageTank + "%); --DelaiDeLaTransition: 0s;";
    document.querySelector(".Tarte").children[3].style = "transform: scale(" + PourcentageAssassin + "%); --DelaiDeLaTransition: 0.3s;";
    document.querySelector(".Tarte").children[4].style = "transform: scale(" + PourcentageMarksman + "%); --DelaiDeLaTransition: 0.5s;";
    document.querySelector(".Tarte").children[5].style = "transform: scale(" + PourcentageMage + "%); --DelaiDeLaTransition: 0.2s;";
}

function CompterLesChampions() {
    // On affiche dans le header combien il y a de champion en tout dans le fichier champions.js
    document.querySelector(".CompterChampions").innerText = "Nombre de champions actuel : " + nbChampions + ""
    document.querySelector(".CompterChampions2").innerText = "Nombre de champions actuel : " + nbChampions + ""
}

// Quand on écrit dans la div de filtrage des champions en fonction du nom ça relance la fonction start qui démarre la page pour ne faire apparaitre que les champions contenant ce qu'il y a de marqué
document.querySelector("#FiltrageNom").addEventListener("input", start);

// Filtrage pour séléctionner un role et on relance la fonction qui lance l'apparition de la page en fonction du mode dans lequel on était avant
function combo(thelist, theinput) {
    theinput = document.getElementById(theinput);
    var idx = thelist.selectedIndex;
    RoleSelectionne = thelist.options[idx].value;

    if (CategorieDeLaPage == "CHAMPIONS")
        start();
    else if (CategorieDeLaPage == "COMPARAISON")
        VersionComparaisonDesPersonnage();
}

// Si on clic sur le titre "champions" on change de mode pour aller dans ce mode là mais uniquement si on était dans l'autre mode sinon rien ne se passe
document.querySelector(".TitrePartieCentre:nth-child(1)").addEventListener("click", ChangementDeLaCategorieDeLaPage)

function ChangementDeLaCategorieDeLaPage() {
    document.querySelector(".TitrePartieCentre:nth-child(2)").style = "opacity: 15%"
    this.style = "opacity: 100%"
    if (CategorieDeLaPage == "COMPARAISON") {
        start();
        CategorieDeLaPage = "CHAMPIONS";
        document.querySelector("#FiltrageNom").style = "display: block"
    }
}

// Si on clic sur le titre "comparaison" on change de mode pour aller dans ce mode là mais uniquement si on était dans l'autre mode sinon rien ne se passe
document.querySelector(".TitrePartieCentre:nth-child(2)").addEventListener("click", RetourDeLaCategorieDeLaPage)

function RetourDeLaCategorieDeLaPage() {
    document.querySelector(".TitrePartieCentre:nth-child(1)").style = "opacity: 15%"
    this.style = "opacity: 100%"
    if (CategorieDeLaPage == "CHAMPIONS") {
        //LANCER LA FONCTION QUI MET LA PAGE EN VERSION COMPARAISON DE DEUX PERSONNAGES
        VersionComparaisonDesPersonnage();
        CategorieDeLaPage = "COMPARAISON";
        document.querySelector("#FiltrageNom").style = "display: none"
    }
}

// Mise en page de la version comparaison et on lance des fonctions qui vont faire l'intéractivité de la page
function VersionComparaisonDesPersonnage() {
    let output = "";
    PersonnageComparaison1 = "";
    PersonnageComparaison2 = "";
    output += `
        <div class='ComparaisonDesPersonnageGlobal'>
            <div class='SelectionDesChampionDeLaComparaisonGlobal'>
                <div class='SelectionDuChampionDeLaComparaison'>
                    <select id=select1 class="FiltrageRole" name="thelist">
                        <option value=""></option>
                        ${SelectionDesChampionDeLaComparaison()}
                    </select>
                </div>
                <div class='SelectionDuChampionDeLaComparaison'>
                    <select id=select2 class="FiltrageRole" name="thelist">
                        <option value=""></option>
                        ${SelectionDesChampionDeLaComparaison()}
                    </select>
                </div>
            </div>
            <div class='VueComparaisonChampion'>
            </div>
        </div>`;
    document.querySelector(".image").innerHTML = output;
    VueComparaisonChampion()
    document.querySelector("#select1").addEventListener("change", kombo);
    document.querySelector("#select2").addEventListener("change", kombo);
}

// On affiche uniquement les logo des lanes où vont les perso séléctionné en fonction du filtrage des roles et on fait apparaitre les choix des personnages aussi en fonction de ce filtrage
function SelectionDesChampionDeLaComparaison() {
    if (RoleSelectionne == "") {
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 100%;"
    }
    else if (RoleSelectionne == "Tank") {
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 25%;"
    }
    else if (RoleSelectionne == "Support") {
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 100%;"
    }
    else if (RoleSelectionne == "Mage") {
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 25%;"
    }
    else if (RoleSelectionne == "Assassin") {
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 25%;"
    }
    else if (RoleSelectionne == "Fighter") {
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 25%;"
    }
    else if (RoleSelectionne == "Marksman") {
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 25%;"
    }
    let output = ""
    champions.forEach(champion => {
        if (champion["tags"].includes(RoleSelectionne) || RoleSelectionne == "") {

            output += `<option value="` + champion["name"] + `">` + champion["name"] + `</option>`
        }
    })
    return output;
}

// On récupère quels champions ont été séléctionnés
function kombo() {
    if (this.id == "select1") {
        PersonnageComparaison1 = this.value;
    }
    else if (this.id == "select2") {
        PersonnageComparaison2 = this.value;
    }
    VueComparaisonChampion();
}

// On vérifie si les personnages ont été séléctionnés et qu'ils ne soient pas les mêmes. Si c'est le cas on récupère les stats des deux personnages et ont affiche leurs têtes et on lance la fonction suivante. Peut importe ce qui a été séléctionné on lance la fonction de définition de la page
function VueComparaisonChampion() {
    let output = ""
    if (PersonnageComparaison1 != "" && PersonnageComparaison2 != "" && PersonnageComparaison1 != PersonnageComparaison2) {
        output = "";
        output += "<div class='ImageDuPersoSelectionneGlobal'>"
        StatPersoSelectionne1 = {}
        StatPersoSelectionne2 = {}
        champions.forEach(champion => {
            if (champion["name"].includes(PersonnageComparaison1)) {
                output += "<div><img class='ImageDuPersoSelectionne' src='" + champion["icon"] + "'></img></div>"
                Object.entries(champion.stats).forEach(([stat, valeur]) => {
                    if (StatPersoSelectionne1[stat]) {
                        StatPersoSelectionne1[stat] += valeur
                    }
                    else {
                        StatPersoSelectionne1[stat] = valeur;
                    }
                })
            }
        })
        champions.forEach(champion => {
            if (champion["name"].includes(PersonnageComparaison2)) {
                output += "<div><img class='ImageDuPersoSelectionne' src='" + champion["icon"] + "'></img></div>"
                Object.entries(champion.stats).forEach(([stat, valeur]) => {
                    if (StatPersoSelectionne2[stat]) {
                        StatPersoSelectionne2[stat] += valeur
                    }
                    else {
                        StatPersoSelectionne2[stat] = valeur;
                    }
                })
            }
        })
        output += "</div>"
        document.querySelector(".VueComparaisonChampion").style = "margin-top: 0px;"
        output += `<div class="PartieComparaisonGlobal">${ComparaisonDesChampionsChoisit()}</div>`
    }
    else if (PersonnageComparaison1 == "" || PersonnageComparaison2 == "") {
        output = "";
        output += "<h3 class='PersonnageNonSelectionne'>Veuillez choisir deux personnages</h3>";
        document.querySelector(".VueComparaisonChampion").style = "margin-top: 128px;"
    }
    else if (PersonnageComparaison1 == PersonnageComparaison2) {
        output = "";
        output += "<h3 class='PersonnageNonSelectionne'>Vous ne pouvez pas comparer un personnage à lui même</h3>";
        document.querySelector(".VueComparaisonChampion").style = "margin-top: 128px;"
    }
    document.querySelector(".VueComparaisonChampion").innerHTML = output
    DefinitionTaillePage();
}

// Calcule de la zone d'affichage
function ComparaisonDesChampionsChoisit() {
    let compteur = 1;
    let compteur2 = 1;
    let compteur3 = 1;
    let compteur4 = 1;
    let PlusGrandeValeur = 1
    Personnage1Compteur = 0
    Personnage2Compteur = 0
    PersonnageEgalitéCompteur = 0
    let TailleGraphiqueLargeur = 0
    if (TailleGraphique == 0) {
        TailleGraphique = (document.querySelector(".ComparaisonDesPersonnageGlobal").getBoundingClientRect().bottom - document.querySelector(".VueComparaisonChampion").getBoundingClientRect().bottom - 100);
    }

    if (window.innerWidth > 600) {
        TailleGraphiqueLargeur = (((document.querySelector(".SelectionDesChampionDeLaComparaisonGlobal").getBoundingClientRect().right - document.querySelector(".SelectionDesChampionDeLaComparaisonGlobal").getBoundingClientRect().left) * 0.6) / 20);
    }
    else {
        TailleGraphiqueLargeur = (((document.querySelector(".SelectionDesChampionDeLaComparaisonGlobal").getBoundingClientRect().right - document.querySelector(".SelectionDesChampionDeLaComparaisonGlobal").getBoundingClientRect().left) * 0.9) / 20);
    }

    if (TailleGraphique < 300) {
        TailleGraphique = 300
    }

    // puis on fait le graphique avec les barres et les points de la comparaison
    Object.entries(StatPersoSelectionne1).forEach(([stat, valeur]) => {
        if (valeur > PlusGrandeValeur)
            PlusGrandeValeur = valeur
    })
    Object.entries(StatPersoSelectionne2).forEach(([stat, valeur]) => {
        if (valeur > PlusGrandeValeur)
            PlusGrandeValeur = valeur
    })

    let Ratio = TailleGraphique / PlusGrandeValeur

    let output = `<div class="GraphDeLaComparaison"><svg class="SVGDeLaComparaison">
                    <polyline points="`

    Object.entries(StatPersoSelectionne1).forEach(([stat, valeur]) => {
        if (stat != "attackspeed"){
            output += (compteur * TailleGraphiqueLargeur) + "," + (valeur * Ratio) + ", "
        }
        else {
            output += (compteur * TailleGraphiqueLargeur) + "," + (valeur * Ratio) + ""
        }
        compteur++
        StatPersoSelectionneGlobal[stat] = valeur
    })
    output += `" style="fill:none;stroke:#0b550b;stroke-width:3" /><polyline points="`

    Object.entries(StatPersoSelectionne2).forEach(([stat2, valeur2]) => {
        if (stat2 != "attackspeed"){
            output += (compteur2 * TailleGraphiqueLargeur) + "," + (valeur2 * Ratio) + ", "
        }
        else {
            output += (compteur2 * TailleGraphiqueLargeur) + "," + (valeur2 * Ratio) + ""
        }
        compteur2++

        Object.entries(StatPersoSelectionneGlobal).forEach(([stat, valeur]) => {

            if (stat == stat2)
                StatPersoSelectionneGlobal[stat] = valeur - valeur2
        })

    })

    output += `" style="fill:none;stroke:#8a1313;stroke-width:3" />`

    Object.entries(StatPersoSelectionne1).forEach(([stat, valeur]) => {
        output += `<circle class="${stat}" cx='${(compteur3 * TailleGraphiqueLargeur)}' cy='${(valeur * Ratio)}' r='4' fill='#727400' class='" + key + "'/>`
        compteur3++
    })

    Object.entries(StatPersoSelectionne2).forEach(([stat, valeur]) => {
        output += `<circle class="${stat}" cx='${(compteur4 * TailleGraphiqueLargeur)}' cy='${(valeur * Ratio)}' r='4' fill='#727400' class='" + key + "'/>`
        compteur4++
    })
    output += `</svg></div>`
    output += `<div class="RondDeLaComparaison"><div class="HoverComparatif"></div><svg class="RondComparatif" width="114" height="114" viewBox="0 0 114 114" fill="none" xmlns="http://www.w3.org/2000/svg">`

    // puis on compte combien de stat sont supérieur chez chaque champions et combien sont a égalité
    Object.entries(StatPersoSelectionneGlobal).forEach(([stat, valeur]) => {
        if (valeur > 0) {
            Personnage1Compteur++
        }
        else if (valeur == 0) {
            PersonnageEgalitéCompteur++
        }
        else if (valeur < 0) {
            Personnage2Compteur++
        }
    })

    // Et enfin on fait le rond en fonction des différence de stat entre les deux champions choisit
    output += `<circle cx="57" cy="57" r="50" stroke="#00FF00" stroke-width="8" 
                        stroke-dasharray="${Personnage1Compteur} ${20 - Personnage1Compteur}" pathLength="20" stroke-dashoffset="0" fill="none"/>
                    <circle cx="57" cy="57" r="50" stroke="#FF0000" stroke-width="8" 
                        stroke-dasharray="${Personnage2Compteur} ${20 - Personnage2Compteur}" pathLength="20" stroke-dashoffset="${-1 * (Personnage1Compteur)}" fill="none"/>
                    <circle cx="57" cy="57" r="50" stroke="#0000FF" stroke-width="8" 
                        stroke-dasharray="${PersonnageEgalitéCompteur} ${20 - PersonnageEgalitéCompteur}" pathLength="20" stroke-dashoffset="${-1 * (Personnage1Compteur + Personnage2Compteur)}" fill="none"/>
                    <foreignObject x="0" y="45" width="100%" height="100%"><div class="DansLeRondDeLaComparaison"></div></foreignObject>`
    output += `</svg></div>`
    return output
}

// On fait les hover des graph des perso pour que l'on puisse voir ce que représente les stat pour tout le monde en passant la sourie par dessus
function ActualisationDeLaPage() {
    document.querySelectorAll(".GraphDesPersoGlobal>path").forEach(element => {
        element.addEventListener("mouseover", HoverDuGraphArrive)
    });

    document.querySelectorAll(".GraphDesPersoGlobal>circle").forEach(element => {
        element.addEventListener("mouseover", HoverDuGraphArrive)
    });

    document.querySelectorAll(".GraphDesPersoGlobal>text").forEach(element => {
        element.addEventListener("mouseover", HoverDuGraphArriveText)
    });

    document.querySelectorAll(".GraphDesPersoGlobal>path").forEach(element => {
        element.addEventListener("mouseleave", HoverDuGraphPart)
    });

    document.querySelectorAll(".GraphDesPersoGlobal>circle").forEach(element => {
        element.addEventListener("mouseleave", HoverDuGraphPart)
    });

    document.querySelectorAll(".GraphDesPersoGlobal>text").forEach(element => {
        element.addEventListener("mouseleave", HoverDuGraphPart)
    });
}

// On récupère plusieurs information en regardant les parents de l'endroit où l'on est, j'ai pas réussi a faire plus opti mais ça marche donc bon
function HoverDuGraphArrive() {
    let LeHover = this.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children[1]
    LePersoSéléctionné = this.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].className
    let LaStat = this.classList[0]

    champions.forEach(champion => {
        if (champion["name"].includes(LePersoSéléctionné) && LaStat != undefined) {

            // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // dans la ligne du haut qui est en commentaire j'utilise le point qui sert a rentrer dans le nouveau tableau et "LaStat" n'est pas un tableau mais une suite de caractère qui change au hover sur le graphique pour prendre le nom de la stat qu'on survole donc impossible de rentrer dedans
            // dans la ligne du bas j'utilise les crochet avec les guillemets pour rentrer aussi dans le tableau mais en utilisant une suite de caractère ce qui permet de faire passer incognito "LaStat" pour lequel il va juste lire ce qu'il contient car je n'ai pas mis les guillemets et il utilise comme suite de caractère ce qu'il contient

            // ça permet de changer la stat afficher en js au hover sans avoir besoin de rester dans les boucles de forEach

            // console.log(champion.stats.LaStat)
            // console.log(champion["stats"][LaStat])

            // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // J'envoie les information dont j'aurais besoin dans la fonction qui va vraiment écrire ce qui aura dans le hover
            EcritureDuHover(champion, LaStat, LeHover)
        }
    })
}

// La même chose que la fonction au dessus mais si la sourie passe par dessus du texte et pas la barre car ça change un peu la ligne des parents a suivre
function HoverDuGraphArriveText() {
    let LeHover = this.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children[1]
    LePersoSéléctionné = this.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].className
    let LaStat = this.previousSibling.classList[0]

    champions.forEach(champion => {
        if (champion["name"].includes(LePersoSéléctionné) && LaStat != undefined) {
            EcritureDuHover(champion, LaStat, LeHover)
        }
    })
}

// La vérification est juste pour que ça ne soit pas lancé au passage par dessus la barre qui fait la séparation entre le positif et le négatif
function HoverDuGraphPart() {
    if (this.classList[0] != undefined) {
        document.querySelector(".LeHoverDuGraphAffiche").classList.remove("LeHoverDuGraphAffiche");
    }
}

// J'écrit le texte qui sera dans la div qui va apparaitre et le met un peu en page
function EcritureDuHover(champion, LaStat, LeHover) {
    LeHover.classList.add("LeHoverDuGraphAffiche")
    DéfinitionStat.forEach(DefStat => {
        if (DefStat.Name == LaStat) {
            LeHover.innerHTML = `<div class='TitreDuHover'> ${DefStat["Traduction"]} </div><div> ${champion["name"]} possède ${champion["stats"][LaStat]} points en ${DefStat["Traduction"]} </div><div class='DescriptionDuHover'> ${DefStat["Définition"]} </div>`
        }
    })
}


// Je définie la taille de la page dans les deux mode, j'ai encore un peu de mal a le faire pour la page en version "comparaison"
function DefinitionTaillePage() {
    let NombreTailleVertical = 0
    // Calcule de la place que prendra la zone de scroll en fonction de la taille visibile de la fenetre
    let DebutDeLaZone = document.querySelector(".ScrollHere").getBoundingClientRect().top
    if (window.innerWidth > 1200) {
        NombreTailleVertical = Math.floor(window.innerHeight / 148) * 148 - DebutDeLaZone;
    }
    else {
        NombreTailleVertical = Math.floor(window.innerHeight / 25) * 25 - DebutDeLaZone;
    }

    // Modification de la taille de la zone du milieu ou on peut scroll
    if (CategorieDeLaPage == "CHAMPIONS") {
        document.querySelector(".ScrollHere").style = "height:" + NombreTailleVertical + "px";
    }
    else if (CategorieDeLaPage == "COMPARAISON" && PersonnageComparaison1 != "" && PersonnageComparaison2 != "") {

        document.querySelector(".SVGDeLaComparaison").setAttribute("height", TailleGraphique + 8);
        document.querySelector(".ScrollHere").style = "height:" + NombreTailleVertical + "px";

        ActualisationDeLaPageComparaison()
    }
}


DefinitionTaillePage();

// On regarde quand on change la taille de la fenetre
window.addEventListener("resize", RedimentionPage);

function RedimentionPage() {
    // On recalcule la taille de la taille de la fenetre
    DefinitionTaillePage();
}

// Je lance les fonctions qui feront apparaitre le hover de la page de comparaison dans le même ésprit que ceux de la page des champions
function ActualisationDeLaPageComparaison() {

    document.querySelectorAll(".RondComparatif>circle").forEach(element => {
        element.addEventListener("mouseleave", HoverDeLaComparaisonPart)
        element.addEventListener("mouseover", HoverDeLaComparaison)
    });

    document.querySelectorAll(".SVGDeLaComparaison>circle").forEach(element => {
        element.addEventListener("mouseleave", HoverDesPointsComparatifsPart)
        element.addEventListener("mouseover", HoverDesPointsComparatifs)
    })

}

// Je fais apparaitre a l'intérieur du cercle la phrase qui correspond a la couleur par dessus laquelle la sourie est et les stats ont été calculé plus haute
function HoverDeLaComparaison() {
    if (this == document.querySelector(".RondComparatif").children[0]) {
        document.querySelector(".DansLeRondDeLaComparaison").innerText = PersonnageComparaison1 + " a " + Personnage1Compteur + " stats plus hautes que " + PersonnageComparaison2
    }
    else if (this == document.querySelector(".RondComparatif").children[1]) {
        document.querySelector(".DansLeRondDeLaComparaison").innerText = PersonnageComparaison2 + " a " + Personnage2Compteur + " stats plus hautes que " + PersonnageComparaison1
    }
    else if (this == document.querySelector(".RondComparatif").children[2]) {
        document.querySelector(".DansLeRondDeLaComparaison").innerText = PersonnageComparaison1 + " et " + PersonnageComparaison2 + " ont " + PersonnageEgalitéCompteur + " stats à égalité"
    }
}

// J'enlève juste le texte donc on voit plus rien
function HoverDeLaComparaisonPart() {
    document.querySelector(".DansLeRondDeLaComparaison").innerText = ""
}

// Dans le même esprit que pour la page des champions, je récupère la stats sur laquelle on se trouve puis j'affiche pour les deux champions la stats qu'ils ont dedans et met une définition de la stat
function HoverDesPointsComparatifs() {
    let LaStat = this.classList[0]
    let output = ""
    DéfinitionStat.forEach(DefStat => {
        if (DefStat.Name == LaStat) {
            Object.entries(StatPersoSelectionne1).forEach(([stat, valeur]) => {
                if (LaStat == stat) {
                    output += `<h3 class="HoverComparatifTitre">${DefStat["Traduction"]}</h3><div class="HoverComparatifPerso"><div class="HoverComparatifPerso1"><b>${PersonnageComparaison1}</b> possède <b>${valeur}</b> points en ${DefStat["Traduction"]}</div>`
                }
            })
            Object.entries(StatPersoSelectionne2).forEach(([stat, valeur]) => {
                if (LaStat == stat) {
                    output += `<div class="HoverComparatifPerso1"><b>${PersonnageComparaison2}</b> possède <b>${valeur}</b> points en ${DefStat["Traduction"]}</div></div>`
                }
            })

            output += `<h3 class="HoverComparatifDefStatTitre">Description</h3><div class="HoverComparatifDefStat">${DefStat["Définition"]}</div>`
        }
    })

    document.querySelector(".HoverComparatif").style = "display: block"
    document.querySelector(".HoverComparatif").innerHTML = output
}

// Je fais disparaitre la div apparu dans la fonction au dessus
function HoverDesPointsComparatifsPart() {
    document.querySelector(".HoverComparatif").innerHTML = ""
    document.querySelector(".HoverComparatif").style = "display: none; opacity: 80%;"
}

document.querySelector(".HeaderTablette").addEventListener("click", MenuHeader)

// Je fais venir le menu en version mobile et tablette au clic sur trois barre se trouvant en haut a droite de leur page
function MenuHeader() {
    document.querySelector(".MenuDuCote").style = "transform: translateX(0%);"
    document.querySelector(".CacheMenu").style = "display: block; opacity: 80%;"
}

document.querySelector(".CroixMenu").addEventListener("click", MenuHeaderFermer)

// Je fais partir le menu en version mobile et tablette au clic sur la croix se trouvant en haut a droite de leur page
function MenuHeaderFermer() {
    document.querySelector(".MenuDuCote").style = "transform: translateX(105%);"
    document.querySelector(".CacheMenu").style = "display: none; opacity: 0%;"
}

document.querySelector(".CacheMenu").addEventListener("click", MenuHeaderFermer)

// Je fais partir le menu en version mobile et tablette au clic en dehors du menu
function MenuHeaderFermer() {
    document.querySelector(".MenuDuCote").style = "transform: translateX(105%);"
    document.querySelector(".CacheMenu").style = "display: none; opacity: 0%;"
}

document.querySelector(".CategorieMenu1").addEventListener("click", ChoixMenu1)
document.querySelector(".CategorieMenu2").addEventListener("click", ChoixMenu2)
document.querySelector(".CategorieMenu3").addEventListener("click", ChoixMenu3)

// Je change la page en fonction du choix fait dans le menu pour faire apparaitre les différente partie et je fais disparaitre le menu
// Ici je fais apparaitre la partie centrale
function ChoixMenu1() {
    document.querySelector(".PartieGauche").style = "display: none;"
    document.querySelector(".PartieDroite").style = "display: none;"
    document.querySelector(".PartieCentre").style = "display: block;"
    document.querySelector(".MenuDuCote").style = "transform: translateX(105%);"
    document.querySelector(".CacheMenu").style = "display: none; opacity: 0%;"
}

// Ici je fais apparaitre la partie de gauche
function ChoixMenu2() {
    document.querySelector(".PartieGauche").style = "display: block;"
    document.querySelector(".PartieDroite").style = "display: none;"
    document.querySelector(".PartieCentre").style = "display: none;"
    document.querySelector(".MenuDuCote").style = "transform: translateX(105%);"
    document.querySelector(".CacheMenu").style = "display: none; opacity: 0%;"
}

// Ici je fais apparaitre la partie de droite
function ChoixMenu3() {
    document.querySelector(".PartieGauche").style = "display: none;"
    document.querySelector(".PartieDroite").style = "display: block;"
    document.querySelector(".PartieCentre").style = "display: none;"
    document.querySelector(".MenuDuCote").style = "transform: translateX(105%);"
    document.querySelector(".CacheMenu").style = "display: none; opacity: 0%;"
}