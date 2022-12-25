import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'

export type MovieDocument = Movie & mongoose.Document

@Schema()
export class Movie {
  @Prop()
  title: string

  @Prop()
  desc: string

  @Prop()
  views: number

  @Prop()
  raiting: number

  @Prop()
  movie: string

  @Prop()
  banner: string

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
  comments: Comment[]
}

export const MovieSchema = SchemaFactory.createForClass(Movie)