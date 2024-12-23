const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    driver_id: {
        type: String,
        default: function() {
            return generateID();
        },
        unique: true
    },
    driver_name: {
        type: String,
        required: [true, 'Driver name is required.'],
        validate: {
            validator: function (name) {
                return /^[A-Za-z ]{3,20}$/.test(name);
            },
            message: 'Driver name must contain only alphabetic characters and spaces, between 3 and 20 characters long.'
        }
    },
    driver_department: {
        type: String,
        required: [true, 'Driver department is required.'],
        validate: {
            validator: function (dept) {
                return ['food', 'furniture', 'electronic'].includes(dept);
            },
            message: 'Driver department must be one of the following: food, furniture, electronic.'
        }
    },
    driver_licence: {
        type: String,
        required: [true, 'Driver licence is required.'],
        validate: {
            validator: function (licence) {
                return /^[A-Za-z0-9]{5}$/.test(licence);
            },
            message: 'Driver licence must be alphanumeric and exactly 5 characters long.'
        }
    },
    driver_isActive: {
        type: Boolean,
        required: [true, 'Driver activity status is required.']
    },
    driver_createdAt: {
        type: Date,
        default: Date.now
    },
    assigned_packages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    }]
});

// Function to generate the custom driver ID
function generateID() {
    // the id starts with D
    let driverID = "D";

    // add 2 singe digit and hyphenate
    const digit1 = Math.floor(Math.random() * 10);
    const digit2 = Math.floor(Math.random() * 10);
    driverID += `${digit1}${digit2}-`;

    // add the first two digits of my student ID and hyphenate
    driverID +=  "35-";

    // add three random uppercase letters
    for (let i = 0; i < 3; i++) {
        // we generate the ASCII number first, then we can turn it into a letter, which is basically random
        driverID += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    return driverID;
}

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;