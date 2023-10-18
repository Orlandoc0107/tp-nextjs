import Footer from "./components/Footer";
import Header from "./components/Header";

const Home = () => {
  return(
    <>
    <Header/>
    <div className="bg-gray-600 w-screen h-screen flex justify-center items-center">
    <h1 className="text-white text-center py-8 text-5xl font-bold text-red-600">Home</h1>
    </div>
    <Footer/>
    </>
  )
}

export default Home;
