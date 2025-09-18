import { useState, useEffect } from 'react';
import Table from '@/layouts/Table';
import FormModal from '@/layouts/FormModal';
import axios from 'axios';

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUniversity, setEditUniversity] = useState(null);

  // fetch all universities
  const fetchUniversities = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/university/getUni`
      );
      setUniversities(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const handleEdit = (university) => {
    setEditUniversity(university);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/university/uni/${id}`
      );
      fetchUniversities();
    } catch (error) {
      console.error('Failed to delete university:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editUniversity) {
        // update university
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/v1/university/uni/${editUniversity._id}`,
          formData
        );
      } else {
        // create university
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/university/createUni`,
          formData
        );
      }
      fetchUniversities();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to save university:', error);
      throw error;
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Universities</h1>
          {/* <button
            className="px-4 py-2 bg-emerald-600 text-white rounded"
            onClick={() => {
              setEditUniversity(null);
              setShowModal(true);
            }}
          >
            Add University
          </button> */}
          <button
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-200 to-purple-300 text-purple-900 font-medium shadow hover:from-purple-300 hover:to-purple-400 transition"
          onClick={() => {setEditUniversity(null);setShowModal(true)}}>Add University</button>
        </div>
        <Table
          columns={['Name']}
          data={universities}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showModal && (
          <FormModal
            open={showModal}
            onClose={() => setShowModal(false)}
            title={editUniversity ? 'Edit University' : 'Add University'}
            fields={[
              { name: 'name', label: 'University Name', type: 'text' }
            ]}
            defaultValues={editUniversity || {}}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Universities;