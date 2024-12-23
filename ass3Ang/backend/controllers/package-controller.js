const Package = require("../models/package");
const Driver = require("../models/driver");

module.exports = {
    /**
     * Inserts a new package into the database.
     * @function
     * @param {Object} req - Express request object containing package details in the body.
     * @param {Object} res - Express response object returning status and package details.
     */
    insertNewPackage: async function (req, res) {
        try {
            let aPackage = req.body;
            const driver = await Driver.findById(aPackage.driver_id);
            
            if (!driver) {
                // If driver doesn't exist, return an error
                return res.status(404).json({ error: "Driver not found. Cannot assign package." });
            }
    
            let packageDoc = new Package({
                package_title: aPackage.package_title,
                package_weight: aPackage.package_weight,
                package_destination: aPackage.package_destination,
                description: aPackage.description,
                isAllocated: aPackage.isAllocated,
                driver_id: aPackage.driver_id
            });
            await packageDoc.save();

            driver.assigned_packages.push(packageDoc._id);
            await driver.save();
            res.status(200).json({
                id: packageDoc._id,
                package_id: packageDoc.package_id,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    /**
     * Retrieves a list of all packages from the database.
     * @function
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object returning the list of packages.
     */
    listAllPackage: async function (req, res) {
        try {
            let packages = await Package.find({}).populate('driver_id');
            res.status(200).json(packages);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    /**
     * Deletes a package from the database based on package ID.
     * Also removes the package reference from the assigned driver's list.
     * @function
     * @param {Object} req - Express request object containing package ID in the body.
     * @param {Object} res - Express response object returning deletion status and count of deleted documents.
     */
    deletePackage: async function (req, res) {
        try {
            let id = req.params.id;
            let package = await Package.findById(id);
            let acknowledged = false;
            let count = 0;
            
            if (package) {
                acknowledged = true;
                count += 1;
                const driver = await Driver.findById(package.driver_id);
                if (driver) {
                    driver.assigned_packages = driver.assigned_packages.filter(
                        assignedPackageId => !assignedPackageId.equals(package._id)
                    );
                    await driver.save();
                }
                await Package.findByIdAndDelete(id);
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
     * Updates a package's destination in the database.
     * @function
     * @param {Object} req - Express request object containing package ID and new destination in the body.
     * @param {Object} res - Express response object returning update status.
     */
    updatePackage: async function (req, res) {
        try {
            let id = req.body.id;
            let destination = req.body.package_destination;
            let results = await Package.findByIdAndUpdate(id, {
                package_destination: destination
            });
            if (results) {
                res.status(200).json({ status: "updated successfully" });
            } else {
                res.status(404).json({ error: "ID not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
};
