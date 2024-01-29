"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_ROUTE, ERROR_MESSAGE, FORMS_NOT_FOUND, ROUTE } from "../constant";
import { Form } from "../interface";
import Image from "next/image";
import XL from "../../public/image/XLs.jpg";

const page = () => {
  const [formList, setFormList] = useState([]);

  const router = useRouter();

  const fetchFormList = async () => {
    try {
      const response = await axios.get(API_ROUTE.FORM_LIST);
      if (response.data) {
        setFormList(response.data);
      }
    } catch (error) {
      console.error(ERROR_MESSAGE.FORM_LIST, error);
    }
  };

  useEffect(() => {
    fetchFormList();
  }, []);

  const formatCreatedAt = (createdAt: number) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(createdAt).toLocaleString(undefined, options);
  };

  const createForms = () => {
    router.push(ROUTE.HOME);
  };

  /*  const downloadExcel = async (formURL: any) => {
    try {
      const response = await axios.get(
        `${API_ROUTE.FORM_RESPONSE}/${formURL}/export-excel`,
        {
          responseType: "blob",
        }
      );
      console.log("responce", response);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "form-responses.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download Xl error", error);
    }
  };
 */
  const downloadExcel = async (formURL: string) => {
    try {
      const response = await axios.get(
        `${API_ROUTE.FORM_RESPONSE}/${formURL}/export-excel`,
        {
          responseType: "blob",
        }
      );

      const timestamp = new Date().toISOString().replace(/:/g, "-");
      const filename = `form-responses-${timestamp}.xlsx`;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download Xl error", error);
    }
  };
  return (
    <>
      <div className="max-w-[60rem] mx-auto text-center">
        <h1 className="text-center text-3xl font-bold mb-4 pt-12 pb-9">
          Form Listing
        </h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={createForms}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + New Form
          </button>
        </div>
        {formList.length ? (
          <table className="min-w-full border border-collapse border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Form Name</th>
                <th className="border p-2">Form URL</th>
                <th className="border p-2">Created At</th>
                <th className="border p-2">Download Responses</th>
              </tr>
            </thead>

            <tbody>
              {formList.map((form: Form, index: number) => (
                <tr key={index}>
                  <td className="border p-2">{form.formName}</td>

                  <td className="border p-2">
                    <Link href={`/${form.formURL}`}>
                      <div className="text-blue-500">{form.formURL}</div>
                    </Link>
                  </td>

                  <td className="border p-2">
                    {formatCreatedAt(form.createdAt)}
                  </td>
                  <td className="border p-2">
                    <button
                      type="button"
                      onClick={() => downloadExcel(form?.formURL)}
                      className="flex items-center  underline font-medium rounded px-4 py-2 hover:text-blue-500"
                      title="Sends responses to a spreadsheet"
                    >
                      <Image src={XL} alt="XL Logo" width={40} height={40} />
                      <span>View in Sheets</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-500 text-4xl font-semibold">
            {FORMS_NOT_FOUND}
          </p>
        )}
      </div>
    </>
  );
};

export default page;
