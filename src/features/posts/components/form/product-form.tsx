'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { ArrowLeftIcon } from 'lucide-react';

import * as Form from '@/shared/components/form';

const ProductForm = () => {
  const methods = useForm();

  return (
    <div className="my-10">
      <div className="flex flex-col gap-6">
        <ArrowLeftIcon className="icon-default text-gray-500" />
        <h1 className="page-heading">New Product</h1>
      </div>

      <div className="mt-10 max-w-3xl space-y-6">
        <FormProvider {...methods}>
          <Form.Group>
            <Form.Input name="name" label="Name" />
          </Form.Group>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Form.Group>
              <Form.Input name="price" label="Price" type="number" />
            </Form.Group>

            <Form.Group>
              <Form.Input name="currency" label="Currency" />
            </Form.Group>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Form.Group>
              <Form.Input name="quantity" label="Quantity" type="number" />
            </Form.Group>

            <Form.Group>
              <Form.Input name="uom" label="Unit of Measure" />
            </Form.Group>
          </div>

          <Form.Group>
            <Form.Input name="color" label="Color" />
          </Form.Group>

          <Form.Group>
            <Form.Textarea name="short_description" label="Short description" />
          </Form.Group>

          <Form.Group>
            <Form.Textarea name="long_description" label="Long description" />
          </Form.Group>
        </FormProvider>
      </div>
    </div>
  );
};

export default ProductForm;
