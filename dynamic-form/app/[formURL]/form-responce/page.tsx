"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ROUTE, ERROR_MESSAGE } from "../../constant";
import { FormData, FormPageProps } from "../../interface";
import Link from "next/link";

const FormPage = (props: FormPageProps) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_ROUTE.GET_FORM_BY_URL}/${props.params.formURL}`
        );
        if (response && response.data) {
          setFormData(response?.data);
        }
      } catch (error) {
        console.error(ERROR_MESSAGE.GET_FORM_BY_URL, error);
      }
    };

    if (props.params.formURL) {
      fetchData();
    }
  }, [props.params.formURL]);
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
        <div className="mx-auto max-w-[45rem] px-6 py-12 bg-white border-0 shadow-lg sm:rounded-xl border-t-[12px] border-t-blue-500">
          <h1 className="text-4xl font-bold mb-4">{formData?.formName}</h1>
          <div className="pb-8">
            <h3>Your response has been recorded.</h3>
          </div>
          <div>
            <Link href={`/${props.params.formURL}`}>
              <div className="text-blue-500 underline">
                Submit another response
              </div>
            </Link>
          </div>

          {/* <button
              type="submit"
              onClick={submitAnswer}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button> */}
          {/* </form> */}
        </div>
      </div>
    </>
  );
};
export default FormPage;
