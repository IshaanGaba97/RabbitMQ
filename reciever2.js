const amqp = require('amqplib');

const receiveMessage = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const exchangeName = 'exampleExchange';

  await channel.assertExchange(exchangeName, 'fanout', { durable: false });

  const { queue } = await channel.assertQueue('', { exclusive: true });
  channel.bindQueue(queue, exchangeName, '');

  console.log(`[Receiver2] Waiting for messages. To exit press CTRL+C`);

  channel.consume(queue, (msg) => {
    if (msg.content) {
      const message = JSON.parse(msg.content.toString());
      console.log(`[Receiver2] Received message: ${JSON.stringify(message)}`);
    }
  }, { noAck: true });
}

receiveMessage();
