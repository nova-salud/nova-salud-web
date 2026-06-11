const LoadingScreen = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EEF2F7]">
      <div className="flex flex-col items-center gap-6">
        <img
          src="/logos/logo.png"
          alt="Nova Salud"
          className="h-14 w-auto animate-pulse object-contain"
        />
        <div className="flex gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
