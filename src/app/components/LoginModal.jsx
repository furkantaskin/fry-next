import { Fragment } from "react";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Dialog, Transition } from "@headlessui/react";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";

import { useLoginModalStore } from "@/store/modalStore";

const signInSchema = Yup.object().shape({
  email: Yup.string().email("E-posta geçersiz").required("E-posta gerekli"),
  password: Yup.string()
    .min(8, "Parola en az 8 haneli olmalıdır")
    .required("Parola gerekli"),
});

export default function Loadingmodal() {
  const router = useRouter();
  const isOpen = useLoginModalStore((state) => state.isOpen);
  const closeModal = useLoginModalStore((state) => state.closeModal);

  async function onSubmit(values) {
    try {
      const status = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (status.error) {
        toast.error("E-posta ya da parola hatalı", {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnFocusLoss: false,
          autoClose: 2000,
        });
      } else {
        closeModal();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
                        initialValues={{ email: "", password: "" }}
                        validationSchema={signInSchema}
                        onSubmit={(values) => onSubmit(values)}
                      >
                        {({ isSubmitting, errors, touched }) => (
                          <Form>
                            <Field
                              name="email"
                              type="email"
                              placeholder="deneme@domain.com"
                              className="w-full border-2 border-gray-300 p-2 rounded-md focus:border-slate-700 transition-all duration-300 focus:outline-none"
                              autoComplete="email"
                            />
                            <label
                              htmlFor="email"
                              className={
                                errors.email && touched.email
                                  ? "hidden"
                                  : "block text-black h-8 pl-2 font-semibold mt-1 mb-3"
                              }
                            >
                              E-posta adresiniz
                            </label>
                            <div
                              className={
                                errors.email && touched.email
                                  ? "block text-red-500 font-semibold pl-2 h-8 mt-1 mb-3"
                                  : "hidden"
                              }
                            >
                              <ErrorMessage name="email" />
                            </div>
                            <Field
                              name="password"
                              type="password"
                              placeholder="Parola"
                              className="w-full border-2 border-gray-300 p-2 rounded-md focus:border-slate-700 transition-all duration-300 focus:outline-none"
                            />
                            <label
                              htmlFor="password"
                              className={
                                errors.password && touched.password
                                  ? "hidden"
                                  : "block text-black h-8 pl-2 font-semibold mt-1 mb-3"
                              }
                            >
                              Parolanız
                            </label>
                            <div
                              className={
                                errors.password && touched.password
                                  ? "block text-red-500 font-semibold pl-2 h-8 mt-1 mb-3"
                                  : "hidden"
                              }
                            >
                              <ErrorMessage name="password" />
                            </div>
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
                                className="flex items-center justify-center gap-3 bg-slate-700 text-white font-lg rounded-md py-2 px-4 hover:bg-gray-900 transition duration-300 disabled:bg-gray-300"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <>
                                    <Loader2 className="animate-spin" />
                                    <span>Giriş Yapılıyor</span>
                                  </>
                                ) : (
                                  "Giriş yap"
                                )}
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
