import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
Object.defineProperty(exports, '__esModule', { value:true })

const start = async () => {
  try {
    const port = 5000
    const app = await NestFactory.create(AppModule)

    await app.listen(port, () => {
      console.log('backend is started!')
    })
  } catch (err) {
    console.log(err)
  }
}

start()