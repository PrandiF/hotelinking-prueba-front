import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import Header from "../../commons/Header";
import { useEffect, useState } from "react";
import {
  getPromoCodes,
  redeemPromoCode,
} from "../../services/promoCode.service";
import { Report } from "notiflix";

type PromoCodeProps = {
  code: string;
  offer_id: number;
  is_redeemed: boolean;
};

function MyCodes() {
  const [isLoading, setIsLoading] = useState(false);
  const [myCodes, setMyCodes] = useState<PromoCodeProps[]>([]);

  useEffect(() => {
    const fetchedPromoCode = async () => {
      try {
        const codes = await getPromoCodes();
        setMyCodes(codes);
      } catch (error) {
        console.error("Error al obtener los codigos:", error);
        throw error;
      }
    };
    fetchedPromoCode();
  }, []);

  const confirmRedeemedCode = async (id: number, code: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      await redeemPromoCode(id, code);

      setMyCodes((prevCodes) =>
        prevCodes.map((promoCode) =>
          promoCode.offer_id === id
            ? { ...promoCode, is_redeemed: true }
            : promoCode
        )
      );
      setIsLoading(false);
      Report.success(
        "Código canjeado correctamente.",
        "Se ha canjeado tu código promocional.",
        "Ok",
        () => {}
      );
    } catch (error) {
      setIsLoading(false);
      Report.failure(
        "Error al canjear el código.",
        "Lo siento, no se ha podido canjear tu código promocional.",
        "Ok",
        () => {}
      );
      console.error("Error al canjear el código:", error);
      throw error;
    }
  };

  const UseCode = async (offer_id: number, code: string) => {
    try {
      Confirm.show(
        "Está a punto de canjear el código promocional",
        "Desea continuar?",
        "Si",
        "No",
        () => {
          confirmRedeemedCode(offer_id, code);
        },
        () => {}
      );
    } catch (error) {
      console.error("Error al canjear el codigo:", error);
      throw error;
    }
  };
  return (
    <div className="flex relative flex-col w-full">
      <Header />
      <div className="w-full p-4 flex flex-col gap-4 mt-[8%] items-center justify-center mx-5  xl:mx-0">
        <h2 className="text-white xl:text-3xl text-xl font-semibold">
          Mis códigos promocionales:
        </h2>
        {myCodes?.length > 0 && (
          <p className="text-white xl:text-xl">
            Hacé click en un código para canjearlo.
          </p>
        )}
        <div className="bg-white rounded-md px-14 py-2">
          <ol className="flex flex-col gap-2 items-center justify-center">
            {myCodes?.length > 0 ? (
              myCodes.map((code) => (
                <li
                  className="flex gap-2"
                  onClick={() => UseCode(code.offer_id, code.code)}
                  key={code.offer_id}
                >
                  <p className="hover:underline text-blue-500 cursor-pointer">
                    {code.code}
                  </p>
                  <p
                    className={`${
                      code.is_redeemed == true
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {code.is_redeemed == true ? "✕" : "✔︎"}
                  </p>
                </li>
              ))
            ) : (
              <li>
                <p className="text-white">Aún no tienes ningún código.</p>
              </li>
            )}
          </ol>
        </div>
      </div>
      {isLoading && (
        <div className="w-full flex justify-center items-center mt-2">
          <div className="text-center w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

export default MyCodes;
