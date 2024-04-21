import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { saveService, getbatchdetailsbytech } from './services/user';
import './RegForm.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    technicalstack: '',
    time: '',
    name: '',
    mobile: '',
    email: '',
    collegename: '',
    advancefee: '',
    balancefee: '',
    info: ''
  });

  const inputChange = async (event) => {
    const { name, value } = event.target;
    console.log("Name:", name);
    console.log("Value:", value);
    if (name === 'technicalstack') {
      try {
        const response = await getbatchdetailsbytech({ technicalstack: value });
        console.log("Response:", response);
        setFormData({
          ...formData,
          [name]: value,
          time: response.data.time,
          advancefee: response.data.advancefee,
          totalfee: response.data.totalfee,
          balancefee: (response.data.totalfee - response.data.advancefee)
        });
      } catch (error) {
        console.error('Error fetching batch details:', error);
      }
    }
  };

  const doChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const doSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await saveService(formData);
      console.log('Registration successfully:', response);
      alert(response.data.message);
    } catch (error) {
      console.error('Error saving data:', error);
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      } else {
        alert('Internal server error. Please try again later.');
      }
    }
  };

  return (
    <div className="form-container">
      <img src="data:image/jpeg;base64,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" alt="SunSoftTech Logo" className="logo" />
      <Form >
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustomTech">
            <Form.Label>Tech</Form.Label>
            <Form.Select
              name="technicalstack"
              required
              onChange={inputChange}
            >
              <option value="">Select Tech</option>
              <option value="C/C++">C/C++</option>
              <option value="NodeJs Full Stack Web Development">NodeJs Full Stack Web Development</option>
              <option value="Java+Fx with Project">Java+Fx with Project</option>
              <option value="DSA(Placement Prep)">DSA(Placement Prep)</option>
              <option value="MERN Stack-React.Js">MERN Stack-React.Js</option>
              <option value="Machine Learning+AI">Machine Learning+AI</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Please select a tech.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="formTime">
            <Form.Label>Timing</Form.Label>
            <Form.Select
              name="time"
              value={formData.time}
              onChange={doChange}
              required
            >

              {formData.time &&
                formData.time.split(',').map((t, index) => (
                  <option key={index} value={t}>
                    {t}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustomName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              required
              type="text"
              onChange={doChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustomMobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              name="mobile"
              required
              type="text"
              onChange={doChange}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="validationCustomEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={doChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationCustomCollege">
          <Form.Label>College Name</Form.Label>
          <Form.Control
            name="collegename"
            type="text"
            placeholder="College"
            required
            onChange={doChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide your college name.
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustomAdvFee">
            <Form.Label>Advance Fee</Form.Label>
            <Form.Control
              name="advancefee"
              required
              type="text"
              onChange={inputChange}
              value={formData.advancefee}
            />
            <Form.Control.Feedback type="invalid">Please select an advance fee.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustomBatch">
            <Form.Label>Balance Fee</Form.Label>
            <Form.Control
              name="balancefee"
              required
              type="text"
              onChange={inputChange}
              value={formData.balancefee}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="validationCustomOtherInfo">
          <Form.Label>Other Information</Form.Label>
          <Form.Control
            name="info"
            as="textarea"
            rows={3}
            placeholder="Other Information"
            onChange={doChange}
          />
        </Form.Group>
        <Button type="button" onClick={doSubmit} className='button'>Submit</Button>
      </Form>
    </div>
  );
}

export default RegistrationForm;
