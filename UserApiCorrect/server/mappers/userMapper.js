module.exports = {
    map: function map(userModel){
        var userResource = {
            id: userModel._id,
            name: `${userModel.firstName} ${userModel.lastName}`,
            age: userModel.age,
            email: userModel.email,
            address: userModel.homeAddress.addressLine,
            city: userModel.homeAddress.city,
            zip: userModel.homeAddress.zip
        }
        return userResource;
    }
}
