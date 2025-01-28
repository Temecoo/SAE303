var sommes = {};
var StatPersoSelectionne1 = {};
var StatPersoSelectionne2 = {};
var StatPersoSelectionneGlobal = {};
let LePersoSéléctionné = "";
var PersonnageComparaison1 = "";
var PersonnageComparaison2 = "";
let DirectionFlecheFiltrageRole = "BAS";
let nbChampions = 0;
var RoleSelectionne = "";
let TopLane = "FALSE";
let Jungle = "FALSE";
let MidLane = "FALSE";
let BotLane = "FALSE";
let Support = "FALSE";
let CategorieDeLaPage = "CHAMPIONS"


//console.log(champions);
//console.log(champions[1]["name"]);
//console.log(champions[1]["stats"]["mp"]);

champions.forEach(champions => {
    //console.log(champions["name"])

    if (champions["name"] == "Zyra") {
        //console.log(champions["tags"])
    }
});

// //console.log(champions[1]["name"]);
// document.querySelector(".image").innerHTML+="<img src='"+champions[1]["icon"]+"'></img>";
MoyenneStats()

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
    //console.log(sommes);
    Object.entries(sommes).forEach(([stat, valeur]) => {
        sommes[stat] = Math.round(valeur / nbChampions);
    })
    //console.log(sommes);
    Object.entries(sommes).forEach(([stat, valeur]) => {
        document.querySelector(".MoyenneDesStats").innerHTML += "<div>" + stat + " : " + valeur + "</div>"
    })

    CompterLesChampions();

    /*let somme = 0;
        champions.forEach(statistique => {

            let Table = []
            // Table.push(champions["stats"])
            Table.push(statistique["stats"].hp)
            //console.log(Table)
            let somme = Table.reduce(additionner)
            MoyenneStats = somme / Table.length
            MoyenneStats = Math.round(MoyenneStats)
            //console.log(MoyenneStats)
        })
        // //console.log(champions["stats"]["hp"])

    document.querySelectorAll(".personnage").forEach(e => {
        e.addEventListener('click', ComparerHP)
    });*/
}

const StatM = []

var hp = sommes.hp
var hpperlevel = sommes.hpperlevel
var mp = sommes.mp
var mpperlevel = sommes.mpperlevel
var movespeed = sommes.movespeed
var armor = sommes.armor
var armorperlevel = sommes.armorperlevel
var spellblock = sommes.spellblock
var spellblockperlevel = sommes.spellblockperlevel
var attackrange = sommes.attackrange
var hpregen = sommes.hpregen
var hpregenperlevel = sommes.hpregenperlevel
var mpregen = sommes.mpregen
var mpregenperlevel = sommes.mpregenperlevel
var crit = sommes.crit
var critperlevel = sommes.critperlevel
var attackdamage = sommes.attackdamage
var attackdamageperlevel = sommes.attackdamageperlevel
var attackspeedperlevel = sommes.attackspeedperlevel
var attackspeed = sommes.attackspeed

StatM.push({ hp, hpperlevel, mp, mpperlevel, movespeed, armor, armorperlevel, spellblock, spellblockperlevel, attackrange, hpregen, hpregenperlevel, mpregen, mpregenperlevel, crit, critperlevel, attackdamage, attackdamageperlevel, attackspeedperlevel, attackspeed })

//console.log(hp)
//console.log(StatM[0])

