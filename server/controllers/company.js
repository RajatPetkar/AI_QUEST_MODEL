import Company from "../models/company.js"

export const companyController = async (req, res) => {
    const { name, description, location, website, industry, founded, logo } = req.body;

    const company = new Company({
        name,
        description,
        location,
        website,
        industry,
        founded,
        logo
    });

    try {
        await company.save();
        res.status(201).json({ message: 'Company created successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error creating company', error: err });
    }
}