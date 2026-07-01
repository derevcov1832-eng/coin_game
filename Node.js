const { Telegraf } = require('telegraf');

// ⚠️ ВСТАВЬ СВОЙ ТОКЕН
const BOT_TOKEN = '8994617400:AAFtNb76Bhc17zCnMlXzYup-b-IEPi8nuPk';

const bot = new Telegraf(BOT_TOKEN);

// ===== ПРИВЕТСТВИЕ =====
bot.start((ctx) => {
    ctx.reply('🐰 Добро пожаловать в Rabbits!\n\nНажми на кнопку ниже, чтобы начать игру 🎮', {
        reply_markup: {
            keyboard: [
                [{ 
                    text: '🎮 Играть', 
                    web_app: { 
                        url: 'https://derevcov1832-eng.github.io/coin_game/index.html' 
                    } 
                }]
            ],
            resize_keyboard: true
        }
    });
});

// ===== ОБРАБОТКА ДАННЫХ ИЗ WebApp =====
bot.on('web_app_data', async (ctx) => {
    try {
        const data = JSON.parse(ctx.webAppData.data);
        console.log('📩 Получены данные:', data);

        if (data.action === 'deposit_stars') {
            const stars = data.amount || 50;
            const coins = stars * 20;

            await ctx.reply(
                `✅ Пополнение успешно!\n` +
                `⭐ +${stars} Stars\n` +
                `🪙 +${coins} монет\n\n` +
                `💰 Твой баланс обновлён!`
            );
        }
    } catch (error) {
        console.error('❌ Ошибка:', error);
        await ctx.reply('❌ Произошла ошибка. Попробуй ещё раз.');
    }
});

// ===== ЗАПУСК =====
bot.launch()
    .then(() => console.log('🤖 Бот успешно запущен!'))
    .catch((err) => console.error('❌ Ошибка запуска:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
