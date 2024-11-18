import Accesses from "../models/Accesses.js";
import Company from "../models/Сompany.js";


//Имя компании
const getCompany = async () => {
  const result = await Company.find();

  let res = result.map((item) => ({
    id: item._id,
    company: item.companyName,
    date: item._id.getTimestamp().toISOString().substring(0,10),
    status: item.status
  }));
  return res;
};
//Метод получения id и Имени Клиента
const companyInfo = async (id, param = '_id') => {
  const result = await Company.find({[`${param}`]: id})
  const res = result.map((item) => ({
    id: item._id,
    company: item.companyName,
    companyDivisions: item.companyDivisions.map((item) => ({
      name: item.name,
      adress: item.adress,
      id: item._id
    })) 
  }));
  return res[0]
}

const accessesCompany = async (id, param = 'companyName') => {
  const accesses = await Accesses.find({[`${param}`]: id}).populate('accesses.category').sort('Divisions.name')
  console.log(param);
  if(accesses.length > 0){
    const access = accesses.map((item) => ({
      id: item._id,
      name: item.accesses.name,
      host: item.accesses.host,
      login: item.accesses.login,
      password: item.accesses.password,
      method: item.accesses.method,
      category: item.accesses.category.name,
      division: item.Divisions.name
    }));
    return access
  }
  return null
  
}

export { getCompany, companyInfo, accessesCompany };

