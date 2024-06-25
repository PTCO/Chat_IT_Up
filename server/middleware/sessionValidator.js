module.exports = sessionValidator = (req, res, next) => {
    if(!req.session) {
        return res.status(205).send('User has been logged out!')    
    }
    next()
}