import Header from "../../commons/Header";
import OffersList from "./OffersList";

function Home() {
  return (
    <div className="flex flex-col absolute w-full">
      <Header />
      <div className="xl:w-full p-4 flex flex-col gap-4 mt-[8%] items-center justify-center mx-5 xl:mx-0 ">
        <h2 className="text-white xl:text-3xl text-xl font-semibold">
          Ofertas Especiales:
        </h2>
        <div>
          <OffersList />
        </div>
      </div>
    </div>
  );
}

export default Home;
