import { battleLogs } from './BattleLogs.js';
import { createPlayer, player1, player2 } from './Players.js';
import { checkAttack, heroAttack, enemyAttack, checkWin } from './GamesAction.js';
import { $arenas, $formFight } from './play.js';

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const hero = heroAttack();
    checkAttack(enemy, hero);
    checkWin();
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
battleLogs('start', player1, player2);

