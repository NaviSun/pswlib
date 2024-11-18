import Categorys from "../models/Categorys.js";
import { getCompany, companyInfo, accessesCompany } from "../middlewares/company.middleware..js";
/* import {
  verifyAccess,
  verifyAuth,
  verifyPermission,
} from "../middlewares/index.js";
import {
  getUser,
  logoutUser,
  registerUser,
  removeUser,
} from "../services/auth.services.js";

const router = Router(); */

//список всех компаний
const appPage = async (req, res) => {
  const companyNames = await getCompany()
  const username = req.cookies.username 
  return res.status(200).render("companysPage", {companyNames, username});
};
//Страница компании
const companyPage = async (req, res) => {
  const username = req.cookies.username 
  const companyRes = await companyInfo(req.params.id)
  const accessesRes = await accessesCompany(req.params.id)
  return res.status(200).render("companyPage", {companyRes, accessesRes, username});
};

//Страница добавления Компаний
const companyAddPage = (req, res) => {
  const username = req.cookies.username 
  return res.status(200).render("companyform", {username});
};

//Странца добавлени Подразделений в Компанию
const divisionAddPage = (req, res) => {
  const username = req.cookies.username 
  const id = req.params.id;
  return res.status(200).render("divisionform", {username, id});
};

//Страница Справочника
const compendiumPage = (req, res) => {
  const username = req.cookies.username 
  return res.status(200).render("compendiumPage", { username });
};

//Страница добавления категорий в справочник
const categoryPage = async (req, res) => {
  const username = req.cookies.username 
  const categorys = await Categorys.find({});
  let category = categorys.map((item) => {
    return { name: item.name };
  });
  return res.status(200).render("categoryform", { category, username });
};

//Страница добавление доступов
const accessesPage = async (req, res) => {
  const username = req.cookies.username 
  const companyRes = await companyInfo(req.params.id);
  const categorys = await Categorys.find({});
  console.log(companyRes);
  let category = categorys.map((item) => {
    return { name: item.name, id: item._id };
  });

  return res.status(200).render("accessesform", { companyRes, category, username });
};

export { appPage, compendiumPage, categoryPage, companyAddPage, accessesPage, companyPage, divisionAddPage };
