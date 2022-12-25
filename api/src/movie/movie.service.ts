import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, UpdateQuery } from "mongoose";
import { Movie, MovieDocument } from './schemas/movie.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CreateComment } from './dto/create-comment.dto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
              @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
              private fileService: FileService) {}
  
  async create (dto: CreateMovieDto, movie, banner): Promise<Movie> {
    try {
      const moviePath = this.fileService.createFile(FileType.MOVIE, movie)
      const bannerPath = this.fileService.createFile(FileType.BANNER, banner)
      const createMovie = await this.movieModel.create({...dto, views: 0, movie: moviePath, banner: bannerPath,})
      return createMovie
    } catch (err) {
      console.log(err)
    }    
  }

  async edit (id: ObjectId, dto: CreateMovieDto | UpdateQuery<MovieDocument>) {
    try {
      const updateMovie = await this.movieModel.findByIdAndUpdate(id, {...dto}, {new: true})
      return updateMovie
    } catch (err) {
      console.log(err)
    }
  }

  async getAll () {
    try {
      const movies = await this.movieModel.find()
      return movies
    } catch (err) {
      console.log(err)
    }    
  }

  async get (id: ObjectId) {
    try {
      const movie = await this.movieModel.findById(id).populate('comments')
      return movie
    } catch (err) {
      console.log(err)
    }
  }

  async delete (id: ObjectId) {
    try {
      const delmovie = await this.movieModel.findByIdAndDelete(id)
      return delmovie
    } catch (err) {
      console.log(err)
    }
  }

  async createComment (dto: CreateComment): Promise<Comment> {
    const movie = await this.movieModel.findById(dto.movieId)
    const comment = await this.commentModel.create({...dto})
    movie.comments.push(comment._id)
    await movie.save()
    return comment
  }

  async watch (id: ObjectId) {
    const movie = await this.movieModel.findById(id)
    movie.views += 1
    movie.save()
  }

  async search (query:string): Promise<Movie[]> {
    const movies = await this.movieModel.find({
      title: {$regex: new RegExp(query)}
    })
    return movies
  }
}