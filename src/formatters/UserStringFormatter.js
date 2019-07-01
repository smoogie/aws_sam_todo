class UserStringFormatter {
    static format(user) {
        let jsonObject = {
            id: user.id,
            email: user.email
        };
        return JSON.stringify(jsonObject);
    }
}

module.exports = UserStringFormatter;