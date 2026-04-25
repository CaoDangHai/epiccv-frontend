import React from 'react';
import { useSignIn } from './useSignIn';
import mezonLogo from '../../../../assets/mezon-logo.png';

const SignIn: React.FC = () => {
    const { register, errors, handleSubmit, onSubmit, handleMezonSignIn, goToSignUp } = useSignIn();

    return (
        <main className="min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900">
            {/* Cột trái: Artwork */}
            <section className="hidden md:flex w-1/2 relative bg-indigo-700 overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 opacity-90"></div>
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30"></div>
                    <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
                </div>

                <div className="relative z-10 max-w-lg">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                            <span className="material-symbols-outlined text-blue-600 text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>architecture</span>
                        </div>
                        <span className="text-3xl font-black tracking-tighter text-white">EpicCV</span>
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-8">
                        The AI Architect for your <span className="text-blue-200">Career Journey.</span>
                    </h1>
                </div>
            </section>

            {/* Cột phải: Form đăng nhập */}
            <section className="flex-1 flex flex-col justify-center items-center p-6 md:p-24 bg-white relative">
                <div className="w-full max-w-md">
                    <div className="md:hidden flex items-center gap-2 mb-12">
                        <span className="text-2xl font-black tracking-tighter text-blue-600">EpicCV</span>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome Back</h2>
                        <p className="text-slate-500">Enter your credentials to access your workspace.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Cụm input Email */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-600">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    className={`w-full px-4 py-3.5 bg-slate-50 border ${errors.email ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500'} rounded-xl focus:outline-none focus:ring-2 transition-all text-slate-900 placeholder:text-slate-400`}
                                    placeholder="name@company.com"
                                    {...register('email', {
                                        required: 'Email là bắt buộc',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Định dạng email không hợp lệ'
                                        }
                                    })}
                                />
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Cụm input Password */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-600">Password</label>
                                <a className="text-xs font-semibold text-blue-600 hover:text-indigo-600 transition-colors" href="#">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    className={`w-full px-4 py-3.5 bg-slate-50 border ${errors.password ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500'} rounded-xl focus:outline-none focus:ring-2 transition-all text-slate-900 placeholder:text-slate-400`}
                                    placeholder="••••••••"
                                    {...register('password', {
                                        required: 'Mật khẩu là bắt buộc',
                                        minLength: {
                                            value: 6,
                                            message: 'Mật khẩu phải có tối thiểu 6 ký tự'
                                        }
                                    })}
                                />
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer accent-blue-600"
                                {...register('remember')}
                            />
                            <label className="text-sm font-medium text-slate-600 cursor-pointer" htmlFor="remember">Keep me signed in</label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
                        >
                            Sign In
                            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </form>

                    {/* Button Mezon giữ nguyên */}
                    <div className="my-8 flex items-center gap-4">
                        <div className="flex-1 h-px bg-slate-200"></div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
                        <div className="flex-1 h-px bg-slate-200"></div>
                    </div>

                    <div className="w-full">
                        <button
                            type="button"
                            onClick={handleMezonSignIn}
                            className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-blue-300 transition-all group shadow-sm hover:shadow-md"
                        >
                            <img alt="Mezon" className="w-6 h-6 rounded-full" src={mezonLogo} />
                            <span className="text-sm font-bold text-slate-800 tracking-wide">Sign in with Mezon</span>
                        </button>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-sm text-slate-500">
                            Don't have an account yet?
                            <button
                                onClick={goToSignUp}
                                type="button"
                                className="font-bold text-blue-600 hover:underline decoration-2 underline-offset-4 ml-1 cursor-pointer"
                            >
                                Create an account
                            </button>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SignIn;