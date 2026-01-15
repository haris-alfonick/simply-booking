const express = require('express');
const router = express.Router();

const { createDomain, checkDomain, uploadImage, createBusiness, updateBusiness, getBusinessById,
    getDomain, deleteBusiness } = require('../controllers/businessControllers');
const upload = require('../middleware/upload');

router.post('/generate-domain', createDomain);
router.get('/check-domain/:domain', checkDomain);
router.post('/upload-image', uploadImage);
router.post('/', createBusiness,);
// router.post('/api/businesses', upload.fields([
//   { name: 'businessLogo', maxCount: 1 },
//   { name: 'businessCoverPhoto', maxCount: 1 },
// ]), createBusiness);
router.put('/:id', updateBusiness);
router.get('/:id', getBusinessById);
router.get('/domain/:domain', getDomain);
router.delete('/:id', deleteBusiness);


module.exports = router;
