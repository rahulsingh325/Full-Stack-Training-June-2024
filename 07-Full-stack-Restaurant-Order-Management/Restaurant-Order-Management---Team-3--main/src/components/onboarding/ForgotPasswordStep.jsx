import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../assets/scss/modules/_onboarding.scss";
import { forgotPassword } from "../../services/auth";
import toast from "react-hot-toast";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email is required"),
});

const ForgotPasswordStep = ({ onNext , setEmail}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const result = await forgotPassword(data)
        if(result.success){
            toast.success(result.data)
            setEmail(data.email)
            onNext();
        }else {

            toast.error(result.massage)
        }
    };

    return (
        <div className="forgot-password-form w-100">
            <h2 className="fw-bold mb-3">Forgot password</h2>
            <p className="text-muted mb-4">
                Enter your email to reset it and regain access to your account.
            </p>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="example@mail.com"
                        {...register("email")}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button
                    type="submit"
                    className="rounded-pill w-100"
                    variant="primary"
                    style={{ padding: "0.8rem" }}
                >
                    Send
                </Button>

                <p className="text-center text-muted mt-3" style={{ fontSize: "0.85rem" }}>
                    By signing up, I agree to the{" "}
                    <a href="#" className="text-decoration-none">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-decoration-none">
                        Privacy Policy
                    </a>
                </p>
            </Form>
        </div>
    );
};

export default ForgotPasswordStep;
