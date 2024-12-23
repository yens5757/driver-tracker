const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    package_id: {
        type: String,
        default: function() {
            return generateID();
        },
        unique: true
    },
    package_title: {
        type: String,
        required: [true, 'Package title is required.'],
        validate: {
            validator: function (title) {
                return /^[A-Za-z0-9]{3,15}$/.test(title);
            },
            message: 'Package title must be alphanumeric and between 3 to 15 characters long.'
        }
    },
    package_weight: {
        type: Number,
        required: [true, 'Package weight is required.'],
        validate: {
            validator: function (weight) {
                return weight > 0;
            },
            message: 'Package weight must be a positive number greater than 0.'
        }
    },
    package_destination: {
        type: String,
        required: [true, 'Package destination is required.'],
        validate: {
            validator: function (destination) {
                return /^[A-Za-z0-9]{5,15}$/.test(destination);
            },
            message: 'Package destination must be alphanumeric and between 5 to 15 characters long.'
        }
    },
    description: {
        type: String,
        validate: {
            validator: function (description) {
                return description.length <= 30;
            },
            message: 'Description must be at most 30 characters long.'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAllocated: {
        type: Boolean,
        required: [true, 'Is Allocated field is required.']
    },
    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: [true, 'Driver ID is required.'],
        validate: {
            validator: async function(driverId) {
                const driverExists = await mongoose.model('Driver').exists({ _id: driverId });
                return driverExists;
            },
            message: 'The provided Driver ID does not exist.'
        }
    }
});

// Function to generate the custom package ID
function generateID() {
    let packageID = "P";

    for (let i = 0; i < 2; i++) {
        packageID += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    packageID += "-AL-";

    for (let i = 0; i < 3; i++) {
        packageID += Math.floor(Math.random() * 10);
    }
    return packageID;
}

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;