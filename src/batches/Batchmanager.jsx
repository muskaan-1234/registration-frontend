import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { getbatchesService, deletebatchService } from '../services/user';

function Batchmanager() {
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching batches...");
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await getbatchesService();
      console.log("Batches:", response.data.batches);
      setBatches(response.data.batches);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const doEdit = async (batch) => {
    navigate("/batchmaster", { state: { editBatch: batch } });
  };

  
  const handleDelete = async (index) => {
    try {
      const batchId = batches[index]._id;
      const response = await deletebatchService({ id: batchId });
      setBatches(batches.filter((batch) => batch._id !== batchId));
      alert(response.data.message);
      navigate(0);
    } catch (error) {
      console.error('Error deleting batch:', error);
    }
  };

  return (
    <div>
      <h1>Batch Manager</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Technical Stack</th>
            <th>Time</th>
            <th>Date</th>
            <th>Advance Fee</th>
            <th>Total Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{batch.technicalstack}</td>
              <td>{batch.time}</td>
              <td>{batch.date}</td>
              <td>{batch.advancefee}</td>
              <td>{batch.totalfee}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={() => doEdit(batch)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Batchmanager;