// REVIENS ICI QUAND TU VEUX VOIR COMMENT TU INITIALISE L'AFFICHAGE DES PERSO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function start() {
    let output = "";
    champions.forEach(champion => {
        //console.log(champion["tags"]);
        if (champion["tags"].includes(RoleSelectionne) || RoleSelectionne == "") {
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

        // <div class='TexteStat'>
        //             ${DifferenceStats(champion)}
        //         </div>


        //champion.Affichage = "FALSE"
    });
    document.querySelector(".image").innerHTML = output;
    // document.querySelector(".EnleverImageFiltreur").classList.remove("EnleverImageFiltreur")
    if (RoleSelectionne == "") {
        //console.log((document.querySelector(".PartieCentreLogo").children[1]))
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 100%;"
    }
    else if (RoleSelectionne == "Tank") {
        //console.log((document.querySelector(".PartieCentreLogo").children[1]))
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 25%;"
    }
    else if (RoleSelectionne == "Support") {
        //console.log((document.querySelector(".PartieCentreLogo").children[1]))
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
    ensuite();
};

start();








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
    output += `</div></div><div class="LeHoverDuGraph">ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef ryrtyertzef </div>`


    // Object.entries(champion.stats).forEach(([key, value]) => {
    //     output += "<div>" + key + ":" + value + "</div>"
    // })

    // REVIENS ICI POUR AFFICHER LES STATS A NOUVEAU


    // output += ""
    return output;
}


function DifferenceStats(champion) {
    let tre = "";
    //console.log("hhhhhhhhhhhhhhhhhhhhhhh" + sommes);
    // document.querySelector(".ComparaisonStat").innerHTML += "<div class='GraphiqueStat'>    <svg width='1234' height='788' viewBox='0 0 1234 788' fill='none' xmlns='http://www.w3.org/2000/svg'> <path d='M0 394L1234 394' stroke='#E3E300' stroke-width='5' /></svg></div>"
    Object.entries(champion.stats).forEach(([key, value]) => {
        valeur = sommes[key];
        //Object.entries(StatM[0]).forEach(([stat, valeur])=>{
        //   if(key == stat){
        if (Math.round(value - valeur) > 0) {
            tre += "<div class=" + key + ">La stat de <b>" + key + "</b> est au dessus de la moyenne de : " + (Math.round(value - valeur)) + " points <div class='UneBarre' style='height: " + (Math.abs(value - valeur) * 100 / valeur) + "px;'></div></div>"
        }
        else if (Math.round(value - valeur) < 0) {
            tre += "<div class=" + key + ">La stat de <b>" + key + "</b> est en dessous de la moyenne de : " + (Math.round(value - valeur)) + " points <div class='UneBarre2' style='height: " + (Math.abs(value - valeur) * 100 / valeur) + "px;'></div></div>"
        }
        else if (Math.round(value - valeur) == 0) {
            tre += "<div class=" + key + ">La stat de <b>" + key + "</b> est pile à la moyenne : " + (Math.round(value - valeur)) + "</div>"
        }
        //  }
        //})
    })
    return tre;
}

