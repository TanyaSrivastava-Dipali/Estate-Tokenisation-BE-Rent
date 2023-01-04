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
});
const PropertyModel = mongoose.model("PropertyModel", PropertySchema);
export default PropertyModel;
