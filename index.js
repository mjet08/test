import { resolve } from 'src/container'

const app = resolve('app')

app
  .start()
  .catch((error) => {
    app.logger.error(error.stack)
    process.exit()
  })
