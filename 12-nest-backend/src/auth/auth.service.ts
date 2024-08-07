import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './interfaces/JwtPayload.interface';
import { User } from './entities/user.entity';
import { LoginResponse } from './interfaces/login-response.interface';
import { CreateUserDto, UpdateAuthDto, LoginDto, RegisterUserDto } from './dto/indexDto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto):Promise<User> {
    
    try {
      
      const { password, ...userData } =  createUserDto;

      // 1. Encriptar la contraseña:
      const newUser = new this.userModel({
        password: bcryptjs.hashSync( password, 10 ),
        ...userData
      });

      // 2. Guardar el usuario:
      await newUser.save();
      const { password:_, ...returnUser } = newUser.toJSON();
      
      return returnUser;

    } catch (error) {
      if(error.code === 1100) throw new BadRequestException(`${ createUserDto.email } already exists`);
      throw new InternalServerErrorException('Something terrible happened');
    }
    
  }

  async register( registerUserDto: RegisterUserDto ): Promise<LoginResponse> {

    const user = await this.create( registerUserDto );

    return {
      user: user,
      token: this.getJwt({id: user._id })
    };

  }

  async login( loginDto: LoginDto ): Promise<LoginResponse> {

    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    // Validación de Usuario:
    if( !user ) throw new UnauthorizedException('Not valid credentials - email');
    if( !bcryptjs.compareSync( password, user.password ) ) throw new UnauthorizedException('Not valid credentials - password');

    const { password:_, ...rest } = user.toJSON();

    return{ 
      user: rest,
      token: this.getJwt({ id: user.id })
    };

  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById( userId: string ) {
    const user = await this.userModel.findById( userId );
    const { password, ...userData } = user.toJSON();
    return userData;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwt( payload: JwtPayload ) {
    const token = this.jwtService.sign( payload );
    return token;
  }

}
