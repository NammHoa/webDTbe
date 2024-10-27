const Product = require('../model/ProductModel')


const createProduct = (newProduct) => {
    return new Promise(async(resolve, reject) => {
        const {name, image, type, price, countInStock, rating, description} = newProduct
        try{
           const checkProduct = await Product.findOne({
               name: name
           })
           if(checkProduct !== null){
               resolve({
                   status: 'OKE',
                   message: 'The name of product is already'
               })
           }

           const newProduct = await Product.create({
                name,
                image, 
                type, 
                price, 
                countInStock, 
                rating, 
                description
           })
           if(newProduct){
               resolve({
                   status: 'OKE',
                   message: 'SUCCESS',
                   data: newProduct
               })
           }
        }catch(e){
            reject(e)
        }
    })
}

const updateProduct = (id,data) => {
    return new Promise(async(resolve, reject) => {
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null){
                resolve({
                    status: 'OKE',
                    message: 'The product is not defined'
                })
           }
           const updatedProduct = await Product.findByIdAndUpdate(id,data,{new: true})
            resolve({
                status: 'OKE',
                message: 'SUCCESS',
                data: updatedProduct
            })
        }catch(e){
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async(resolve, reject) => {
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null){
                resolve({
                    status: 'OKE',
                    message: 'The product is not defined'
                })
           }
           await Product.findByIdAndDelete(id)
            resolve({
                status: 'OKE',
                message: 'Delete product SUCCESS',
            })
        }catch(e){
            reject(e)
        }
    })
}


const deleteManyProduct = (ids) => {
    console.log('_ids', ids)
    return new Promise(async(resolve, reject) => {
        try{
           await Product.deleteMany({_id: ids})
            resolve({
                status: 'OKE',
                message: 'Delete product SUCCESS',
            })
        }catch(e){
            reject(e)
        }
    })
}

const getDetailsProduct  = (id) => {
    return new Promise(async(resolve, rejact) => {
        try{
            const product = await Product.findOne({
                _id: id
            })
            if(product === null){
                resolve({
                    status: 'OKE',
                    message: 'The product is not defined'
                })
           }
            resolve({
                status: 'OKE',
                message: 'SUCCESS',
                data: product
            })
        }catch(e){
            rejact(e)
        }
    })
}

const getAllProduct = (limit , page, sort, filter) => {
    return new Promise(async(resolve, reject) => {
        try{
        const totalProduct = await Product.countDocuments()
        if(filter){
            const lable = filter[0];
            const allObjectFilter= await Product.find({[lable]: {'$regex': filter[1]}}).limit(limit).skip(page*limit)
                resolve({
                    status: 'OKE',
                    message: 'SUCCESS',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page+1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
        }
        if(sort){
            const objectSort = {}
            objectSort[sort[1]] = sort[0]
            const allProductSort= await Product.find().limit(limit).skip(page*limit).sort(objectSort)
                resolve({
                    status: 'OKE',
                    message: 'SUCCESS',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page+1),
                    totalPage: Math.ceil(totalProduct / limit)
                })

        }
        const allProduct= await Product.find().limit(limit).skip(page*limit)
            resolve({
                status: 'OKE',
                message: 'SUCCESS',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page+1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        }catch(e){
            reject(e)
        }
    })
}

const getAllType = () => {
    return new Promise(async(resolve, reject) => {
        try{
        const allType= await Product.distinct('type')
            resolve({
                status: 'OKE',
                message: 'SUCCESS',
                data: allType,
            })
        }catch(e){
            reject(e)
        }
    })
}





module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType

}