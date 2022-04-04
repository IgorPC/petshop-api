const model = require('../database/model/Provider');
const ApiError = require('../responses/ApiError');
const HttpStatus = require('../responses/HttpStatus');

module.exports = {
    list() {
        return model.findAll({
            attributes: [
                'id', 'email', 'company'
            ]
        });
    },

    insert(provider) {
        return model.create(provider);
    },

    async get(id) {
        const provider = await model.findOne({
            where: {
                id: id
            }
        });

        if(! provider) {
            throw new ApiError('Provider not found', HttpStatus.not_found); 
        }

        return provider;
    },

    async delete(id) {
        return model.destroy({
            where: {id: id}
        });
    },

    async update(id, data) {
        return model.update(data, {
            where: {id: id}
        });
    }
}