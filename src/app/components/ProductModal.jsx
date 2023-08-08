import { Fragment } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Dialog, Transition } from "@headlessui/react";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";

import { useProductModalStore } from "@/store/modalStore";

async function addProduct(data){
    const res = await axios.post(
        "http://127.0.0.1:8000/addproduct",
        {
            name: data.name,
            description: data.description,
            price: data.price
        }
      );
      console.log(res);
}



const signInSchema = Yup.object().shape({
  name: Yup.string().required("Ürün başlığı gerekli"),
  description: Yup.string().required("Ürün açıklaması gerekli"),
});

export default function Productmodal() {
  const isOpen = useProductModalStore((state) => state.isOpen);
  const closeModal = useProductModalStore((state) => state.closeModal);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none select-none z-50">
        <ToastContainer className="absolute" />
      </div>
      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Giriş Yapın
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Sepete ürün eklemek için giriş yapmanız gerekmektedir
                      </p>
                    </div>

                    <div className="mt-4">
                      <Formik
                        initialValues={{ name: "", description: "", price: 0 }}
                        validationSchema={signInSchema}
                        onSubmit={async (values) => await addProduct(values)}
                      >
                        {({ isSubmitting, errors, touched }) => (
                          <Form>
                            <Field
                              name="name"
                              type="text"
                              placeholder="Ürün adı"
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
                              Ürün adı
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
                              name="description"
                              type="description"
                              placeholder="Ürün açıklaması"
                              className="w-full border-2 border-gray-300 p-2 rounded-md focus:border-slate-700 transition-all duration-300 focus:outline-none"
                            />
                            <label
                              htmlFor="description"
                              className={
                                errors.description && touched.description
                                  ? "hidden"
                                  : "block text-black h-8 pl-2 font-semibold mt-1 mb-3"
                              }
                            >
                              Ürün Açıklaması
                            </label>
                            <div
                              className={
                                errors.description && touched.description
                                  ? "block text-red-500 font-semibold pl-2 h-8 mt-1 mb-3"
                                  : "hidden"
                              }
                            >
                              <ErrorMessage name="description" />
                            </div>
                            <Field
                              name="price"
                              type="text"
                              placeholder="Fiyat"
                              className="w-full border-2 mb-4 border-gray-300 p-2 rounded-md focus:border-slate-700 transition-all duration-300 focus:outline-none"
                              aria-label="Fiyat"
                            />
                            <div className="flex justify-between">
                              <button
                                type="button"
                                className="bg-gray-200 text-black font-lg rounded-md py-2 px-4 hover:bg-gray-300 transition duration-300"
                                onClick={closeModal}
                              >
                                Kapat
                              </button>
                              <button
                                type="submit"
                                className="bg-slate-700 text-white font-lg rounded-md py-2 px-4 hover:bg-gray-900 transition duration-300 disabled:bg-gray-300"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? "Ürün Ekleniyor" : "Ürün Ekle"}
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
