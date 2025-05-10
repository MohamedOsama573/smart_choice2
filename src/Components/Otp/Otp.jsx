import axios from 'axios';
import { Button } from 'primereact/button';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Otp() {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const inputsRef = useRef([]);
    const navigate = useNavigate();
    const handleChange = (element, index) => {
        const value = element.value.replace(/\D/, ''); // only digits
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Focus next input
        if (index < 5 && value) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleSubmit = async() => {
        const enteredOtp = otp.join('');
        const email = localStorage.getItem('email');
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BASEURL}/api/v1/confirm-email`, {
                email,
                code: enteredOtp,
            });
          console.log(response.data);
          navigate('/login');
        } catch (error) {
            console.log("Error verifying OTP:", error);
            
        }
   
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
                <h2 className="text-2xl font-semibold mb-2">Authenticate Your Account</h2>
                <p className="text-gray-500 mb-6">Please enter the 6-digit code sent to your Email.</p>

                <div className="flex justify-center gap-2 mb-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputsRef.current[index] = el)}
                            type="text"
                            maxLength="1"
                            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={digit}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>

                <div className="flex justify-between text-sm mb-4">
                    <Button label="Resend Code" link className="p-0 text-blue-600" />
                    <Button label="Submit Code" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}
