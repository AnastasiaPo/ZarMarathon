const $chat = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $reloadBtn = createElement('div', 'reloadWrap');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['Steel Fans', 'Flying Blade', 'Bo Staff'],
    attack: function () {
        console.log(player1.name + ' Fight...')
    },
    changeHp,
    renderHp,
    elHp
}

const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Ice Daggers', 'Kori Blade'],
    attack: function () {
        console.log(player2.name + ' Fight...')
    },
    changeHp,
    renderHp,
    elHp
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if(className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(playerObj) {
    const $player = createElement('div', 'player' + playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $player.appendChild($progressbar);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($character);
    $character.appendChild($img);

    return $player;
}

function getRandom(num) {
    return Math.ceil(Math.random() * num)
}

function changeHp(hit) {
    if(this.hp > hit) {
        this.hp -= hit;
    } else {
        this.hp = 0;
    }
}

function elHp() {
    const $playerLife =  document.querySelector('.player' + this.player + ' .life');
    return $playerLife;
}

function renderHp() {
    this.elHp().style.width = this.hp + '%';
}

function playerWins(name) {
    const $winsTitle = createElement('div', 'winsTitle');

    if(name) {
        $winsTitle.innerText = name + ' wins';
    } else {
        $winsTitle.innerText = 'draw';
    }

    return $winsTitle;
}

function createReloadButton() {
    const $btn = createElement('button', 'button');

    $btn.innerText = 'Restart';
    $reloadBtn.appendChild($btn);
    $chat.appendChild($reloadBtn);
}

$reloadBtn.addEventListener('click', function () {
    window.location.reload();
})

// $randomButton.addEventListener('click', function () {
//     player1.changeHp(getRandom(20));
//     player1.renderHp();
//     player2.changeHp(getRandom(20));
//     player2.renderHp()
//
//
//     if(player1.hp == 0 || player2.hp === 0) {
//         $randomButton.disabled = true;
//         createReloadButton();
//     }
//
//     if(player1.hp === 0 && player1.hp < player2.hp) {
//         $chat.appendChild(playerWins(player2.name));
//     } else if(player2.hp === 0 && player2.hp < player1.hp) {
//         $chat.appendChild(playerWins(player1.name));
//     } else if(player1.hp === 0 && player2.hp === 0) {
//         $chat.appendChild(playerWins());
//     }
// })

function checkWin() {
    if(player1.hp == 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if(player1.hp === 0 && player1.hp < player2.hp) {
        $chat.appendChild(playerWins(player2.name));
    } else if(player2.hp === 0 && player2.hp < player1.hp) {
        $chat.appendChild(playerWins(player1.name));
    } else if(player1.hp === 0 && player2.hp === 0) {
        $chat.appendChild(playerWins());
    }
}

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT(hit)),
        hit,
        defence,
    }
}

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const attack = {};

    for (const item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }
    getDamage(player1, checkAttack(enemy, attack));
    getDamage(player2, checkAttack(attack, enemy));
    checkWin();
});

function checkAttack(enemy, attack) {
    let hit = 0;
    if (attack.hit !== enemy.defence) {
        hit = attack.value;
    }
    return hit;
}

function getDamage(player, damage) {
    player.changeHp(damage);
    player.renderHp();
}

$chat.appendChild(createPlayer(player1));
$chat.appendChild(createPlayer(player2));

