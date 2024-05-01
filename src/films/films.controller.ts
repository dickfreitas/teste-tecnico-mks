import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { FilmsService } from './films.service';
import { responseFilmsDTO } from './dto/filmsDTO';
import { FilmsEntities } from './entities/filmesEntities';
import { updateFilmsDTO } from './dto/updateFilmsDTO';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';



@Controller('films')
export class FilmsController {

    constructor(private readonly filmsService:FilmsService){}

    @Roles(UserType.User)
    @Post()
    async addFilms(@Body() respondeFilmsDTO : responseFilmsDTO):Promise<FilmsEntities>{

        return this.filmsService.assessmentByUser(respondeFilmsDTO)
    }

    
    @Roles(UserType.User)
    @Patch('/:filmsId')
    async updateFilms(@Body() updateFilms: updateFilmsDTO, @Param("filmsId") filmsId:number){
        return this.filmsService.updateFilms(updateFilms , filmsId)
    }

    @Roles(UserType.Admin)
    @Delete('/:filmsId')
    async delete(@Param("filmsId") filmsId:number){
        return this.filmsService.deleteFilms(filmsId)
    }
}
