// ----------- Gestion du Canvas ----------------------
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//resize le canvas à la largeur et la hauteur de l'écran
shopspace = innerWidth / 3
canvas.width = innerWidth - shopspace;
canvas.height = innerHeight - 200;
//-----------------------------------------------------


// ------ déclaration des variables de départs ------------
if (localStorage.getItem("Balance")){
    var damage = parseInt(localStorage.getItem('damage'));
    var Balance = parseInt(localStorage.getItem('Balance'))
    
    var LVL = parseInt(localStorage.getItem('LVL'));
    
    var CritChance = parseInt(localStorage.getItem('CritChance'));
    var CritMultiplier = parseInt(localStorage.getItem('CritMultiplier'));

    var ShopDmgUpgradeNB = parseInt(localStorage.getItem('ShopDmgUpgradeNB'));
    var ShopDmgUpgradePrice = parseInt(localStorage.getItem('ShopDmgUpgradePrice'));
    
    var ShopCritChanceUpgradeNB = parseInt(localStorage.getItem('ShopCritChanceUpgradeNB'))
    var ShopCritChanceUpgradePrice = parseInt(localStorage.getItem('ShopCritChanceUpgradePrice'))
    
    var ShopCritMultUpgradePrice = parseInt(localStorage.getItem('ShopCritMultUpgradePrice'));
    
    var ShopGainUpgrades = parseInt(localStorage.getItem('ShopGainUpgrades'));
    var ShopGainUpgradePrice = parseInt(localStorage.getItem('ShopGainUpgradePrice'));
    
    var ShopGainMult = parseInt(localStorage.getItem('ShopGainMult'));
    var ShopGainMultUpgradePrice = parseInt(localStorage.getItem('ShopGainMultUpgradePrice'));
    
    var ShopAutoClickPrice = parseInt(localStorage.getItem('ShopAutoClickPrice'));
    var ShopAutoClickCoolDown = parseInt(localStorage.getItem('ShopAutoClickCoolDown'));
    
}else{
    var CritChance = 5;
    var CritMultiplier = 1.2;
    var damage = 1;
    var Balance = 0;
    var LVL = 1;
    
    var ShopDmgUpgradeNB = 0;
    var ShopDmgUpgradePrice = 10;
    
    var ShopCritChanceUpgradeNB = 0
    var ShopCritChanceUpgradePrice = 10
    
    var ShopCritMultUpgradePrice = 50
    
    var ShopGainUpgrades = 0
    var ShopGainUpgradePrice = 20
    
    var ShopGainMult = 1
    var ShopGainMultUpgradePrice = 50
    
    var ShopAutoClickPrice = 100;
    var ShopAutoClickCoolDown = 3200;
       
}

function StoreData(){
    localStorage.setItem('damage', damage);
    localStorage.setItem('Balance', Balance);
    localStorage.setItem('LVL', LVL);
    
    localStorage.setItem('CritChance', CritChance);
    localStorage.setItem('CritMultiplier', CritMultiplier);

    localStorage.setItem('ShopDmgUpgradeNB', ShopDmgUpgradeNB);
    localStorage.setItem('ShopDmgUpgradePrice', ShopDmgUpgradePrice);
    
    localStorage.setItem('ShopCritChanceUpgradeNB', ShopCritChanceUpgradeNB);
    localStorage.setItem('ShopCritChanceUpgradePrice', ShopCritChanceUpgradePrice);

    localStorage.setItem('ShopCritMultUpgradePrice', ShopCritMultUpgradePrice);
    
    localStorage.setItem('ShopGainUpgrades', ShopGainUpgrades);
    localStorage.setItem('ShopGainUpgradePrice', ShopGainUpgradePrice);

    localStorage.setItem('ShopGainMult', ShopGainMult);
    localStorage.setItem('ShopGainMultUpgradePrice', ShopGainMultUpgradePrice);
   
    localStorage.setItem('ShopAutoClickPrice', ShopAutoClickPrice);
    localStorage.setItem('ShopAutoClickCoolDown', ShopAutoClickCoolDown);
}

function reset(){
    confirm("Voulez vous vraiment supprimer votre sauvegarde ?");
    window.localStorage.clear();
    location.reload()

}


// --- variables déclaré pour futur usage ----
var BackgroundRand; //rand utiliser pour la génération du background
var MX  //pos x souris
var MY  //pos y souris
var AutoClic //settimer

