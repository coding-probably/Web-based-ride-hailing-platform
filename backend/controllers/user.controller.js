const userModel = require('../models/user.model');

// for creating user
const userService = require('../services/user.service');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    // check if request is correct

    const { fullname, email, password } = req.body;


    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: 'User already exist' });
    }


    const firstname = fullname.firstname;
    const lastname = fullname.lastname;
    try {
        const hashedPassword = await userModel.hashPassword(password);
        const user = await userService.createUser({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        const token = user.generateAuthToken();
        res.status(201).json({ token, user })

    } catch (error) {
        console.log("error occired ---------------------------->");
        console.log(error);
        res.status(500).json({ error });

    }
}


module.exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.staus(401).json({ message: 'Invalid email or passwrod' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.staus(401).json({ message: 'Invalid email or passwrod' });
        }

        const token = user.generateAuthToken();

        res.cookie('token', token);
        res.status(200).json({ token, user });


    } catch (error) {
        console.log("error occured during login---->");
        console.log(error);
        res.status(404).json({ error });
    }

}


module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    const token = res.cookies.token || req.header.authorization.split(' ')[1];
    
    await blacklistTokenModel.create({ token });
    
    res.clearCookie('token');
    
    res.status(200).json({ messsage: 'Logged Out' });
}