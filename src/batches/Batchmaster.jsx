import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Alert, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { batchmasterService, editbatchesService } from '../services/user';
import 'react-datepicker/dist/react-datepicker.css';


function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function Batchmaster() {
  const [formData, setFormData] = useState({
    technicalstack: '',
    time: '',
    date: '',
    advancefee: '',
    totalfee: '',
  });
  const [showError, setShowError] = useState(false);
  const location = useLocation();
  const editBatch = location.state ? location.state.editBatch : null;

  useEffect(() => {
    if (editBatch) {
      const formattedDate = editBatch.date ? formatDate(editBatch.date) : '';
      setFormData({
        ...editBatch,
        date: formattedDate,
      });
    }
  }, [editBatch]);

  const doSubmit = async () => {
    if (isFormValid()) {
      try {
        const response = await batchmasterService(formData);
        console.log('Data saved successfully:', response);
        alert(response.data.message);
      } catch (error) {
        console.error('Error saving data:', error);
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        } else {
          alert('Internal server error. Please try again later.');
        }
      }
    } else {
      setShowError(true);
    }
  };

  const doUpdate = async () => {
    if (isFormValid()) {
      try {
        const response = await editbatchesService({ ...formData, id: editBatch._id });
        console.log('Data updated successfully:', response);
        alert(response.data.message);
      } catch (error) {
        console.error('Error updating data:', error);
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        } else {
          alert('Internal server error. Please try again later.');
        }
      }
    } else {
      setShowError(true);
    }
  };

  const isFormValid = () => {
    const { technicalstack, time, date, advancefee, totalfee } = formData;
    return technicalstack && time && date && advancefee && totalfee;
  };

  const InputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setShowError(false);
  };

  return (
    <Form className="centered-form">
      {showError && <Alert variant="danger">Please fill all the details.</Alert>}
      <Form.Group className="mb-3" controlId="formGridTechnicalStack">
        <Form.Label>Technical Stack</Form.Label>
        <Form.Control
          as="select"
          name="technicalstack"
          value={formData.technicalstack}
          onChange={InputChange}
          required
        >
          <option value="">Choose...</option>
          <option value="C/C++">C/C++</option>
          <option value="NodeJs Full Stack Web Development">NodeJs Full Stack Web Development</option>
          <option value="Java+Fx with Project">Java+Fx with Project</option>
          <option value="DSA(Placement Prep)">DSA(Placement Prep)</option>
          <option value="MERN Stack-React.Js">MERN Stack-React.Js</option>
          <option value="Machine Learning+AI">Machine Learning+AI</option>
        </Form.Control>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridTime">
          <Form.Label>Time</Form.Label>
          <Form.Control type="text" name="time" value={formData.time} onChange={InputChange} required />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridDate">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" value={formData.date} onChange={InputChange} required />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridAdvanceFee">
          <Form.Label>Advance Fee</Form.Label>
          <Form.Control
            type="number"
            name="advancefee"
            value={formData.advancefee}
            onChange={InputChange}
            placeholder="Advance Fee"
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridTotalFee">
          <Form.Label>Total Fee</Form.Label>
          <Form.Control
            type="number"
            name="totalfee"
            value={formData.totalfee}
            onChange={InputChange}
            placeholder="Total Fee"
            required
          />
        </Form.Group>
      </Row>

      {editBatch ? (
        <Button variant="primary" onClick={doUpdate}>
          Update
        </Button>
      ) : (
        <Button variant="primary" onClick={doSubmit}>
          Submit
        </Button>
      )}
     </Form>
  );
}

export default Batchmaster;
