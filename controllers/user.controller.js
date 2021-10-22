const { response, request } = require('express');
const User = require('../models/user');

const userGet = (req = request, res) => {
    const query = req.query;
    res.json({
        msg: 'Get',
        query
    })
}

const userPost = async (req, res = response) => {
    const body = req.body;
    const usuario = new User(body);
    await usuario.save();
    res.json({
        msg: 'Post',
        usuario
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