function DifferenceGraphique(champion) {
    let zqsd = "";
    //console.log("hhhhhhhhhhhhhhhhhhhhhhh" + sommes);
    let compteur = 0;
    zqsd += "<div class='GraphiqueChampionAffichage'>    <svg width='1234' height='788' viewBox='0 0 1234 788' class='GraphDesPersoGlobal' fill='none' xmlns='http://www.w3.org/2000/svg'> <path d='M0 394L1234 394' stroke='#E3E300' stroke-width='5' />"
    Object.entries(champion.stats).forEach(([key, value]) => {
        valeur = sommes[key];
        //Object.entries(StatM[0]).forEach(([stat, valeur])=>{
        //   if(key == stat){
        //console.log(Math.abs(value - valeur) * 100 / valeur)
        //console.log(100 - (Math.abs(value - valeur) * 100 / valeur))
        if (Math.round(value - valeur) > 0) {
            zqsd += "<path d='M3 394V0' stroke='#006600' stroke-width='32' pathLength='100' class='" + key + "' style='stroke-dasharray:" + (Math.abs(value - valeur) * 100 / valeur) + " " + (100 - (Math.abs(value - valeur) * 100 / valeur)) + "; transform: translateX(" + (7.5 + 4.5 * compteur) + "%) translateY(-2px);'/>"
            zqsd += "<text class='TitreBarreGraphique' x='0' y='0' font-family='Montserrat' font-size='32px' style='transform: translateX(" + (7.5 + 4.5 * compteur) + "%) rotate(270deg) translateX(-394px);'>" + key + "</text>"
            // zqsd += `<foreignObject x="0" y="0" width="160" height="160" font-size='32px'>
            //             <div class="DescriptionStatSVG">La stat de ${key} est égal à ${value}</div>
            //         </foreignObject>`
        }
        else if (Math.round(value - valeur) == 0) {
            zqsd += "<circle cx='0' cy='394' r='16' fill='#727400' class='" + key + "' style='stroke-dasharray:" + (Math.abs(value - valeur) * 100 / valeur) + " " + (100 - (Math.abs(value - valeur) * 100 / valeur)) + "; transform: translateX(" + (7.5 + 4.5 * compteur) + "%);'/>"
            zqsd += "<text class='TitreBarreGraphique' x='0' y='0' font-family='Montserrat' font-size='32px' style='transform: translateX(" + (7.5 + 4.5 * compteur) + "%) rotate(270deg) translateX(-394px);'>" + key + "</text>"
            // zqsd += `<foreignObject x="0" y="0" width="160" height="160" font-size='32px' style='transform: translateX(` + (7.5 + 4.5 * compteur) + `%) translateX(-394px);'>
            //             <div class="DescriptionStatSVG">La stat de ${key} est égal à ${value}</div>
            //         </foreignObject>`
        }
        else if (Math.round(value - valeur) < 0) {
            zqsd += "<path d='M3 394V394 788' stroke='#660000' stroke-width='32' pathLength='100' class='" + key + "' style='stroke-dasharray:" + (Math.abs(value - valeur) * 100 / valeur) + " " + (100 - (Math.abs(value - valeur) * 100 / valeur)) + "; transform: translateX(" + (7.5 + 4.5 * compteur) + "%) translateY(2px);'/>"
            zqsd += "<text class='TitreBarreGraphique' x='0' y='394' font-family='Montserrat' font-size='32px' style='transform: translateX(" + (7.5 + 4.5 * compteur) + "%) rotate(270deg) translateY(-50%) translateX(-50%);'>" + key + "</text>"
            // zqsd += `<foreignObject x="0" y="0" width="160" height="160" font-size='32px' style='transform: translateX(` + (7.5 + 4.5 * compteur) + `%) translateX(-394px);'>
            //             <div class="DescriptionStatSVG">La stat de ${key} est égal à ${value}</div>
            //         </foreignObject>`
        }
        // else if (Math.round(value - valeur) == 0) {
        //     zqsd += "<div class=" + key + ">La stat de <b>" + key + "</b> est pile à la moyenne : " + (Math.round(value - valeur)) + "</div>"
        // }
        //  }
        //})
        compteur++
    })
    zqsd += "</svg></div>"
    return zqsd;
}

//console.log(champions[0].stats.hp)

function ensuite() {
    //console.log("non");
    document.querySelectorAll(".personnage").forEach(e => {
        e.addEventListener('click', nom2)
    });
    ActualisationDeLaPage()
};

function nom2() {


    if (document.querySelector(".afficher") == this) {
        document.querySelector(".afficher")?.classList.remove("afficher");
    } else {
        document.querySelector(".afficher")?.classList.remove("afficher");
        this.classList.add("afficher");
    }
}

// function nom() {
//     let parent = this.childNodes[0].className
//     //console.log(parent)
//     // //console.log(champions[1]["stats"])
//     document.querySelectorAll(".stats").forEach(s => {
//         s.innerHTML = ""
//     })
//     champions.forEach(test => {
//         // //console.log(test["name"])
//         if (parent == test["name"]) {
//             //console.log(test["stats"])
//             //console.log(test.Affichage)
//             if (test.Affichage == "FALSE") {
//                 Object.entries(test.stats).forEach(([key, value]) => {
//                     //console.log(`${key}: ${value}`);
//                     this.querySelector(".stats").innerHTML += "<div>" + key + ":" + value + "</div>"
//                 })
//                 test.Affichage = "TRUE"
//             }

