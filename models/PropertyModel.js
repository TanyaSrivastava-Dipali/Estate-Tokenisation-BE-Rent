/* eslint-disable prettier/prettier */
/* eslint-disable func-names */
import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
	propertyTokenId: {
		type: Number,
		required: [true, "propertyTokenId can not be null"],
		unique: [true, "propertyTokenIdmust be unique"],
	},
	isListed: {
		type: Boolean,
		required: true,
		default: false,
	},
	isCreated: {
		type: Boolean,
		required: true,
		default: true,
	},
	uri: {
		type: String,
		required: [true, "A URI is required"],
	},
	propertyName: {
		type: String,
		required: [true, "A property Name is required"],
	},
	location: {
		type: String,
		required: [true, "Location is required"],
	},
	taxID: {
		type: String,
		required: [true, "A taxID is required"],
	},
});
const PropertyModel = mongoose.model("PropertyModel", PropertySchema);
export default PropertyModel;