//array contenant les sprites de mobs
var ArrayMob = ["Ressources/Mobs/1.png", "Ressources/Mobs/2.png", "Ressources/Mobs/3.png", "Ressources/Mobs/4.png", "Ressources/Mobs/5.png", "Ressources/Mobs/1.png", "Ressources/Mobs/6.png", "Ressources/Mobs/7.png", "Ressources/Mobs/8.png", "Ressources/Mobs/9.png",]
var ArrayBackGround = ["Ressources/Background/1.png", "Ressources/Background/2.png", "Ressources/Background/3.png", "Ressources/Background/4.png", "Ressources/Background/5.png", "Ressources/Background/6.png"]
// ---------------------------------------------------------


function clicked() {
    mob.damage();
    mobDeath();
    /*
      function printMousePos(event) {
          MX = event.clientX;
          MY = event.clientY;
          AnimMouseClick()
        }
        document.addEventListener("click", printMousePos);
        */

}


// --------------  class Mob --------------------
class Mob {
    constructor() {
        //declaration des HP
        //si la dificulté est en dessous de 5 le mob aura 10hp
        if (LVL <= 5) {
            this.hp = 15
        }
        //si la difficulté est au dessus de 5 le mob aura plus de hp
        else if (LVL > 5 && LVL <= 100) {
            this.hp = (20 * (LVL / 5))//les hp des mobs vont augmenter en fonction du niveaux
        }
        else if (LVL > 100 && LVL <= 200) {
            this.hp = (50 * (LVL / 5))
        }
        else if (LVL > 200 && LVL <= 300) {
            this.hp = (100 * (LVL / 5))
        }
        else if (LVL > 300 && LVL <= 500) {
            this.hp = (100 * (LVL))
        }
        else if (LVL > 500) {
            this.hp = (200 * (LVL))
        }
        Math.floor(this.hp)
        //ajuste la barre de vie en accord aux hp du mob
        document.getElementById("health").value = this.hp;
        document.getElementById("health").max = this.hp;


        const image = new Image()
        image.src = ArrayMob[Math.floor(Math.random() * 9)];
        BackgroundRand = Math.floor(Math.random() * 6)//genere le fond en meme temps que le mob pour r'appeler la fonction background apres un click
        image.onload = () => {
            this.image = image;
            this.width = 300;
            this.height = 500;
            this.position = { x: canvas.width / 2 - this.width / 2, y: canvas.height / 2 - 150 };
            mob.draw()

        }

    }

    damage() {

        if ((Math.floor(Math.random() * 100)) <= CritChance) {
            this.hp -= damage * CritMultiplier;
            this.hp = Number((this.hp).toFixed(0));
            if (this.hp <= 0) {
                MobState = "Dead";
                this.hp = 0;
            }
            Log("<red>COUP CRITIQUE ! </red>Le Monstre a Subit <red>" + damage + " DMG</red>, il lui reste <green>" + this.hp + " HP</green>")
        } else {
            this.hp -= damage;
            this.hp = Number((this.hp).toFixed(0));
            if (this.hp <= 0) {
                MobState = "Dead";
                this.hp = 0;
            }
            Log("Le Monstre a Subit <red>" + damage + " DMG</red>, il lui reste <green>" + this.hp + " HP</green>")
        }

        document.getElementById("health").value = this.hp;



    }

