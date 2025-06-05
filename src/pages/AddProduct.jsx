import React from "react";
import { Form } from "react-bootstrap";
import ModalComponent from "../Components/ModalComponent";
import { Formik } from "formik";
import * as Yup from "yup";

const defaultValues = {
    name: "",
    banner: "",
    description: "",
    price: "",
};

const AddProduct = ({ show, onClose, initialValues, onSubmit, isEdit }) => {
    const safeInitialValues = { ...defaultValues, ...initialValues };

    return (
        <Formik
            initialValues={safeInitialValues}
            enableReinitialize
            validationSchema={Yup.object({
                name: Yup.string().required("Product name is required"),
                banner: Yup.string().url("Invalid URL").required("Banner URL is required"),
                description: Yup.string().required("Description is required"),
                price: Yup.number().typeError("Price must be a number").required("Price is required"),
            })}
            onSubmit={(values, actions) => {
                if (onSubmit) onSubmit(values, isEdit);
                actions.setSubmitting(false);
                onClose();
            }}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <ModalComponent
                    show={show}
                    onClose={onClose}
                    onSubmit={handleSubmit}
                    title={isEdit ? "Edit Product" : "Add New Product"}
                    submitLabel={isEdit ? "Update Product" : "Add Product"}
                >
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter product name"
                                value={values.name}
                                onChange={handleChange}
                                isInvalid={touched.name && !!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Banner URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="banner"
                                placeholder="Enter product banner URL"
                                value={values.banner}
                                onChange={handleChange}
                                isInvalid={touched.banner && !!errors.banner}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.banner}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                placeholder="Enter product description"
                                value={values.description}
                                onChange={handleChange}
                                isInvalid={touched.description && !!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control
                                type="text"
                                name="price"
                                placeholder="Enter product price"
                                value={values.price}
                                onChange={handleChange}
                                isInvalid={touched.price && !!errors.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </ModalComponent>
            )}
        </Formik>
    );
};

export default AddProduct;