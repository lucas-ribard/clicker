<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script async src="script.js"></script>
    <link href="index.css" rel="stylesheet" type="text/css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">

    <title>Document</title>
</head>

<body>

    <div id="Main">

        <div id="Target" >
            <progress id="health" value="0" max="0"></progress>
            <!--<img class="Mob" src="Ressources/L9BqEs.png" >-->
            <canvas onclick="clicked()"></canvas>
            
            <div id=Log>
                <p id="Log4"></p>
                <p id="Log3"></p>
                <p id="Log2"></p>
                <p id="Log1"></p>
              
            </div>
            <button id="Reset" onclick="reset()">Supprimer La Sauvegarde</button>
        </div>

        <div id="Shop">
            <h2>Magasin</h2>
            <p id="Balance">0 $</p>
            <div class="StatBox" id="dmg"></div>
            <div class="shopUpgradeBox">
                <button class="BtShopUpgrade" onclick="ShopDmgUpgrade()">DMG Upgrade</button>
                <p class="shopPriceTag" id="priceDMG">0</p>
                <p class="ShopUpgradeDescription">Augmente les dégâts de chaque clic par 1</p>
            </div>

            <div class="StatBox" id="CritChance"></div>
            <div class="shopUpgradeBox">
                <button class="BtShopUpgrade" onclick="ShopCritChanceUpgrade()">Crit Chance</button>
                <p class="shopPriceTag" id="priceCritChance">0</p>
                <p class="ShopUpgradeDescription">Augmente les chances de coups critique ( MAX 99% )</p>
            </div>

            <div class="StatBox" id="CritMult"></div>
            <div class="shopUpgradeBox">
                <button class="BtShopUpgrade" onclick="ShopCritMultUpgrade()">Crit Multiplier</button>
                <p class="shopPriceTag" id="priceCritMult">0</p>
                <p class="ShopUpgradeDescription">Augmente les dégâts de coup critique</p>
            </div>

            <div class="StatBox" id="GainUpgrade"></div>
            <div class="shopUpgradeBox">
                <button class="BtShopUpgrade" onclick="ShopGainUpgrade()">Gain Upgrade</button>
                <p class="shopPriceTag" id="priceGainUpgrade">0</p>
                <p class="ShopUpgradeDescription">recois plus de $ par kill</p>
            </div>

            <div class="StatBox" id="GainMult"></div>
            <div class="shopUpgradeBox">
                <button class="BtShopUpgrade" onclick="ShopGainMultUpgrade()">Gain multplicateur</button>
                <p class="shopPriceTag" id="priceGainMult">0</p>
                <p class="ShopUpgradeDescription">multplicateur les $ gagnés</p>
            </div>

            <div class="StatBox" id="AutoClicker"></div>
            <div class="shopUpgradeBox">
                <button class="BtShopUpgrade" onclick="ShopAutoClick()">auto clicker</button>
                <p class="shopPriceTag" id="priceAutoClicker">0</p>
                <p class="ShopUpgradeDescription">ajoute 1 AutoCliker, chaque nouvel AutoClicker est plus rapide que le précédent</p>
            </div>


        </div>
    </div>



</body>

</html>