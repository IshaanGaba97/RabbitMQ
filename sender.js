const amqp = require('amqplib');

const sendMessage = async (obj) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const exchangeName = 'demoExchange';

  await channel.assertExchange(exchangeName, 'fanout', { durable: false });

  const message = obj;
  channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));

  console.log(`[Sender] Sent message: ${JSON.stringify(message)}`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 1000);
}

sendMessage({ name: 'Ishaan', age: '21' });
