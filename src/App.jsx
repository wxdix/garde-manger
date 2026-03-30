import React, { useState, useEffect, useCallback } from "react";

const DEFAULT_ITEMS = [
  {id:'d1',  emoji:'🍝', name:'Penne sans gluten',            qty:'1.5 × 400g',  cat:'Féculents',          date:'2027-01-16', note:''},
  {id:'d2',  emoji:'🌾', name:'Couscous sachet cuisson',      qty:'5 sachets',   cat:'Féculents',          date:'2027-03-01', note:''},
  {id:'d3',  emoji:'🍚', name:'Riz complet',                  qty:'½ × 500g',    cat:'Féculents',          date:'2025-10-21', note:''},
  {id:'d4',  emoji:'🫘', name:'Lentilles vertes',             qty:'1 × 500g',    cat:'Légumineuses',       date:'2028-06-03', note:''},
  {id:'d5',  emoji:'🫘', name:'Lentilles corail',             qty:'½ × 450g',    cat:'Légumineuses',       date:'2028-04-30', note:''},
  {id:'d6',  emoji:'🫙', name:'Maïzena',                      qty:'⅔ × 400g',    cat:'Sucre & pâtisserie', date:'2028-10-01', note:''},
  {id:'d7',  emoji:'🫙', name:'Maïzena',                      qty:'1 × 600g',    cat:'Sucre & pâtisserie', date:'2028-10-01', note:''},
  {id:'d8',  emoji:'🌱', name:'Graines de chia',              qty:'½ × 200g',    cat:'Autre',              date:'2028-11-01', note:''},
  {id:'d9',  emoji:'🍝', name:'Lasagne sèche',                qty:'1 × 500g',    cat:'Féculents',          date:'2025-11-17', note:''},
  {id:'d10', emoji:'🍝', name:'Spaghetti',                    qty:'1 × 224g',    cat:'Féculents',          date:'2028-08-01', note:''},
  {id:'d11', emoji:'🍝', name:'Coquillettes',                 qty:'1 × 732g',    cat:'Féculents',          date:'2029-01-01', note:''},
  {id:'d12', emoji:'🍝', name:'Penne rigate',                 qty:'1 × 385g',    cat:'Féculents',          date:'2028-11-14', note:''},
  {id:'d13', emoji:'🍚', name:'Riz dessert',                  qty:'1 × 1021g',   cat:'Féculents',          date:'2027-12-27', note:''},
  {id:'d14', emoji:'🍜', name:'Vermicelles de riz',           qty:'1 × 71g',     cat:'Féculents',          date:'2026-09-18', note:''},
  {id:'d15', emoji:'🍝', name:'Trottole tricolore',           qty:'1 × 165g',    cat:'Féculents',          date:'2028-07-29', note:''},
  {id:'d16', emoji:'🌾', name:"Flocons d'avoine",             qty:'1 × 166g',    cat:'Céréales',           date:'2026-05-16', note:''},
  {id:'d17', emoji:'🫘', name:'Lentilles corail',             qty:'1 × 450g',    cat:'Légumineuses',       date:'2028-02-06', note:''},
  {id:'d18', emoji:'🫘', name:'Pois chiches',                 qty:'1 × 265g',    cat:'Légumineuses',       date:'2029-01-01', note:''},
  {id:'d19', emoji:'🍫', name:'Pur cacao maigre',             qty:'1 × 200g',    cat:'Sucre & pâtisserie', date:'2029-01-23', note:''},
  {id:'d20', emoji:'🥖', name:'Gressins sésames',             qty:'1 × 168g',    cat:'Autre',              date:'2026-11-26', note:''},
  {id:'d21', emoji:'🫘', name:'Haricots blancs',              qty:'2 × 250g',    cat:'Légumineuses',       date:'2027-12-01', note:''},
  {id:'d22', emoji:'🌾', name:'Quinoa blond',                 qty:'1 × 450g',    cat:'Céréales',           date:'2027-08-23', note:''},
  {id:'d23', emoji:'🫙', name:'Sauce graine concentrée',      qty:'1 × 450g',    cat:'Sauces & condiments',date:'2026-06-01', note:''},
  {id:'d24', emoji:'🍞', name:'Chapelure de pain',            qty:'1 × 389g',    cat:'Autre',              date:'2027-05-01', note:''},
  {id:'d25', emoji:'🌱', name:'Sésame décortiqué',            qty:'1 × 250g',    cat:'Épices',             date:'2026-05-01', note:''},
  {id:'d26', emoji:'☕', name:'Chicorée',                     qty:'1 × 421g',    cat:'Boissons',           date:'2026-11-01', note:''},
  {id:'d27', emoji:'🍵', name:'Chai latte',                   qty:'6 sachets',   cat:'Boissons',           date:'2026-06-05', note:''},
  {id:'d28', emoji:'🍬', name:'Sucre roux en carré',          qty:'1 × 880g',    cat:'Sucre & pâtisserie', date:'',           note:''},
  {id:'d29', emoji:'🍒', name:'Cranberry séchée',             qty:'1 × 158g',    cat:'Autre',              date:'2026-03-29', note:''},
  {id:'d30', emoji:'🫙', name:'Levure boulangère',            qty:'7 × 7g',      cat:'Sucre & pâtisserie', date:'2027-01-01', note:''},
  {id:'d31', emoji:'🫙', name:'Levure chimique',              qty:'1 × 7g',      cat:'Sucre & pâtisserie', date:'2027-02-01', note:''},
  {id:'d32', emoji:'🍯', name:'Mélasse noire de canne',       qty:'1 × 450g',    cat:'Sucre & pâtisserie', date:'2027-11-30', note:''},
  {id:'d33', emoji:'🐟', name:"Thon émietté à l'eau",         qty:'3 × 100g',    cat:'Conserves',          date:'2029-09-30', note:''},
  {id:'d34', emoji:'🍯', name:'Miel',                         qty:'1 × 500g',    cat:'Sucre & pâtisserie', date:'',           note:''},
  {id:'d35', emoji:'🍯', name:"Sirop d'agave",                qty:'1 × 350g',    cat:'Sucre & pâtisserie', date:'2027-11-04', note:''},
  {id:'d36', emoji:'🥜', name:'Purée toastée amande',         qty:'1 × 170g',    cat:'Autre',              date:'2027-06-27', note:''},
  {id:'d37', emoji:'🍅', name:'Purée de tomate',              qty:'1 × 200g',    cat:'Conserves',          date:'2027-11-30', note:''},
  {id:'d38', emoji:'🍅', name:'Concentré de tomate',          qty:'1 × 140g',    cat:'Conserves',          date:'2027-02-27', note:''},
  {id:'d39', emoji:'🍫', name:'Nutella',                      qty:'—',           cat:'Sucre & pâtisserie', date:'',           note:''},
  {id:'d40', emoji:'🫘', name:'Haricot cornille sec',         qty:'1 × 1000g',   cat:'Légumineuses',       date:'',           note:''},
  {id:'d41', emoji:'🍿', name:'Maïs prêt à éclater',         qty:'1 × 1000g',   cat:'Autre',              date:'',           note:''},
  {id:'d42', emoji:'🌾', name:'Farine de manioc',             qty:'1 × 1000g',   cat:'Céréales',           date:'',           note:''},
  {id:'d43', emoji:'🌾', name:'Gari',                         qty:'—',           cat:'Céréales',           date:'',           note:''},
  {id:'d44', emoji:'🍪', name:'Spéculoos à tartiner',         qty:'1 × 250g',    cat:'Sucre & pâtisserie', date:'',           note:''},
  {id:'s1',  emoji:'🌶️', name:'Lemon pepper',                 qty:'1',           cat:'Épices',             date:'',           note:''},
  {id:'s2',  emoji:'🫚', name:"Huile d'olive",                qty:'—',           cat:'Huiles & graisses',  date:'',           note:''},
  {id:'s3',  emoji:'🌿', name:'Clou de girofle',              qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s4',  emoji:'🌶️', name:'Huile pimentée',               qty:'—',           cat:'Huiles & graisses',  date:'',           note:''},
  {id:'s5',  emoji:'🫙', name:"Vinaigre d'alcool",            qty:'—',           cat:'Sauces & condiments',date:'',           note:''},
  {id:'s6',  emoji:'🧄', name:'Poudre fine ail',              qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s7',  emoji:'🫙', name:'Bouillon de volaille Knorr',   qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s8',  emoji:'🧂', name:'Poivre gris moulu',            qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s9',  emoji:'🧂', name:'Poivre rouge Kampot',          qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s10', emoji:'🧂', name:'Poivre noir en grain',         qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s11', emoji:'🧂', name:'Poivre cinq grains',           qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s12', emoji:'🌿', name:'Coriandre',                    qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s13', emoji:'🌿', name:'Muscade en poudre',            qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s14', emoji:'🌿', name:'Cannelle',                     qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s15', emoji:'🌿', name:'Curcuma moulu',                qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s16', emoji:'🌿', name:'Mélange italienne',            qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s17', emoji:'🌿', name:'Herbes de Provence',           qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s18', emoji:'🌿', name:'Origan',                       qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s19', emoji:'🌶️', name:'Paprika fumé',                 qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s20', emoji:'🌿', name:'Cumin',                        qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s21', emoji:'🌿', name:'Menthe douce',                 qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s22', emoji:'🌿', name:'Curry',                        qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s23', emoji:'🌿', name:'Ras el hanout',                qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s24', emoji:'🌿', name:'Dashi poudre',                 qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s25', emoji:'🫙', name:'Crème de basilic',             qty:'—',           cat:'Sauces & condiments',date:'2027-02-07', note:''},
  {id:'s26', emoji:'🫙', name:'Vinaigre balsamique',          qty:'—',           cat:'Sauces & condiments',date:'2027-04-09', note:''},
  {id:'s27', emoji:'🫙', name:'Arôme Maggi liquide',          qty:'—',           cat:'Sauces & condiments',date:'2027-06-01', note:''},
  {id:'s28', emoji:'🫙', name:'Sauce soja',                   qty:'—',           cat:'Sauces & condiments',date:'2027-09-14', note:''},
  {id:'s29', emoji:'🌿', name:'Feuille de laurier',           qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s30', emoji:'🌿', name:'Branche de Provence',          qty:'—',           cat:'Épices',             date:'',           note:''},
  {id:'s31', emoji:'🫙', name:'Cube bouillon végétal',        qty:'—',           cat:'Épices',             date:'',           note:''},
];

const CATS = ['Tous','Féculents','Légumineuses','Conserves','Épices','Sauces & condiments','Céréales','Sucre & pâtisserie','Huiles & graisses','Boissons','Autre'];
const EMOJIS = ['🌾','🍚','🍝','🥫','🫘','🧅','🧄','🫙','🧂','🌶️','🫚','🥚','🧈','🍯','🍵','☕','🫖','🥤','🍫','🍪','🧁','🍞','🥐','🌿','🫛','🌰','🥜','🍋','🧃','🫒','🥗','🍲','🍜','🥘','🍱','🎂','🍰','🍿','🌱','🐟','🍅','🍒'];

// Plan recalibré — objectif : tonification, perte de gras légère
// Cibles : ~1600-1700 kcal/j · ~110-120g protéines · ~28g fibres · Lidl/Aldi budget étudiant
const PLAN = [
  { day:'Lun', label:'Lundi', meals:[
    { type:'Petit-déj', name:"Porridge avoine banane cannelle", time:'8 min', kcal:350, p:14, g:52, f:6,
      ingredients:[{n:"Flocons d'avoine",q:'70g'},{n:'Lait demi-écrémé ou végétal',q:'200ml'},{n:'Banane',q:'½'},{n:'Cannelle',q:'1 pincée'},{n:'Graines de chia',q:'1 cc'}],
      steps:["Chauffer lait","Ajouter flocons, cuire 4 min","Trancher ½ banane","Cannelle + graines de chia"] },
    { type:'Collation post-pilates 💪', name:"Fromage blanc + banane", time:'2 min', kcal:200, p:22, g:24, f:2,
      ingredients:[{n:'Fromage blanc 0%',q:'200g'},{n:'Banane',q:'½'},{n:'Miel',q:'1 cc'}],
      steps:["Fromage blanc dans un bol","Trancher ½ banane","Filet de miel — à manger dans l'heure après la séance"] },
    { type:'Déjeuner', name:"Riz complet · 3 œufs · carottes · épinards", time:'20 min', kcal:480, p:30, g:48, f:10,
      ingredients:[{n:'Riz complet',q:'70g sec'},{n:'Œufs',q:'3'},{n:'Carottes',q:'2'},{n:'Épinards surgelés',q:'100g'},{n:"Huile d'olive",q:'1 cs'},{n:'Citron',q:'½'}],
      steps:["Cuire riz 18 min","Cuire œufs durs 9 min","Décongeler épinards à la poêle","Râper carottes + citron + huile","Dresser ensemble"] },
    { type:'Dîner', name:"Dahl lentilles corail épinards", time:'20 min', kcal:400, p:24, g:45, f:11,
      ingredients:[{n:'Lentilles corail',q:'90g'},{n:'Lait de coco',q:'150ml'},{n:'Épinards surgelés',q:'150g'},{n:'Cumin',q:'1 cc'},{n:'Oignon',q:'1'},{n:'Ail',q:'2 gousses'}],
      steps:["Faire revenir oignon + ail 3 min","Lentilles + lait coco + 200ml eau","Cuire 15 min","Épinards + cumin + sel","Cuire 3 min"] },
  ]},
  { day:'Mar', label:'Mardi', meals:[
    { type:'Petit-déj', name:"Flocons avoine pomme peanut butter", time:'5 min', kcal:360, p:15, g:50, f:7,
      ingredients:[{n:"Flocons d'avoine",q:'70g'},{n:'Lait demi-écrémé ou végétal',q:'180ml'},{n:'Pomme',q:'½'},{n:'Beurre de cacahuète',q:'1 cs'},{n:'Cannelle',q:'1 pincée'}],
      steps:["Chauffer lait, ajouter flocons 4 min","Râper la pomme","Beurre de cacahuète + cannelle"] },
    { type:'Collation post-pilates 💪', name:"2 œufs durs + pomme", time:'5 min', kcal:190, p:18, g:18, f:3,
      ingredients:[{n:'Œufs',q:'2'},{n:'Pomme',q:'½'}],
      steps:["Œufs durs préparés à l'avance","Sel, poivre","Pomme à côté — dans l'heure après séance"] },
    { type:'Déjeuner', name:"Salade pâtes thon tomates maïs", time:'15 min', kcal:460, p:32, g:52, f:8,
      ingredients:[{n:'Penne rigate',q:'70g sec'},{n:"Thon émietté à l'eau",q:'1 boîte 120g'},{n:'Tomates',q:'2'},{n:'Maïs en boîte',q:'3 cs'},{n:"Huile d'olive",q:'1 cs'},{n:'Vinaigre balsamique',q:'1 cc'}],
      steps:["Cuire pâtes al dente, refroidir","Couper tomates, égoutter thon + maïs","Mélanger","Huile + vinaigre + sel + poivre"] },
    { type:'Dîner', name:"Patate douce rôtie · 2 œufs · épinards", time:'30 min', kcal:390, p:22, g:42, f:9,
      ingredients:[{n:'Patate douce',q:'250g'},{n:'Œufs',q:'2'},{n:'Épinards surgelés',q:'150g'},{n:"Huile d'olive",q:'1 cs'},{n:'Paprika fumé',q:'1 cc'}],
      steps:["Four 200°C — cubes patate + huile + paprika → 25 min","Épinards à la poêle","Œufs brouillés","Assembler"] },
  ]},
  { day:'Mer', label:'Mercredi', meals:[
    { type:'Petit-déj', name:"Pain complet · œuf · fromage blanc", time:'8 min', kcal:320, p:22, g:32, f:5,
      ingredients:[{n:'Pain complet',q:'2 tranches'},{n:'Œufs',q:'1'},{n:'Fromage blanc 0%',q:'100g'},{n:'Miel',q:'1 cc'}],
      steps:["Cuire œuf à la coque 6 min","Toaster le pain","Fromage blanc + miel à côté"] },
    { type:'Collation post-pilates 💪', name:"Fromage blanc + flocons + miel", time:'2 min', kcal:195, p:20, g:22, f:2,
      ingredients:[{n:'Fromage blanc 0%',q:'150g'},{n:"Flocons d'avoine",q:'20g'},{n:'Miel',q:'1 cc'}],
      steps:["Mélanger fromage blanc + flocons + miel","Dans l'heure après la séance"] },
    { type:'Déjeuner', name:"Soupe carottes lentilles vertes", time:'25 min', kcal:370, p:20, g:48, f:12,
      ingredients:[{n:'Carottes',q:'3'},{n:'Lentilles vertes',q:'80g sec'},{n:'Oignon',q:'1'},{n:'Cumin',q:'1 cc'},{n:'Cube bouillon végétal',q:'1'},{n:'Ail',q:'2 gousses'}],
      steps:["Faire revenir oignon + ail 3 min","Carottes + lentilles + bouillon + eau","Cuire 20 min","Mixer partiellement","Cumin + sel + poivre"] },
    { type:'Dîner', name:"Poulet poêlé riz haricots rouges", time:'20 min', kcal:470, p:38, g:48, f:9,
      ingredients:[{n:'Blanc de poulet',q:'160g'},{n:'Riz',q:'70g sec'},{n:'Haricots rouges en boîte',q:'½ boîte'},{n:"Huile d'olive",q:'1 cs'},{n:'Paprika fumé',q:'1 cc'},{n:'Ail',q:'1 gousse'}],
      steps:["Cuire riz","Poulet en morceaux → poêle + paprika + ail 8 min","Haricots rouges égouttés 2 min","Dresser"] },
  ]},
  { day:'Jeu', label:'Jeudi', meals:[
    { type:'Petit-déj', name:"Overnight oats banane peanut butter", time:'2 min (veille)', kcal:370, p:16, g:52, f:7,
      ingredients:[{n:"Flocons d'avoine",q:'70g'},{n:'Lait demi-écrémé ou végétal',q:'170ml'},{n:'Banane',q:'½'},{n:'Beurre de cacahuète',q:'1 cs'},{n:'Miel',q:'1 cc'}],
      steps:["La veille : flocons + lait + miel dans bocal → frigo","Le matin : ½ banane + beurre de cacahuète","Manger froid ou réchauffer 1 min"] },
    { type:'Collation post-pilates 💪', name:"Thon + carottes bâtonnets", time:'3 min', kcal:180, p:24, g:8, f:4,
      ingredients:[{n:"Thon émietté à l'eau",q:'½ boîte'},{n:'Carottes',q:'2'},{n:'Citron',q:'qlq gouttes'}],
      steps:["Carottes en bâtonnets","Thon égoutté + citron + poivre","Dans l'heure après séance"] },
    { type:'Déjeuner', name:"Salade pois chiches tomates concombre", time:'10 min', kcal:420, p:20, g:48, f:13,
      ingredients:[{n:'Pois chiches en boîte',q:'½ boîte'},{n:'Tomates',q:'2'},{n:'Concombre',q:'½'},{n:'Oignon rouge',q:'¼'},{n:"Huile d'olive",q:'1 cs'},{n:'Citron',q:'½'},{n:'Cumin',q:'½ cc'}],
      steps:["Égoutter pois chiches","Couper tomates + concombre en dés","Émincer oignon rouge","Mélanger + huile + citron + cumin + sel"] },
    { type:'Dîner', name:"Spaghetti bolognaise lentilles", time:'25 min', kcal:450, p:26, g:60, f:12,
      ingredients:[{n:'Spaghetti',q:'70g sec'},{n:'Lentilles vertes cuites',q:'100g'},{n:'Purée de tomate',q:'½ boîte'},{n:'Oignon',q:'1'},{n:'Ail',q:'2 gousses'},{n:'Herbes de Provence',q:'1 cc'}],
      steps:["Cuire spaghetti","Oignon + ail 3 min","Purée tomate + lentilles + herbes → 8 min","Mélanger avec pâtes"] },
  ]},
  { day:'Ven', label:'Vendredi', meals:[
    { type:'Petit-déj', name:"Fromage blanc fruits frais flocons", time:'3 min', kcal:300, p:20, g:38, f:5,
      ingredients:[{n:'Fromage blanc 0%',q:'200g'},{n:'Banane',q:'½'},{n:'Pomme',q:'½'},{n:'Miel',q:'1 cc'},{n:"Flocons d'avoine",q:'2 cs'}],
      steps:["Fromage blanc dans un bol","Fruits coupés en morceaux","Flocons + miel"] },
    { type:'Collation post-pilates 💪', name:"2 œufs durs + pomme", time:'5 min', kcal:190, p:18, g:18, f:3,
      ingredients:[{n:'Œufs',q:'2'},{n:'Pomme',q:'½'}],
      steps:["Œufs durs à l'avance","Sel, poivre — dans l'heure après séance"] },
    { type:'Déjeuner', name:"Riz complet · thon · maïs · avocat", time:'15 min', kcal:470, p:30, g:46, f:8,
      ingredients:[{n:'Riz complet',q:'70g sec'},{n:"Thon émietté à l'eau",q:'1 boîte'},{n:'Maïs en boîte',q:'3 cs'},{n:'Avocat',q:'½'},{n:"Huile d'olive",q:'1 cs'},{n:'Citron',q:'½'}],
      steps:["Cuire riz","Égoutter thon + maïs","Trancher avocat","Dresser + huile + citron + sel"] },
    { type:'Dîner', name:"Curry pois chiches épinards riz", time:'20 min', kcal:420, p:20, g:54, f:12,
      ingredients:[{n:'Pois chiches en boîte',q:'1 boîte'},{n:'Lait de coco',q:'150ml'},{n:'Épinards surgelés',q:'150g'},{n:'Riz',q:'60g sec'},{n:'Curry',q:'2 cc'},{n:'Concentré de tomate',q:'1 cs'},{n:'Oignon',q:'1'}],
      steps:["Cuire riz","Oignon 3 min","Pois chiches + curry + concentré tomate","Lait coco → 10 min","Épinards 3 min, servir sur riz"] },
  ]},
  { day:'Sam', label:'Samedi', meals:[
    { type:'Petit-déj', name:"Pancakes avoine œuf banane", time:'15 min', kcal:360, p:16, g:50, f:6,
      ingredients:[{n:"Flocons d'avoine",q:'70g mixés'},{n:'Lait demi-écrémé ou végétal',q:'130ml'},{n:'Œufs',q:'1'},{n:'Banane',q:'½'},{n:'Miel',q:'1 cs'}],
      steps:["Mixer flocons en farine","Farine + lait + œuf + sel","Écraser ½ banane dans la pâte","Cuire 2 min/côté","Miel + rondelles de banane"] },
    { type:'Déjeuner', name:"Haricots blancs courgette couscous", time:'25 min', kcal:420, p:20, g:58, f:14,
      ingredients:[{n:'Couscous',q:'70g sec'},{n:'Haricots blancs en boîte',q:'½ boîte'},{n:'Courgette',q:'1'},{n:'Poivron',q:'1'},{n:"Huile d'olive",q:'1 cs'},{n:'Herbes de Provence',q:'1 cc'}],
      steps:["Four 200°C — légumes + huile + herbes → 20 min","Couscous (eau bouillante, 5 min)","Mélanger couscous + haricots + légumes","Sel, poivre, citron"] },
    { type:'Dîner', name:"Sardines pommes de terre épinards", time:'20 min', kcal:420, p:30, g:35, f:8,
      ingredients:[{n:'Sardines en boîte à la tomate',q:'1 boîte'},{n:'Pommes de terre',q:'250g'},{n:'Épinards surgelés',q:'150g'},{n:"Huile d'olive",q:'1 cs'},{n:'Ail',q:'1 gousse'}],
      steps:["Pommes de terre rondelles → poêle + ail 15 min","Épinards 5 min","Sardines réchauffées doucement","Dresser ensemble"] },
  ]},
  { day:'Dim', label:'Dimanche', meals:[
    { type:'Petit-déj', name:"Toast pain complet · œuf · fromage blanc", time:'8 min', kcal:330, p:22, g:34, f:5,
      ingredients:[{n:'Pain complet',q:'2 tranches'},{n:'Œufs',q:'1'},{n:'Fromage blanc 0%',q:'100g'},{n:'Miel',q:'1 cc'},{n:'Pomme',q:'½'}],
      steps:["Cuire œuf au plat","Toaster le pain","Fromage blanc + miel","Pomme à côté"] },
    { type:'Déjeuner', name:"Mujadara riz lentilles carottes", time:'25 min', kcal:420, p:20, g:60, f:13,
      ingredients:[{n:'Riz',q:'60g sec'},{n:'Lentilles corail',q:'60g'},{n:'Carottes',q:'2'},{n:'Oignon',q:'1'},{n:'Cumin',q:'1 cc'},{n:'Curcuma moulu',q:'½ cc'},{n:"Huile d'olive",q:'1 cs'}],
      steps:["Dorer oignon dans huile 8 min","Carottes râpées + cumin + curcuma 3 min","Riz + lentilles + 400ml eau","Cuire 15 min couvert","Sel, poivre"] },
    { type:'Dîner', name:"Soupe poireaux pommes de terre · œuf poché", time:'25 min', kcal:340, p:20, g:38, f:7,
      ingredients:[{n:'Poireaux',q:'2'},{n:'Pommes de terre',q:'200g'},{n:'Oignon',q:'1'},{n:'Cube bouillon végétal',q:'1'},{n:'Œufs',q:'1'},{n:"Huile d'olive",q:'1 cs'}],
      steps:["Poireaux + oignon → 5 min","Pommes de terre + bouillon + 600ml eau → 18 min","Mixer partiellement","Pocher un œuf 3 min","Servir soupe + œuf poché dessus"] },
  ]},
];

function daysUntil(d) { if(!d)return null; const now=new Date();now.setHours(0,0,0,0);return Math.ceil((new Date(d)-now)/86400000); }
function fmtDate(d) { if(!d)return'';return new Date(d).toLocaleDateString('fr-FR',{day:'numeric',month:'short',year:'numeric'}); }
function getStatus(days) { if(days===null)return'good';if(days<0)return'expired';if(days<=7)return'expiring';return'good'; }
function uid() { return Date.now().toString(36)+Math.random().toString(36).slice(2); }

function getIngType(name) {
  const n=name.toLowerCase();
  if(/surgelé|surgelée/.test(n))return'frozen';
  if(/avocat|banane|kiwi|mangue(?! surgel)|pomme|citron|tomate(?! concentr|! purée)|laitue|courgette|aubergine|concombre|champignon|asperge(?! surgel)|poivron(?! surgel)|brocoli(?! surgel)|épinard(?! surgel)|haricot vert(?! surgel)|potiron(?! surgel)|carotte|oignon|ail(?! poudre)|gingembre(?! poudre)|pain(?! longue)|poulet(?! surgel)|saumon(?! surgel)|cabillaud(?! surgel)|œuf|oeuf|tofu(?! surgel)|fruits rouges(?! surgel)/.test(n))return'fresh';
  return'dry';
}

function smartQty(name) {
  const n=name.toLowerCase();
  // Fruits frais — petites quantités, consommation rapide
  if(/avocat/.test(n))return'2 (mûrs)';
  if(/banane/.test(n))return'1 régime (~6)';
  if(/citron/.test(n))return'1 filet de 4';
  if(/pomme/.test(n))return'1 sac 1kg (~6 pommes)';
  if(/poire/.test(n))return'4';
  if(/orange|clémentine|mandarine/.test(n))return'1 filet';
  // Légumes frais — dispo partout, pas cher
  if(/carotte/.test(n))return'1 sac 1kg';
  if(/oignon(?! rouge)/.test(n))return'1 filet 1kg';
  if(/oignon rouge/.test(n))return'2';
  if(/ail/.test(n))return'1 tête';
  if(/poireau/.test(n))return'1 botte (3–4 poireaux)';
  if(/courgette/.test(n))return'3';
  if(/tomate(?! concentr|purée)/.test(n))return'1 barquette 500g ou 4 tomates';
  if(/concombre/.test(n))return'1';
  if(/poivron/.test(n))return'2 (ou 1 sac surgelé Lidl 🧊)';
  if(/champignon/.test(n))return'1 barquette 250g';
  if(/pomme de terre/.test(n))return'1 sac 1.5kg';
  if(/patate douce/.test(n))return'1 kg (rayon exotique Lidl)';
  // Légumes surgelés — Lidl en a bien
  if(/épinard/.test(n))return'1 sac surgelé 600g (Lidl) 🧊';
  if(/haricot vert/.test(n))return'1 sac surgelé 600g 🧊';
  if(/brocoli/.test(n))return'1 sac surgelé 600g 🧊';
  if(/mélange légumes|poêlée/.test(n))return'1 sac surgelé 750g 🧊';
  // Protéines accessibles
  if(/blanc de poulet|filet de poulet/.test(n))return'600g (barquette Lidl ~3€)';
  if(/sardine/.test(n))return'2 boîtes';
  if(/thon/.test(n))return'4 boîtes ×120g';
  if(/œuf|oeuf/.test(n))return'1 boîte ×12 (~2€ Lidl)';
  if(/fromage blanc/.test(n))return'1 pot 500g';
  if(/lait(?! coco)/.test(n))return'1L (ou brique végétale)';
  // Légumineuses sec/boîte
  if(/lentilles corail/.test(n))return'1 paquet 500g';
  if(/lentilles vertes/.test(n))return'1 paquet 500g';
  if(/pois chiches/.test(n))return'2 boîtes ×400g';
  if(/haricots rouges/.test(n))return'2 boîtes ×400g';
  if(/haricots blancs/.test(n))return'2 boîtes ×400g';
  // Féculents
  if(/riz complet/.test(n))return'1 kg';
  if(/riz(?! complet)/.test(n))return'1 kg';
  if(/pâtes|spaghetti|penne|coquillettes/.test(n))return'1 kg';
  if(/couscous/.test(n))return'1 paquet 500g';
  // Conserves / sauces
  if(/purée de tomate|tomates concassées/.test(n))return'2 briques 500g';
  if(/concentré de tomate/.test(n))return'1 tube 100g';
  if(/lait de coco/.test(n))return'2 boîtes 400ml (Lidl ~1€/boîte)';
  if(/maïs/.test(n))return'1 boîte ×285g';
  // Beurre de cacahuète — star budget
  if(/beurre de cacahuète|peanut butter/.test(n))return'1 pot 340g (Lidl ~2€)';
  if(/miel/.test(n))return'1 pot 250g';
  if(/beurre(?! cacahuète)/.test(n))return'1 plaquette 250g';
  if(/pain complet/.test(n))return'1 miche ou sachet tranches';
  if(/cube bouillon/.test(n))return'1 boîte (Knorr ou MDD)';
  return'1 unité';
}

const C={
  bg:'#0d1117',
  surface:'#161b22',
  card:'#1c2230',
  border:'#253045',
  accent:'#ff6b6b',      // corail vif
  accent2:'#ffd93d',     // jaune soleil
  accent3:'#6bcb77',     // vert menthe
  accent4:'#4d96ff',     // bleu électrique
  danger:'#ff4757',
  warn:'#ffa502',
  text:'#e8edf5',
  dim:'#8892a4',
  muted:'#3d4d63'
};

const S={
  app:{background:C.bg,minHeight:'100vh',color:C.text,fontFamily:'-apple-system,Helvetica Neue,Arial,sans-serif',fontSize:15},
  header:{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:'14px 18px 0',position:'sticky',top:0,zIndex:100},
  tabs:{display:'flex',overflowX:'auto',scrollbarWidth:'none'},
  tab:(a)=>({background:'none',border:'none',cursor:'pointer',color:a?C.accent:C.dim,fontWeight:700,fontSize:12,padding:'10px 13px',borderBottom:a?`2px solid ${C.accent}`:'2px solid transparent',whiteSpace:'nowrap',textTransform:'uppercase',letterSpacing:.5}),
  content:{padding:'14px 14px 100px',maxWidth:500,margin:'0 auto'},
  title:{fontWeight:800,fontSize:18,marginBottom:12},
  itemCard:(s)=>({background:C.card,border:`1px solid ${C.border}`,borderLeft:`3px solid ${s==='expired'?C.danger:s==='expiring'?C.warn:C.accent3}`,borderRadius:14,padding:'11px 13px',marginBottom:7,display:'flex',alignItems:'center',gap:11,cursor:'pointer'}),
  badge:(t)=>({fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:20,background:t==='danger'?'rgba(255,71,87,.18)':t==='warn'?'rgba(255,165,2,.18)':'rgba(107,203,119,.18)',color:t==='danger'?C.danger:t==='warn'?C.warn:C.accent3,flexShrink:0}),
  chip:(a,col)=>({background:a?`rgba(${col||'255,107,107'},.15)`:C.surface,border:a?`1px solid rgba(${col||'255,107,107'},.5)`:`1px solid ${C.border}`,borderRadius:20,padding:'5px 12px',fontSize:12,color:a?(col?`rgb(${col})`:C.accent):C.dim,cursor:'pointer',whiteSpace:'nowrap',fontWeight:a?700:400,flexShrink:0}),
  input:{width:'100%',background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:'11px 13px',color:C.text,fontSize:15,outline:'none',WebkitAppearance:'none'},
  overlay:{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,.88)',backdropFilter:'blur(6px)',display:'flex',alignItems:'flex-end'},
  modal:{background:C.surface,borderRadius:'24px 24px 0 0',border:`1px solid ${C.border}`,padding:'20px 18px 44px',width:'100%',maxWidth:500,margin:'0 auto',maxHeight:'92vh',overflowY:'auto'},
  handle:{width:40,height:4,background:C.border,borderRadius:2,margin:'0 auto 16px'},
  btnY:(p)=>({background:`linear-gradient(135deg,${C.accent},#ff8e53)`,color:'#fff',border:'none',borderRadius:12,padding:p||'9px 16px',fontWeight:800,fontSize:14,cursor:'pointer'}),
  btnG:{background:C.card,border:`1px solid ${C.border}`,color:C.dim,borderRadius:12,padding:'9px 14px',fontWeight:700,fontSize:13,cursor:'pointer'},
  btnR:{background:'rgba(255,71,87,.12)',border:'1px solid rgba(255,71,87,.25)',color:C.danger,borderRadius:12,padding:'9px 14px',fontWeight:700,fontSize:13,cursor:'pointer'},
  label:{fontSize:11,fontWeight:600,color:C.dim,textTransform:'uppercase',letterSpacing:.5,display:'block',marginBottom:5},
};

function EmojiPicker({value,onChange}){
  return <div style={{display:'grid',gridTemplateColumns:'repeat(8,1fr)',gap:5,marginTop:5}}>
    {EMOJIS.map(e=><button key={e} onClick={()=>onChange(e)} style={{background:e===value?`rgba(255,107,107,.2)`:C.card,border:e===value?`1px solid ${C.accent}`:`1px solid ${C.border}`,borderRadius:8,padding:5,fontSize:17,cursor:'pointer'}}>{e}</button>)}
  </div>;
}

function ItemModal({item,onSave,onDelete,onClose}){
  const isNew=!item.id;
  const[f,setF]=useState({emoji:item.emoji||'🥫',name:item.name||'',qty:item.qty||'',cat:item.cat||'Féculents',date:item.date||'',note:item.note||''});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  return <div style={S.overlay} onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div style={S.modal}>
      <div style={S.handle}/>
      <div style={{fontWeight:800,fontSize:17,marginBottom:14}}>{isNew?'Ajouter':'Modifier'}</div>
      <label style={S.label}>Emoji</label>
      <EmojiPicker value={f.emoji} onChange={v=>set('emoji',v)}/>
      <div style={{marginTop:12}}><label style={S.label}>Nom</label><input style={S.input} value={f.name} onChange={e=>set('name',e.target.value)} placeholder="ex: Lentilles corail"/></div>
      <div style={{display:'flex',gap:10,marginTop:12}}>
        <div style={{flex:1}}><label style={S.label}>Quantité</label><input style={S.input} value={f.qty} onChange={e=>set('qty',e.target.value)}/></div>
        <div style={{flex:1}}><label style={S.label}>Catégorie</label>
          <select style={S.input} value={f.cat} onChange={e=>set('cat',e.target.value)}>
            {CATS.filter(c=>c!=='Tous').map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div style={{marginTop:12}}><label style={S.label}>Date péremption</label><input type="date" style={S.input} value={f.date} onChange={e=>set('date',e.target.value)}/></div>
      <div style={{marginTop:12}}><label style={S.label}>Notes</label><input style={S.input} value={f.note} onChange={e=>set('note',e.target.value)} placeholder="ex: Ouvert"/></div>
      <div style={{display:'flex',gap:8,marginTop:16}}>
        {!isNew&&<button style={S.btnR} onClick={()=>onDelete(item.id)}>Supprimer</button>}
        <button style={S.btnG} onClick={onClose}>Annuler</button>
        <button style={{...S.btnY(),flex:1,padding:'9px 0'}} onClick={()=>{if(!f.name.trim())return;onSave({...item,...f,id:item.id||uid()});}}>Enregistrer</button>
      </div>
    </div>
  </div>;
}

function RecipeModal({meal,stockNames,onClose}){
  function inS(n){return stockNames.some(s=>s.includes(n.toLowerCase().split(' ')[0])||n.toLowerCase().includes(s));}
  const has=meal.ingredients.filter(i=>inS(i.n)).length;
  return <div style={S.overlay} onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div style={S.modal}>
      <div style={S.handle}/>
      <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:1,color:C.accent,marginBottom:5}}>{meal.type}</div>
      <div style={{fontWeight:800,fontSize:18,marginBottom:14,lineHeight:1.3}}>{meal.name}</div>
      {/* Macros */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:7,marginBottom:18}}>
        {[[meal.time,'⏱','TEMPS',C.accent],[meal.kcal+' kcal','🔥','ÉNERGIE',C.accent3],[meal.p+'g','💪','PROT.',C.accent2],[`${meal.g}g/${meal.f}g`,'🌾','G / L',C.dim]].map(([v,e,l,col])=>(
          <div key={l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:'8px 6px',textAlign:'center'}}>
            <div style={{fontSize:10,marginBottom:3}}>{e}</div>
            <div style={{fontWeight:800,fontSize:13,color:col,lineHeight:1}}>{v}</div>
            <div style={{fontSize:9,color:C.muted,marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>
      {/* Ingrédients */}
      <div style={{fontWeight:800,fontSize:14,marginBottom:9}}>Ingrédients <span style={{fontWeight:400,fontSize:12,color:C.dim}}>— {has}/{meal.ingredients.length} en stock</span></div>
      {meal.ingredients.map((ing,i)=>{
        const h=inS(ing.n);
        return <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:`1px solid ${C.border}`}}>
          <span style={{fontSize:16,flexShrink:0,width:22,textAlign:'center'}}>{h?'✅':'🛒'}</span>
          <div style={{flex:1}}><span style={{fontSize:13,fontWeight:600,color:h?C.text:C.dim}}>{ing.n}</span><span style={{fontSize:12,color:C.muted,marginLeft:8}}>{ing.q}</span></div>
          {!h&&<span style={{fontSize:10,color:C.accent2,background:'rgba(212,132,90,.1)',padding:'2px 8px',borderRadius:20,flexShrink:0}}>à acheter</span>}
        </div>;
      })}
      {/* Étapes */}
      <div style={{fontWeight:800,fontSize:14,margin:'16px 0 10px'}}>Préparation</div>
      {meal.steps.map((step,i)=>(
        <div key={i} style={{display:'flex',gap:11,marginBottom:11,alignItems:'flex-start'}}>
          <div style={{width:24,height:24,background:C.accent,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:12,color:'#0f0e0c',flexShrink:0,marginTop:1}}>{i+1}</div>
          <div style={{fontSize:13,color:C.text,lineHeight:1.55,flex:1}}>{step}</div>
        </div>
      ))}
      <button style={{...S.btnG,width:'100%',marginTop:16,padding:'12px',textAlign:'center'}} onClick={onClose}>Fermer</button>
    </div>
  </div>;
}

function ConfirmStockModal({meal,items,onConfirm,onSkip,onClose}){
  const toUpdate=meal.ingredients.filter(ing=>{
    const n=ing.n.toLowerCase();
    return items.some(it=>it.name.toLowerCase().includes(n.split(' ')[0])||n.includes(it.name.toLowerCase()));
  });
  if(toUpdate.length===0){onSkip();return null;}
  return <div style={S.overlay} onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div style={S.modal}>
      <div style={S.handle}/>
      <div style={{fontWeight:800,fontSize:16,marginBottom:6}}>Mettre à jour le stock ?</div>
      <div style={{fontSize:13,color:C.dim,marginBottom:14}}>Ces ingrédients de ton stock ont été utilisés :</div>
      {toUpdate.map((ing,i)=>(
        <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:`1px solid ${C.border}`}}>
          <span style={{fontSize:18}}>📦</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{ing.n}</div><div style={{fontSize:12,color:C.dim}}>Utilisé : {ing.q}</div></div>
        </div>
      ))}
      <div style={{fontSize:12,color:C.dim,margin:'12px 0 16px',background:'rgba(232,197,71,.05)',border:`1px solid rgba(232,197,71,.1)`,borderRadius:10,padding:10}}>
        ℹ️ Les items seront marqués "utilisé récemment" — mets à jour la quantité manuellement si besoin.
      </div>
      <div style={{display:'flex',gap:8}}>
        <button style={{...S.btnG,flex:1,padding:'11px',textAlign:'center'}} onClick={onSkip}>Non merci</button>
        <button style={{...S.btnY(),flex:1,padding:'11px',textAlign:'center'}} onClick={onConfirm}>Oui ✓</button>
      </div>
    </div>
  </div>;
}

export default function App(){
  const[tab,setTab]=useState('stock');
  const[items,setItems]=useState(null);
  const[courses,setCourses]=useState(null);
  const[planChecked,setPlanChecked]=useState(null);
  const[loading,setLoading]=useState(true);
  const[modal,setModal]=useState(null);
  const[recipeModal,setRecipeModal]=useState(null);
  const[confirmModal,setConfirmModal]=useState(null);
  const[filter,setFilter]=useState('Tous');
  const[search,setSearch]=useState('');
  const[activePrefs,setActivePrefs]=useState(new Set(['rapide']));
  const[recipeText,setRecipeText]=useState('');
  const[recipeLoading,setRecipeLoading]=useState(false);
  const[newCourse,setNewCourse]=useState('');
  const[cTab,setCTab]=useState('monthly');
  const[activePlanDay,setActivePlanDay]=useState(()=>{const d=new Date().getDay();return d===0?6:d-1;});
  const[chatMessages,setChatMessages]=useState([{role:'assistant',text:'Dis-moi comment modifier tes listes ! Ex : "remplace le poulet par des œufs", "ajoute des snacks sains", "enlève les produits lactés"…'}]);
  const[chatInput,setChatInput]=useState('');
  const[chatLoading,setChatLoading]=useState(false);
  const[chatOpen,setChatOpen]=useState(false);

  useEffect(()=>{
    try{
      const si=localStorage.getItem('gm_items');
      const sc=localStorage.getItem('gm_courses');
      const sp=localStorage.getItem('gm_plan');
      setItems(si?JSON.parse(si):DEFAULT_ITEMS.map(i=>({...i})));
      const rawC=sc?JSON.parse(sc):null;
      setCourses(rawC&&rawC.monthly?rawC:{monthly:[],weekly:[]});
      setPlanChecked(sp?JSON.parse(sp):{});
    }catch{
      setItems(DEFAULT_ITEMS.map(i=>({...i})));
      setCourses({monthly:[],weekly:[]});
      setPlanChecked({});
    }
    setLoading(false);
  },[]);

  const saveItems=useCallback(n=>{setItems(n);try{localStorage.setItem('gm_items',JSON.stringify(n));}catch{}},[]);
  const saveCourses=useCallback(n=>{setCourses(n);try{localStorage.setItem('gm_courses',JSON.stringify(n));}catch{}},[]);
  const savePlan=useCallback(n=>{setPlanChecked(n);try{localStorage.setItem('gm_plan',JSON.stringify(n));}catch{}},[]);

  if(loading||!items)return(
    <div style={{...S.app,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16}}>
      <div style={{fontSize:40}}>🥬</div><div style={{color:C.dim,fontSize:14}}>Chargement…</div>
    </div>
  );

  const stockNames=items.map(i=>i.name.toLowerCase());
  function inS(n){return stockNames.some(s=>s.includes(n.toLowerCase().split(' ')[0])||n.toLowerCase().includes(s));}

  const stats=items.reduce((a,i)=>{const s=getStatus(daysUntil(i.date));a[s]=(a[s]||0)+1;return a;},{});
  const filtered=items.filter(i=>(filter==='Tous'||i.cat===filter)&&i.name.toLowerCase().includes(search.toLowerCase()));
  const grouped=filtered.reduce((g,i)=>{(g[i.cat]=g[i.cat]||[]).push(i);return g;},{});
  const expired=items.filter(i=>{const d=daysUntil(i.date);return d!==null&&d<0;});
  const expiring=items.filter(i=>{const d=daysUntil(i.date);return d!==null&&d>=0&&d<=7;});
  const totalMeals=PLAN.reduce((a,d)=>a+d.meals.length,0);
  const doneMeals=Object.values(planChecked).filter(Boolean).length;
  const planPct=Math.round(doneMeals/totalMeals*100);
  const monthlyList=Array.isArray(courses?.monthly)?courses.monthly:[];
  const weeklyList=Array.isArray(courses?.weekly)?courses.weekly:[];

  function buildShoppingLists(){
    const missing=new Set();
    PLAN.forEach(d=>d.meals.forEach(m=>m.ingredients.forEach(ing=>{if(!inS(ing.n))missing.add(ing.n);})));
    const monthly=[...monthlyList];
    const weekly=[...weeklyList];
    missing.forEach(name=>{
      const type=getIngType(name);
      const qty=smartQty(name);
      const entry={id:uid(),name:`${name} — ${qty}`,checked:false};
      if(type==='fresh'){if(!weekly.find(c=>c.name.toLowerCase().startsWith(name.toLowerCase())))weekly.push(entry);}
      else{if(!monthly.find(c=>c.name.toLowerCase().startsWith(name.toLowerCase())))monthly.push(entry);}
    });
    saveCourses({monthly,weekly});
    setTab('courses');
  }

  function handleMealCheck(dayIdx,mealIdx){
    const key=`${dayIdx}-${mealIdx}`;
    if(!planChecked[key]){
      setConfirmModal({dayIdx,mealIdx,meal:PLAN[dayIdx].meals[mealIdx],key});
    } else {
      savePlan({...planChecked,[key]:false});
    }
  }

  function confirmStockUpdate(){
    const{meal,key}=confirmModal;
    const next=items.map(item=>{
      const used=meal.ingredients.find(ing=>{
        const n=ing.n.toLowerCase();
        return item.name.toLowerCase().includes(n.split(' ')[0])||n.includes(item.name.toLowerCase());
      });
      if(used)return{...item,note:item.note?item.note+' · utilisé':'utilisé récemment'};
      return item;
    });
    saveItems(next);
    savePlan({...planChecked,[confirmModal.key]:true});
    setConfirmModal(null);
  }


  async function sendChatMessage(){
    const msg=chatInput.trim();
    if(!msg||chatLoading)return;
    setChatInput('');
    const newMessages=[...chatMessages,{role:'user',text:msg}];
    setChatMessages(newMessages);
    setChatLoading(true);

    // Contexte du plan semaine pour que l'IA sache quoi proposer même si listes vides
    const planContext=PLAN.flatMap(d=>d.meals.flatMap(m=>m.ingredients.map(i=>i.n))).filter((v,i,a)=>a.indexOf(v)===i).join(', ');
    const listeM=monthlyList.length>0?monthlyList.map(c=>c.name).join('\n'):'(vide — à générer depuis le plan)';
    const listeW=weeklyList.length>0?weeklyList.map(c=>c.name).join('\n'):'(vide — à générer depuis le plan)';
    const listeSummary=`LISTE MENSUELLE (sec, surgelés, conserves) :\n${listeM}\n\nLISTE HEBDO FRAÎCHE (légumes, fruits, protéines frais) :\n${listeW}`;

    const prompt=`Tu es un assistant courses étudiant budget Lidl/Aldi Paris, ~150€/mois. Sain, accessible, anti-gaspi.

Contexte plan semaine — ingrédients utilisés cette semaine : ${planContext}

Listes actuelles :
${listeSummary}

Demande de l'utilisatrice : "${msg}"

IMPORTANT : réponds UNIQUEMENT avec du JSON valide, rien d'autre, pas de texte avant/après, pas de backticks.
Format exact :
{"monthly":[{"name":"nom produit — quantité"}],"weekly":[{"name":"nom produit — quantité"}],"message":"ce que tu as changé en 1-2 phrases"}

Règles :
- Produits disponibles chez Lidl/Aldi
- Budget réaliste étudiant
- Protéines variées (œufs, légumineuses, poulet, sardines, thon)
- Si les listes sont vides, propose une liste complète cohérente avec le plan
- Réponds en français`;

    try{
      const r=await fetch('/api/ai',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:2000,messages:[{role:'user',content:prompt}]})
      });
      const d=await r.json();
      if(d.error){
        setChatMessages([...newMessages,{role:'assistant',text:'Erreur API : '+d.error.message}]);
        setChatLoading(false);return;
      }
      const raw=d.content?.[0]?.text||'';
      // Extraire le JSON même s'il y a du texte autour
      const jsonMatch=raw.match(/\{[\s\S]*\}/);
      if(!jsonMatch){
        setChatMessages([...newMessages,{role:'assistant',text:'Réponse inattendue de l\'IA. Réessaie !'}]);
        setChatLoading(false);return;
      }
      const parsed=JSON.parse(jsonMatch[0]);
      if(Array.isArray(parsed.monthly)&&Array.isArray(parsed.weekly)){
        const toList=(arr)=>arr.map(i=>({id:uid(),name:typeof i==='string'?i:(i.name||''),checked:false})).filter(i=>i.name);
        const mergeList=(newItems,old)=>{
          const checked=(old||[]).filter(c=>c.checked);
          const fresh=toList(newItems).filter(n=>!checked.find(c=>c.name.toLowerCase()===n.name.toLowerCase()));
          return[...checked,...fresh];
        };
        saveCourses({monthly:mergeList(parsed.monthly,monthlyList),weekly:mergeList(parsed.weekly,weeklyList)});
        setChatMessages([...newMessages,{role:'assistant',text:'✅ '+( parsed.message||'Listes mises à jour !')}]);
      } else {
        setChatMessages([...newMessages,{role:'assistant',text:"Format inattendu. Réessaie avec une autre formulation."}]);
      }
    }catch(e){
      setChatMessages([...newMessages,{role:'assistant',text:'Erreur : '+(e.message||'connexion impossible')+'. Réessaie !'}]);
    }
    setChatLoading(false);
  }

  async function generateRecipes(){
    if(!items.length)return;
    setRecipeLoading(true);setRecipeText('');
    const stockList=items.slice(0,40).map(i=>`${i.emoji} ${i.name} (${i.qty})`).join('\n');
    const prefs=[...activePrefs].join(', ');
    const prompt=`Tu es un chef anti-gaspi. Stock :\n${stockList}\nPréférences : ${prefs||'aucune'}.\nPropose 3 recettes réalistes AVEC CE STOCK. Priorité aux aliments qui périment bientôt. Pour chaque : titre, ingrédients utilisés, 4 étapes max, temps, kcal. Français, concis.`;
    try{
      const r=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:prompt}]})});
      const d=await r.json();
      setRecipeText(d.content?.[0]?.text||'Erreur.');
    }catch{setRecipeText('Erreur connexion.');}
    setRecipeLoading(false);
  }

  const TABS=[{k:'stock',l:'Stock'},{k:'alertes',l:'Alertes'},{k:'recettes',l:'Recettes IA'},{k:'courses',l:'Courses'},{k:'plan',l:'Plan 7j'}];

  function CourseList({list,listKey}){
    if(!list||list.length===0)return <div style={{textAlign:'center',padding:'28px 0',color:C.dim,fontSize:13}}>Liste vide — clique "🔄 Générer" !</div>;
    return <>{list.map(c=>(
      <div key={c.id} style={{display:'flex',alignItems:'center',gap:11,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:'11px 13px',marginBottom:7,cursor:'pointer',opacity:c.checked?.5:1}}
        onClick={()=>saveCourses({...courses,[listKey]:list.map(x=>x.id===c.id?{...x,checked:!x.checked}:x)})}>
        <div style={{width:22,height:22,border:c.checked?'none':`2px solid ${C.border}`,borderRadius:6,background:c.checked?C.accent3:'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:12,color:'#0f0e0c'}}>{c.checked?'✓':''}</div>
        <div style={{flex:1,fontSize:13,textDecoration:c.checked?'line-through':'none',lineHeight:1.4}}>{c.name}</div>
        <button onClick={e=>{e.stopPropagation();saveCourses({...courses,[listKey]:list.filter(x=>x.id!==c.id)});}} style={{background:'none',border:'none',color:C.muted,fontSize:15,cursor:'pointer',padding:4}}>✕</button>
      </div>
    ))}</>;
  }

  return(
    <div style={S.app}>
      <div style={S.header}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
          <div><div style={{fontWeight:800,fontSize:20,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',letterSpacing:-.3}}>🥬 Garde-Manger</div><div style={{fontSize:11,color:C.dim,marginTop:1}}>Mon stock personnel</div></div>
        </div>
        <div style={S.tabs}>{TABS.map(t=><button key={t.k} style={S.tab(tab===t.k)} onClick={()=>setTab(t.k)}>{t.l}</button>)}</div>
      </div>

      <div style={S.content}>

        {tab==='stock'&&<>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:14}}>
            {[[stats.good||0,C.accent3,'OK','rgba(107,203,119,.08)','rgba(107,203,119,.25)'],[stats.expiring||0,C.warn,'Bientôt','rgba(255,165,2,.08)','rgba(255,165,2,.25)'],[stats.expired||0,C.danger,'Périmés','rgba(255,71,87,.08)','rgba(255,71,87,.25)']].map(([n,col,lbl,bg,border])=>(
              <div key={lbl} style={{background:bg,border:`1px solid ${border}`,borderRadius:14,padding:12,textAlign:'center'}}>
                <div style={{fontWeight:800,fontSize:24,color:col,lineHeight:1}}>{n}</div>
                <div style={{fontSize:10,color:C.dim,marginTop:3,textTransform:'uppercase',letterSpacing:.5}}>{lbl}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
            <div style={S.title}>Mon Stock</div>
            <button style={S.btnY()} onClick={()=>setModal({})}>＋ Ajouter</button>
          </div>
          <div style={{position:'relative',marginBottom:12}}>
            <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:C.dim}}>🔍</span>
            <input style={{...S.input,paddingLeft:36}} placeholder="Rechercher…" value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <div style={{display:'flex',gap:7,marginBottom:13,overflowX:'auto',scrollbarWidth:'none'}}>
            {CATS.map(c=><div key={c} style={S.chip(filter===c)} onClick={()=>setFilter(c)}>{c}</div>)}
          </div>
          {filtered.length===0
            ?<div style={{textAlign:'center',padding:'40px 0',color:C.dim}}><div style={{fontSize:40,marginBottom:10}}>📭</div><div style={{fontWeight:800,fontSize:16,color:C.text,marginBottom:6}}>Rien ici</div></div>
            :Object.keys(grouped).sort().map(cat=>(
              <div key={cat}>
                {filter==='Tous'&&<div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:1,color:C.muted,padding:'7px 0 3px'}}>{cat}</div>}
                {grouped[cat].sort((a,b)=>{const da=daysUntil(a.date),db=daysUntil(b.date);if(da===null&&db===null)return 0;if(da===null)return 1;if(db===null)return -1;return da-db;}).map(item=>{
                  const days=daysUntil(item.date);const st=getStatus(days);
                  let badge=null;
                  if(days!==null){if(days<0)badge=<span style={S.badge('danger')}>Périmé</span>;else if(days===0)badge=<span style={S.badge('warn')}>Auj.</span>;else if(days<=7)badge=<span style={S.badge('warn')}>{days}j</span>;else badge=<span style={S.badge('ok')}>{fmtDate(item.date)}</span>;}
                  return <div key={item.id} style={S.itemCard(st)} onClick={()=>setModal(item)}>
                    <span style={{fontSize:24,flexShrink:0}}>{item.emoji}</span>
                    <div style={{flex:1,minWidth:0}}><div style={{fontWeight:700,fontSize:14,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{item.name}</div><div style={{fontSize:12,color:C.dim,marginTop:2}}>{item.qty}{item.note?' · '+item.note:''}</div></div>
                    {badge}
                  </div>;
                })}
              </div>
            ))
          }
        </>}

        {tab==='alertes'&&<>
          <div style={S.title}>Alertes Péremption</div>
          {expired.length===0&&expiring.length===0&&<div style={{textAlign:'center',padding:'40px 0',color:C.dim}}><div style={{fontSize:40,marginBottom:10}}>✅</div><div style={{fontWeight:800,fontSize:16,color:C.text}}>Tout est bon !</div></div>}
          {expired.length>0&&<div style={{background:'rgba(224,82,82,.08)',border:'1px solid rgba(224,82,82,.2)',borderRadius:14,padding:14,marginBottom:12}}>
            <div style={{fontWeight:800,fontSize:11,textTransform:'uppercase',letterSpacing:1,color:C.danger,marginBottom:10}}>🚨 Périmés ({expired.length})</div>
            {expired.map(i=><div key={i.id} style={{display:'flex',gap:10,alignItems:'center',padding:'5px 0',borderBottom:`1px solid rgba(255,255,255,.05)`}}><span style={{fontSize:20}}>{i.emoji}</span><div><div style={{fontSize:14,fontWeight:600}}>{i.name}</div><div style={{fontSize:12,color:C.dim}}>{i.qty} · {fmtDate(i.date)}</div></div></div>)}
          </div>}
          {expiring.length>0&&<div style={{background:'rgba(224,160,64,.08)',border:'1px solid rgba(224,160,64,.2)',borderRadius:14,padding:14,marginBottom:12}}>
            <div style={{fontWeight:800,fontSize:11,textTransform:'uppercase',letterSpacing:1,color:C.warn,marginBottom:10}}>⚠️ À consommer vite ({expiring.length})</div>
            {expiring.map(i=>{const d=daysUntil(i.date);return <div key={i.id} style={{display:'flex',gap:10,alignItems:'center',padding:'5px 0',borderBottom:`1px solid rgba(255,255,255,.05)`}}><span style={{fontSize:20}}>{i.emoji}</span><div><div style={{fontSize:14,fontWeight:600}}>{i.name}</div><div style={{fontSize:12,color:C.dim}}>{i.qty} · {d===0?"Aujourd'hui":`Dans ${d}j`}</div></div></div>;})}
          </div>}
        </>}

        {tab==='recettes'&&<>
          <div style={S.title}>Recettes avec mon stock</div>
          <div style={{fontSize:13,color:C.dim,lineHeight:1.5,marginBottom:12}}>L'IA génère des idées basées sur ton stock actuel, en priorité les aliments qui périment bientôt.</div>
          <div style={{marginBottom:14}}>
            <div style={S.label}>Préférences</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
              {[['rapide','⚡ Rapide'],['simple','😌 Simple'],['sain','🥗 Sain'],['comfort','🍲 Comfort'],['sucre','🍰 Sucré'],['vegan','🌿 Vegan']].map(([k,l])=>(
                <div key={k} style={S.chip(activePrefs.has(k))} onClick={()=>setActivePrefs(p=>{const n=new Set(p);n.has(k)?n.delete(k):n.add(k);return n;})}>{l}</div>
              ))}
            </div>
          </div>
          <button style={{background:`linear-gradient(135deg,${C.accent3},${C.accent4})`,color:'#fff',border:'none',borderRadius:14,padding:16,width:'100%',fontWeight:800,fontSize:15,cursor:'pointer',opacity:recipeLoading?.6:1}} onClick={generateRecipes} disabled={recipeLoading}>
            {recipeLoading?'⏳ Génération…':'✨ Générer des recettes'}
          </button>
          {recipeText&&<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginTop:12}}>
            {recipeText.split('\n').map((line,i)=>{
              if(/^#{1,3} /.test(line))return<div key={i} style={{fontWeight:800,fontSize:15,color:C.accent,margin:'12px 0 4px'}}>{line.replace(/^#+\s/,'')}</div>;
              if(line.startsWith('- '))return<div key={i} style={{fontSize:13,paddingLeft:12,marginBottom:3}}>• {line.slice(2)}</div>;
              if(/^\d+\./.test(line))return<div key={i} style={{fontSize:13,paddingLeft:12,marginBottom:3}}>{line}</div>;
              if(line.trim()==='')return<div key={i} style={{height:6}}/>;
              return<div key={i} style={{fontSize:13,marginBottom:3,lineHeight:1.5}}>{line.replace(/\*\*(.*?)\*\*/g,'$1')}</div>;
            })}
          </div>}
        </>}

        {tab==='courses'&&<>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
            <div style={S.title}>Courses</div>
            <div style={{display:'flex',gap:8}}>
              <button style={{...S.btnG,fontSize:12,padding:'7px 12px'}} onClick={()=>setChatOpen(o=>!o)}>
                {chatOpen?'✕ Chat':'🤖 Modifier avec l\'IA'}
              </button>
              <button style={S.btnY()} onClick={buildShoppingLists}>🔄</button>
            </div>
          </div>

          {/* CHATBOT */}
          {chatOpen&&<div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,marginBottom:14,overflow:'hidden'}}>
            <div style={{padding:'10px 14px',borderBottom:`1px solid ${C.border}`,display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:16}}>🤖</span>
              <div>
                <div style={{fontWeight:700,fontSize:13}}>Assistant Courses</div>
                <div style={{fontSize:11,color:C.dim}}>Modifie tes listes avec l'IA</div>
              </div>
            </div>
            {/* Messages */}
            <div style={{padding:'12px 14px',maxHeight:220,overflowY:'auto',display:'flex',flexDirection:'column',gap:10}}>
              {chatMessages.map((m,i)=>(
                <div key={i} style={{display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start'}}>
                  <div style={{
                    background:m.role==='user'?C.accent:'rgba(255,255,255,.06)',
                    color:m.role==='user'?'#0f0e0c':C.text,
                    borderRadius:m.role==='user'?'14px 14px 4px 14px':'14px 14px 14px 4px',
                    padding:'9px 13px',
                    fontSize:13,
                    lineHeight:1.45,
                    maxWidth:'82%',
                  }}>{m.text}</div>
                </div>
              ))}
              {chatLoading&&<div style={{display:'flex',justifyContent:'flex-start'}}>
                <div style={{background:'rgba(255,255,255,.06)',borderRadius:'14px 14px 14px 4px',padding:'10px 16px',display:'flex',gap:5}}>
                  {[0,1,2].map(i=><div key={i} style={{width:7,height:7,background:C.accent,borderRadius:'50%',animation:`bounce 1.2s ${i*.2}s infinite`}}/>)}
                </div>
              </div>}
            </div>
            {/* Suggestions rapides */}
            <div style={{padding:'0 14px 8px',display:'flex',gap:6,overflowX:'auto',scrollbarWidth:'none'}}>
              {["Remplace le poulet par des œufs","Ajoute des snacks sains","Enlève les produits lactés","Budget plus serré","Ajoute des fruits de saison"].map(s=>(
                <div key={s} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:20,padding:'4px 11px',fontSize:11,color:C.dim,cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}
                  onClick={()=>{setChatInput(s);}}>
                  {s}
                </div>
              ))}
            </div>
            {/* Input */}
            <div style={{padding:'0 12px 12px',display:'flex',gap:8}}>
              <input
                style={{...S.input,flex:1,fontSize:13,padding:'10px 13px'}}
                placeholder="Ex : ajoute des snacks sains…"
                value={chatInput}
                onChange={e=>setChatInput(e.target.value)}
                onKeyDown={e=>e.key==='Enter'&&sendChatMessage()}
              />
              <button
                style={{...S.btnY(),padding:'10px 14px',flexShrink:0,opacity:chatLoading?.5:1}}
                onClick={sendChatMessage}
                disabled={chatLoading}
              >↑</button>
            </div>
          </div>}

          <div style={{background:`rgba(77,150,255,.06)`,border:`1px solid rgba(77,150,255,.2)`,borderRadius:12,padding:'10px 14px',marginBottom:14,fontSize:12,color:C.dim,lineHeight:1.7}}>
            <span style={{color:C.accent4,fontWeight:700}}>📦 Mensuelle</span> : sec, surgelés, conserves — 2×/mois<br/>
            <span style={{color:C.accent3,fontWeight:700}}>🥦 Hebdo fraîche</span> : légumes, fruits, protéines fraîches — chaque semaine
          </div>
          <div style={{display:'flex',gap:8,marginBottom:12}}>
            {[['monthly','📦 Mensuelle',monthlyList.length,C.accent,'232,197,71'],['weekly','🥦 Hebdo fraîche',weeklyList.length,C.accent3,'109,187,138']].map(([k,l,cnt,col,rgb])=>(
              <button key={k} style={{flex:1,background:cTab===k?`rgba(${rgb},.1)`:C.card,border:cTab===k?`1px solid rgba(${rgb},.4)`:`1px solid ${C.border}`,borderRadius:12,padding:'10px 8px',fontWeight:700,fontSize:12,color:cTab===k?col:C.dim,cursor:'pointer'}} onClick={()=>setCTab(k)}>
                {l} ({cnt})
              </button>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'flex-end',marginBottom:8}}>
            <button style={{...S.btnG,fontSize:11,padding:'5px 10px'}} onClick={()=>saveCourses({...courses,[cTab]:courses[cTab].filter(c=>!c.checked)})}>Effacer cochés</button>
          </div>
          {cTab==='monthly'&&<CourseList list={monthlyList} listKey="monthly"/>}
          {cTab==='weekly'&&<CourseList list={weeklyList} listKey="weekly"/>}
          <div style={{display:'flex',gap:8,marginTop:10}}>
            <input style={{...S.input,flex:1,fontSize:13}} placeholder={`Ajouter à la liste ${cTab==='monthly'?'mensuelle':'hebdo'}…`} value={newCourse} onChange={e=>setNewCourse(e.target.value)}
              onKeyDown={e=>{if(e.key==='Enter'&&newCourse.trim()){saveCourses({...courses,[cTab]:[...courses[cTab],{id:uid(),name:newCourse.trim(),checked:false}]});setNewCourse('');}}}/>
            <button style={{...S.btnY(),padding:'11px 16px',fontSize:18,flexShrink:0}} onClick={()=>{if(newCourse.trim()){saveCourses({...courses,[cTab]:[...courses[cTab],{id:uid(),name:newCourse.trim(),checked:false}]});setNewCourse('');}}}>＋</button>
          </div>
        </>}

        {tab==='plan'&&<>
          <div style={S.title}>Plan Alimentation · 7 jours</div>
          <div style={{background:'rgba(255,107,107,.06)',border:`1px solid rgba(255,107,107,.2)`,borderRadius:14,padding:'13px 15px',marginBottom:14}}>
            <div style={{fontWeight:800,fontSize:11,textTransform:'uppercase',letterSpacing:1,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:9}}>📋 Principes Izzy</div>
            {[['🥚',"Protéines à chaque repas"],['🌾',"Glucides complexes · sans lactose"],['🥑',"Bonnes graisses"],['💧',"1,5–2L eau · 30min avant pilates"]].map(([e,t])=>(
              <div key={e} style={{display:'flex',gap:8,fontSize:12,color:C.dim,marginBottom:4,lineHeight:1.4}}><span>{e}</span><span>{t}</span></div>
            ))}
          </div>
          <div style={{background:C.border,borderRadius:4,height:5,marginBottom:14,overflow:'hidden'}}><div style={{height:'100%',background:`linear-gradient(90deg,${C.accent},${C.accent2})`,borderRadius:4,width:planPct+'%',transition:'width .4s'}}/></div>
          <div style={{display:'flex',gap:8,marginBottom:14}}>
            <button style={{flex:1,background:`rgba(255,107,107,.1)`,border:`1px solid rgba(255,107,107,.3)`,color:C.accent,borderRadius:12,padding:11,fontWeight:700,fontSize:13,cursor:'pointer'}} onClick={buildShoppingLists}>🛒 Générer courses</button>
            <button style={{...S.btnG,padding:11}} onClick={()=>{if(window.confirm('Réinitialiser ?'))savePlan({});}}>↺ Reset</button>
          </div>
          <div style={{display:'flex',gap:6,overflowX:'auto',scrollbarWidth:'none',marginBottom:14}}>
            {PLAN.map((d,i)=>{
              const done=d.meals.filter((_,mi)=>planChecked[`${i}-${mi}`]).length;
              return <div key={i} style={{background:i===activePlanDay?'rgba(232,197,71,.08)':C.card,border:i===activePlanDay?`1px solid ${C.accent}`:done===d.meals.length&&done>0?`1px solid ${C.accent3}`:`1px solid ${C.border}`,borderRadius:12,padding:'7px 12px',cursor:'pointer',textAlign:'center',flexShrink:0}} onClick={()=>setActivePlanDay(i)}>
                <span style={{fontWeight:800,fontSize:15,color:i===activePlanDay?C.accent:done===d.meals.length&&done>0?C.accent3:C.text,display:'block'}}>{d.day}</span>
                <span style={{fontSize:10,color:C.dim}}>{done>0?`${done}/${d.meals.length}`:''}</span>
              </div>;
            })}
          </div>
          {(()=>{
            const day=PLAN[activePlanDay];
            const doneCt=day.meals.filter((_,mi)=>planChecked[`${activePlanDay}-${mi}`]).length;
            return <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,overflow:'hidden'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 14px',borderBottom:`1px solid ${C.border}`,background:C.surface}}>
                <div style={{fontWeight:800,fontSize:15}}>{day.label}</div>
                <div style={{fontSize:12,color:C.dim}}>{doneCt}/{day.meals.length} ✓</div>
              </div>
              {day.meals.map((meal,mi)=>{
                const key=`${activePlanDay}-${mi}`;const done=!!planChecked[key];
                const hasCnt=meal.ingredients.filter(i=>inS(i.n)).length;
                return <div key={mi} style={{borderBottom:mi<day.meals.length-1?`1px solid ${C.border}`:'none'}}>
                  <div style={{display:'flex',alignItems:'flex-start',gap:11,padding:'12px 14px',opacity:done?.6:1}}>
                    <div style={{width:22,height:22,border:done?'none':`2px solid ${C.border}`,borderRadius:7,background:done?C.accent3:'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1,fontSize:12,color:'#0f0e0c',cursor:'pointer'}} onClick={()=>handleMealCheck(activePlanDay,mi)}>{done?'✓':''}</div>
                    <div style={{flex:1,cursor:'pointer'}} onClick={()=>setRecipeModal(meal)}>
                      <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:1,color:C.muted,marginBottom:2}}>{meal.type}</div>
                      <div style={{fontSize:13,color:C.text,lineHeight:1.35,textDecoration:done?'line-through':'none'}}>{meal.name}</div>
                      <div style={{display:'flex',gap:10,marginTop:5,flexWrap:'wrap'}}>
                        <span style={{fontSize:11,color:C.dim}}>⏱ {meal.time}</span>
                        <span style={{fontSize:11,color:C.dim}}>🔥 {meal.kcal} kcal</span>
                        <span style={{fontSize:11,color:hasCnt===meal.ingredients.length?C.accent3:C.accent2}}>{hasCnt}/{meal.ingredients.length} en stock</span>
                      </div>
                    </div>
                    <button onClick={()=>setRecipeModal(meal)} style={{background:'none',border:`1px solid ${C.border}`,borderRadius:8,color:C.dim,fontSize:11,padding:'5px 9px',cursor:'pointer',flexShrink:0,marginTop:2}}>Recette</button>
                  </div>
                </div>;
              })}
            </div>;
          })()}
        </>}

      </div>

      {modal!==null&&<ItemModal item={modal} onClose={()=>setModal(null)}
        onSave={item=>{saveItems(modal.id?items.map(i=>i.id===item.id?item:i):[...items,item]);setModal(null);}}
        onDelete={id=>{if(window.confirm('Supprimer ?')){saveItems(items.filter(i=>i.id!==id));setModal(null);}}}/>}

      {recipeModal&&<RecipeModal meal={recipeModal} stockNames={stockNames} onClose={()=>setRecipeModal(null)}/>}

      {confirmModal&&<ConfirmStockModal meal={confirmModal.meal} items={items}
        onConfirm={confirmStockUpdate}
        onSkip={()=>{savePlan({...planChecked,[confirmModal.key]:true});setConfirmModal(null);}}
        onClose={()=>setConfirmModal(null)}/>}

      <style>{`*{-webkit-tap-highlight-color:transparent;}input,select{color-scheme:dark;}::-webkit-scrollbar{display:none;}`}</style>
    </div>
  );
}
