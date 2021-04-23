const {response, request} = require('express')


const userGet =  (req = request, res) => {
    
const query = req.query;

    res.json({
        msg: 'Get',
        query
    })
}

const userPost = (req, res = response) => {
    const {nombre, edad} = req.body;

    res.json({
        msg: 'Post',
        nombre,
        edad
    })
}

const userPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'PUT -Controllador',
        id
    })
}

const userDelete = (req, res) => {
    res.json({
        msg: 'Delete'
    })
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
}