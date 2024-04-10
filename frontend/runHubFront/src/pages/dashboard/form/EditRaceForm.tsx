import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, InputNumber } from 'antd';
import { RaceFormValues, raceStatusOptions, raceTypeOptions } from '../models/race';

const { Option } = Select;

const EditRaceForm = ({ race, onFinish, onCancel }) => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState<RaceFormValues>({ ...race });

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleSubmit = (values: RaceFormValues) => {
    // Ensure distances and sponsors are properly formatted before submitting
    const formattedValues = {
      ...values,
      distances: values.distances.map(distance => ({ ...distance })),
      sponsors: values.sponsors.map(sponsor => ({ ...sponsor })),
    };
    onFinish(formattedValues);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      {/* Other race fields */}
      <Form.Item
        label="Distances"
        name="distances"
      >
        {/* Nested form fields for distances */}
        {initialValues.distances?.map((distance, index) => (
          <div key={index}>
            <Form.Item
              label={`Distance ${index + 1}`}
              name={['distances', index, 'name']}
            >
              <Input />
            </Form.Item>
            {/* Add more fields for other distance properties as needed */}
          </div>
        ))}
      </Form.Item>

      <Form.Item
        label="Sponsors"
        name="sponsors"
      >
        {/* Nested form fields for sponsors */}
        {initialValues.sponsors?.map((sponsor, index) => (
          <div key={index}>
            <Form.Item
              label={`Sponsor ${index + 1}`}
              name={['sponsors', index, 'name']}
            >
              <Input />
            </Form.Item>
            {/* Add more fields for other sponsor properties as needed */}
          </div>
        ))}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditRaceForm;
