const UserAdmin = require('../../../models/useradmin/UserAdmin');
const bcryptJs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const checkAuth = require('../../../utls/checkAuth');

module.exports = {

    Mutation:{
        async registerUserAdmin(_,{name,mobile,password,confirmPassword},context){

            const auth = checkAuth(context);
            try {
                const useradmin = await UserAdmin.findOne({mobile});
                if(useradmin){
                    throw new Error("User Admin already exist");
                }
                if(name === ""){
                    throw new Error('Name can not be empty')
                }
                if(mobile === ""){
                    throw new Error('Mobile can not be empty');
                }
                if(password === ""){
                    throw new Error('Password can not be empty');
                }
                if(password != confirmPassword){
                    throw new Error('Password must be match');
                }

                const newUserAdmin = new UserAdmin({
                    name,
                    mobile,
                    password

                });

                const salt = await bcryptJs.genSalt(10);
                const hashPassword = await bcryptJs.hash(password,salt);
                newUserAdmin.password = hashPassword;

                const saveUserAdmin = await newUserAdmin.save();

                const token  = jwt.sign({id:saveUserAdmin.id,mobile:saveUserAdmin.mobile,name:saveUserAdmin.name},config.get('secretKey'),{
                    expiresIn:'1h'
                })

                return {
                    ...saveUserAdmin._doc,
                    id:saveUserAdmin.id,
                    token
                }
            } catch (error) {
                throw new Error ("Internal server Error" + error);
            }
        },

        async loginAdmin(_,{mobile,password},context){
            try {
                const admin = await UserAdmin.findOne({mobile});
                if(!admin){
                    throw new Error("user admin does not exist");
                }

                const match = await bcryptJs.compare(password,admin.password);
                if(!match){
                    throw new Error('Password does not correct');
                }

                const token  = jwt.sign({id:admin.id,mobile:admin.mobile,name:admin.name},config.get('secretKey'),{
                    expiresIn:'1h'
                });

                return{
                    ...admin._doc,
                    id:admin.id,
                    token
                }

            } catch (error) {
                throw new Error("Internal server Error" + error);
            }
        }
    }
}