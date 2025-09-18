import { useState, useEffect } from 'react';
import Table from '@/layouts/Table';
import FormModal from '@/layouts/FormModal';
import axios from 'axios';

const Sections = () => {
  const [sections, setSections] = useState([]);
  const [streams, setStreams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editSection, setEditSection] = useState(null);

  // fetch all sections
  const fetchSections = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/sections/getSection`
      );
      setSections(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all streams for the dropdown
  const fetchStreams = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/streams/getstreams`
      );
      setStreams(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSections();
    fetchStreams();
  }, []);

  const handleEdit = (section) => {
    setEditSection(section);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/sections/${id}`
      );
      fetchSections();
    } catch (error) {
      console.error('Failed to delete section:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editSection) {
        // update section
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/v1/sections/${editSection._id}`,
          formData
        );
      } else {
        // create section
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/sections/createSection`,
          formData
        );
      }
      fetchSections();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to save section:', error);
      throw error;
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Sections</h1>
          {/* <button
            className="px-4 py-2 bg-emerald-600 text-white rounded"
            onClick={() => {
              setEditSection(null);
              setShowModal(true);
            }}
          >
            Add Section
          </button> */}
          <button
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-200 to-purple-300 text-purple-900 font-medium shadow hover:from-purple-300 hover:to-purple-400 transition"
          onClick={() => {setEditSection(null);setShowModal(true)}}> Add Section </button>
        </div>
        <Table
          columns={['Name', 'Stream', 'Year', 'Semester', 'Total Students']}
          data={sections.map(section => ({
            ...section,
            stream: section.stream?.name || 'N/A'
          }))}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showModal && (
          <FormModal
            open={showModal}
            onClose={() => setShowModal(false)}
            title={editSection ? 'Edit Section' : 'Add Section'}
            fields={[
              { name: 'name', label: 'Section Name', type: 'text' },
              {
                name: 'stream',
                label: 'Stream',
                type: 'select',
                options: streams.map(stream => ({
                  value: stream._id,
                  label: stream.name
                }))
              },
              {
                name: 'year',
                label: 'Year',
                type: 'number',
                props: {
                  min: 1,
                  max: 4
                }
              },
              {
                name: 'semester',
                label: 'Semester',
                type: 'number',
                props: {
                  min: 1,
                  max: 8
                }
              },
              {
                name: 'totalStudents',
                label: 'Total Students',
                type: 'number',
                props: {
                  min: 0
                }
              }
            ]}
            defaultValues={editSection || {}}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Sections;