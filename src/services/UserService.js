const User = require('../model/UserModel')
const UserService = require('../services/UserService')
const bcrypt = require("bcrypt")

const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise(async(resolve, rejact) => {
        const {name, email, password, confirmPassword, phone} = newUser
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null){
                resolve({
                    status: 'OKE',
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password,10)
            console.log('hash', hash)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            })
            if(createdUser){
                resolve({
                    status: 'OKE',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        }catch(e){
            rejact(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async(resolve, rejact) => {
        const {name, email, password, confirmPassword, phone} = userLogin
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null){
                resolve({
                    status: 'OKE',
                    message: 'The user is not defined'
                })
            }

            const comparePassword = bcrypt.compareSync(password,checkUser.password)

            if(!comparePassword){
                resolve({
                    status: 'OKE',
                    message: 'The user or password is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'OKE',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
        }catch(e){
            rejact(e)
        }
    })
}

const updateUser = (id,data) => {
    return new Promise(async(resolve, rejact) => {
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            if(checkUser === null){
                resolve({
                    status: 'OKE',
                    message: 'The user is not defined'
                })
           }
           const updatedUser = await User.findByIdAndUpdate(id,data,{new: true})
            resolve({
                status: 'OKE',
                message: 'SUCCESS',
                data: updatedUser
            })
        }catch(e){
            rejact(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async(resolve, rejact) => {
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            if(checkUser === null){
                resolve({
                    status: 'OKE',
                    message: 'The user is not defined'
                })
           }
           await User.findByIdAndDelete(id)
            resolve({
                status: 'OKE',
                message: 'Delete SUCCESS',
            })
        }catch(e){
            rejact(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async(resolve, rejact) => {
        try{
        const allUser= await User.find()
            resolve({
                status: 'OKE',
                message: 'SUCCESS',
                data: allUser
            })
        }catch(e){
            rejact(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async(resolve, rejact) => {
        try{
            const user = await User.findOne({
                _id: id
            })
            if(user === null){
                resolve({
                    status: 'OKE',
                    message: 'The user is not defined'
                })
           }
            resolve({
                status: 'OKE',
                message: 'SUCCESS',
                data: user
            })
        }catch(e){
            rejact(e)
        }
    })
}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}