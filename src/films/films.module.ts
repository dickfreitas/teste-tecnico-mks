import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsEntities } from './entities/filmesEntities';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { UserModule } from 'src/user/user.module';

@Module({
    imports:[TypeOrmModule.forFeature([FilmsEntities]), UserModule],
    controllers: [FilmsController],
    providers: [FilmsService],
    exports:[FilmsService]
})
export class FilmsModule {
}
