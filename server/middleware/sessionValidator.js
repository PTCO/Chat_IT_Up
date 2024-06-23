module.exports = sessionValidator = (req, res, next) => {
    if(!req.session || req.session.userid !== req.params.userid) {
        return res.status(205).send('User has been logged out!')    
    }
    next()
}