import Accesses from "../models/Accesses.js";

export const createAccess = async (req, res) => {
  try {
    const access = await new Accesses({
      companyName: req.body.company_id,
      companyDivisions: req.body.companyDivisions,
      accesses: {
        category: req.body.category_id,
        name: req.body.accessname,
        host: req.body.host,
        login: req.body.login,
        password: req.body.password,
        method: req.body.method,
      },
    }).save();
    res.status(201).redirect(303, "/auth/app/company/" + req.body.company_id);
  } catch (e) {
    console.log(e.message);
  }
};
