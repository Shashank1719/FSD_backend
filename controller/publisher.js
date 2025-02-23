const amqp = require('amqplib');

async function sendJsonToQueue(queue_name, msg) {
    const queue = queue_name;
    const jsonObject = msg;

    try {
        const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: false });

        const message = JSON.stringify(jsonObject);

        channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
        console.log(`Message: ${jsonObject} added to queue: ${queue}`);

        setTimeout(() => {
            connection.close();
        }, 1000);
    } catch (error) {
        console.error('Error sending message to queue:', error);
    }
}

module.exports = {sendJsonToQueue};