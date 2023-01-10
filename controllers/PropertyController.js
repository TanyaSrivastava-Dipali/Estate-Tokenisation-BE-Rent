// eslint-disable-next-line import/extensions
import PropertyModel from "../models/PropertyModel.js";

export const createNewProperty = async (req, res) => {
	try {
		const newProperty = new PropertyModel({
			propertyTokenId: req.body.propertyTokenId,
		});
		const property = await newProperty.save();
		res.status(201).json({
			status: "Success",
			message: "property created successfully",
			propertyDetail: property,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "Fail",
			err,
		});
	}
};
// eslint-disable-next-line consistent-return
export const getPropertystatus = async (req, res) => {
	try {
		const Property = await PropertyModel.findOne({
			propertyTokenId: req.params.propertyTokenId,
		});
		if (!Property) {
			return res.status(404).json({
				status: "Fail",
				message: "Not found Property details for this propertyId",
			});
			// eslint-disable-next-line no-else-return
		} else {
			res.status(200).json({
				status: "Success",
				message: " property details fetched successfully",
				PropertyDetail: Property,
			});
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: "Fail",
			err,
		});
	}
};
// eslint-disable-next-line consistent-return
export const getAllPropertystatus = async (req, res) => {
	try {
		const Property = await PropertyModel.find();
		if (!Property) {
			return res.status(404).json({
				status: "Fail",
				message: "Empty collection",
			});
			// eslint-disable-next-line no-else-return
		} else {
			res.status(200).json({
				status: "Success",
				message: " property details fetched successfully",
				PropertyDetail: Property,
			});
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: "Fail",
			err,
		});
	}
};
// eslint-disable-next-line consistent-return
export const changeListingStatus = async (req, res) => {
	try {
		const Property = await PropertyModel.findOne({
			propertyTokenId: req.params.propertyTokenId,
		});
		if (!Property) {
			return res.status(404).json({
				status: "Fail",
				message: "Not found Propertydetails for this propertyId",
			});
			// eslint-disable-next-line no-else-return
		} else {
			Property.isListed = true;
			await Property.save();
			res.status(200).json({
				status: "Success",
				message: "listing status changed successfully",
				PropertyDetail: Property,
			});
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: "Fail",
			err,
		});
	}
};
