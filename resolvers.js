
const User = require('./models/user');
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = require("./constants");

const resolvers = {
    Query: {
        current: (_, args, { user }) =>{
            if (user) {
                return User.findOne({ where: { id: user.id } });
            }
            throw new Error("Sorry, you're not an authenticated user!");
        },

        allUser: (parent, args) => {
            return User.find({});
          }
    },

    Mutation: {
         async register(_, { username, name, phone, email, password }) {
            const user = await User.create({
                username,
                name,
                phone,
                email,
                password: await bcrypt.hash(password, 10),
            });

            return jsonwebtoken.sign({ id: user.id, phone: user.phone }, JWT_SECRET, {
                expiresIn: "3m",
            });
        },

         async login(_, { username, password }) {
             console.log("username is :", username)
            const user = await User.findOne({ where: { username } });
            console.log("user is: ",user);
            if (!user) {
                throw new Error(
                    "This user doesn't exist. Please, make sure to type the right login."
                );
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new Error("You password is incorrect!");
            }

            return jsonwebtoken.sign({ id: user.id, phone: user.phone }, JWT_SECRET, {
                expiresIn: "1d",
            });
        },
    },
};

module.exports = resolvers;