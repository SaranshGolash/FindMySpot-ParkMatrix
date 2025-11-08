// routes/api.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // Import the db connection

/**
 * @route   GET /api/locations
 * @desc    Get parking locations based on vehicle type
 * @access  Public (for now)
 * @query   vehicle_type (e.g., 'car', 'bike')
 */
router.get("/locations", async (req, res) => {
  const { vehicle_type } = req.query;

  if (!vehicle_type) {
    return res.status(400).json({ error: "vehicle_type query is required" });
  }

  try {
    const query = `
      SELECT DISTINCT
        p.location_id,
        p.location_name,
        p.address,
        p.latitude,
        p.longitude
      FROM
        parking_locations p
      JOIN
        location_vehicle_types lvt ON p.location_id = lvt.location_id
      JOIN
        vehicle_types vt ON lvt.type_id = vt.type_id
      WHERE
        vt.type_name = $1 OR vt.type_name = 'common';
    `;

    // This query finds all locations that match the user's type OR are 'common'
    const { rows } = await db.query(query, [vehicle_type]);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
