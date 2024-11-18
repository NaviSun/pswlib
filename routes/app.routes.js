import { Router } from "express";
// import authRoutes from './auth.routes.js'
import { loginUser } from "../services/login.service.js";
import { mainPaige } from "./main.routes.js";
import { authorization, logout } from "../services/auth.service.js";
import {
  appPage,
  compendiumPage,
  categoryPage,
  companyPage,
  companyAddPage,
  divisionAddPage,
  accessesPage,
  divisionPage,
} from "./auth.routes.js";
import { createCompany, createDivision } from "../controllers/company.controller.js";
import { createCategory } from "../controllers/category.controller.js";
import { createAccess } from "../controllers/company.access.controller.js";

const router = Router();
//Страница Авторизации
router.get("/", mainPaige);
//Метод Авторизации
router.post("/login", loginUser);
//Метод ЛогАута
router.get("/auth/logout", authorization, logout);
//Главная страница, список клиентов
router.get("/auth/app", authorization, appPage);
//Страница компании
router.get("/auth/app/company/:id", authorization, companyPage);
//Страница подразделения компании
router.get("/auth/app/company/division/:id", authorization, divisionPage);
//Страница добавления компании
router.get("/auth/app/company", authorization, companyAddPage);
//Справочники
router.get("/auth/compendium", authorization, compendiumPage);
//Справочник добавление категорий
router.get("/auth/compendium/category", authorization, categoryPage);

//Страница добавления подразделения в компанию
router.get("/auth/app/company/divisions/:id", authorization, divisionAddPage);
//Страница добавления доступов устройств компании
router.get("/auth/app/company/device/:id", authorization, accessesPage);
//Метода справочника
//Добавление категорий
router.post("/auth/compendium/createcategory", authorization, createCategory);
//Добавление компаний
router.post("/auth/app/company/createcompany", authorization, createCompany);
//Добавление подразделений
router.post("/auth/app/company/division/createdivision", authorization, createDivision);
//Добавление Устройств
router.post("/auth/app/company/createdevice", authorization, createAccess);

export default router;
