"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ROUTE, ERROR_MESSAGE } from "../constant";
import { FormData, FormField, FormPageProps } from "../interface";
import { useRouter } from "next/navigation";

const FormPage = (props: FormPageProps) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [formValues, setFormValues] = useState<any>({});

  const router = useRouter();

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

  const handleInputChange = (field: FormField, value: any) => {
    const fieldName = field.title.toLowerCase().replace(" ", "_");
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const submitAnswer = (e: any) => {
    e.preventDefault();
    router.push(`${formData?.formURL}/form-responce`);
    console.log("formValues", formValues);
  };
  const clearForm = () => {
    console.log("Inn clear form");
  };

  return (
    <>
      <div className="min-h-screen bg-blue-100 p-0 sm:p-12">
        <div className="mx-auto w-[38%] max-w-[45rem] px-6 py-4 mb-3 bg-white border-0 shadow-lg sm:rounded-xl  border-t-[12px] border-t-blue-500">
          <h1 className="text-4xl font-bold mb-4">{formData?.formName}</h1>
          <div className="pb-12">
            <hr />
            <p className="text-red-500 mt-1 font-[8px]">
              * Indicates required question
            </p>
          </div>
        </div>

        <form className="max-w-2xl mx-auto">
          {formData?.questions &&
            formData.questions.map((field: FormField, index: number) => (
              <div className="mx-auto max-w-[45rem] px-6 py-8 bg-white border-0 shadow-lg sm:rounded-xl mb-3">
                <div key={index} className="mb-6">
                  <label className="  text-black font-semibold ">
                    {field.title}
                    {field.isRequired && (
                      <span className="pl-1 text-red-500">*</span>
                    )}
                  </label>
                  {field.answerType === "Text" && (
                    <input
                      type="text"
                      placeholder="Your answer"
                      name={field.title.toLowerCase().replace(" ", "_")}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-300"
                    />
                  )}
                  {field.answerType === "Multichoice Checkbox" && (
                    <div>
                      {field.choices.map((choice: any, choiceIndex: number) => (
                        <div key={choiceIndex} className="pt-3">
                          <input
                            type="checkbox"
                            name={field.title.toLowerCase().replace(" ", "_")}
                            value={choice}
                            onChange={(e) =>
                              handleInputChange(field, {
                                ...formValues[
                                  field.title.toLowerCase().replace(" ", "_")
                                ],
                                [choice]: e.target.checked,
                              })
                            }
                            className="mr-5 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                          />
                          <label>{choice}</label>
                        </div>
                      ))}
                    </div>
                  )}
                  {field.answerType === "Single Select radio" && (
                    <div>
                      {field.choices.map((choice: any, choiceIndex: number) => (
                        <>
                          <div
                            key={choiceIndex}
                            className="block pt-3  space-x-4"
                          >
                            <input
                              type="radio"
                              name={field.title.toLowerCase().replace(" ", "_")}
                              value={choice}
                              onChange={(e) =>
                                handleInputChange(field, e.target.value)
                              }
                              className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                            />
                            <label>{choice}</label>
                          </div>
                        </>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          <div className="flex justify-between">
            <button
              type="submit"
              onClick={submitAnswer}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="px-4 py-2 text-blue-500 font-medium rounded"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormPage;
