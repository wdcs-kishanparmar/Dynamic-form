"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_ROUTE, ERROR_MESSAGE, FORMS_NOT_FOUND, ROUTE } from "../constant";
import { Form } from "../interface";

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
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-500 text-4xl font-bold">{FORMS_NOT_FOUND}</p>
        )}
      </div>
    </>
  );
};

export default page;
