import React, { useState, useContext } from 'react';
import JobContext from '../../../context/Jobposting/JobpostContext';

const EditJobModal = ({ jobId, closeModal }) => {
  const { updateJobPosting } = useContext(JobContext);

  const [title, setTitle] = useState('');
  const [jobtype, setJobType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateJobPosting(jobId, title, jobtype, description, location, salary);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Job</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="jobtype">Job Type</label>
            <input type="text" id="jobtype" value={jobtype} onChange={(e) => setJobType(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input type="text" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;
