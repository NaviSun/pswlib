import Company from "../models/Сompany.js";

//Добавление компании
export const createCompany = async (req, res) => {
  try {
    await new Company({
      companyName: req.body.companyName,
      status: req.body.status,
    }).save();
    res.status(201).redirect("/auth/app");
  } catch (e) {
    console.log(e.message);
  }
};
//Добавление Подразделения
export const createDivision = async (req, res) => {
  try {
    const filter = { _id: req.body.id };
    // The result of `findOneAndUpdate()` is the document _before_ `update` was applied
    const result = await Company.findOne(filter);
    result.companyDivisions.push({name: req.body.divisionName, adress: req.body.adress});
    await result.save();
    res.status(201).redirect("/auth/app/company/" + req.body.id);
  } catch (e) {
    console.log(e.message);
  }
};

