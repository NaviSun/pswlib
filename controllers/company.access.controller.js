import Accesses from "../models/Accesses.js";

export const createAccess = async (req, res) => {
  try {
    if (req.body.companyDivisions) {
      const values = JSON.parse(req.body.companyDivisions);
      const access = await new Accesses({
        companyName: req.body.company_id,
        Divisions: {
          id: values.id,
          name: values.name,
        },
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
    } else {
      const access = await new Accesses({
        companyName: req.body.company_id,
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
    }
  } catch (e) {
    console.log(e.message);
  }
};
