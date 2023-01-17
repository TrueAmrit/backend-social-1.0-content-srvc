import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './modules/content/content.module';
import { Content } from './submodules/backend-social-1.0-entities/src/entities/content.entity';
import { Group } from './submodules/backend-social-1.0-entities/src/entities/group.entity';
import { Option } from './submodules/backend-social-1.0-entities/src/entities/option.entity';
import { User } from './submodules/backend-social-1.0-entities/src/entities/user.entity';
import { queues } from './submodules/backend-social-1.0-rmq/src/constants/rmqQueues';
import { MsgBrokerService } from './submodules/backend-social-1.0-rmq/src/module/msg-broker-ops/msg-broker-ops.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-soft-star-756347.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'amritgupta1018',
      password: 'XOMjT6aq3Ibp',
      database: 'neondb',
      entities: [User, Content, Option, Group],
      synchronize: true,
      logging: true,
      ssl: true,
    }),
    ClientsModule.register([
      {
        name: 'CONTENT_SERVICE_QUEUE',
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
      },
    ]),
    ContentModule,
  ],
  controllers: [AppController],
  providers: [AppService, MsgBrokerService],
})
export class AppModule {}
