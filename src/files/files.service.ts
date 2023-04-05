import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Unexpected error while writing file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteFile(fileName:string){
    try {
      const filePath = path.resolve(__dirname, '..', 'static');
      fs.unlink(path.join(filePath, fileName),() =>{
        console.log(`File with filename ${fileName} deleted`);
        
      })
    } catch (error) {
      throw new HttpException(
        'Unexpected error while deleting file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
