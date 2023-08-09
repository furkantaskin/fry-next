import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

import { useCartStore } from "@/store/cartStore";

const signInSchema = Yup.object().shape({
  name: Yup.string().required("Kart üstündeki isim ve soyisim gerekli"),
  cardnumber: Yup.number()
    .required("Kart numarası gerekli")
    .typeError("Lütfen geçerli kart numarası giriniz"),
    cvv: Yup.number().min(0, "CVV kodu hatalı").typeError("CVV kodu hatalı").max(999, "CVV kodu hatalı").required("CVV numarası gerekli"),
    expire: Yup.string().required("Geçerlilik tarihi gereki")
});

async function handleCheckout() {
  toast.success("Ödeme başarıyla gerçekleştirildi", {
    position: toast.POSITION.TOP_RIGHT,
    pauseOnFocusLoss: false,
    autoClose: 2000,
  });
}

export default function Checkout() {
  const resetCart = useCartStore((state) => state.reset);

  return (
    <Formik
      initialValues={{ name: "", cardnumber: "", cvv: "", expire: "" }}
      validationSchema={signInSchema}
      onSubmit={async (values) => {
        handleCheckout();
        resetCart();
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="text-left bg-white col-span-2 p-4 rounded-md shadow-black">
          <Field
            name="name"
            type="text"
            placeholder="Furkan Taşkın"
            className="w-full border-2 border-gray-300 p-2 rounded-md focus:border-slate-700 transition-all duration-300 focus:outline-none"
          />
          <label
            htmlFor="name"
            className={
              errors.name && touched.name
                ? "hidden"
                : "block text-black h-8 pl-2 font-semibold mt-1 mb-3"
            }
          >
            Kart Sahibinin Adı Soyadı
          </label>
          <div
            className={
              errors.name && touched.name
                ? "block text-red-500 font-semibold pl-2 h-8 mt-1 mb-3"
                : "hidden"
            }
          >
            <ErrorMessage name="name" />
          </div>
          <Field
            name="cardnumber"
            type="cardnumber"
            placeholder="0000 0000 0000 0000"
            className="w-full border-2 border-gray-300 p-2 rounded-md focus:border-slate-700 transition-all duration-300 focus:outline-none"
          />
          <label
            htmlFor="cardnumber"
            className={
              errors.cardnumber && touched.cardnumber
                ? "hidden"
                : "block text-black h-8 pl-2 font-semibold mt-1 mb-3"
            }
          >
            Kart Numarası
          </label>
          <div
            className={
              errors.cardnumber && touched.cardnumber
                ? "block text-red-500 font-semibold pl-2 h-8 mt-1 mb-3"
                : "hidden"
            }
          >
            <ErrorMessage name="cardnumber" />
          </div>
          <Field
            name="cvv"
            type="number"
            placeholder="000"
            className="w-full border-2 border-gray-300 p-2 rounded-md focus:border-slate-700 transition-all duration-300 focus:outline-none"
          />
          <label
            htmlFor="cvv"
            className={
              errors.cvv && touched.cvv
                ? "hidden"
                : "block text-black h-8 pl-2 font-semibold mt-1 mb-3"
            }
          >
            CVV Kodu
          </label>
          <div
            className={
              errors.cvv && touched.cvv
                ? "block text-red-500 font-semibold pl-2 h-8 mt-1 mb-3"
                : "hidden"
            }
          >
            <ErrorMessage name="cvv" />
          </div>
          <Field
            name="expire"
            type="text"
            placeholder="12/23"
            className="w-full border-2 border-gray-300 p-2 rounded-md focus:border-slate-700 transition-all duration-300 focus:outline-none"
          />
          <label
            htmlFor="expire"
            className={
              errors.expire && touched.expire
                ? "hidden"
                : "block text-black h-8 pl-2 font-semibold mt-1 mb-3"
            }
          >
            Geçerlilik Tarihi
          </label>
          <div
            className={
              errors.expire && touched.expire
                ? "block text-red-500 font-semibold pl-2 h-8 mt-1 mb-3"
                : "hidden"
            }
          >
            <ErrorMessage name="expire" />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 bg-green-600 text-white font-lg rounded-md py-2 px-4 hover:bg-green-900 transition duration-300 disabled:bg-gray-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Ödeme Yapılıyor</span>
                </>
              ) : (
                "Ödeme Yap"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
