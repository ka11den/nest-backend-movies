import { ObjectId } from "mongoose"

export class CreateComment {
  readonly username: string
  readonly text: string
  readonly movieId: ObjectId
}