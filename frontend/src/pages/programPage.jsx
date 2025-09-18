import { useState, useEffect } from 'react';
import Table from '@/layouts/Table';
import FormModal from '@/layouts/FormModal';
import axios from 'axios';

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [universities, setUniversities] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [editProgram, setEditProgram] = useState(null);

  // fetch all programs
  const fetchPrograms = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/programs/getProgram`
      );
      setPrograms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all universities
  const fetchUniversities = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/university/getUni`
      );
      // map universities to {value, label}
      const uniOptions = res.data.map((u) => ({
        value: u._id,
        label: u.name,
      }));
      setUniversities(uniOptions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPrograms();
    fetchUniversities();  
  }, []);

  const handleEdit = (program) => {
    setEditProgram(program);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/v1/programs/${id}`
    );
    fetchPrograms();
  };

  const handleSubmit = async (formData) => {
    if (editProgram) {
      // update program
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/programs/${editProgram._id}`,
        formData
      );
    } else {
      // create program
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/programs/createProgram`,
        formData
      );
    }
    fetchPrograms();
  };

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Programs</h1>
          {/* <button
            className="px-4 py-2 bg-emerald-600 text-white rounded"
            onClick={() => {
              setEditProgram(null);
              setShowModal(true);
            }}
          >
            Add Program
          </button> */}
          <button
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-200 to-purple-300 text-purple-900 font-medium shadow hover:from-purple-300 hover:to-purple-400 transition"
          onClick={() => {setEditProgram(null); setShowModal(true);}}> Add Program </button>
        </div>
        <Table
          columns={['Name', 'University']}
          data={programs}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showModal && (
          <FormModal
            open={showModal}
            onClose={() => setShowModal(false)}
            title={editProgram ? 'Edit Program' : 'Add Program'}
            fields={[
              { name: 'name', label: 'Program Name', type: 'text' },
              {
                name: 'university',
                label: 'University',
                type: 'select',
                options: universities,
              },
            ]}
            defaultValues={editProgram || {}}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}