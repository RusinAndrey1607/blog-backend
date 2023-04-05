import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  UseGuards,
  Req,
  Get,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags("Profile")
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService) {}

  @ApiSecurity("JWT-AUTH")
  @Post('/create')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatar' }, { name: 'header' }]),
  )
  @UseGuards(JwtAuthGuard)
  create(
    @Body() dto: CreateProfileDto,
    @UploadedFiles() files,
    @Req() req: Request,
  ) {
    //@ts-ignore
    const userId = req.user.id;
    const avatarArr = files.avatar;
    const headerArr = files.header;

    const header = headerArr ? headerArr[0] : undefined;
    const avatar = avatarArr ? avatarArr[0] : undefined;
    const profile = this.profileService.createProfile(
      userId,
      dto,
      avatar,
      header,
    );
    return profile;
  }
  @ApiSecurity("JWT-AUTH")
  @Put('/update')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatar' }, { name: 'header' }]),
  )
  @UseGuards(JwtAuthGuard)
  update(
    @Body() dto: UpdateProfileDto,
    @UploadedFiles() files,
    @Req() req: Request,
  ) {
    //@ts-ignore
    const userId = req.user.id;
    const avatarArr = files.avatar;
    const headerArr = files.header;

    const header = headerArr ? headerArr[0] : undefined;
    const avatar = avatarArr ? avatarArr[0] : undefined;
    const profile = this.profileService.updateProfile(
      userId,
      dto,
      avatar,
      header,
    );
    return profile;
  }
  @Get('/')
  getByQuery(@Query() query) {
    const limit = query.limit;
    const offset = query.offset;
    if (!query.query) {
      return this.profileService.getAllProfiles(limit, offset);
    }
    return this.profileService.getByQuery(query.query, limit, offset);
  }

  @Get('/usernames')
  getAll() {
    return this.profileService.getAllUsernames();
  }

  @Get('/:username')
  getByUsernmae(@Param('username') username: string) {
    return this.profileService.getByUserName(username);
  }

  @ApiSecurity("JWT-AUTH")
  @UseGuards(JwtAuthGuard)
  @Delete('/')
  delete(@Req() req: Request) {
    //@ts-ignore
    const userId = req.user.id;
    return this.profileService.deleteProfile(userId);
  }
}
