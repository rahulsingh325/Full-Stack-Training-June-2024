import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { resetPassword } from "../../services/auth";

const schema = yup.object().shape({
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/^\S*$/, "Password must not contain spaces")
        .matches(/[0-9]/, "Password must include at least one number")
        .matches(/[A-Za-z]/, "Password must include at least one letter")
        .matches(/[^A-Za-z0-9]/, "Password must include at least one special character"),
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const CreateNewPassword = ({ onNext , email}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        const result = await resetPassword({email , new_password : data.password})
        if (result.success) {
            toast.success(result.data)
            onNext();
        } else {
            toast.error(result.message)
        }
    };

    return (
        <div className="p-4 w-100">
            <h2 className="fw-bold mb-4">Create a new password</h2>
            <p className="text-muted mb-6">
                Enter your new password to regain access to your account.
            </p>
            <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
                <Form.Group className="mb-3">
                    <Form.Label className="mb-2 fs-title text-neutral-700">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        {...register("password")}
                        className="w-100 p-3 fs-title text-neutral-400"
                    />
                    {errors.password && (
                        <small className="text-danger">{errors.password.message}</small>
                    )}
                </Form.Group>
                <Form.Group className="mb-5">
                    <Form.Label className="mb-2 fs-title text-neutral-700">Confirmation password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        {...register("confirmPassword")}
                        className="w-100 p-3 fs-title text-neutral-400"
                    />
                    {errors.confirmPassword && (
                        <small className="text-danger">{errors.confirmPassword.message}</small>
                    )}
                </Form.Group>
                <ul className="fs-title text-neutral-300 mb-8">
                    <li>Has at least 8 characters (no space)</li>
                    <li>Has numbers, letters, and special characters</li>
                </ul>
                <Button
                    type="submit"
                    className="rounded-pill w-100 p-3 mb-5"
                    disabled={!isValid}
                >
                    Continue
                </Button>
                <p className="text-center mt-3 small">
                    By signing up, I agree to the{" "}
                    <a href="#" className="text-decoration-none">Terms of Service</a>{" "}
                    and{" "}
                    <a href="#" className="text-decoration-none">Privacy Policy</a>
                </p>
            </Form>
        </div>
    );
};

export default CreateNewPassword;
