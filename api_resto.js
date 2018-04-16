const express = require('express')
const app = express()
var bodyParser = require('body-parser')

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

var listeDeCarte = [
    {
        id: 1,
        titre: "carte1",
        listeDeMenu: [listeDeMenu]  
    },
    {
        id: 2,
        titre: "carte2",
        listeDeMenu: [listeDeMenu]
    }
];

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));

//retourne toutes les cartes
app.get("/cartes/get", function(req, res){
    res.header("Acces-Control-Allow-Origine", "*");
    res.setHeader('Content-Type', 'index/json');
    res.status(200).json(listeDeCarte);
});

//retourne tous les menus de toutes les cartes
app.get("/cartes/menus/get", function(req, res){
    res.header("Acces-Control-Allow-Origine", "*");
    res.setHeader('Content-Type', 'index/json');
    res.status(200).json(listeDeMenu);
});

//retourne une carte par son id
app.get("/cartes/:id/get", function(req, res){
    res.header("Acces-Control-Allow-Origine", "*");
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
    res.header("Acces-Control-Allow-Origine", "*");
    let idMenu = parseInt(req.params.id);
   
    for(var i = 0; i < listeDeMenu.length; i++){
        if(idMenu === listeDeMenu[i].id){
            res.setHeader('Content-Type', 'index/json');
            res.status(200).json(listeDeMenu[i]);
        }
    }   
    res.status(404).send("oups");
});

//retourne tous les menus de la carte sélectionnée
app.get("/cartes/:id/menus/get", function(req, res){
    res.header("Acces-Control-Allow-Origine", "*");
    let idCarte = parseInt(req.params.id);
    let menu;
    
    for(var i = 0; i < listeDeCarte.length; i++){
        if(idCarte === listeDeCarte[i].id){
            for(var j = 0; j < listeDeMenu.length; j++){
                menu = listeDeMenu[j];
                res.setHeader('Content-Type', 'index/json');
                res.status(200).json(menu);
            }
        }        
    }   
    res.status(404).send("oups");
});

//ajoute une nouvelle carte et retourne son id
app.post("/cartes/add", function(req, res){
    res.header("Acces-Control-Allow-Origine", "*");
});

//ajoute un menu a la carte sélectionnée retourne l’id du menu créé
app.post("/cartes/:id/menus/add", function(req, res){
    res.header("Acces-Control-Allow-Origine", "*");
});

//supprime la carte sélectionnée et tous les menus correspondants
app.delete("/cartes/:id/remove", function(req, res){
    res.header("Acces-Control-Allow-Origine", "*");
});

//supprime tous les menus de la carte sélectionnée
app.delete("/cartes/:id/menus/remove", function(req, res){
    res.header("Acces-Control-Allow-Origine", "*");
});

//supprime le menu sélectionné
app.delete("/cartes/menus/:id/remove", function(req, res){
    res.header("Acces-Control-Allow-Origine", "*");
});

//met à jour le menu sélectionné
//TODO





function generatedCardID(){
    let newCardID = 0;
    
    for(var i = 0; i < listeDeCarte.length; i++){
        if(listeDeCarte[i].id > newCardID){
            newCardID = listeDeCarte[i].id;
        }
    }
}


app.listen(3000, "localhost");
console.log("à l'écoute");
