import React from 'react';
import { useSignUp } from './useSignUp';
import mezonLogo from '../../../../assets/mezon-logo.png';

const SignUp: React.FC = () => {
    const { register, errors, handleSubmit, onSubmit, handleMezonSignUp, goToSignIn, watch } = useSignUp();

    // Theo dõi realtime giá trị của trường password để so sánh với confirmPassword
    const currentPassword = watch('password');

    return (
        <div className="bg-slate-50 font-sans text-slate-900 min-h-screen flex flex-col md:flex-row overflow-x-hidden selection:bg-blue-200 selection:text-blue-900">
            {/* --- Cột trái: Artwork & Branding (Giữ nguyên) --- */}
            <section className="hidden md:flex relative w-1/2 min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 p-16 flex-col justify-between overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white opacity-10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-indigo-900 opacity-30 rounded-full blur-[80px]"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-24">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                            <span className="material-symbols-outlined text-blue-600" style={{ fontVariationSettings: '"FILL" 1' }}>architecture</span>
                        </div>
                        <span className="text-2xl font-extrabold tracking-tighter text-white">EpicCV</span>
                    </div>

                    <h1 className="text-6xl font-bold text-white leading-[1.1] tracking-tight mb-8">
                        The AI Architect for your <br /><span className="text-blue-200">Career Journey</span>
                    </h1>
                    <p className="text-white/80 text-xl max-w-md font-light leading-relaxed">
                        Build a professional presence that commands attention using our ethereal design intelligence.
                    </p>
                </div>

                <div className="relative z-10 grid grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-[24px] border border-white/10 p-8 rounded-2xl">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: '"FILL" 1' }}>insights</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-2">Predictive Analysis</h3>
                        <p className="text-white/60 text-sm leading-relaxed">Anticipate market trends and align your skills with future high-demand roles.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-[24px] border border-white/10 p-8 rounded-2xl">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: '"FILL" 1' }}>grid_view</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-2">Smart Workspaces</h3>
                        <p className="text-white/60 text-sm leading-relaxed">Organized toolsets that adapt to your specific career path and project goals.</p>
                    </div>
                </div>
            </section>

            {/* --- Cột phải: Vùng Form Đăng Ký --- */}
            <main className="w-full md:w-1/2 flex flex-col justify-center bg-white px-8 py-12 md:px-24 md:py-24 relative">
                <div className="md:hidden flex items-center gap-2 mb-12">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>architecture</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">EpicCV</span>
                </div>

                <div className="max-w-md w-full mx-auto">
                    <header className="mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
                        <p className="text-slate-500 font-medium">Join the elite network of career architects.</p>
                    </header>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                        {/* Cụm input Họ và Tên */}
                        <div className="space-y-2">
                            <label className="block text-[11px] font-semibold tracking-widest uppercase text-slate-500 ml-1">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">person</span>
                                </div>
                                <input
                                    type="text"
                                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${errors.fullName ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'} rounded-xl focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 text-slate-900`}
                                    placeholder="John Doe"
                                    {...register('fullName', { required: 'Trường này là bắt buộc' })}
                                />
                            </div>
                            {errors.fullName && <p className="text-red-500 text-xs ml-1 mt-1">{errors.fullName.message}</p>}
                        </div>

                        {/* Cụm input Email */}
                        <div className="space-y-2">
                            <label className="block text-[11px] font-semibold tracking-widest uppercase text-slate-500 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">mail</span>
                                </div>
                                <input
                                    type="email"
                                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${errors.email ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'} rounded-xl focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 text-slate-900`}
                                    placeholder="name@company.com"
                                    {...register('email', {
                                        required: 'Trường này là bắt buộc',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Định dạng email không hợp lệ'
                                        }
                                    })}
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs ml-1 mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Cụm input Mật khẩu */}
                        <div className="space-y-2">
                            <label className="block text-[11px] font-semibold tracking-widest uppercase text-slate-500 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                </div>
                                <input
                                    type="password"
                                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${errors.password ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'} rounded-xl focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 text-slate-900`}
                                    placeholder="••••••••"
                                    {...register('password', {
                                        required: 'Trường này là bắt buộc',
                                        minLength: { value: 6, message: 'Tối thiểu 6 ký tự' }
                                    })}
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-xs ml-1 mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Cụm input Xác nhận Mật khẩu */}
                        <div className="space-y-2">
                            <label className="block text-[11px] font-semibold tracking-widest uppercase text-slate-500 ml-1">Confirm Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                </div>
                                <input
                                    type="password"
                                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${errors.confirmPassword ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'} rounded-xl focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 text-slate-900`}
                                    placeholder="••••••••"
                                    {...register('confirmPassword', {
                                        required: 'Trường này là bắt buộc',
                                        validate: (value) => value === currentPassword || 'Mật khẩu xác nhận không trùng khớp'
                                    })}
                                />
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-xs ml-1 mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer accent-blue-600"
                                {...register('remember')}
                            />
                            <label className="ml-3 text-sm font-medium text-slate-600 cursor-pointer" htmlFor="remember">Keep me signed in</label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:bg-blue-700 active:scale-[0.98] transition-all"
                        >
                            Sign Up
                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-slate-400 font-medium">Or register with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleMezonSignUp}
                        className="flex items-center justify-center gap-3 py-4 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-blue-300 transition-all font-medium text-slate-900 w-full group shadow-sm hover:shadow-md"
                    >
                        <img alt="Mezon" className="w-6 h-6 rounded-full" src={mezonLogo} />
                        Sign up with Mezon
                    </button>

                    <footer className="mt-12 text-center">
                        <p className="text-slate-500 font-medium text-sm mb-8">
                            Already have an account?
                            <button onClick={goToSignIn} className="text-blue-600 font-bold hover:underline ml-1">Log in</button>
                        </p>

                        <div className="flex flex-wrap justify-center items-center gap-6 w-full">
                            <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 w-full block mb-4">© 2026 EpicCV. All rights reserved.</span>
                            <div className="flex gap-6">
                                <a className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 hover:text-blue-600 transition-colors cursor-pointer" href="#">Privacy Policy</a>
                                <a className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 hover:text-blue-600 transition-colors cursor-pointer" href="#">Terms of Service</a>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default SignUp;