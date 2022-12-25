import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { Movie } from "./movie.schema";

export type CommentDocument = Comment & mongoose.Document

@Schema()
export class Comment {
  @Prop()
  name: string

  @Prop()
  text: string

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Movie'})
  movie: Movie;
}

export const CommentSchema = SchemaFactory.createForClass(Comment)