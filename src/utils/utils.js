import bcrypt from "bcrypt"
//hashear la contraseña
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//validar la contraseña
export const isValidPassword = ( user, password ) => bcrypt.compareSync( password, user.password )