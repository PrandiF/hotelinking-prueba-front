import { useEffect, useState } from "react";
import { getOffers, updateOfferStatus } from "../../services/offers.service";
import { createPromoCode } from "../../services/promoCode.service";
import { v4 as uuidv4 } from "uuid";
import { Report } from "notiflix/build/notiflix-report-aio";
import { Confirm } from "notiflix";
import Button1 from "../../commons/Button1";

type OfferProps = {
  id: number;
  title: string;
  description: string;
  valid_until: Date;
  status: boolean;
};

function OffersList() {
  const [isLoading, setIsLoading] = useState(false);
  const [offerList, setOfferList] = useState<OfferProps[]>([]);

  useEffect(() => {
    const fetchedOffers = async () => {
      try {
        const offers = await getOffers();
        setOfferList(offers);
      } catch (error) {
        console.error("Error al obtener las ofertas:", error);
        throw error;
      }
    };
    fetchedOffers();
  }, []);

  // En tu función GeneratePromoCode
  const GeneratePromoCode = async (offer_id: number, is_redeemed: boolean) => {
    const selectedOffer = offerList.find((offer) => offer.id === offer_id);

    // Verificación si la oferta está deshabilitada
    if (selectedOffer?.status === false) {
      Report.failure(
        "No se puede generar el código",
        "Esta oferta ya está deshabilitada y no permite la generación de un nuevo código.",
        "Ok"
      );
      return; // Salir de la función si la oferta está deshabilitada
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulación de tiempo de espera

    const newId = `PROMO-${uuidv4()}`;
    const promoCodeData = { code: newId, offer_id, is_redeemed };

    try {
      const promoCode = await createPromoCode(promoCodeData);
      if (promoCode) {
        // Llamada a updateStatus para deshabilitar la oferta
        await updateOfferStatus(offer_id, false); // Asegúrate de que esta función esté implementada
        setIsLoading(false);
        Report.success(
          "Código generado con éxito",
          `${promoCodeData.code}`,
          "Ok"
        );

        // Actualizar el estado de la oferta en el frontend
        setOfferList((prevOffers) =>
          prevOffers.map((offer) =>
            offer.id === offer_id ? { ...offer, status: false } : offer
          )
        );

        return promoCode;
      } else {
        setIsLoading(false);
        Report.failure(
          "No se pudo obtener un código promocional",
          `Error al obtener el código`,
          "Ok"
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error al generar un código:", error);
    }
  };

  return (
    <div className="flex relative flex-col">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {offerList.map((offer) => (
          <div
            key={offer.id}
            className="min-w-[250px] bg-white text-center rounded-lg px-3 py-2 text-black flex flex-col gap-2 items-center justify-between border border-black"
          >
            <h3 className="text-lg font-bold">{offer.title}</h3>
            <p className="text-md">{offer.description}</p>

            {offer.status == false ? (
              <p className="text-md text-red-600">Ya fue utilizado</p>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-sm">
                  Válido hasta:
                  <b>{new Date(offer.valid_until).toLocaleDateString()}</b>
                </p>
                <Button1
                  text="Obtener código promocional"
                  onClick={() =>
                    Confirm.show(
                      "Desea obtener código promocional?",
                      "",
                      "Si",
                      "No",
                      () => {
                        GeneratePromoCode(offer.id, offer.status);
                      },
                      () => {}
                    )
                  }
                />
              </div>
            )}
          </div>
        ))}
      </ul>
      {isLoading && (
        <div className="w-full flex justify-center items-center mt-2">
          <div className="text-center w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

export default OffersList;
