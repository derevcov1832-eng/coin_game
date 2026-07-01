const { Telegraf } = require('telegraf');

// ВСТАВЬ СВОЙ ТОКЕН
const BOT_TOKEN = '8994617400:AAFtNb76Bhc17zCnMlXzYup-b-IEPi8nuPk';
const bot = new Telegraf(BOT_TOKEN);

// Приветствие
bot.start((ctx) => {
    ctx.reply('🐰 Добро пожаловать в Rabbits!\nНажми на кнопку ниже, чтобы начать игру.', {
        reply_markup: {
            keyboard: [
                [{ text: '🎮 Играть', web_app: { url: 'https://derevcov1832-eng.github.io/vip-casino/index.html' } }]
            ],
            resize_keyboard: true
        }
    });
});

// Обработка данных из WebApp (пополнение)
bot.on('web_app_data', async (ctx) => {
    try {
        const data = JSON.parse(ctx.webAppData.data);
        console.log('📩 Получено:', data);

        if (data.action === 'deposit_stars') {
            const stars = data.amount || 50;
            const coins = stars * 20;

            // TODO: сохранить в БД
            
            await ctx.reply(`✅ Пополнено!\n⭐ ${stars} Stars → 🪙 ${coins} монет`);
        }
    } catch (e) {
        console.error('❌ Ошибка:', e);
    }
});

// Запуск
bot.launch();
console.log('🤖 Бот запущен!');
