import { getRandom } from './Random.js';

const $chat = document.querySelector('.chat');
const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    ],
    draw: ['Ничья - это тоже победа! ', 'В этом поединке нет победителя! '],
};
export function battleLogs(type, player1, player2, damage) {
    const today = new Date(),
        time = today.toLocaleTimeString(),
        startTime = today.toLocaleTimeString().slice(0, -3),
        { name: name1, hp: hp1 } = player1,
        { name: name2, hp: hp2 } = player2,
        random = getRandom(logs[type].length) - 1;
    switch (type) {
        case 'start':
            const textStart = logs[type]
                .replace('[time]', startTime)
                .replace('[player1]', name1)
                .replace('[player2]', name2);
            const startEl = `<p>${textStart}</p>`;
            $chat.insertAdjacentHTML('afterbegin', startEl);
            break;
        case 'hit':
            const textHit = logs[type][random]
                .replace('[playerKick]', name1)
                .replace('[playerDefence]', name2);
            const hit = `<span class='red'>-${damage}</span>`;
            const elHit = `<p>${time} ${textHit} ${hit}  ${hp2}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', elHit);
            const $spanHit = document.querySelector('.red');
            $spanHit.style.color = '#cd0e03';
            break;
        case 'defence':
            const textDef = logs[type][random]
                .replace('[playerKick]', name1)
                .replace('[playerDefence]', name2);
            const elDef = `<p>${time} ${textDef} <span class='blue'>-${damage}</span>  ${hp2}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', elDef);
            const $pDef = document.querySelector('.blue');
            $pDef.style.color = '#0431f9';
            break;
        case 'end':
            const textEnd = logs[type][random]
                .replace('[playerWins]', name1)
                .replace('[playerLose]', name2);
            const endEl = `<p>${textEnd}</p>`;
            $chat.insertAdjacentHTML('afterbegin', endEl);
            break;
        case 'draw':
            const drawEl = logs[type][random];
            $chat.insertAdjacentHTML('afterbegin', drawEl);
            break;
    }
}