import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { CreateProfileDto } from './dto/create-profile.dto';
import { FilesService } from 'src/files/files.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Op } from 'sequelize';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile) private readonly profileRepository: typeof Profile,
    private readonly fileService: FilesService,
  ) {}
  async createProfile(
    userId: number,
    dto: CreateProfileDto,
    avatar?: any,
    header?: any,
  ) {
    const candidate = await this.profileRepository.findOne({
      where: {
        userId,
      },
    });
    if (candidate) {
      throw new HttpException(
        `Profile already created`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const isUsernameUsed = await this.profileRepository.findOne({
      where: {
        username: dto.username,
      },
    });
    if (isUsernameUsed) {
      throw new HttpException(
        `Profile with username ${dto.username} already exist please choose another one`,
        HttpStatus.BAD_REQUEST,
      );
    }
    let avatarFileName,
      headerFileName = ' ';
    if (avatar) {
      avatarFileName = await this.fileService.createFile(avatar);
    }
    if (header) {
      headerFileName = await this.fileService.createFile(header);
    }

    const profile = await this.profileRepository.create({
      ...dto,
      userId: userId,
      avatar: avatarFileName,
      header: headerFileName,
    });
    return profile;
  }

  async getAllProfiles(limit: number = 25, offset: number = 0) {
    const profiles = await this.profileRepository.findAll({
      limit,
      offset,
    });
    return profiles;
  }

  async updateProfile(
    userId: number,
    dto: UpdateProfileDto,
    avatar?: any,
    header?: any,
  ) {
    const profile = await this.profileRepository.findOne({
      where: { userId },
    });
    if (!profile) {
      throw new HttpException(`Profile Not Found`, HttpStatus.BAD_REQUEST);
    }
    if (dto.username) {
      const isUsernameUsed = await this.profileRepository.findOne({
        where: {
          username: dto.username,
        },
      });
      if (isUsernameUsed) {
        throw new HttpException(
          `Profile with username ${dto.username} already exist please choose another one`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    let avatarFileName = '';
    let headerFileName = '';

    if (avatar) {
      avatarFileName = await this.fileService.createFile(avatar);
      await this.fileService.deleteFile(profile.avatar);
    }
    if (header) {
      headerFileName = await this.fileService.createFile(header);
      await this.fileService.deleteFile(profile.header);
    }
    await profile.update({
      ...dto,
      avatar: avatar ? avatarFileName : profile.avatar,
      header: header ? headerFileName : profile.header,
    });
    return profile;
  }
  async deleteProfile(userId: number) {
    const profile = await this.profileRepository.destroy({
      where: {
        userId,
      },
    });
    if (!profile) {
      throw new HttpException(`Profile Not Found`, HttpStatus.BAD_REQUEST);
    }
    return profile;
  }
  async getByUserName(username: string) {
    const profile = await this.profileRepository.findOne({
      where: { username },
      include: {
        all: true,
      },
    });
    return profile;
  }
  async getById(userId: number) {
    const profile = await this.profileRepository.findOne({
      where: {
        userId,
      },
    });
    return profile;
  }
  async getAllUsernames() {
    const usernames = await this.profileRepository.findAll({
      attributes: ['username'],
    });
    return usernames;
  }

  async getByQuery(query: string, limit: number = 25, offset: number = 0) {
    const profiles = await this.profileRepository.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: query + '%' } },
          { username: { [Op.iLike]: query + '%' } },
        ],
      },
      limit,
      offset,
    });
    return profiles;
  }
}