    draw() {
        if (this.image) {
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    }


}
// -------------- Fin class Mob --------------------

mob = new Mob(); // génere le mob
var MobState = "Alive"; //le déclare comme vivant
var Drop = 0;

function mobDeath() {
    if (MobState == "Dead") {
        //si le mob est mort et est en dessous du lvl 5
        if (LVL <= 5) {
            Drop = ((5 + ShopGainUpgrades) * ShopGainMult);
            Balance += Drop;
            Balance = Number((Balance).toFixed(0));
        }
        //si la difficulté est au dessus de 5 le mob drop plus de $$
        else {
            Drop = (((5 + ShopGainUpgrades) * (LVL / 5)) * ShopGainMult);
            Balance += Drop;
            Balance = Number((Balance).toFixed(0));
        }

        LVL++; // La difficulté monte d'un niveaux
        Log("<red>Le Monstre est mort !</red> Il à Donné <green> " + Drop + "</green> $");
        Log("La difficulté à monté d'un niveaux, et est maintenant à<red> " + LVL + "</red>");

        StoreData();
        console.log(localStorage.getItem('Balance'))

        //un nouveaux mob est généré et remplace l'ancient
        mob = new Mob();
        MobState = "Alive"; //status reset  à alive
        Drop = 0;   //drop reset
        animation()
    }

}

//------------- Fonctions D'animation ----------------
//affiche le background et mob sur l'écran et actualise l'état du shop

function AnimBackGround() {
    var Background = new Image();
    Background.src = ArrayBackGround[BackgroundRand];

    Background.onload = () => {
        this.image = Background;
        this.width = canvas.width;
        this.height = canvas.height;

        c.drawImage(this.image, 0, 0, this.width, this.height);
        requestAnimationFrame(AnimMob)
    }
}


function AnimMouseClick() {
    var Mouse = new Image();
    Mouse.src = "Ressources/pngwing.com.png";

    Mouse.onload = () => {
        this.image = Mouse;
        this.width = 100;
        this.height = 100;
        c.drawImage(this.image, MX - this.width / 2, MY - this.height / 1.5, this.width, this.height);
        requestAnimationFrame(AnimBackGround)
    }
}

function AnimMob() {
    mob.draw();
}



function animation() {
    AnimBackGround();
    RefreshShop();
    AnimMob();

}
// -----------------  Actualise l'état du shop -----------------------
function RefreshShop() {
    document.getElementById("Balance").innerText = Balance;
    document.getElementById("Balance").append(" $");

    document.getElementById("priceDMG").innerText = ShopDmgUpgradePrice;
    document.getElementById("priceDMG").append(" $");
    document.getElementById("dmg").innerText = damage;
    document.getElementById("dmg").append(" dmg par clic");

    document.getElementById("priceCritChance").innerText = ShopCritChanceUpgradePrice;
    document.getElementById("priceCritChance").append(" $");
    document.getElementById("CritChance").innerText = CritChance;
    document.getElementById("CritChance").append(" % Chance de coup critique ");

    document.getElementById("priceCritMult").innerText = ShopCritMultUpgradePrice;
    document.getElementById("priceCritMult").append(" $");
    document.getElementById("CritMult").innerText = CritMultiplier;
    document.getElementById("CritMult").append("X dégât de coup critique ");

    document.getElementById("priceGainUpgrade").innerText = ShopGainUpgradePrice;
    document.getElementById("priceGainUpgrade").append(" $");
    document.getElementById("GainUpgrade").innerText = ShopGainUpgrades;
    document.getElementById("GainUpgrade").append(" $ en plus par kill ");

    document.getElementById("priceGainMult").innerText = ShopGainMultUpgradePrice;
    document.getElementById("priceGainMult").append(" $");
    document.getElementById("GainMult").innerText = ShopGainMult;
    document.getElementById("GainMult").append("X de multiplication de Gain ");

    document.getElementById("priceAutoClicker").innerText = ShopAutoClickPrice;
    document.getElementById("priceAutoClicker").append(" $");
    document.getElementById("AutoClicker").innerText = (ShopAutoClickCoolDown/1000);
    document.getElementById("AutoClicker").append(" sec De CoolDown  ");


}
var ArrayLog = []

function Log(EntréeLog) {

    ArrayLog.push(EntréeLog);

    if (ArrayLog.length > 4) {
        ArrayLog.shift()
    }

    if (ArrayLog[3]) {
        document.getElementById("Log1").innerHTML = ArrayLog[3];
    }
    if (ArrayLog[2]) {
        document.getElementById("Log2").innerHTML = ArrayLog[2];
    }
    if (ArrayLog[1]) {
        document.getElementById("Log3").innerHTML = ArrayLog[1];
    }
    if (ArrayLog[0]) {
        document.getElementById("Log4").innerHTML = ArrayLog[0];
    }


}





//------------- Fin Fonctions D'animation ----------------



// -------------- Shop dmg upgrade -------------------------


function ShopDmgUpgrade() {
    if (Balance >= ShopDmgUpgradePrice) {
        Balance -= ShopDmgUpgradePrice
        Balance = Number((Balance).toFixed(1)); //arondis l'agent du joueur
        damage += 1
        ShopDmgUpgradeNB++
        ShopDmgUpgradePrice = (ShopDmgUpgradePrice + (10 + ShopDmgUpgradeNB))
        RefreshShop()
    }

}

// -------------- Fin Shop dmg upgrade ------------------------


// -------------- Shop Crit upgrade -------------------------


function ShopCritChanceUpgrade() {
    if (Balance >= ShopCritChanceUpgradePrice && CritChance < 99) {
        Balance -= ShopCritChanceUpgradePrice
        Balance = Number((Balance).toFixed(0)); //arondis l'agent du joueur
        CritChance += 2
        ShopCritChanceUpgradeNB++
        ShopCritChanceUpgradePrice = (ShopCritChanceUpgradePrice + (ShopCritChanceUpgradeNB * 2))
        RefreshShop()
    }

}



function ShopCritMultUpgrade() {
    if (Balance >= ShopCritMultUpgradePrice) {
        Balance -= ShopCritMultUpgradePrice
        Balance = Number((Balance).toFixed(1)); //arondis l'agent du joueur
        CritMultiplier += 0.2
        CritMultiplier = Number((CritMultiplier).toFixed(1)); //arrondis le nombre a 0.x (jsp pourquoi mais des fois les mult crit sont a 1.5999999999 au lieux de 1.6 donc j'arrondis)
        ShopCritMultUpgradePrice = (ShopCritMultUpgradePrice * 1.5)
        ShopCritMultUpgradePrice = Number((ShopCritMultUpgradePrice).toFixed(0)); //arrondi le prix
        RefreshShop()
    }

}

// -------------- Fin Shop Crit  upgrade ------------------------


// -------------- Shop multiplicateur de Gain -------------------

function ShopGainUpgrade() {
    if (Balance >= ShopGainUpgradePrice) {
        Balance -= ShopGainUpgradePrice
        Balance = Number((Balance).toFixed(1)); //arondis l'agent du joueur
        ShopGainUpgrades += 1
        ShopGainUpgradePrice = Number((ShopGainUpgradePrice * 1.25).toFixed(0)); //arrondi le prix
        RefreshShop()
    }
}



function ShopGainMultUpgrade() {
    if (Balance >= ShopGainMultUpgradePrice) {
        Balance -= ShopGainMultUpgradePrice
        Balance = Number((Balance).toFixed(1)); //arondis l'agent du joueur
        ShopGainMult += 0.2
        ShopGainMult = Number((ShopGainMult).toFixed(1)); //arrondis le nombre a 0.x (jsp pourquoi mais des fois les mult crit sont a 1.5999999999 au lieux de 1.6 donc j'arrondis)
        ShopGainMultUpgradePrice = (ShopGainMultUpgradePrice * 2)
        ShopGainMultUpgradePrice = Number((ShopGainMultUpgradePrice).toFixed(0)); //arrondi le prix
        RefreshShop()
    }

}

//----------------------------------------------------------------

function ShopAutoClick() {
    if (Balance >= ShopAutoClickPrice && ShopAutoClickCoolDown > 200) {
        Balance -= ShopAutoClickPrice
        Balance = Number((Balance).toFixed(1)); //arondis l'agent du joueur
        ShopAutoClickCoolDown -= 200
        ShopAutoClickPrice = (ShopAutoClickPrice * 1.25)
        ShopAutoClickPrice = Number((ShopAutoClickPrice).toFixed(0)); //arrondi le prix
        RefreshShop()

        clearInterval(AutoClic);
        AutoClic = window.setInterval(function(){clicked()}, ShopAutoClickCoolDown);
    
    }
}



animation(); //exect la fonction annimation une fois pour lancer le jeux



/*

var damagemult=1
function ShopDmgUpgrade(){
    ShopUpgrade(ShopDmgUpgradePrice,damage,damagemult)
    RefreshShop()
}

function ShopUpgrade(Price,Stat,StatMultiplier) {
    if (Balance >= Price) {
        Balance=Number((Balance-=Price).toFixed(1));
        Stat=Stat+=StatMultiplier;
        Stat=Number((Stat+=StatMultiplier).toFixed(1)); 
        Price = (Price * 1.5)
        Price=Number((Price).toFixed(0));
        return Price,Stat,StatMultiplier;
        RefreshShop()
    }

}*/