import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { queues } from './submodules/backend-social-1.0-rmq/src/constants/rmqQueues';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://yscfodyg:cDk7kIHZOqn5qXqRYtmlHVwvC_2fQtb9@puffin.rmq2.cloudamqp.com/yscfodyg',
      ],
      queue: queues.CONTENT_SERVICE_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(5000);
}
bootstrap();
