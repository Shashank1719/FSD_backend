const amqp = require('amqplib');

async function consumeJsonFromQueue(queue_name) {
    // console.log("In consumeJsonFromQueue");
    const queue = queue_name;
    try {
        const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@rabbitmq:${process.env.RABBITMQ_PORT}`);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });

        console.log(`Waiting for messages in queue: ${queue}`);
        channel.prefetch(1);
        const msg = await channel.get(queue, { noAck: false });
        if (msg) {
            const jsonObject = JSON.parse(msg.content.toString());
            console.log('Received Queue Message:', jsonObject);
            channel.ack(msg);
            await channel.close();
            await connection.close();
            return jsonObject;
      } else {
            console.log("No messages in queue");
            await channel.close();
            await connection.close();
            return null;
      }
    } catch (error) {
        console.error('Error consuming message from queue:', error);
        throw error;
    }
}

module.exports = { consumeJsonFromQueue };