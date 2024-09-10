import React, { useState } from "react";
import "./NewSignup.css";
import iconTomiru from '../../assets/icontomiru.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";

const NewSignup: React.FC = () => {
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        gender: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: "",
        referralCode: "",
        termsAccepted: false
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleGenderChange = (gender: string) => {
        setForm({
            ...form,
            gender
        });
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!form.email) newErrors.email = "Email không được để trống";
        if (!form.firstName) newErrors.firstName = "Họ không được để trống";
        if (!form.lastName) newErrors.lastName = "Tên không được để trống";
        if (!form.gender) newErrors.gender = "Giới tính không được để trống";
        if (!form.username) newErrors.username = "Tên đăng nhập không được để trống";
        if (!form.password) newErrors.password = "Mật khẩu không được để trống";
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Mật khẩu không khớp";
        if (!form.referralCode) newErrors.referralCode = "Mã giới thiệu không được để trống";
        if (!form.termsAccepted) newErrors.termsAccepted = "Bạn phải đồng ý với chính sách bảo mật";

        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {

            // Redirect to a new page
            window.location.href = "/account/signup_step_two";  // Replace "/next-page" with your target URL
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <header className="header">
                <div className="logo">
                    <img src={iconTomiru} alt="" width={25} height={35} />
                    <p style={{ marginLeft: 10, fontSize: 20, fontWeight: 600, textTransform: 'uppercase' }}>Tomiru</p>
                    <div className="progress-bar">
                        <span className="stepActive"></span>
                        <span className="step"></span>
                        <span className="step"></span>
                    </div>
                </div>
            </header>
            <div className="App1">
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Đăng ký</h2>
                    <label>Email *</label>
                    <input type="email" name="email" value={form.email} placeholder="Email" onChange={handleChange}  />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <div className="name-fields">
                        <div>
                            <label>Họ *</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Họ"
                                value={form.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <p className="error">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label>Tên *</label>
                            <input type="text" name="lastName" placeholder="Tên" value={form.lastName} onChange={handleChange}  />
                            {errors.lastName && <p className="error">{errors.lastName}</p>}
                        </div>
                    </div>

                    <label>Giới tính *</label>
                    <div className="gender">
                        <div
                            className={`gender-option ${form.gender === "Nam" ? "selected" : ""}`}
                            onClick={() => handleGenderChange("Nam")}
                        >
                            Nam
                        </div>
                        <div
                            className={`gender-option ${form.gender === "Nữ" ? "selected" : ""}`}
                            onClick={() => handleGenderChange("Nữ")}
                        >
                            Nữ
                        </div>
                        <div
                            className={`gender-option ${form.gender === "Khác" ? "selected" : ""}`}
                            onClick={() => handleGenderChange("Khác")}
                        >
                            Khác
                        </div>
                    </div>
                    {errors.gender && <p className="error">{errors.gender}</p>}

                    <label>Số điện thoại *</label>
                    <input type="tel" name="phone" placeholder="Số điện thoại" value={form.phone} onChange={handleChange} />
                    {errors.phone && <p className="error">{errors.phone}</p>}

                    <label>Tên đăng nhập *</label>
                    <input type="text" name="username" placeholder="Tên đăng nhập" value={form.username} onChange={handleChange} />
                    {errors.username && <p className="error">{errors.username}</p>}

                    <label>Mật khẩu *</label>
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Mật khẩu"
                            value={form.password}
                            onChange={handleChange}
                            
                        />
                        <span className="password-toggle" onClick={toggleShowPassword}>
                            {showPassword ? <VisibilityOffIcon style={{fontSize:"20px",marginBottom:"7px"}}/> : <VisibilityIcon style={{fontSize:"20px",marginBottom:"7px"}}/>}
                        </span>
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>}

                    <label>Nhập lại mật khẩu *</label>
                    <div className="password-container">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            
                        />
                        <span className="password-toggle" onClick={toggleShowConfirmPassword}>
                            {showConfirmPassword ? <VisibilityOffIcon style={{fontSize:"20px",marginBottom:"7px"}} /> : <VisibilityIcon style={{fontSize:"20px",marginBottom:"7px"}}/>}
                        </span>
                    </div>
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                    <label>Mã giới thiệu *</label>
                    <input type="text" name="referralCode" placeholder="Mã giới thiệu" value={form.referralCode} onChange={handleChange}  />
                    {errors.referralCode && <p className="error">{errors.referralCode}</p>}
                    
                    <label style={{ display: "flex" }}>
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={form.termsAccepted}
                            onChange={handleChange}
                            
                        />
                        <p style={{marginLeft:"6px"}}>
                            Tôi đã đọc và đồng ý với <a href="#">chính sách bảo mật</a>
                        </p>
                    </label>
                    {errors.termsAccepted && <p className="error">{errors.termsAccepted}</p>}
                    
                    <Link to="/account/signup_step_two">
                        <button type="submit" className="continueBtn">Tiếp tục</button>
                    </Link>
                </form>
            </div>
        </>
    );
};

export default NewSignup;
