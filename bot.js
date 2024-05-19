const tmi = require('tmi.js');
const axios = require('axios');

// Configurações do bot
const client = new tmi.Client({
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: 'Bot Community',
        password: 'oauth:SEU_TOKEN_OAUTH'
    },
    channels: ['botzinspk']
});

// Conecta ao chat
client.connect();

// Evento de mensagem
client.on('message', (channel, tags, message, self) => {
    if(self) return;

    // Exemplo de comando !hello
    if(message.toLowerCase() === '!hello') {
        client.say(channel, `@${tags.username}, olá!`);
    }
});

// Exemplo de comando para atualizar overlay
client.on('message', async (channel, tags, message, self) => {
    if(self) return;

    // Comando para atualizar overlay
    if(message.toLowerCase() === '!updateoverlay') {
        try {
            const response = await axios.post('URL_DA_API_DO_STREAM_ELEMENTS', {
                // Dados que você deseja enviar para a overlay
                text: `Atualizado por ${tags.username}`
            });

            if(response.status === 200) {
                client.say(channel, `@${tags.username}, overlay atualizada com sucesso!`);
            } else {
                client.say(channel, `@${tags.username}, falha ao atualizar overlay.`);
            }
        } catch (error) {
            console.error(error);
            client.say(channel, `@${tags.username}, erro ao atualizar overlay.`);
        }
    }
});
