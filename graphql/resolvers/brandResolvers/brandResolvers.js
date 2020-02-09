const Brand = require('../../../models/brand/Brand');
const checkAuth = require('../../../utls/checkAuth');

module.exports = {
    Mutation:{
        async addBrand(_,{name,image},context){
            const admin = checkAuth(context);

            try {
                let brand = await Brand.findOne({name});
                if(brand){
                    throw new Error('this brand is already exist');
                }

                brand = new Brand({
                    name,
                    image
                });

                const newBrand = await brand.save();
               
                return{
                    ...newBrand._doc,
                    id:newBrand.id
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}