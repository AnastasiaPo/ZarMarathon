import { getRandom } from './Random.js';
import { battleLogs } from './BattleLogs.js';
import { getDamage, createElement } from './Players.js';
import { player1, player2 } from './Players.js';
const $randomBtn = document.querySelector('.button'),
    $formFight = document.querySelector('.control'),
    $arenas = document.querySelector('.arenas'),
    ATTACK = ['head', 'body', 'foot'],
    HIT = {
        head: 30,
        body: 25,
        foot: 20,
    };
function checkWin() {
    const { hp: hp1, name: name1 } = player1;
    const { hp: hp2, name: name2 } = player2;
    if (hp1 <= 0 || hp2 <= 0) {
        $randomBtn.disabled = true;
        createReloadButton();
        if (hp1 > hp2) {
            $arenas.appendChild(getWinner(name1));
            battleLogs('end', player1, player2);
        } else if (hp1 < hp2) {
            $arenas.appendChild(getWinner(name2));
            battleLogs('end', player2, player1);
        } else {
            $arenas.appendChild(getWinner());
            battleLogs('draw', player1, player2);
        }
    }
}
function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    };
}
function checkAttack(enemy, hero) {
    if (hero.hit !== enemy.defence) {
        getDamage(player2, hero.value);
        battleLogs('hit', player1, player2, hero.value);
    }
    if (hero.hit === enemy.defence) {
        battleLogs('defence', player1, player2, hero.value);
    }
    if (enemy.hit !== hero.defence) {
        getDamage(player1, enemy.value);
        battleLogs('hit', player2, player1, enemy.value);
    }
    if (enemy.hit === hero.defence) {
        battleLogs('defence', player2, player1, enemy.value);
    }
}
function heroAttack() {
    const heroAttack = {};
    for (const item of $formFight) {
        if (item.checked && item.name === 'hit') {
            heroAttack.value = getRandom(HIT[item.value]);
            heroAttack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            heroAttack.defence = item.value;
        }
        item.checked = false;
    }
    return heroAttack;
}
function getWinner(name) {
    const $winTitle = createElement('div', 'winTitle');
    name ? ($winTitle.innerText = name + ' wins') : ($winTitle.innerText = 'Draw');
    return $winTitle;
}
function createReloadButton() {
    const $reload = createElement('div', 'reloadWrap');
    const $btn = createElement('button', 'button');
    $btn.innerText = 'Restart';
    $reload.appendChild($btn);
    $arenas.appendChild($reload);
    $reload.addEventListener('click', () => {
        window.location.reload();
    });
}
export { checkWin, enemyAttack, checkAttack, heroAttack, $formFight, $arenas };