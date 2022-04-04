const router = require('express').Router();
const ProviderRepository = require('../../repositories/ProviderRepository');
const ProviderService = require('../../services/ProviderService');
const HttpStatus = require('../../responses/HttpStatus');

router.get('/', async (req, res, next) => {
    const result = await ProviderRepository.list(); 
    
    res.status(HttpStatus.success).json(result);
});

router.post('/', async (req, res, next) => {
    try {
        const provider = new ProviderService(req.body);

        const result = await provider.save();
    
        res.status(HttpStatus.success).json(result);
    }catch(error) {
        console.log(error);
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {

    try{
        const provider = new ProviderService({id:req.params.id}); 

        const result = await provider.load();
        
        res.status(HttpStatus.success).json(result);
    }catch(error) {
        next(error);
    }
    
});

router.put('/:id', async (req, res) => {
    try{
        const data = Object.assign({}, req.body, {id: req.params.id});
     
        const provider = new ProviderService(data); 

        const result = await provider.update();

        res.status(HttpStatus.success).json({message: 'success'});
    }catch(error) {
        next(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const provider = new ProviderService({id:req.params.id}); 

        const result = await provider.remove();
        
        res.status(HttpStatus.success).json({message: result});

    }catch(error) {
        next(error);
    }
})

module.exports = router;