
//Страница Авторизации
export const mainPaige = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(200).render('loginform', {layout: 'loginform'})
    } else {
        res.status(303).redirect('/auth/app')
    }
    
} 