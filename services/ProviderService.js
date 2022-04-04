const Providers = require('../repositories/ProviderRepository');
const ApiError = require('../responses/ApiError');

class ProviderService {

    constructor({ id, company, email, category }) {
        this.id = id;
        this.company = company;
        this.email = email;
        this.category = category;
    }

    async save() {
        this.validate();

        const result = await Providers.insert({
            company: this.company,
            category: this.category,
            email: this.email
        });

        this.id = result.id;
        this.created_at = result.createdAt;
        this.updated_at = result.updatedAt;

        return this;
    }

    async load() {
        const provider = await Providers.get(this.id);
        this.company = provider.company;
        this.email = provider.email;
        this.category = provider.category;
        this.createdAt = provider.createdAt;
        this.updatedAt = provider.updatedAt;

        return this;
    }

    async remove() {
        const provider = await Providers.get(this.id);
        await Providers.delete(provider.id);

        return 'success'; 
    }

    async update() {
        await Providers.get(this.id);
        const fields = ['company', 'email', 'category'];

        const data = {};
        
        fields.forEach((field) => {
            const value = this[field];
            if(typeof value === 'string' && value.length > 0) {
                data[field] = value;
            }
        })

        if(! Object.keys(data).length) {
            throw new ApiError('Invalid data to update a provider');
        }

        await Providers.update(this.id, data);
    }

    validate () {
        const fields = ['company', 'email', 'category'];

        fields.forEach((field) => {
            const value = this[field];
            
            if(typeof value !== 'string' || ! value.length) {
                throw new ApiError(`The ${field} field is invalid`);
            }
        })
    }

}

module.exports = ProviderService;