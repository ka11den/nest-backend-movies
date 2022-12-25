import { Module } from "@nestjs/common";
import { MovieModule } from "./movie/movie.module";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import path from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
    MongooseModule.forRoot('mongodb+srv://ka11den:ka11den@cluster0.evziffw.mongodb.net/?retryWrites=true&w=majority'),
    MovieModule,
    FileModule
  ]
})

export class AppModule {}