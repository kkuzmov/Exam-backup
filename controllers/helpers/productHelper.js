exports.validateProduct = function(req, res, next){
    let isValid = true;

    if(req.body.name.trim().length < 2){
        isValid = false;
    }else if(!req.body.imageUrl){
        isValid = false;
    }

    if(isValid){
        next()
    }
}

// MIDDLEWARE, КОЙТО ИГРАЕ РОЛЯ НА ВАЛИДАТОР - ВЕРОЯТНО ЩЕ ОТПАДНЕ ЗА ОКОНЧАТЕЛНИЯ ПРОЕКТ
// NEXT() СЕ ИЗПОЛЗВА, ЗА ДА ПРЕМИНЕ КЪМ СЛЕДВАЩИЯ HANDLER, КОГАТО MIDDLEWARE-ЪТ Е ИЗПЪЛНИЛ ФУНКЦИЯТА СИ