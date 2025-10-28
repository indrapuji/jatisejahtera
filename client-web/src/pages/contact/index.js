import React, { useState } from "react";
import Layout from "@components/Layout";
import Navigation from "@components/Navigation";
import Footer from "@components/Footer";
import axios from "axios";
import newAlert from "@components/newAlert";

function index() {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    telp: "",
    email: "",
    pesan: "",
  });

  const onFormChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const { nama, alamat, telp, email, pesan } = formData;
      if (!nama || !alamat || !telp || !email || !pesan) {
        newAlert({ status: "error", message: "Isi semua form" });
        return;
      }
      await axios({
        method: "POST",
        url: `${process.env.API_URL}/contact/add`,
        data: formData,
      });
      newAlert({ status: "success", message: "Pesan terkirim" });
      setFormData({
        ...formData,
        nama: "",
        alamat: "",
        telp: "",
        email: "",
        pesan: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout pageTitle={"CONTACT US || JATISEJAHTERA"}>
      <Navigation />
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-12 mx-auto">
          <div>
            <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
              Ada yang ingin anda tanyakan?
            </h1>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Seputar pertanyaan atau informasi lainnya?
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div>
                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>

                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">
                  KANTOR PUSAT
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  D/A WISMA PERHUTANI
                </p>
                <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                  JALAN VILLA NO.1 GATOT SOBROTO KAV. 17 – 18 JAKARTA SELATAN
                  TLP. 62.21.5252983, FAX. 62.21.5252983
                  yayasanjatisejahtera@yahoo.co.id
                </p>
              </div>

              <div>
                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>

                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">
                  KANTOR PERWAKILAN YKP3.JS JAWA TENGAH
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  D/A WISMA PERHUTANI
                </p>
                <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                  JL.PAHLAWAN NO. 15 - 17 SEMARANG 50243 TLP. 62.24 8413631
                </p>
              </div>

              <div>
                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>

                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">
                  KANTOR PERWAKILAN YKP3.JS JAWA TIMUR
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  D/A GRAHA PERHUTANI
                </p>
                <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                  JL.GENTENG KALI NO. 49 SURABAYA 60008 TLP. 62.31 5343881
                </p>
              </div>

              <div>
                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>

                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">
                  KANTOR PERWAKILAN YKP3.JS JAWA BARAT
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  D/A WISMA PERHUTANI
                </p>
                <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                  JL.SOEKARNO HATTA NO. 628 KM.14 BANDUNG 40292 TLP. 62.22.
                  7802792
                </p>
              </div>
            </div>

            <div className="p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8">
              <form onSubmit={onFormSubmit}>
                <div className="-mx-2 md:items-center md:flex">
                  <div className="flex-1 px-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Nama
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      placeholder="John Doe"
                      className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={onFormChange}
                    />
                  </div>
                </div>
                <div className="-mx-2 md:items-center md:flex mt-4">
                  <div className="flex-1 px-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Alamat
                    </label>
                    <input
                      type="text"
                      name="alamat"
                      value={formData.alamat}
                      placeholder="Wisma Perhutani"
                      className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={onFormChange}
                    />
                  </div>
                </div>
                <div className="-mx-2 md:items-center md:flex mt-4">
                  <div className="flex-1 px-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Telp
                    </label>
                    <input
                      type="text"
                      name="telp"
                      value={formData.telp}
                      placeholder="081211111111"
                      className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={onFormChange}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="johndoe@example.com"
                    className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={onFormChange}
                  />
                </div>

                <div className="w-full mt-4">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Pesan
                  </label>
                  <textarea
                    className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Message"
                    name="pesan"
                    value={formData.pesan}
                    onChange={onFormChange}
                  ></textarea>
                </div>

                <button
                  className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  type="submit"
                >
                  Kirim
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Layout>
  );
}

export default index;
