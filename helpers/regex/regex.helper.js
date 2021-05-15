module.exports = isValidUsername = (name) => {
    const valid_name = new RegExp(`/\^[A-Za-z]/\/\w{5, 29}$/`);
    return valid_name(name);
}