var sommes = {};
let DirectionFlecheFiltrageRole = "BAS";
let nbChampions = 0;
var RoleSelectionne = "";
let TopLane = "FALSE";
let Jungle = "FALSE";
let MidLane = "FALSE";
let BotLane = "FALSE";
let Support = "FALSE";


console.log(champions);
console.log(champions[1]["name"]);
console.log(champions[1]["stats"]["mp"]);

champions.forEach(champions => {
    console.log(champions["name"])

    if (champions["name"] == "Zyra") {
        console.log(champions["tags"])
    }
});

// console.log(champions[1]["name"]);
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
    console.log(sommes);
    Object.entries(sommes).forEach(([stat, valeur]) => {
        sommes[stat] = Math.round(valeur / nbChampions);
    })
    console.log(sommes);
    Object.entries(sommes).forEach(([stat, valeur]) => {
        document.querySelector(".MoyenneDesStats").innerHTML += "<div class=" + stat + ">" + stat + " : " + valeur + "</div>"
    })

    CompterLesChampions();

    /*let somme = 0;
        champions.forEach(statistique => {

            let Table = []
            // Table.push(champions["stats"])
            Table.push(statistique["stats"].hp)
            console.log(Table)
            let somme = Table.reduce(additionner)
            MoyenneStats = somme / Table.length
            MoyenneStats = Math.round(MoyenneStats)
            console.log(MoyenneStats)
        })
        // console.log(champions["stats"]["hp"])

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

console.log(hp)
console.log(StatM[0])

// REVIENS ICI QUAND TU VEUX VOIR COMMENT TU INITIALISE L'AFFICHAGE DES PERSO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function start() {
    document.querySelector(".image").innerHTML = ""
    champions.forEach(champion => {
        console.log(champion["tags"]);
        if (champion["tags"].includes(RoleSelectionne) || RoleSelectionne == "") {
            document.querySelector(".image").innerHTML += `
            <div class='personnage'>
            <img class='${champion["name"]}' src='${champion["icon"]}'></img>
            <div class='stats'>
                ${htmlStats(champion)}
            </div>
            <div class='ComparaisonStat'>
                <div class='TexteStat'>
                    ${DifferenceStats(champion)}
                </div>
                <div class='GraphiqueStat>
                    ${DifferenceGraphique(champion)}

                </div>
            </div>
        </div>`;
        }
        //champion.Affichage = "FALSE"
    });
    // document.querySelector(".EnleverImageFiltreur").classList.remove("EnleverImageFiltreur")
    if (RoleSelectionne == "") {
        console.log((document.querySelector(".PartieCentreLogo").children[1]))
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 100%;"
    }
    else if (RoleSelectionne == "Tank") {
        console.log((document.querySelector(".PartieCentreLogo").children[1]))
        document.querySelector(".PartieCentreLogo").children[0].style = "opacity: 100%;"
        document.querySelector(".PartieCentreLogo").children[1].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[2].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[3].style = "opacity: 25%;"
        document.querySelector(".PartieCentreLogo").children[4].style = "opacity: 25%;"
    }
    else if (RoleSelectionne == "Support") {
        console.log((document.querySelector(".PartieCentreLogo").children[1]))
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
    output = "<div>" + champion.name + "</div><div>" + champion.title + "</div><div>" + champion["tags"] + "</div>";
    if (champion["tags"].includes("Tank") && TopLane == "FALSE") {
        output += "<img src='img/Top lane.png' alt='Logo de la top lane'>"
        TopLane = "TRUE"
    }
    if (champion["tags"].includes("Support")) {
        if (Support == "FALSE") {
            output += "<img src='img/Support.png' alt='Logo des supports'>"
            Support = "TRUE"
        }
    }
    if (champion["tags"].includes("Mage")) {
        if (MidLane == "FALSE") {
            output += "<img src='img/Mid lane.png' alt='Logo de la mid lane'>"
            MidLane = "TRUE"
        }
        if (BotLane == "FALSE") {
            output += "<img src='img/Bot lane.png' alt='Logo de la bot lane'>"
            BotLane = "TRUE"
        }
    }
    if (champion["tags"].includes("Assassin")) {
        if (Jungle == "FALSE") {
            output += "<img src='img/Jungle.png' alt='Logo de la jungle'>"
            Jungle = "TRUE"
        }
        if (MidLane == "FALSE") {
            output += "<img src='img/Mid lane.png' alt='Logo de la mid lane'>"
            MidLane = "TRUE"
        }
    }
    if (champion["tags"].includes("Fighter")) {
        if (TopLane == "FALSE") {
            output += "<img src='img/Top lane.png' alt='Logo de la top lane'>"
            TopLane = "TRUE"
        }
        if (Jungle == "FALSE") {
            output += "<img src='img/Jungle.png' alt='Logo de la jungle'>"
            Jungle = "TRUE"
        }
    }
    if (champion["tags"].includes("Marksman") && BotLane == "FALSE") {
        output += "<img src='img/Bot lane.png' alt='Logo de la bot lane'>"
        BotLane = "TRUE"
    }
    Object.entries(champion.stats).forEach(([key, value]) => {
        output += "<div>" + key + ":" + value + "</div>"
    })
    return output;
}


function DifferenceStats(champion) {
    let tre = "";
    console.log("hhhhhhhhhhhhhhhhhhhhhhh" + sommes);
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
    console.log("hhhhhhhhhhhhhhhhhhhhhhh" + sommes);
    let compteur = 0;
    zqsd += "<div class='GraphiqueStat'>    <svg width='1234' height='788' viewBox='0 0 1234 788' fill='none' xmlns='http://www.w3.org/2000/svg'> <path d='M0 394L1234 394' stroke='#E3E300' stroke-width='5' />"
    Object.entries(champion.stats).forEach(([key, value]) => {
        valeur = sommes[key];
        //Object.entries(StatM[0]).forEach(([stat, valeur])=>{
        //   if(key == stat){
        console.log(Math.abs(value - valeur) * 100 / valeur)
        console.log(100 - (Math.abs(value - valeur) * 100 / valeur))
        if (Math.round(value - valeur) > 0) {
            zqsd += "<path d='M3 394V0' stroke='#00FF37' stroke-width='5' pathLength='100' style='stroke-dasharray:" + (Math.abs(value - valeur) * 100 / valeur) + " " + (100 - (Math.abs(value - valeur) * 100 / valeur)) + "; transform: translateX(" + (10 + 4 * compteur) + "%);'/>"
        }
        else if (Math.round(value - valeur) < 0) {
            zqsd += "<path d='M3 394V394 788' stroke='#FF0000' stroke-width='5' pathLength='100' style='stroke-dasharray:" + (Math.abs(value - valeur) * 100 / valeur) + " " + (100 - (Math.abs(value - valeur) * 100 / valeur)) + "; transform: translateX(" + (10 + 4 * compteur) + "%);'/>"
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

console.log(champions[0].stats.hp)

function ensuite() {
    console.log("non");
    document.querySelectorAll(".personnage").forEach(e => {
        e.addEventListener('click', nom2)
    });
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
//     console.log(parent)
//     // console.log(champions[1]["stats"])
//     document.querySelectorAll(".stats").forEach(s => {
//         s.innerHTML = ""
//     })
//     champions.forEach(test => {
//         // console.log(test["name"])
//         if (parent == test["name"]) {
//             console.log(test["stats"])
//             console.log(test.Affichage)
//             if (test.Affichage == "FALSE") {
//                 Object.entries(test.stats).forEach(([key, value]) => {
//                     console.log(`${key}: ${value}`);
//                     this.querySelector(".stats").innerHTML += "<div>" + key + ":" + value + "</div>"
//                 })
//                 test.Affichage = "TRUE"
//             }

//             else if (test.Affichage == "TRUE") {
//                 Object.entries(test.stats).forEach(([key, value]) => {
//                     console.log(`${key}: ${value}`);
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
        // console.log(champions["stats"]["hp"])
        TableHP.push(champions["stats"]["hp"])
        console.log(TableHP)
    })
    let sommeHP = TableHP.reduce(additionner)
    MoyenneHP = sommeHP / TableHP.length
    MoyenneHP = Math.round(MoyenneHP)
    console.log(MoyenneHP)

    document.querySelectorAll(".personnage").forEach(e => {
        e.addEventListener('click', ComparerHP)
    });
}

function additionner(first, nombre) {
    return first + nombre;
}


function ComparerHP() {
    let parent = this.childNodes[1].className
    console.log(parent)
    champions.forEach(RecupereStats => {
        if (parent == RecupereStats["name"]) {
            let MesHP = RecupereStats["stats"]["hp"]
            console.log(MesHP)
            MesHP = MesHP - MoyenneHP
            console.log(MesHP)

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
        // console.log(perso["tags"])
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

    console.log(TableCategorie)
    let NombreCategorie = NombreTank + NombreFighter + NombreMage + NombreAssassin + NombreSupport + NombreMarksman
    console.log("Nombre de categories : " + NombreCategorie)
    console.log("Nombre de tank : " + NombreTank)
    console.log("Nombre de fighter : " + NombreFighter)
    console.log("Nombre de mage : " + NombreMage)
    console.log("Nombre d'assassin : " + NombreAssassin)
    console.log("Nombre de support : " + NombreSupport)
    console.log("Nombre de marksman : " + NombreMarksman)
    let PourcentageTank = NombreTank / NombreCategorie * 100
    let PourcentageFighter = NombreFighter / NombreCategorie * 100
    let PourcentageMage = NombreMage / NombreCategorie * 100
    let PourcentageAssassin = NombreAssassin / NombreCategorie * 100
    let PourcentageSupport = NombreSupport / NombreCategorie * 100
    let PourcentageMarksman = NombreMarksman / NombreCategorie * 100
    console.log("Les tanks représentent : " + PourcentageTank + "% des personnages du jeu")
    console.log("Les fighters représentent : " + PourcentageFighter + "% des personnages du jeu")
    console.log("Les mages représentent : " + PourcentageMage + "% des personnages du jeu")
    console.log("Les assassins représentent : " + PourcentageAssassin + "% des personnages du jeu")
    console.log("Les supports représentent : " + PourcentageSupport + "% des personnages du jeu")
    console.log("Les marksmans représentent : " + PourcentageMarksman + "% des personnages du jeu")
    let PourcentageTotal = PourcentageTank + PourcentageFighter + PourcentageMage + PourcentageAssassin + PourcentageSupport + PourcentageMarksman
    console.log("Test que tout les % font bien 100% : " + PourcentageTotal)

    document.querySelector(".CompteurRoleGlobal").children[0].innerHTML = "<div class='RondRole'></div>Tank : " + NombreTank + ""
    document.querySelector(".CompteurRoleGlobal").children[1].innerHTML = "<div class='RondRole'></div>Support : " + NombreSupport + ""
    document.querySelector(".CompteurRoleGlobal").children[2].innerHTML = "<div class='RondRole'></div>Mage : " + NombreMage + ""
    document.querySelector(".CompteurRoleGlobal").children[3].innerHTML = "<div class='RondRole'></div>Assassin : " + NombreAssassin + ""
    document.querySelector(".CompteurRoleGlobal").children[4].innerHTML = "<div class='RondRole'></div>Fighter : " + NombreFighter + ""
    document.querySelector(".CompteurRoleGlobal").children[5].innerHTML = "<div class='RondRole'></div>Marksman : " + NombreMarksman + ""


    document.querySelector(".Tarte").children[0].style = "transform: scale(" + PourcentageSupport + "%); transform-origin: 50% 50%";
    document.querySelector(".Tarte").children[1].style = "transform: scale(" + PourcentageFighter + "%); transform-origin: 50% 50%";
    document.querySelector(".Tarte").children[2].style = "transform: scale(" + PourcentageTank + "%); transform-origin: 50% 50%";
    document.querySelector(".Tarte").children[3].style = "transform: scale(" + PourcentageAssassin + "%); transform-origin: 50% 50%";
    document.querySelector(".Tarte").children[4].style = "transform: scale(" + PourcentageMarksman + "%); transform-origin: 50% 50%";
    document.querySelector(".Tarte").children[5].style = "transform: scale(" + PourcentageMage + "%); transform-origin: 50% 50%";
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
// console.log(document.querySelector(".TitrePartieCentre"))
// document.querySelector(".TitrePartieCentre").innerHTML="idx"
// document.querySelector(".SelecteurRole").addEventListener("Change", combo(thelist, theinput))

function combo(thelist, theinput) {
    theinput = document.getElementById(theinput);
    var idx = thelist.selectedIndex;
    // RoleSelectionne = thelist.options[idx].innerHTML;
    RoleSelectionne = thelist.options[idx].value;
    //   theinput.value = content;	
    console.log(RoleSelectionne)
    start();
}