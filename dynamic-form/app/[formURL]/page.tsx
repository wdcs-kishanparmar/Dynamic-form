"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ROUTE, ERROR_MESSAGE } from "../constant";
import { FormData, FormField, FormPageProps } from "../interface";
import { useRouter } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";
import { LuMailX } from "react-icons/lu";

const FormPage = (props: FormPageProps) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [formResponceData, setFormResponceData] = useState<FormData | null>(
    null
  );
  const [alreadyResponded, setAlreadyResponded] = useState<any>(false);
  const [formValues, setFormValues] = useState<any>({});
  const session = useSession();
  console.log("session ", session?.data?.user?.email);
  const { data } = session || {};
  const { user } = data || {};
  const router = useRouter();

  console.log("formResponceData", formResponceData);
  console.log("alreadyResponded", alreadyResponded);

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
  const fetchDataByURL = async () => {
    try {
      const response = await axios.get(
        `${API_ROUTE.GET_FORM_RESPONCE_BY_URL}/${props.params.formURL}`
      );
      if (response && response.data) {
        setFormResponceData(response?.data);
      }
    } catch (error) {
      console.error(ERROR_MESSAGE.GET_FORM_BY_URL, error);
    }
  };

  useEffect(() => {
    if (formResponceData) {
      const userResponded = formResponceData.some(
        (response: any) => response.email === user?.email
      );
      setAlreadyResponded(userResponded);
    }
  }, [formResponceData, user]);
  useEffect(() => {
    if (props.params.formURL) {
      fetchData();
      fetchDataByURL();
    }
  }, [props.params.formURL]);

  const handleInputChange = (field: FormField, value: any) => {
    const fieldName = field.title.toLowerCase().replace(" ", "_");
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const submitAnswer = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`${API_ROUTE.FORM_RESPONSE}`, {
        formURL: formData?.formURL,
        email: user?.email,
        responses: formValues,
      });
      router.push(`${formData?.formURL}/form-responce`);
    } catch (error) {
      console.error("Forms response error", error);
    }
  };
  const clearForm = () => {
    console.log("Inn clear form");
  };

  return (
    <>
      {!alreadyResponded ? (
        <div className="min-h-screen bg-blue-100 p-0 sm:p-12">
          <div className="mx-auto w-[38%] max-w-[45rem] px-6 py-4 mb-3 bg-white border-0 shadow-lg sm:rounded-xl  border-t-[12px] border-t-blue-500">
            <h1 className="text-4xl font-bold mb-4">{formData?.formName}</h1>
            <div className="pb-2">
              <hr />
              <p className="flex text-gray-600 font-semibold mt-1">
                {session?.data ? (
                  <>
                    <p>{user?.email}</p>
                    <button
                      onClick={() => signOut()}
                      className="font-normal pl-1 text-blue-500"
                    >
                      Swich account
                    </button>
                  </>
                ) : (
                  <button
                    className="hover:text-blue-500 hover:underline"
                    onClick={() => signIn("google")}
                  >
                    Click and Login your account
                  </button>
                )}{" "}
              </p>
              <p className="flex items-center text-gray-600 mt-1">
                <LuMailX className="mr-2" />
                Not shared
              </p>
            </div>
            <div className="pb-2">
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
                        onChange={(e) =>
                          handleInputChange(field, e.target.value)
                        }
                        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-300"
                      />
                    )}
                    {field.answerType === "Multichoice Checkbox" && (
                      <div>
                        {field.choices.map((choice: any, index: number) => (
                          <div key={index} className="pt-3">
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
                        {field.choices.map((choice: any, index: number) => (
                          <>
                            <div key={index} className="block pt-3  space-x-4">
                              <input
                                type="radio"
                                name={field.title
                                  .toLowerCase()
                                  .replace(" ", "_")}
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
      ) : (
        <div className="min-h-screen bg-blue-100 p-0 sm:p-12">
          <div className="mx-auto w-[38%] max-w-[45rem] px-6 py-4 mb-3 bg-white border-0 shadow-lg sm:rounded-xl  border-t-[12px] border-t-blue-500">
            <h1 className="text-4xl  mb-4">You've already responded</h1>
            <div className="pb-2">
              <p className="text-gray-800  mb-6">
                You can fill out this form only once.
              </p>
              <p className="flex items-center text-gray-800 mt-1">
                Try contacting the owner of the form if you think this is a
                mistake.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormPage;