//             else if (test.Affichage == "TRUE") {
//                 Object.entries(test.stats).forEach(([key, value]) => {
//                     //console.log(`${key}: ${value}`);
//                     this.querySelector(".stats").innerHTML = ""
//                 })
//                 test.Affichage = "FALSE"
//             }


//         }
//         else{
//             test.Affichage = "FALSE" 
//         }
//         // else if (".stats" != "") {


//         //     )
//         //     test.Affichage = "FALSE"
//         // }
//     })
//     //De base je l'affiche en display none et ensuite je toggle une class qui le fait apparaitre
//     //merci enzo
// }
// document.querySelector(".personnage").addEventListener("click", Stat);


// function Stat(){
//     document.querySelector(".personnage").innerHTML+="<div class='stat'>"+champions["stat"]+"</div>";
// }

MoyenneHP()

function MoyenneHP() {
    let TableHP = []
    champions.forEach(champions => {
        // //console.log(champions["stats"]["hp"])
        TableHP.push(champions["stats"]["hp"])
        //console.log(TableHP)
    })
    let sommeHP = TableHP.reduce(additionner)
    MoyenneHP = sommeHP / TableHP.length
    MoyenneHP = Math.round(MoyenneHP)
    //console.log(MoyenneHP)

    document.querySelectorAll(".personnage").forEach(e => {
        e.addEventListener('click', ComparerHP)
    });
}

function additionner(first, nombre) {
    return first + nombre;
}


function ComparerHP() {
    let parent = this.childNodes[1].className
    //console.log(parent)
    champions.forEach(RecupereStats => {
        if (parent == RecupereStats["name"]) {
            let MesHP = RecupereStats["stats"]["hp"]
            //console.log(MesHP)
            MesHP = MesHP - MoyenneHP
            //console.log(MesHP)

        }
    })
}







Categorie()

