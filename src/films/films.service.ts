import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { FilmsEntities } from './entities/filmesEntities';
import { responseFilmsDTO } from './dto/filmsDTO';
import { updateFilmsDTO } from './dto/updateFilmsDTO';

@Injectable()
export class FilmsService {
    constructor(
        @InjectRepository(FilmsEntities)
        private readonly filmsRepository: Repository<FilmsEntities>,
    ){}


    async assessmentByUser(filmsDTO : responseFilmsDTO):Promise<FilmsEntities>{
        const films = this.filmsRepository.create(filmsDTO)
         
        return this.filmsRepository.save(films);
    }


    async updateFilms(updateFilms:updateFilmsDTO , filmId:number):Promise<FilmsEntities>{
        const film = await this.filmsRepository.findOne({ where: { id: filmId } });

        if(!film){
            throw new Error("Filme não encontrado")
        }   

        return this.filmsRepository.save(
            {
                ...film,
                ...updateFilms,
            }
        )
    }


    async deleteFilms(filmId: number):Promise<void>{
        const film = await this.filmsRepository.findOne({where:{id:filmId}})

        if(!film){
            throw new Error("Filme não encontrado")
        }

        await this.filmsRepository.delete(film)
    }

    
  
}
