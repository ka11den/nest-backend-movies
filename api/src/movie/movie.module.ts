import { Module } from "@nestjs/common";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Movie, MovieSchema } from "./schemas/movie.schema";
import { Comment, CommentSchema } from "./schemas/comment.schema";
import { FileService } from "src/file/file.service";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Movie.name, schema: MovieSchema}]),
    MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])
  ],
  controllers: [MovieController],
  providers: [MovieService, FileService]
})

export class MovieModule {}