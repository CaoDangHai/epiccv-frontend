import React from "react";
import { useHomeView } from "./useHomeView";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

const HomeView: React.FC = () => {
  const {
    register,
    errors,
    handleSubmit,
    watch,
    credentialsTab,
    setCredentialsTab,
    opportunityTab,
    setOpportunityTab,
    selectedCv,
    savedCVs,
    isDeleteModalOpen,
    cancelDelete,
    confirmDelete,
    handleDeleteCvClick,
    handleFileChange,
    onAnalyze,
    validateFile,
    toggleSelectCv,
  } = useHomeView();

  const jdTextLength = watch("jdText")?.length || 0;
  const cvFile = watch("cvFile");
  const jdFile = watch("jdFile");

  // SỬA BƯỚC 1: Tách hàm onChange mặc định của react-hook-form ra khỏi thuộc tính register
  const { onChange: cvOnChange, ...cvRegisterRest } = register("cvFile", { validate: validateFile });
  const { onChange: jdOnChange, ...jdRegisterRest } = register("jdFile", { validate: validateFile });

  return (
    <div className="p-8 lg:p-12 relative">
      {/* ... Phần header giữ nguyên ... */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          Design your <span className="text-[var(--color-primary)] italic">dream</span> career path.
        </h1>
        <p className="text-slate-600 text-lg mt-4 max-w-2xl leading-relaxed">
          Upload your current credentials and target role. Our AI architect will bridge the gap with
          a high-conversion resume and a technical roadmap.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onAnalyze)}
        className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch"
      >
        {/* --- BLOCK 1: YOUR CV --- */}
        <div className="xl:col-span-5 group">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-500 h-full flex flex-col">
            {/* ... Tiêu đề giữ nguyên ... */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                  1
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Your CV</h3>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-primary)] bg-blue-50 px-3 py-1 rounded-full">
                PDF / DOCX
              </span>
            </div>

            <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
              <Button
                variant="unstyled"
                type="button"
                onClick={() => setCredentialsTab("upload")}
                className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${credentialsTab === "upload" ? "bg-white shadow-sm text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"}`}
              >
                Upload File
              </Button>
              <Button
                variant="unstyled"
                type="button"
                onClick={() => setCredentialsTab("saved")}
                className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${credentialsTab === "saved" ? "bg-white shadow-sm text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"}`}
              >
                Use Saved CV
              </Button>
            </div>

            {credentialsTab === "upload" && (
              <div className="flex-1 flex flex-col">
                <label className="relative flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl py-12 px-6 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group/dropzone">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover/dropzone:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">
                      upload_file
                    </span>
                  </div>
                  <p className="text-slate-900 font-medium mb-1">Drop your resume here</p>
                  <p className="text-slate-500 text-sm">or click to browse your files (Max 5MB)</p>
                  <Input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".pdf,.docx,.doc"
                    {...cvRegisterRest} /* SỬA BƯỚC 2: Rải các thuộc tính ref, onBlur, name... */
                    onChange={(e) => {
                      handleFileChange(e, "CV"); // Hiển thị Toast thông báo
                      cvOnChange(e);             // react-hook-form nhận dữ liệu và kích hoạt watch()
                    }}
                  />
                  {cvFile?.[0] && (
                    <div className="flex items-center gap-2 mt-4 text-sm text-green-600 font-medium">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      <span>{cvFile[0].name}</span>
                      <span className="text-gray-400">({(cvFile[0].size / 1024).toFixed(0)} KB)</span>
                    </div>
                  )}
                </label>
                {errors.cvFile && (
                  <p className="text-red-500 text-sm mt-2 font-medium">{errors.cvFile.message}</p>
                )}
              </div>
            )}

            {credentialsTab === "saved" && (
               /* ... Tab saved giữ nguyên ... */
              <div className="flex-1 overflow-hidden">
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {savedCVs.map((cv: any, i: number) => (
                    <div
                      key={i}
                      onClick={() => toggleSelectCv(i)}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${selectedCv === i ? "border-[var(--color-primary)] bg-blue-50/50 shadow-sm" : "border-slate-200 hover:border-blue-300 bg-slate-50"}`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div
                          className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center ${cv.color === "blue" ? "bg-blue-100" : "bg-slate-200"}`}
                        >
                          <span
                            className={`material-symbols-outlined text-xl ${cv.color === "blue" ? "text-blue-600" : "text-slate-600"}`}
                          >
                            description
                          </span>
                        </div>
                        <div className="truncate">
                          <p className="font-semibold text-sm text-slate-900 truncate">{cv.name}</p>
                          <p className="text-xs text-slate-500">{cv.meta}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="unstyled"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelectCv(i);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            selectedCv === i
                              ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/50"
                              : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          {selectedCv === i && (
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          )}
                          {selectedCv === i ? "Selected" : "Select"}
                        </Button>

                        <Button
                          variant="unstyled"
                          type="button"
                          onClick={(e) => handleDeleteCvClick(e, i)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[1.25rem]">delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- BLOCK 2: JOB DESCRIPTION --- */}
        <div className="xl:col-span-7 group">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-500 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                  2
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Job Description</h3>
              </div>
            </div>

            <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
              <Button
                variant="unstyled"
                type="button"
                onClick={() => setOpportunityTab("paste")}
                className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${opportunityTab === "paste" ? "bg-white shadow-sm text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"}`}
              >
                Paste Text
              </Button>
              <Button
                variant="unstyled"
                type="button"
                onClick={() => setOpportunityTab("upload")}
                className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${opportunityTab === "upload" ? "bg-white shadow-sm text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"}`}
              >
                Upload JD File
              </Button>
            </div>

            {opportunityTab === "paste" && (
              <div className="relative flex-1 flex flex-col">
                <textarea
                  className="w-full flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all resize-none min-h-[256px]"
                  placeholder="Paste the job description here..."
                  {...register("jdText")}
                ></textarea>
                <div className="absolute bottom-4 right-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {jdTextLength} chars
                  </span>
                </div>
              </div>
            )}

            {opportunityTab === "upload" && (
              <label className="relative flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl py-12 px-6 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group/dropzone">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4 group-hover/dropzone:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-indigo-600 text-3xl">
                    description
                  </span>
                </div>
                <p className="text-slate-900 font-medium mb-1">Upload job description</p>
                <p className="text-slate-500 text-sm">Supports PDF, DOCX (Max 5MB)</p>
                <Input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".pdf,.docx,.doc"
                  {...jdRegisterRest} /* SỬA BƯỚC 3: Rải các thuộc tính cho JD Input */
                  onChange={(e) => {
                    handleFileChange(e, "JD File"); // Hiển thị Toast thông báo cho JD
                    jdOnChange(e);                  // react-hook-form nhận dữ liệu JD
                  }}
                />
                {jdFile?.[0] && (
                  <div className="flex items-center gap-2 mt-4 text-sm text-green-600 font-medium">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>{jdFile[0].name}</span>
                    <span className="text-gray-400">({(jdFile[0].size / 1024).toFixed(0)} KB)</span>
                  </div>
                )}
              </label>
            )}
            {errors.jdFile && (
              <p className="text-red-500 text-sm mt-2 font-medium">{errors.jdFile.message}</p>
            )}
          </div>
        </div>

        {/* ... PHẦN CÒN LẠI GIỮ NGUYÊN (Block 3, grid 3 cột, Modal) ... */}
        
        {/* --- BLOCK 3: SUBMIT ACTION --- */}
        <div className="xl:col-span-12 mt-4">
          <div className="bg-[var(--color-primary)]/5 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-[var(--color-primary)]/10">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                3
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-slate-900">
                  Ready to transform your application?
                </h4>
                <p className="text-slate-600">
                  Our engine will generate a tailored resume and a 30-day skill acquisition roadmap.
                </p>
              </div>
            </div>
            <Button
              variant="unstyled"
              type="submit"
              className="whitespace-nowrap bg-[#0d99ff] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-4 group"
            >
              Analyze & Generate
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="xl:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-8 rounded-3xl bg-[#f8f9ff] border border-blue-100/50 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
              <span className="material-symbols-outlined text-blue-600">psychology</span>
            </div>
            <h5 className="text-lg font-bold text-slate-900 mb-2">Semantic Matching</h5>
            <p className="text-sm text-slate-500 leading-relaxed">
              Going beyond keywords. We analyze the intent and hierarchy of the job role requirements.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-[#f8f9ff] border border-blue-100/50 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
              <span className="material-symbols-outlined text-purple-600">map</span>
            </div>
            <h5 className="text-lg font-bold text-slate-900 mb-2">Technical Roadmap</h5>
            <p className="text-sm text-slate-500 leading-relaxed">
              Don't just apply. Learn. We provide a step-by-step guide to bridge your current skill gaps.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-[#f8f9ff] border border-blue-100/50 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
              <span className="material-symbols-outlined text-blue-500">auto_fix_high</span>
            </div>
            <h5 className="text-lg font-bold text-slate-900 mb-2">AI Polishing</h5>
            <p className="text-sm text-slate-500 leading-relaxed">
              Instant grammar and tone adjustments to ensure you sound like the leader the company needs.
            </p>
          </div>
        </div>
      </form>

      {/* Modal Xóa */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={cancelDelete}
          ></div>
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-red-600 text-3xl">warning</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Xóa CV?</h3>
              <p className="text-slate-600 mb-8">
                Bạn có chắc chắn muốn xóa CV này? Hành động này không thể hoàn tác.
              </p>
              <div className="flex w-full gap-3">
                <Button
                  variant="unstyled"
                  onClick={cancelDelete}
                  className="flex-1 py-3.5 px-6 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Hủy
                </Button>
                <Button
                  variant="unstyled"
                  onClick={confirmDelete}
                  className="flex-1 py-3.5 px-6 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700"
                >
                  Xóa
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;