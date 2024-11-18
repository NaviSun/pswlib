// import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { dirname } from "path";
import { fileURLToPath } from "url";
import expressHandlebars from "express-handlebars";
import cors from 'cors'
import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import {
  ALLOWED_ORIGIN,
  MONGODB_URI,
  SERVER_PORT
} from './config/index.js'
// import { setSecurityHeaders } from './middlewares/index.js'
import router from './routes/app.routes.js'
import morgan from 'morgan'
import { errorHandler } from './middlewares/errorHandler.js'
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const hbs = expressHandlebars.create({
  // Настройки основного Layout, хелперов
  defaultLayout: "main",
  extname: "hbs",
  helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
    partialsDir: ["views/partials/"],
  },
});
// Настройка механизма view handlebars
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");
//Фиксация путея для Публичной папки
app.use(express.static(__dirname + "/public"));

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    credentials: true
  })
)
// app.use(helmet())
// app.use(setSecurityHeaders)
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())

try {
  await mongoose.connect(MONGODB_URI)
  console.log('🚀 Connected to DB')
} catch (e) {
  console.log(`Error while connecting to DB: ${e}`)
}

app.use('/', router)

app.use(errorHandler)
app.listen(SERVER_PORT || 3000, () => {
  console.log(`🚀 Server ready on http://localhost:${SERVER_PORT || 3000}`)
})
