const Driver = require("../models/driver");
const Package = require("../models/package");

module.exports = {
    /**
     * Inserts a new driver into the database.
     * @function
     * @param {Object} req - Express request object containing driver details in the body.
     * @param {Object} res - Express response object for returning status and driver details.
     */
    insertNewDriver: async function (req, res) {
        try {
            let aDriver = req.body;
            let driverDoc = new Driver({
                driver_name: aDriver.driver_name,
                driver_department: aDriver.driver_department,
                driver_licence: aDriver.driver_licence,
                driver_isActive: aDriver.driver_isActive
            });
            await driverDoc.save();
            res.status(200).json({
                id: driverDoc._id,
                driver_id: driverDoc.driver_id
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    /**
     * Retrieves a list of all drivers from the database.
     * @function
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object returning the list of drivers.
     */
    listAllDriver: async function (req, res) {
        try {
            let drivers = await Driver.find({}).populate('assigned_packages');
            res.status(200).json(drivers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    /**
     * Deletes a driver and all associated packages from the database based on driver ID.
     * @function
     * @param {Object} req - Express request object containing driver ID in the body.
     * @param {Object} res - Express response object returning deletion status and count of deleted documents.
     */
    deleteDriver: async function (req, res) {
        try {
            let id = req.params.id;
            let driver = await Driver.findById(id);
            let acknowledged = false;
            let count = 0;
            if (driver) {
                acknowledged = true;
                count += 1;
                for (let i = 0; i < driver.assigned_packages.length; i++) {
                    const packageId = driver.assigned_packages[i];
                    await Package.findByIdAndDelete(packageId);
                    count += 1;
                }
                await Driver.findByIdAndDelete(driver._id);
            }
            res.status(200).json({
                acknowledged: acknowledged,
                deletedCount: count
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    /**
     * Updates a driver's details in the database.
     * @function
     * @param {Object} req - Express request object containing driver ID and new details in the body.
     * @param {Object} res - Express response object returning update status.
     */
    updateDriver: async function (req, res) {
        try {
            let id = req.body.id;
            let newDriver = req.body;
            let results = await Driver.findByIdAndUpdate(
                id,
                {
                    driver_licence: newDriver.driver_licence,
                    driver_department: newDriver.driver_department
                },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (results) {
                res.status(200).json({ status: "Driver updated successfully" });
            } else {
                res.status(404).json({ error: "ID not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}