function Categorie() {
    let TableCategorie = []
    NombreTank = 0
    NombreFighter = 0
    NombreMage = 0
    NombreAssassin = 0
    NombreSupport = 0
    NombreMarksman = 0
    champions.forEach(perso => {
        // //console.log(perso["tags"])
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
    document.querySelector(".HeaderCategories").children[0].children[1].innerText = "Top lane : " + (NombreTank + NombreFighter) + "";
    document.querySelector(".HeaderCategories").children[1].children[1].innerText = "Jungle : " + (NombreFighter + NombreAssassin) + "";
    document.querySelector(".HeaderCategories").children[2].children[1].innerText = "Mid lane : " + (NombreMage + NombreAssassin) + "";
    document.querySelector(".HeaderCategories").children[3].children[1].innerText = "Bot lane : " + (NombreMage + NombreMarksman) + "";
    document.querySelector(".HeaderCategories").children[4].children[1].innerText = "Support : " + NombreSupport + "";

    //console.log(TableCategorie)
    let NombreCategorie = NombreTank + NombreFighter + NombreMage + NombreAssassin + NombreSupport + NombreMarksman
    //console.log("Nombre de categories : " + NombreCategorie)
    //console.log("Nombre de tank : " + NombreTank)
    //console.log("Nombre de fighter : " + NombreFighter)
    //console.log("Nombre de mage : " + NombreMage)
    //console.log("Nombre d'assassin : " + NombreAssassin)
    //console.log("Nombre de support : " + NombreSupport)
    //console.log("Nombre de marksman : " + NombreMarksman)
    let PourcentageTank = NombreTank / NombreCategorie * 100
    let PourcentageFighter = NombreFighter / NombreCategorie * 100
    let PourcentageMage = NombreMage / NombreCategorie * 100
    let PourcentageAssassin = NombreAssassin / NombreCategorie * 100
    let PourcentageSupport = NombreSupport / NombreCategorie * 100
    let PourcentageMarksman = NombreMarksman / NombreCategorie * 100
    //console.log("Les tanks représentent : " + PourcentageTank + "% des personnages du jeu")
    //console.log("Les fighters représentent : " + PourcentageFighter + "% des personnages du jeu")
    //console.log("Les mages représentent : " + PourcentageMage + "% des personnages du jeu")
    //console.log("Les assassins représentent : " + PourcentageAssassin + "% des personnages du jeu")
    //console.log("Les supports représentent : " + PourcentageSupport + "% des personnages du jeu")
    //console.log("Les marksmans représentent : " + PourcentageMarksman + "% des personnages du jeu")
    let PourcentageTotal = PourcentageTank + PourcentageFighter + PourcentageMage + PourcentageAssassin + PourcentageSupport + PourcentageMarksman
    //console.log("Test que tout les % font bien 100% : " + PourcentageTotal)

    document.querySelector(".CompteurRoleGlobal").children[0].innerHTML = "<div class='RondRole'></div>Tank : " + NombreTank + ""
    document.querySelector(".CompteurRoleGlobal").children[1].innerHTML = "<div class='RondRole'></div>Support : " + NombreSupport + ""
    document.querySelector(".CompteurRoleGlobal").children[2].innerHTML = "<div class='RondRole'></div>Mage : " + NombreMage + ""
    document.querySelector(".CompteurRoleGlobal").children[3].innerHTML = "<div class='RondRole'></div>Assassin : " + NombreAssassin + ""
    document.querySelector(".CompteurRoleGlobal").children[4].innerHTML = "<div class='RondRole'></div>Fighter : " + NombreFighter + ""
    document.querySelector(".CompteurRoleGlobal").children[5].innerHTML = "<div class='RondRole'></div>Marksman : " + NombreMarksman + ""


    document.querySelector(".Tarte").children[0].style = "transform: scale(" + PourcentageSupport + "%); --DelaiDeLaTransition: 0.1s;";
    document.querySelector(".Tarte").children[1].style = "transform: scale(" + PourcentageFighter + "%); --DelaiDeLaTransition: 0.4s;";
    document.querySelector(".Tarte").children[2].style = "transform: scale(" + PourcentageTank + "%); --DelaiDeLaTransition: 0s;";
    document.querySelector(".Tarte").children[3].style = "transform: scale(" + PourcentageAssassin + "%); --DelaiDeLaTransition: 0.3s;";
    document.querySelector(".Tarte").children[4].style = "transform: scale(" + PourcentageMarksman + "%); --DelaiDeLaTransition: 0.5s;";
    document.querySelector(".Tarte").children[5].style = "transform: scale(" + PourcentageMage + "%); --DelaiDeLaTransition: 0.2s;";
}

// document.querySelector(".FiltrageRole").addEventListener("click", ApparitionFiltrageRole)

function ApparitionFiltrageRole() {
    document.querySelector(".PropositionRoleGlobal").classList.toggle("PropositionRoleGlobalActive")
    if (DirectionFlecheFiltrageRole == "BAS") {
        document.querySelector(".RoleFleche").innerText = "▲";
        DirectionFlecheFiltrageRole = "HAUT";
    }
    else if (DirectionFlecheFiltrageRole == "HAUT") {
        document.querySelector(".RoleFleche").innerText = "▼";
        DirectionFlecheFiltrageRole = "BAS";
    }
}

function CompterLesChampions() {
    document.querySelector(".CompterChampions").innerText = "Nombre de champions actuel : " + nbChampions + ""
}

// var idx = thelist.selectedIndex;
// //console.log(document.querySelector(".TitrePartieCentre"))
// document.querySelector(".TitrePartieCentre").innerHTML="idx"
// document.querySelector(".SelecteurRole").addEventListener("Change", combo(thelist, theinput))

function combo(thelist, theinput) {
    theinput = document.getElementById(theinput);
    var idx = thelist.selectedIndex;
    // RoleSelectionne = thelist.options[idx].innerHTML;
    RoleSelectionne = thelist.options[idx].value;
    //   theinput.value = content;	
    //console.log(RoleSelectionne)
    start();
}

document.querySelector(".TitrePartieCentre:nth-child(1)").addEventListener("click", ChangementDeLaCategorieDeLaPage)

function ChangementDeLaCategorieDeLaPage() {
    document.querySelector(".TitrePartieCentre:nth-child(2)").style = "opacity: 15%"
    this.style = "opacity: 100%"
    if (CategorieDeLaPage == "COMPARAISON") {
        start();
        console.log("j'arrive jusque là");
        CategorieDeLaPage = "CHAMPIONS";
    }
}

document.querySelector(".TitrePartieCentre:nth-child(2)").addEventListener("click", RetourDeLaCategorieDeLaPage)

function RetourDeLaCategorieDeLaPage() {
    document.querySelector(".TitrePartieCentre:nth-child(1)").style = "opacity: 15%"
    this.style = "opacity: 100%"
    if (CategorieDeLaPage == "CHAMPIONS") {
        //LANCER LA FONCTION QUI MET LA PAGE EN VERSION COMPARAISON DE DEUX PERSONNAGES
        console.log("j'arrive ici aussi");
        VersionComparaisonDesPersonnage();
        CategorieDeLaPage = "COMPARAISON";
    }
}

function VersionComparaisonDesPersonnage() {
    let output = "";
    PersonnageComparaison1 = "";
    PersonnageComparaison2 = "";
    //  onChange="combo(this, 'theinput')
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
    // })
    document.querySelector(".image").innerHTML = output;
    VueComparaisonChampion()
    document.querySelector("#select1").addEventListener("change", kombo);
    document.querySelector("#select2").addEventListener("change", kombo);
}

function SelectionDesChampionDeLaComparaison() {
    // PersonnageComparaison1
    let aze = ""
    champions.forEach(champion => {
        // console.log(champion["name"])
        aze += `<option value="` + champion["name"] + `">` + champion["name"] + `</option>`
    })
    console.log("Selectionne tes champions")
    return aze;
}

function kombo() {
    //theinput = document.getElementById(theinput);
    //var idx = thelist.selectedIndex;
    // Role.idSelectionne = thelist.options[idx].innerHTML;
    if (this.id == "select1") {
        // console.log("ça marche")
        PersonnageComparaison1 = this.value;
        // console.log(this.value)
    }
    else if (this.id == "select2") {
        // console.log("ça marche")
        PersonnageComparaison2 = this.value;
        // console.log(this.value)
    }
    //   theinput.value = content;	
    //console.log(RoleSelectionne)
    // start();
    VueComparaisonChampion();
}

function VueComparaisonChampion() {
    let qsd = ""
    console.log("PersonnageComparaison1 : " + PersonnageComparaison1 + " et PersonnageComparaison2 : " + PersonnageComparaison2)
    if (PersonnageComparaison1 != "" && PersonnageComparaison2 != "" && PersonnageComparaison1 != PersonnageComparaison2) {
        console.log("Perso séléctionné");
        qsd = "";
        qsd += "<div class='ImageDuPersoSelectionneGlobal'>"
        StatPersoSelectionne1 = {}
        StatPersoSelectionne2 = {}
        champions.forEach(champion => {
            if (champion["name"].includes(PersonnageComparaison1)) {
                qsd += "<div><img class='ImageDuPersoSelectionne' src='" + champion["icon"] + "'></img></div>"
                Object.entries(champion.stats).forEach(([stat, valeur]) => {
                    if (StatPersoSelectionne1[stat]) {
                        StatPersoSelectionne1[stat] += valeur
                    }
                    else {
                        StatPersoSelectionne1[stat] = valeur;
                    }
                })
                // StatPersoSelectionne1
            }
        })
        champions.forEach(champion => {
            if (champion["name"].includes(PersonnageComparaison2)) {
                qsd += "<div><img class='ImageDuPersoSelectionne' src='" + champion["icon"] + "'></img></div>"
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
        qsd += "</div>"
        document.querySelector(".VueComparaisonChampion").style = "margin-top: 0px;"
        console.log(qsd)
        qsd += `<div class="GraphDeLaComparaison">${jffdsfsdf()}</div>`
    }
    else if (PersonnageComparaison1 == "" || PersonnageComparaison2 == "") {
        console.log("Perso inconnu");
        qsd = "";
        qsd += "<h3 class='PersonnageNonSelectionne'>Veuillez choisir deux personnages</h3>";
        document.querySelector(".VueComparaisonChampion").style = "margin-top: 128px;"
    }
    else if (PersonnageComparaison1 == PersonnageComparaison2) {
        qsd = "";
        qsd += "<h3 class='PersonnageNonSelectionne'>Vous ne pouvez pas comparer un personnage à lui même</h3>";
        document.querySelector(".VueComparaisonChampion").style = "margin-top: 128px;"
    }
    // console.log("Compare tes champions séléctionnés")
    // return qsd
    document.querySelector(".VueComparaisonChampion").innerHTML = qsd

}

function jffdsfsdf() {
    console.log(Object.entries(StatPersoSelectionne1))
    console.log(Object.entries(StatPersoSelectionne2))
    let Personnage1Compteur = 0
    let Personnage2Compteur = 0
    let PersonnageEgalitéCompteur = 0
    let compteur = 1;
    let compteur2 = 1;

    let output = `<svg height="650" width="500">
                    <polyline points="`

    Object.entries(StatPersoSelectionne1).forEach(([stat, valeur]) => {
        output += (compteur * 50) + "," + (650 - valeur) + ", "
        compteur++
        // console.log(stat + " est de : " + valeur)
        StatPersoSelectionneGlobal[stat] = valeur
    })
    output += `" style="fill:none;stroke:green;stroke-width:3" /><polyline points="`

    Object.entries(StatPersoSelectionne2).forEach(([stat2, valeur2]) => {
        // console.log(stat2 + " est de : " + valeur2)
        output += (compteur2 * 50) + "," + (650 - valeur2) + ", "
        compteur2++

        Object.entries(StatPersoSelectionneGlobal).forEach(([stat, valeur]) => {

            if (stat == stat2)
                StatPersoSelectionneGlobal[stat] = valeur - valeur2
        })

    })
    output += `" style="fill:none;stroke:red;stroke-width:3" />
                </svg>`
    // var StatPersoSelectionneGlobal = (StatPersoSelectionne1 + StatPersoSelectionne2)

    // transform: translateX(" + (7.5 + 4.5 * compteur) + "%)

    console.log(Object.entries(StatPersoSelectionneGlobal))

    Object.entries(StatPersoSelectionneGlobal).forEach(([stat, valeur]) => {
        if (valeur > 0) {
            // ajoute les points du svg
            // output += (compteur * 50) + "," + (80) + ", "
            Personnage1Compteur++
        }
        else if (valeur == 0) {
            // output += (compteur * 50) + "," + (40) + ", "
            PersonnageEgalitéCompteur++
        }
        else if (valeur < 0) {
            // output += (compteur * 50) + "," + (10) + ", "
            Personnage2Compteur++
        }
        compteur++
    })

    console.log("Stat ou le perso 1 à l'avantage : " + Personnage1Compteur)
    console.log("Stat ou le perso 2 à l'avantage : " + Personnage2Compteur)
    console.log("Stat ou le perso 1 et 2 sont a égalité : " + PersonnageEgalitéCompteur)

    return output
}

function ActualisationDeLaPage() {
    document.querySelectorAll(".GraphDesPersoGlobal>path").forEach(element => {
        element.addEventListener("mouseover", HoverDuGraphArrive)
    });

    document.querySelectorAll(".GraphDesPersoGlobal>circle").forEach(element => {
        element.addEventListener("mouseover", HoverDuGraphArrive)
    });

    // document.querySelectorAll(".GraphDesPersoGlobal>text").forEach(element => {
    //     element.addEventListener("mouseover", HoverDuGraphArriveText)
    // });

    document.querySelectorAll(".GraphDesPersoGlobal>path").forEach(element => {
        element.addEventListener("mouseleave", HoverDuGraphPart)
    });

    document.querySelectorAll(".GraphDesPersoGlobal>circle").forEach(element => {
        element.addEventListener("mouseleave", HoverDuGraphPart)
    });

    // document.querySelectorAll(".GraphDesPersoGlobal>text").forEach(element => {
    //     element.addEventListener("mouseover", HoverDuGraphPart)
    // });
}

function HoverDuGraphArrive() {
    let LeHover = this.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children[1]
    LePersoSéléctionné = this.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].className
    let LaStat = this.classList[0]

    champions.forEach(champion => {
        if (champion["name"].includes(LePersoSéléctionné) && LaStat != undefined) {

            // dans la ligne du haut qui est en commentaire j'utilise le point qui sert a rentrer dans le nouveau tableau et "LaStat" n'est pas un tableau mais une suite de caractère qui change au hover sur le graphique pour prendre le nom de la stat qu'on survole donc impossible de rentrer dedans
            // dans la ligne du bas j'utilise les crochet avec les guillemets pour rentrer aussi dans le tableau mais en utilisant une suite de caractère ce qui permet de faire passer incognito "LaStat" pour lequel il va juste lire ce qu'il contient car je n'ai pas mis les guillemets et il utilise comme suite de caractère ce qu'il contient

            // ça permet de changer la stat afficher en js au hover sans avoir besoin de rester dans les boucles de forEach

            // console.log(champion.stats.LaStat)
            // console.log(champion["stats"][LaStat])



            // document.querySelector(".LeHoverDuGraph").classList.add("LeHoverDuGraphAffiche")
            EcritureDuHover(champion, LaStat, LeHover)
        }
    })
}

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

function HoverDuGraphPart() {
    if (this.classList[0] != undefined) {
        document.querySelector(".LeHoverDuGraphAffiche").classList.remove("LeHoverDuGraphAffiche");
    }
}

function EcritureDuHover(champion, LaStat, LeHover) {
    LeHover.classList.add("LeHoverDuGraphAffiche")
    console.log(LeHover)
    DéfinitionStat.forEach(DefStat => {
        if (DefStat.Name == LaStat) {
            // document.querySelector(".DescriptionDuHover").innerHTML = DefStat.Définition
            console.log(DefStat["Définition"])
            LeHover.innerHTML = `<div class='TitreDuHover'> ${LaStat} </div><div> ${champion["name"]} possède ${champion["stats"][LaStat]} points en ${LaStat} </div><div class='DescriptionDuHover'> ${DefStat["Définition"]} </div>`
        }
    })
    // console.log(champion["name"] + " possède " + champion["stats"][LaStat] + " en " + LaStat)
    // console.log(LaStat)
}

function DefinitionTaillePage() {
    // Calcule de la place que prendra la zone de jeu en fonction de la taille visibile de la fenetre
    let DebutDeLaZone = document.querySelector(".ScrollHere").getBoundingClientRect().top
    let NombreTailleVertical = Math.floor(window.innerHeight / 148) * 148 - DebutDeLaZone;

    // Modification de la taille de la zone de jeu
    document.querySelector(".ScrollHere").style = "height:" + NombreTailleVertical + "px";
}


DefinitionTaillePage();

// On regarde quand on change la taille de la fenetre
window.addEventListener("resize", RedimentionPage);

function RedimentionPage() {
    // On recalcule la taille de la zone de jeu
    DefinitionTaillePage();
}
