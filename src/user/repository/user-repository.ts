import {  Repository } from 'typeorm';
import { UserEntity } from '../entities/userEntity';

export class UserRepository extends Repository<UserEntity>{}