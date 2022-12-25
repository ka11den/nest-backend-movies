import { Controller, Get, Query } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { Post, Body, Put, Param, Delete, UploadedFile, UseInterceptors, UploadedFiles } from "@nestjs/common/decorators";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { ObjectId } from "mongoose";
import { Movie } from "./schemas/movie.schema";
import { Comment } from "./schemas/comment.schema";
import { CreateComment } from "./dto/create-comment.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express/multer";
import { query } from "express";

@Controller('/movie')

export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'movie', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
  ]))
  create (@UploadedFiles() files, @Body() dto: CreateMovieDto) {
    const { movie, banner } = files
    return this.movieService.create(dto, movie[0], banner[0])
  }

  @Put(':id')
  edit (@Param('id') id: ObjectId, @Body() dto: CreateMovieDto): Promise<Movie> {
    return this.movieService.edit(id, dto)
  }

  @Get()
  getAll (): Promise<Movie[]> {
    return this.movieService.getAll()
  }

  @Get(':id')
  get (@Param('id') id: ObjectId): Promise<Movie> {
    return this.movieService.get(id)
  }

  @Delete(':id')
  delete (@Param('id') id: ObjectId): Promise<Movie> {
    return this.movieService.delete(id)
  }

  @Post('/comment')
  createComment(@Body() dto: CreateComment): Promise<Comment> {
    return this.movieService.createComment(dto)
  }

  @Post('/watch/:id')
  watch (@Param('id') id: ObjectId) {
    return this.movieService.watch(id)
  }

  @Get('/search')
  search (@Query('query') query: string) {
    return this.movieService.search(query)
  }
}