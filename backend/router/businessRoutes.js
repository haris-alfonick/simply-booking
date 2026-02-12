const express = require('express');
const router = express.Router();

const { createDomain, checkDomain, uploadImage, createBusiness, updateBusiness, getBusinessById, getDomain, deleteBusiness, threedomains, getAllBusinesses } = require('../controllers/businessControllers');
const upload = require('../middleware/upload');
const {verifyToken,isAdmin} = require('../middleware/VerifyToken');
// router.use(verifyToken)
// router.use(isAdmin)
router.post('/generate-domain',verifyToken, createDomain);
router.get('/check-domain/:domain',verifyToken, checkDomain);
router.post('/upload-image', uploadImage);
router.post('/', upload.fields([
    { name: 'businessLogo', maxCount: 1 },
    { name: 'businessCoverPhoto', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },

]), createBusiness);
router.get('/', isAdmin,getAllBusinesses);
router.put('/:id',isAdmin, updateBusiness);
router.get('/:id', getBusinessById);
router.get('/domain/:domain', getDomain);
router.delete('/:id', deleteBusiness);

router.post('/generate-domainss', threedomains);

module.exports = router;
