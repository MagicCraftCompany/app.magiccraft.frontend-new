import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Router from '@/Router'

function App() {
  return (
    <div className="min-h-dvh w-full overscroll-none text-white">
      <div className="absolute h-[900px] w-full bg-hero bg-cover bg-center"></div>
      <div className="hero-bg-gradient absolute h-[900px] w-full"></div>
      <Header />
      <main className="overscroll-none scroll-smooth pb-32">
        <Router />
      </main>
      <Footer />
    </div>
  )
}

export default App
