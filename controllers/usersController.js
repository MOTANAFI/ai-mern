//*---- Registeration ---
const register = async (req, res) => {
    res.json({
        status: true,
        message: "Registeration was successfull"
    })
}
//*------ Login -----
//*------ Logout -----
//*------ Check user Auth Status -----

module.exports = {
    register
}
