const express = require('express')
const app = express()
var bodyParser = require('body-parser')
/*
var listeDeMenu = [
    {
        id: 1,
        titre: "Menu du jour",
        entrés: {nom: "du jour", prix: 5},
        plat: {nom: "du jour", prix: 8},
        dessert: {nom: "du jour", prix: 3}
    },
    {
        id: 2,
        titre: "SVT",
        entrés: {nom: "salade", prix: 3},
        plat: {nom: "viande", prix: 10},
        dessert: {nom: "tarte", prix: 5}
    }
];
*/
var listeDeCarte = [
    {
        id: 1,
        titre: "carte1",
        listeDeMenu: [
        {
            id: 1,
            titre: "Menu du jour",
            entres: {nom: "du jour", prix: 5},
            plat: {nom: "du jour", prix: 8},
            dessert: {nom: "du jour", prix: 3}
        },
        {
            id: 2,
            titre: "SVT",
            entres: {nom: "salade", prix: 3},
            plat: {nom: "viande", prix: 10},
            dessert: {nom: "tarte", prix: 5}
        } 
        ] 
    },
    {
        id: 2,
        titre: "carte2",
        listeDeMenu: [
        {
            id: 1,
            titre: "Menu du jour",
            entres: {nom: "du jour", prix: 5},
            plat: {nom: "du jour", prix: 8},
            dessert: {nom: "du jour", prix: 3}
        },
        {
            id: 2,
            titre: "SVT",
            entres: {nom: "salade", prix: 3},
            plat: {nom: "viande", prix: 10},
            dessert: {nom: "tarte", prix: 5}
        } 
        ] 
    }
];

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));

//retourne toutes les cartes
app.get("/cartes/get", function(req, res){
    res.header("Acces-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'index/json');
    res.status(200).json(listeDeCarte);
});

//retourne tous les menus de toutes les cartes
app.get("/cartes/menus/get", function(req, res){
    res.header("Acces-Control-Allow-Origin", "*");
    for(var i = 0; i < listeDeCarte.length; i++){
        res.setHeader('Content-Type', 'index/json');
        res.status(200).json(listeDeCarte[i].listeDeMenu);
    }
});

//retourne une carte par son id
app.get("/cartes/:id/get", function(req, res){
    res.header("Acces-Control-Allow-Origin", "*");
    let idCarte = parseInt(req.params.id);
   
    for(var i = 0; i < listeDeCarte.length; i++){
        if(idCarte === listeDeCarte[i].id){
            res.setHeader('Content-Type', 'index/json');
            res.status(200).json(listeDeCarte[i]);
        }
    }   
    res.status(404).send("oups");
});

//retourne le menu sélectionné
app.get("/cartes/menus/:id/get", function(req, res){
    res.header("Acces-Control-Allow-Origin", "*");
    let idMenu = parseInt(req.params.id);
    
    for(var i = 0; i < listeDeCarte.length; i++){
        let menu = listeDeCarte[i].listeDeMenu;
        for(var j = 0; j < menu.length; j++){       
            if(idMenu === menu[j].id){
                res.setHeader('Content-Type', 'index/json');
                res.status(200).json(menu[j]);
            }   
        }
    }   
    res.status(404).send("oups");
});

//retourne tous les menus de la carte sélectionnée
app.get("/cartes/:id/menus/get", function(req, res){
    res.header("Acces-Control-Allow-Origin", "*");
    let idCarte = parseInt(req.params.id);
    
    for(var i = 0; i < listeDeCarte.length; i++){
        if(idCarte === listeDeCarte[i].id){
            res.setHeader('Content-Type', 'index/json');
            res.status(200).json(listeDeCarte[i].listeDeMenu);
        }        
    }   
    res.status(404).send("oups");
});

//ajoute une nouvelle carte et retourne son id
app.post("/cartes/add", function(req, res){
    res.header("Acces-Control-Allow-Origin", "*");
    let newCard = req.body;
   
    newCard['id'] = generateCardID();
    listeDeCarte.push(newCard);
    res.status(200).json(newCard);
});

//ajoute un menu a la carte sélectionnée retourne l’id du menu créé
app.post("/cartes/:id/menus/add", function(req, res){
    res.header("Acces-Control-Allow-Origin", "*");
    let idCarte = parseInt(req.params.id);
    let newMenu = req.body;
    let carte;
    let menu;
    for(var i = 0; i < listeDeCarte.length; i++){
        carte = listeDeCarte[i];
        if(idCarte === carte.id){
            menu = carte.listeDeMenu;
            newMenu['id'] = generateCardID();
            menu.push(newMenu);
            res.status(200).json(newMenu);  
        }
    }   
});

//supprime la carte sélectionnée et tous les menus correspondants
app.delete("/cartes/:id/remove", function(req, res){
    res.header("Acces-Control-Allow-Origin", "*");
    let idCarte = parseInt(req.params.id);
    
    for(var i = 0; i < listeDeCarte.length; i++){
        if(idCarte === listeDeCarte[i].id){
            res.setHeader('Content-Type', 'index/json');
            listeDeCarte.splice(i, 1);
            res.status(200).json(listeDeCarte); 
        }
    }   
    res.status(404).send("oups");
});

//supprime tous les menus de la carte sélectionnée
app.delete("/cartes/:id/menus/remove", function(req, res){
    res.header("Acces-Control-Allow-Origin", "*");
    let idCarte = parseInt(req.params.id);
    
    for(var i = 0; i < listeDeCarte.length; i++){
        let menu = listeDeCarte[i].listeDeMenu;
        if(idCarte === listeDeCarte[i].id){
            for(var j = 0; j < menu.length; j++){
                res.setHeader('Content-Type', 'index/json');
                menu.splice(j, menu.length);
                res.status(200).json(listeDeCarte); 
            }
        }
    }   
    res.status(404).send("oups");
});

//supprime le menu sélectionné
app.delete("/cartes/menus/:id/remove", function(req, res){
    res.header("Acces-Control-Allow-Origin", "*");
    let idMenu = parseInt(req.params.id);
    
    for(var i = 0; i < listeDeCarte.length; i++){
        let menu = listeDeCarte[i].listeDeMenu;
        for(var j = 0; j < menu.length; j++){       
            if(idMenu === menu[j].id){
                res.setHeader('Content-Type', 'index/json');
                menu.splice(j, 1);
                res.status(200).json(menu[j]);
            }   
        }
    }   
    res.status(404).send("oups");
});

//met à jour le menu sélectionné
//TODO


//applique un id à une nouvelle carte 
function generateCardID(){
    let newCardID = 0;
    
    //verifie l'id max de la liste de carte
    for(var i = 0; i < listeDeCarte.length; i++){
        if(listeDeCarte[i].id > newCardID){
            newCardID = listeDeCarte[i].id;
        }
    }
    //l'id de la nouvelle carte sera l'id max de la liste de carte plus 1
    return newCardID + 1;
}

//idem que pour la carte pour un menu
function generateMenuID(){
    let newMenuID = 0;
    let carte;
    let menu;
    for(var i = 0; i < listeDeCarte.length; i++){
        carte = listeDeCarte[i];
        menu = carte.listeDeMenu;
        if(menu.id > newMenuID){
            newMenuID = menu.id;
        }
    }
    
    return newMenuID + 1;
}

app.listen(3000, "localhost");
console.log("à l'écoute");
