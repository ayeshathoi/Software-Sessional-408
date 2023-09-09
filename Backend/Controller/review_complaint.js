const express = require('express');
const app = express();
const user = require('../Repository/review_complaint')
const http_status = require('./HTTPStatus')

const INSERT_RatingAndComplaint = async (req, res) => {
  // const rating = req.body.rating;
  // const complaint_text = req.body.complaint_text;
  // const appointment_id = req.params.booking_id;
  // if(!rating || !complaint_text) return res.status(http_status.BAD_REQUEST).json({ error: 'Missing rating or complaint_text.' });
  try {
    const rating = req.body.rating;
  const complaint_text = req.body.complaint_text;
  const appointment_id = req.params.booking_id;
  if(!rating || !complaint_text) return res.status(http_status.BAD_REQUEST).json({ error: 'Missing rating or complaint_text.' });
    await user.rating_complaint_insert(rating, complaint_text, appointment_id);
    res.status(http_status.ACCEPTED).json({ updated: true });
  } catch (error) {
    console.error('Error updating rating and complaint:', error.message);
    res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while updating rating and complaint.' });
  }
};

const show_complaint = async (req, res) => {
  // const hospital_id = req.user.uid;
  try {
    const hospital_id = req.user.uid;
    const result = await user.show_complaints(hospital_id);
    res.send(result)
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching data.' });
  }
};

module.exports = {
  INSERT_RatingAndComplaint,
  show_complaint
};
